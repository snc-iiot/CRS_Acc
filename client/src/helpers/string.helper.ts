export const addSpaceIfCamelCase = (str: string) => {
  if (str === undefined || str === null) return "";

  if (typeof str !== "string") str = `${str}`;

  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const replaceUnderscoreIfSnakeCase = (str: string) =>
  str.replace(/_/g, " ");

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const truncateText = (str: string, length: number) => {
  if (!str || str === "") return "";

  return str.length > length ? `${str.substring(0, length)}...` : str;
};

export const createSimilarString = (str: string) => {
  const shuffled = str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return shuffled;
};

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

export const toCamelCase = (string: string) =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (_, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  );

export const toKebabCase = (string: string) =>
  string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

export const toPascalCase = (string: string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
