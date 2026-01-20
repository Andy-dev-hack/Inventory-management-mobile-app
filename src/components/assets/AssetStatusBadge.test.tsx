import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { AssetStatusBadge } from "./AssetStatusBadge";

describe("AssetStatusBadge Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders active status with success variant (green)", () => {
    render(<AssetStatusBadge status="active" />);
    const badge = screen.getByText("active");
    // Verify it uses the green class from the generic Badge's success variant
    expect(badge.className).toContain("bg-emerald-100");
  });

  it("renders maintenance status with warning variant (yellow)", () => {
    render(<AssetStatusBadge status="maintenance" />);
    const badge = screen.getByText("maintenance");
    expect(badge.className).toContain("bg-amber-100");
  });

  it("renders retired status with default variant (slate)", () => {
    render(<AssetStatusBadge status="retired" />);
    const badge = screen.getByText("retired");
    expect(badge.className).toContain("bg-slate-100");
  });
});
