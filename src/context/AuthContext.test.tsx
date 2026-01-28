import { render, screen, waitFor, cleanup, act } from "@testing-library/react";
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
  it("updates state on auth change", async () => {
    // 1. Setup initial session
    mockGetSession.mockResolvedValue({
      data: { session: null },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    // Wait for initial load
    await waitFor(() =>
      expect(screen.getByTestId("user-email").textContent).toBe("No User"),
    );

    // 2. Trigger Auth Change
    // We need to capture the callback passed to mockOnAuthStateChange
    // The mock output: mockResult.data.subscription.unsubscribe
    // But we need the ARGUMENT passed to onAuthStateChange.

    // We can infer it was called during mount.
    expect(mockOnAuthStateChange).toHaveBeenCalled();
    const authCallback = mockOnAuthStateChange.mock.calls[0][0]; // First arg of first call

    // 3. Simulate "SIGNED_IN" with a user
    act(() => {
      authCallback("SIGNED_IN", { user: { email: "new@example.com" } });
    });

    await waitFor(() => {
      expect(screen.getByTestId("user-email").textContent).toBe(
        "new@example.com",
      );
    });
  });

  it("throws error if useAuth is used outside provider", () => {
    // Suppress console.error for this test as React logs the error boundary
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );

    consoleSpy.mockRestore();
  });
});
