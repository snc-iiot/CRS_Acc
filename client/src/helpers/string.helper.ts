/**
 * The function adds a space before each uppercase letter in a string if it is in camel case format.
 * @param {string} str - The `str` parameter is a string that you want to modify by adding a space
 * before each uppercase letter if it is preceded by a lowercase letter.
 * @returns The function `addSpaceIfCamelCase` returns a modified version of the input string `str`
 * with a space inserted before each uppercase letter that is preceded by a lowercase letter.
 * @example
 * const str = "helloWorld";
 * const modifiedStr = addSpaceIfCamelCase(str);
 * console.log(modifiedStr); // hello World
 */
export const addSpaceIfCamelCase = (str: string) => {
  if (str === undefined || str === null) return "";

  if (typeof str !== "string") str = `${str}`;

  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

/**
 * The function replaces underscores with spaces in a given string.
 * @param {string} str - The `str` parameter is a string that represents a word or phrase.
 * @example
 * const str = "hello_world";
 * const modifiedStr = replaceUnderscoreIfSnakeCase(str);
 * console.log(modifiedStr); // hello world
 */
export const replaceUnderscoreIfSnakeCase = (str: string) =>
  str.replace(/_/g, " ");

/**
 * The function `capitalizeFirstLetter` takes a string as input and returns the same string with the
 * first letter capitalized.
 * @param {string} str - The `str` parameter is a string that you want to capitalize the first letter
 * of.
 * @example
 * const str = "hello world";
 * const modifiedStr = capitalizeFirstLetter(str);
 * console.log(modifiedStr); // Hello world
 */
export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * The `truncateText` function takes a string and a length as input and returns a truncated version of
 * the string if it exceeds the specified length, appending "..." at the end.
 * @param {string} str - The `str` parameter is a string that you want to truncate if it exceeds a
 * certain length.
 * @param {number} length - The `length` parameter in the `truncateText` function is the maximum number
 * of characters that the `str` string should be truncated to.
 * @returns The function `truncateText` returns a truncated version of the input string `str` if its
 * length is greater than the specified `length` parameter. If the length of `str` is less than or
 * equal to `length`, the function returns the original string `str`.
 * @example
 * const str = "hello world";
 * const truncatedStr = truncateText(str, 5);
 * console.log(truncatedStr); // hello...
 */
export const truncateText = (str: string, length: number) => {
  if (!str || str === "") return "";

  return str.length > length ? `${str.substring(0, length)}...` : str;
};

/**
 * The `createSimilarString` function takes a string as input and returns a shuffled version of that
 * string.
 * @param {string} str - The `str` parameter is a string that you want to create a similar string from.
 * @returns The function `createSimilarString` returns a shuffled version of the input string.
 */
export const createSimilarString = (str: string) => {
  const shuffled = str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return shuffled;
};

/**
 * The function generates a random color based on a given string.
 * @param {string} string - The `string` parameter is a string value that is used to generate a random
 * color. It can be any string value, such as a word, a sentence, or a combination of characters.
 * @returns The function `generateRandomColor` returns a string representing a random color in HSL
 * format.
 */
export const generateRandomColor = (string: string): string => {
  if (!string) return "rgb(var(--color-primary-100))";

  string = `${string}`;

  const uniqueId = string.length.toString() + string; // Unique identifier based on string length
  const combinedString = uniqueId + string;

  const hash = Array.from(combinedString).reduce((acc, char) => {
    const charCode = char.charCodeAt(0);
    return (acc << 5) - acc + charCode;
  }, 0);
  const hue = hash % 360;
  const saturation = 70; // Higher saturation for pastel colors
  const lightness = 60; // Mid-range lightness for pastel colors
  const randomColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return randomColor;
};

/**
 * The function `getFirstCharacters` takes a string as input and returns the first character of each
 * word in the string, or the first character of the first two words if there are more than one word.
 * @param {string} str - The `str` parameter is a string that represents a sentence or a phrase.
 * @returns The function `getFirstCharacters` returns the first character of the first word in the
 * given string if the string contains only one word. If the string contains more than one word, it
 * returns the first character of the first word concatenated with the first character of the second
 * word.
 */
export const getFirstCharacters = (str: string) => {
  const words = str.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0);
  } else {
    return words[0].charAt(0) + words[1].charAt(0);
  }
};

/**
 * @description: This function will remove all the HTML tags from the string
 * @param {string} html
 * @return {string}
 * @example:
 * const html = "<p>Some text</p>";
 * const text = stripHTML(html);
 * console.log(text); // Some text
 */
export const stripHTML = (html: string) => {
  const strippedText = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ""); // Remove script tags
  return strippedText.replace(/<[^>]*>/g, ""); // Remove all other HTML tags
};

/**
 *
 * @example:
 * const html = "<p>Some text</p>";
 * const text = stripAndTruncateHTML(html);
 * console.log(text); // Some text
 */
export const stripAndTruncateHTML = (html: string, length: number = 55) =>
  truncateText(stripHTML(html), length);

/**
 * @description: This function return number count in string if number is more than 100 then it will return 99+
 * @param {number} number
 * @return {string}
 * @example:
 * const number = 100;
 * const text = getNumberCount(number);
 * console.log(text); // 99+
 */
export const getNumberCount = (number: number): string => {
  if (number > 99) {
    return "99+";
  }
  return number.toString();
};

/**
 * The function `objToQueryParams` converts an object into a string of query parameters.
 * @param {any} obj - The `obj` parameter is an object that contains key-value pairs.
 * @returns The function `objToQueryParams` returns a string representation of the query parameters
 * generated from the input object.
 */
export const objToQueryParams = (obj: any) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null)
      params.append(key, value as string);
  }
  return params.toString();
};

/**
 * @returns {boolean} true if searchQuery is substring of text in the same order, false otherwise
 * @description Returns true if searchQuery is substring of text in the same order, false otherwise
 * @param {string} text string to compare from
 * @param {string} searchQuery
 * @example substringMatch("hello world", "hlo") => true
 * @example substringMatch("hello world", "hoe") => false
 */
export const substringMatch = (text: string, searchQuery: string): boolean => {
  try {
    let searchIndex = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i].toLowerCase() === searchQuery[searchIndex]?.toLowerCase())
        searchIndex++;
      // All characters of searchQuery found in order
      if (searchIndex === searchQuery.length) return true;
    }
    // Not all characters of searchQuery found in order
    return false;
  } catch (error) {
    return false;
  }
};

/**
 * The `toCamelCase` function converts a string to camel case by removing spaces, hyphens, and
 * underscores, and capitalizing the first letter of each word except the first one.
 * @param {string} string - The `string` parameter is a string value that you want to convert to camel
 * case.
 */
export const toCamelCase = (string: string) =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (_, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  );

/**
 * The `toKebabCase` function converts a string from camel case to kebab case.
 * @param {string} string - The `string` parameter is a string value that you want to convert to kebab
 * case.
 */
export const toKebabCase = (string: string) =>
  string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/**
 * The function converts a string to PascalCase by first converting it to camelCase and then
 * capitalizing the first letter.
 * @param {string} string - The `string` parameter is a string value that you want to convert to
 * PascalCase.
 * @returns a string in PascalCase.
 */
export const toPascalCase = (string: string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
