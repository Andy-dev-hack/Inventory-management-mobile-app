import { describe, it, expect } from "vitest";
import { AssetSchema } from "./asset.schema";

describe("AssetSchema Validation Factory", () => {
  it("should transform partial input into a complete Asset object", () => {
    // Simulate input from a simple form
    const input = {
      name: "Monitor 4K",
      category: "electronics",
      value: 450.99,
    };

    const result = AssetSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      // Confirm that schema .default() values worked
      expect(result.data.id).toBeDefined();
      expect(result.data.status).toBe("active");
      expect(result.data.purchaseDate).toBeDefined();
      expect(result.data.name).toBe("Monitor 4K");
    }
  });

  it("should fail when name is under 3 characters", () => {
    const result = AssetSchema.safeParse({
      name: "Lo",
      category: "other",
      value: 10,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Name must be at least 3 characters",
      );
    }
  });
});
