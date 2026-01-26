import { describe, it, expect } from "vitest";
import { LoginSchema } from "./auth.schema";

describe("LoginSchema", () => {
  it("validates correct credentials", () => {
    const valid = {
      email: "test@example.com",
      password: "password123",
    };
    const result = LoginSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects invalid emails", () => {
    const invalid = {
      email: "not-an-email",
      password: "password123",
    };
    const result = LoginSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        "Please enter a valid email address",
      );
    }
  });

  it("rejects short passwords", () => {
    const invalid = {
      email: "test@example.com",
      password: "123", // Too short
    };
    const result = LoginSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      // Zod usually returns "String must contain at least 6 character(s)"
      expect(result.error.issues[0].code).toBe("too_small");
    }
  });

  it("rejects empty inputs", () => {
    const invalid = {
      email: "",
      password: "",
    };
    const result = LoginSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
