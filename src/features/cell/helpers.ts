export function getValueColor(value: number) {
  switch (value) {
    case 1:
      return "success.main";
    case 2:
      return "secondary.main";
    case 3:
      return "error.main";
    default:
      return "black";
  }
}
