import numeral from "numeral";

/* The NumberHelper class provides methods to format numbers, currencies, and percentages. */
export class NumberHelper {
  /**
   * The function "formatNumber" takes a number and a format string as parameters and returns the
   * number formatted according to the specified format.
   * @param {number} number - The number parameter is the number that you want to format. It can be any
   * valid number, such as an integer or a decimal number.
   * @param {string} [format=0,0] - The `format` parameter is a string that specifies how the number
   * should be formatted. It uses a syntax similar to that of the numeral.js library.
   * @returns a string representation of the given number formatted according to the specified format.
   */
  formatNumber(number: number, format: string = "0,0"): string {
    return numeral(number).format(format);
  }

  /**
   * The function "formatCurrency" takes a number and a format string as input and returns the number
   * formatted as a currency string.
   * @param {number} number - The number parameter is the number that you want to format as currency.
   * @param {string} [format=,0.00] - The `format` parameter is a string that specifies the desired
   * format for the currency. It uses placeholders to represent different parts of the currency value.
   * @returns a string representation of the formatted currency value.
   */
  formatCurrency(number: number, format: string = "$0,0.00"): string {
    return numeral(number).format(format);
  }

  /**
   * The function formatPercent takes a number and a format string as parameters and returns the number
   * formatted as a percentage string.
   * @param {number} number - The number parameter is the number that you want to format as a
   * percentage.
   * @param {string} [format=0.00%] - The `format` parameter is a string that specifies how the number
   * should be formatted as a percentage. It uses the syntax of the numeral.js library, which provides
   * a flexible way to format numbers.
   * @returns a string representation of the number formatted as a percentage according to the
   * specified format.
   */
  formatPercent(number: number, format: string = "0.00%"): string {
    return numeral(number).format(format);
  }

  /**
   * The function formatPercentChange takes a number and a format string as parameters and returns the
   * number formatted as a percentage change.
   * @param {number} number - The number parameter is the value for which you want to calculate the
   * percent change.
   * @param {string} [format=+0.00%;-0.00%] - The `format` parameter is a string that specifies how the
   * percent change should be formatted. It uses a syntax similar to the `numeral.js` library's format
   * string syntax.
   * @returns a string representation of the number formatted according to the specified format.
   */
  formatPercentChange(
    number: number,
    format: string = "+0.00%;-0.00%",
  ): string {
    return numeral(number).format(format);
  }

  /**
   * The function formats a number representing a percent change with a sign and a specified format.
   * @param {number} number - The number parameter is the value for which you want to calculate the
   * percent change.
   * @param {string} [format=+0.00%;-0.00%] - The format parameter is a string that specifies how the
   * percent change should be formatted. It uses the numeral.js library's format syntax.
   * @returns a string value.
   */
  formatPercentChangeWithSign(
    number: number,
    format: string = "+0.00%;-0.00%",
  ): string {
    return numeral(number).format(format).replace("%", "% ");
  }

  // getNumber form number add config to fix the issue
  
}


/**
 * The function checks if a given string is numeric.
 * @param {string} str - The parameter `str` is a string that you want to check if it represents a
 * numeric value.
 * @returns a boolean value. It returns true if the input string can be converted to a numeric value,
 * and false otherwise.
 */
export const isNumeric = (str: string) => {
  if (typeof str != "string") return false;
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
};

/**
 * The function `getNumber` takes a number and a configuration value, and returns the number rounded to
 * the specified decimal places if it is numeric, otherwise it returns 0.
 * @param {number} number - The `number` parameter is the number that you want to format.
 * @param {number} config - The `config` parameter is a number that specifies the number of decimal
 * places to round the `number` parameter to.
 * @returns a number. If the input number is numeric, it will return the number rounded to the
 * specified decimal places (config). If the input number is not numeric, it will return 0.
 */
export const getNumber = (number: number, config: number): number => {
  if (isNumeric(number.toString())) {
    return parseFloat(number.toFixed(config));
  }
  return 0;
};

