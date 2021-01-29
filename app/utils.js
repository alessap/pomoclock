export function get2digits(number) {
    if (number.toString().length == 1) {
      number = "0" + number.toString();
    }
    return number.toString();
  }