const binarizeTile = (tile) => (
  [...Array(Math.ceil(tile.length / 2))]
    .map((_, i) => tile.slice(i * 2, (i * 2) + 2))
    .map((hex) => parseInt(hex, 16))
);

export default binarizeTile;
