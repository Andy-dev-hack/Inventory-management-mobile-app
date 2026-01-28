import { describe, it, expect } from "vitest";
import { handleAsync } from "./handle-async";

describe("handleAsync", () => {
  it("should return [null, data] when promise resolves", async () => {
    const mockData = { id: 1, name: "Test" };
    const promise = Promise.resolve(mockData);

    const [error, data] = await handleAsync(promise);

    expect(error).toBeNull();
    expect(data).toEqual(mockData);
  });

  it("should return [Error, null] when promise rejects with an Error", async () => {
    const mockError = new Error("Something went wrong");
    const promise = Promise.reject(mockError);

    const [error, data] = await handleAsync(promise);

    expect(error).toBeInstanceOf(Error);
    expect(error).toEqual(mockError);
    expect(data).toBeNull();
  });

  it("should normalize non-Error rejections to Error objects", async () => {
    const promise = Promise.reject("String error");

    const [error, data] = await handleAsync(promise);

    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe("String error");
    expect(data).toBeNull();
  });
});
