import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import { AssetCard } from "./AssetCard";
import { type Asset } from "../../schemas/asset.schema";

// Helper to mock window.confirm
const confirmSpy = vi.spyOn(window, "confirm");

// Mock the context
const mockUpdateAsset = vi.fn();
const mockDeleteAsset = vi.fn();

vi.mock("../../context/InventoryContext", () => ({
  useInventoryContext: () => ({
    updateAsset: mockUpdateAsset,
    deleteAsset: mockDeleteAsset,
  }),
}));

describe("AssetCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateAsset.mockResolvedValue(true);
    mockDeleteAsset.mockResolvedValue(true);
    confirmSpy.mockReturnValue(true); // Default to confirm "Yes"
  });

  afterEach(() => {
    cleanup();
  });

  const mockAsset: Asset = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "MacBook Pro M3",
    serialNumber: "SN-123456789",
    category: "laptop",
    value: 2499.99,
    status: "active",
    purchaseDate: "2024-01-15T10:00:00.000Z",
  };

  it("renders asset details correctly", () => {
    render(<AssetCard asset={mockAsset} />);

    expect(screen.getByText("MacBook Pro M3")).toBeDefined();
    expect(screen.getByText("SN-123456789")).toBeDefined();
    expect(screen.getByText("laptop")).toBeDefined(); // Capitalized by CSS only
    expect(screen.getByText("active")).toBeDefined();
  });

  it("calls deleteAsset when delete button is clicked and confirmed", async () => {
    render(<AssetCard asset={mockAsset} />);

    const deleteBtn = screen.getByRole("button", { name: /Delete Asset/i });
    fireEvent.click(deleteBtn);

    expect(confirmSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockDeleteAsset).toHaveBeenCalledWith(mockAsset.id);
    });
  });

  it("does NOT call deleteAsset when delete is cancelled", async () => {
    confirmSpy.mockReturnValue(false); // User clicks "Cancel"
    render(<AssetCard asset={mockAsset} />);

    const deleteBtn = screen.getByRole("button", { name: /Delete Asset/i });
    fireEvent.click(deleteBtn);

    expect(confirmSpy).toHaveBeenCalled();
    expect(mockDeleteAsset).not.toHaveBeenCalled();
  });

  it("calls updateAsset when status is changed", async () => {
    render(<AssetCard asset={mockAsset} />);

    // Find the invisible select inside the badge
    // We can find it by title "Change Status" (added in previous step)
    const select = screen.getByTitle("Change Status");

    fireEvent.change(select, { target: { value: "maintenance" } });

    await waitFor(() => {
      expect(mockUpdateAsset).toHaveBeenCalledWith(mockAsset.id, {
        status: "maintenance",
      });
    });
  });
});
