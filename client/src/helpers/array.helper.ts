export const groupBy = (array: any[], key: string) => {
  const innerKey = key.split("."); // split the key by dot
  return array.reduce((result, currentValue) => {
    const key = innerKey.reduce((obj, i) => obj?.[i], currentValue) ?? "None"; // get the value of the inner key
    (result[key] = result[key] || []).push(currentValue);
    return result;
  }, {});
};

export const orderArrayBy = (
  orgArray: any[],
  key: string,
  ordering: "ascending" | "descending" = "ascending",
) => {
  if (!orgArray || !Array.isArray(orgArray) || orgArray.length === 0) return [];

  const array = [...orgArray];

  if (key[0] === "-") {
    ordering = "descending";
    key = key.slice(1);
  }

  const innerKey = key.split("."); // split the key by dot

  return array.sort((a, b) => {
    const keyA = innerKey.reduce((obj, i) => obj[i], a); // get the value of the inner key
    const keyB = innerKey.reduce((obj, i) => obj[i], b); // get the value of the inner key
    if (keyA < keyB) {
      return ordering === "ascending" ? -1 : 1;
    }
    if (keyA > keyB) {
      return ordering === "ascending" ? 1 : -1;
    }
    return 0;
  });
};

export const checkDuplicates = (array: any[]) =>
  new Set(array).size !== array.length;

export const findStringWithMostCharacters = (strings: string[]): string => {
  if (!strings || strings.length === 0) return "";

  return strings.reduce((longestString, currentString) =>
    currentString.length > longestString.length ? currentString : longestString,
  );
};

export const checkIfArraysHaveSameElements = (
  arr1: any[] | null,
  arr2: any[] | null,
): boolean => {
  if (!arr1 || !arr2) return false;
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  if (arr1.length === 0 && arr2.length === 0) return true;

  return arr1.length === arr2.length && arr1.every((e) => arr2.includes(e));
};

type GroupedItems<T> = { [key: string]: T[] };

/**
 * The `groupByField` function takes an array of objects and a field name, and returns an object where
 * the keys are unique values of the specified field and the values are arrays of objects that have
 * that field value.
 * @param {T[]} array - An array of objects of type T.
 * @param field - The `field` parameter is the key of the object `T` that you want to group the array
 * by. It is used to access the value of that key in each item of the array.
 */
export const groupByField = <T>(array: T[], field: keyof T): GroupedItems<T> =>
  array.reduce((grouped: GroupedItems<T>, item: T) => {
    const key = String(item[field]);
    grouped[key] = (grouped[key] || []).concat(item);
    return grouped;
  }, {});

/**
 * The function `sortByField` takes an array of objects and a field name, and sorts the array based on
 * the values of that field in each object.
 * @param {any[]} array - The "array" parameter is an array of objects that you want to sort. Each
 * object in the array should have a field that you want to sort by.
 * @param {string} field - The "field" parameter is a string that represents the field or property of
 * the objects in the array that you want to sort by.
 */
export const sortByField = (array: any[], field: string): any[] =>
  array.sort((a, b) =>
    a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0,
  );

/**
 * The function `orderGroupedDataByField` takes in grouped data and an order by field, and returns the
 * grouped data sorted by the specified field.
 * @param groupedData - The `groupedData` parameter is an object that represents grouped items. Each
 * key in the object represents a group, and the value associated with each key is an array of items
 * belonging to that group.
 * @param orderBy - The `orderBy` parameter is the field by which you want to order the grouped data.
 * It should be a key of the objects in the grouped data.
 * @returns the `groupedData` object after sorting each group by the specified `orderBy` field.
 */
export const orderGroupedDataByField = <T>(
  groupedData: GroupedItems<T>,
  orderBy: keyof T,
): GroupedItems<T> => {
  for (const key in groupedData) {
    // eslint-disable-next-line no-prototype-builtins
    if (groupedData.hasOwnProperty(key)) {
      groupedData[key] = groupedData[key].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return -1;
        if (a[orderBy] > b[orderBy]) return 1;
        return 0;
      });
    }
  }
  return groupedData;
};

/**
 * The `buildTree` function takes an array of objects with a `parent` property and recursively builds a
 * tree structure based on the parent-child relationships.
 * @param {any[]} array - The `array` parameter is an array of objects. Each object represents a node
 * in the tree and has properties such as `id` and `parent`. The `id` property uniquely identifies the
 * node, and the `parent` property specifies the parent node's `id`.
 * @param [parent=null] - The `parent` parameter is used to specify the parent node of the current item
 * in the array. It is initially set to `null` when the function is called.
 * @returns The function `buildTree` returns an array of objects representing a tree structure.
 */
export const buildTree = (array: any[], parent = null) => {
  const tree: any[] = [];

  array.forEach((item: any) => {
    if (item.parent === parent) {
      const children = buildTree(array, item.id);
      item.children = children;
      tree.push(item);
    }
  });

  return tree;
};
