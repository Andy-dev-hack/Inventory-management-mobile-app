import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children correctly", () => {
    render(<Badge>Generic</Badge>);
    expect(screen.getByText("Generic")).toBeDefined();
  });

  it("applies success variant classes", () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText("Success");
    expect(badge.className).toContain("bg-emerald-100");
  });

  it("applies default variant when none is provided", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className).toContain("bg-slate-100");
  });
});
