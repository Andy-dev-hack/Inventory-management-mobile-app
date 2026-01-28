import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { cleanup } from "@testing-library/react";

// Mock AuthContext to bypass loading state and login logic
vi.mock("./context/AuthContext", async () => {
  return {
    AuthProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useAuth: () => ({
      user: { id: "test-user", email: "test@example.com" },
      session: { access_token: "fake-token", user: { id: "test-user" } },
      loading: false,
      signOut: vi.fn(),
      refreshSession: vi.fn(),
    }),
  };
});

// Mock Supabase for data fetching (AssetService)
vi.mock("./lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnValue({
        // Return empty list or some mock data
        data: [],
        error: null,
      }),
      insert: vi.fn().mockReturnValue({ data: null, error: null }),
      update: vi.fn().mockReturnValue({ data: null, error: null }),
      delete: vi.fn().mockReturnValue({ data: null, error: null }),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    })),
    auth: {
      getSession: vi.fn(), // Shouldn't be called if AuthContext is mocked
    },
  },
}));

describe("App Integration", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the dashboard by default", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    // Dashboard header should be present immediately
    expect(screen.getAllByText(/Plutux/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Premium Asset Management/i).length,
    ).toBeGreaterThan(0);

    // Stats cards
    expect(screen.getByText(/Total Assets/i)).toBeDefined();
    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
  });

  it("navigates to the add asset page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    // Click 'Register New Asset' link
    const link = screen.getByRole("link", { name: /Register New Asset/i });
    fireEvent.click(link);

    // Check we are on the form page
    expect(
      screen.getByRole("heading", { name: /Register Asset/i }),
    ).toBeDefined();
    expect(screen.getByLabelText(/Asset Name/i)).toBeDefined();
  });

  it("navigates to the inventory list", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /View Inventory/i });
    fireEvent.click(link);

    // Wait for route transition and render
    expect(screen.getByText(/Inventory List/i)).toBeDefined();
    // Since mock data returns [], we expect "items found" to be 0
    expect(screen.getByText(/0 items found/i)).toBeDefined();
  });
});
