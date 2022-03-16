const removeFrame = (_, tileIndex) => {

  if (tileIndex < 40) {
    return false;
  }

  if (tileIndex >= 320) {
    return false;
  }

  switch (tileIndex % 20) {
    case 0:
    case 1:
    case 18:
    case 19:
      return false;
    default:
      return true;
  }
};

export default removeFrame;
