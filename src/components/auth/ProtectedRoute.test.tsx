import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../../context/AuthContext";

// Mock the AuthContext
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Helper to render with Router
const renderWithRouter = (ui: React.ReactNode, initialEntry = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path={initialEntry} element={ui} />
        <Route path="/login" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  );
};

// Component to verify redirects
const LocationDisplay = () => {
  const location = useLocation();
  return (
    <div>
      <span data-testid="location-pathname">{location.pathname}</span>
      <span data-testid="location-state">{JSON.stringify(location.state)}</span>
    </div>
  );
};

describe("ProtectedRoute", () => {
  it("should render nothing when loading is true", () => {
    (useAuth as any).mockReturnValue({
      user: null,
      loading: true,
    });

    const { container } = renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );

    expect(container.firstChild).toBeNull();
  });

  it("should redirect to /login when user is null (not loading)", () => {
    (useAuth as any).mockReturnValue({
      user: null,
      loading: false,
    });

    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      "/protected",
    );

    // Should be at /login
    expect(screen.getByTestId("location-pathname").textContent).toBe("/login");
    // Should pass "from" state
    expect(screen.getByTestId("location-state").textContent).toContain(
      '"pathname":"/protected"', // Note: MemoryRouter normalized path
    );
  });

  it("should render children when user exists", () => {
    (useAuth as any).mockReturnValue({
      user: { id: "123", email: "test@example.com" },
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="child">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("child")).not.toBeNull();
  });
});
