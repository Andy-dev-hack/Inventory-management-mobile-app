import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Input, Select, Button } from "./Atoms";

describe("UI Atoms", () => {
  afterEach(() => {
    cleanup();
  });
  describe("Input", () => {
    it("renders label and placeholder", () => {
      render(
        <Input label="Test Label" id="test-input" placeholder="Enter text" />,
      );
      expect(screen.getByLabelText("Test Label")).toBeDefined();
    });

    it("displays error message", () => {
      render(<Input label="Label" error="Required field" />);
      expect(screen.getByText("Required field")).toBeDefined();
    });
  });

  describe("Select", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ];

    it("renders options correctly", () => {
      render(<Select label="Select Label" options={options} />);
      expect(screen.getByRole("combobox")).toBeDefined();
      expect(screen.getByText("Option 1")).toBeDefined();
    });
  });

  describe("Button", () => {
    it("handles click events", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      fireEvent.click(screen.getByRole("button", { name: /click me/i }));
      expect(handleClick).toHaveBeenCalled();
    });

    it("shows loading state", () => {
      render(<Button isLoading>Submit</Button>);
      const btn = screen.getByRole("button", {
        name: /submit/i,
      }) as HTMLButtonElement;
      expect(btn.disabled).toBe(true);
    });
  });
});
