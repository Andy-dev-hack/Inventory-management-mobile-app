import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { AssetCard } from "./AssetCard";
import { type Asset } from "../../schemas/asset.schema";

describe("AssetCard", () => {
  afterEach(() => {
    cleanup();
  });

  const mockAsset: Asset = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "MacBook Pro M3",
    serialNumber: "SN-123456789",
    category: "electronics",
    value: 2499.99,
    status: "active",
    purchaseDate: "2024-01-15T10:00:00.000Z",
  };

  it("renders asset name and serial number", () => {
    render(<AssetCard asset={mockAsset} />);

    expect(screen.getByText("MacBook Pro M3")).toBeDefined();
    expect(screen.getByText("SN-123456789")).toBeDefined();
  });

  it("renders formatted currency (EUR)", () => {
    render(<AssetCard asset={mockAsset} />);

    // We expect "€" symbol for EUR, but exact format might depend on locale.
    // Normalized check:
    const valueElement = screen.getByText(/€2,499.99|2.499,99/);
    expect(valueElement).toBeDefined();
  });

  it("renders formatted date", () => {
    render(<AssetCard asset={mockAsset} />);

    // Expect "January 15, 2024" (en-US)
    expect(screen.getByText("January 15, 2024")).toBeDefined();
  });

  it("renders status badge", () => {
    render(<AssetCard asset={mockAsset} />);

    const badge = screen.getByText("active");
    expect(badge).toBeDefined();
    // Assuming badge implementation (from previous step) adds generic classes,
    // but just checking presence here is enough for the card test.
  });

  it("renders placeholder when serial number is missing", () => {
    const assetWithoutSerial = { ...mockAsset, serialNumber: undefined };
    render(<AssetCard asset={assetWithoutSerial} />);

    expect(screen.getByText("No Serial Number")).toBeDefined();
  });
});
