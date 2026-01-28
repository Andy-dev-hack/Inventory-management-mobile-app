import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { Login } from "./Login";
import { MemoryRouter } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

// --- Mocks ---
// ... (Mocks remain the same, usually)

// Mock Supabase
vi.mock("../lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
    },
  },
}));

// Mock Sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock AuthContext
vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock Router Navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login Page", () => {
  const mockRefreshSession = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({
      user: null,
      refreshSession: mockRefreshSession,
    });
  });

  afterEach(() => {
    cleanup();
  });

  const renderLogin = () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
  };

  it("should render login form by default", () => {
    renderLogin();
    expect(screen.getByText("Sign in to manage your inventory")).not.toBeNull();
    expect(
      screen.getByRole("button", { name: /sign in/i }), // 'Sign in' vs 'Sign In' might matter, using regex
    ).not.toBeNull();
  });

  it("should toggle to signup mode", () => {
    renderLogin();
    const toggleButton = screen.getByText("No account? Create one");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Create a secure account")).not.toBeNull();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).not.toBeNull();
  });

  it("should validate inputs before calling Supabase", async () => {
    renderLogin();

    // Fill invalid data (meet browser "required" but fail Zod)
    fireEvent.change(screen.getByPlaceholderText("admin@plutux.com"), {
      target: { value: "valid@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "short" }, // Assume strict schema requires > 5 chars
    });

    const submitBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).not.toHaveBeenCalled();
      // Zod validation triggers a toast
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("should call signInWithPassword on valid login", async () => {
    renderLogin();

    // Fill form
    fireEvent.change(screen.getByPlaceholderText("admin@plutux.com"), {
      target: { value: "valid@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });

    // Mock success
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      error: null,
    });

    // Submit
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "valid@email.com",
        password: "password123",
      });
      expect(mockRefreshSession).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Welcome back!");
    });
  });

  it("should handle login errors", async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("admin@plutux.com"), {
      target: { value: "valid@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "wrongpass" },
    });

    // Mock failure
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      error: { message: "Invalid login credentials" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid login credentials");
      expect(mockRefreshSession).not.toHaveBeenCalled();
    });
  });
});
