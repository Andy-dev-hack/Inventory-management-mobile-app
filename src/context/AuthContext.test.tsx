import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AuthProvider, useAuth } from "./AuthContext";
// import { supabase } from "../lib/supabase"; // Not needed if we mock it below

// Mock Supabase Auth (Inline)
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockSignOut = vi.fn();

vi.mock("../lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
    auth: {
      getSession: (...args: unknown[]) => mockGetSession(...args),
      onAuthStateChange: (...args: unknown[]) => mockOnAuthStateChange(...args),
      signOut: (...args: unknown[]) => mockSignOut(...args),
    },
  },
}));

// Component to test the hook
// Note: AuthProvider only renders this AFTER loading is false.
const TestComponent = () => {
  const { user, signOut } = useAuth();

  return (
    <div>
      <div data-testid="user-email">{user?.email ?? "No User"}</div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default subscription mock
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("initializes with session from supabase", async () => {
    // Mock getSession response
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: { email: "test@example.com" },
        },
      },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    // Expect AuthProvider's loading text
    expect(screen.getByText("Loading Vault...")).toBeDefined();

    // Should eventually show user (when loading finishes)
    await waitFor(() => {
      expect(screen.getByTestId("user-email").textContent).toBe(
        "test@example.com",
      );
    });
  });

  it("handles no session", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: null },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    // Expect AuthProvider's loading text
    expect(screen.getByText("Loading Vault...")).toBeDefined();

    await waitFor(() => {
      expect(screen.getByTestId("user-email").textContent).toBe("No User");
    });
  });
});
