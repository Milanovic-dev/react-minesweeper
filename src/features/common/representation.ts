export const BOMB_CHAR = "*";
export const EMPTY_CHAR = "□";

export const fieldCharset = {
  [BOMB_CHAR]: -2,
  [EMPTY_CHAR]: -1,
};

/**
 * Transforms a string map into number matrix.
 *
 * Transformation:
 * * = -2 (Bomb)
 * □ = -1 (Empty)
 *
 * @param {type}   var           Map string representation.
 *
 * @return {type} Number matrix
 */
export function transformStringMapToMatrix(
  stringMap: string
): Array<Array<number>> {
  const map = [];
  const split = stringMap.split(/\r?\n/);
  const rows = split.slice(1, split.length - 1);

  for (let row of rows) {
    const cols = [];
    for (let char of row) {
      const number =
        char !== BOMB_CHAR && char !== EMPTY_CHAR
          ? Number(char)
          : fieldCharset[char];

      cols.push(number);
    }
    map.push(cols);
  }

  return map;
}
