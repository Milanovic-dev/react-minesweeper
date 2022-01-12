import React from "react";
import { transformStringMapToMatrix } from "./representation";

describe("Representation", () => {
  it("transformStringMapToMatrix should correctly maps stringMap to matrix", () => {
    const map =
      "map:\n*□1□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n";

    const matrix = transformStringMapToMatrix(map);

    expect(matrix[0][0]).toBe(-2);
    expect(matrix[0][1]).toBe(-1);
    expect(matrix[0][2]).toBe(1);
  });

  it("should fail for unknown char", () => {
    const map =
      "map:\ny□1□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n□□□□□□□□□□\n";

    const matrix = transformStringMapToMatrix(map);
    expect(matrix[0][0]).toBeNaN();
  });
});
