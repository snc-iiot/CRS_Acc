/**
 * The function `DisableTab` checks if a given status is included in a specific condition based on the
 * provided action.
 * @param {"R1" | "R2" | "R3" | "R4" | "R5"} action - The `action` parameter is a string that
 * represents the action being performed. It can have one of the following values: "R1", "R2", "R3",
 * "R4", or "R5".
 * @param {number} status - The `status` parameter is a number that represents the current status of
 * something.
 * @returns a boolean value indicating whether the given `status` is included in the array associated
 * with the given `action` in the `condition` object.
 * @status `status` parameter can have one of the following values: 1, 2, 3, 4, 5, 6, 7, or 8.
 * @status_description
 * - 0: รออัพโหลดเอกสาร
 * - 1: รอตรวจสอบข้อมูล
 * - 2: รอยืนยันข้อมูลทางการเงิน
 * - 3: รอการแก้ไข
 * - 4: รอพิจารณาอนุมัติ
 * - 5: ระงับชั่วคราว
 * - 6: อนุมัติ (รอกรอกขรหัสลูกค่้า)
 * - 7: ไม่อนุมัติ
 * - 8: ดำเนินการเสร็จสิ้น
 */
export const DisableTabs = (action: "R1" | "R2" | "R3" | "R4" | "R5", status: number) => {
  const condition = {
    R1: [1, 2, 3, 4, 5, 6, 7, 8],
    R2: [2, 3, 4, 5, 6, 7, 8],
    R3: [4, 5, 6, 7, 8],
    R4: [4, 5, 6, 7, 8],
    R5: [4, 7, 8],
  };
  return condition[action].includes(status);
};

/**
 * The function `PermissionSubAction` takes a `status` parameter and returns an array of sub-actions
 * based on the status.
 * @param {number} status - The `status` parameter is a number that represents the status of a
 * permission sub-action.
 * @returns an array of strings based on the input status. The array contains the corresponding
 * permission sub-action(s) for the given status. If the status is not found in the condition object,
 * an empty array is returned.
 */
export const PermissionSubAction = (status: number, role: string) => {
  if (role && role == "admin") {
    const condition = {
      1: [""],
      2: ["R2"],
      3: [""],
      4: [""],
      5: [""],
      6: [""],
      7: [""],
      8: [""],
      9: [""],
    };
    return condition[status as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9] || [];
  } else if (role && role == "approver") {
    const condition = {
      1: [""],
      2: [""],
      3: [""],
      4: [""],
      5: [""],
      6: [""],
      7: [""],
      8: [""],
      9: [""],
    };
    return condition[status as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9] || [];
  } else if (role && role == "user") {
    const condition = {
      1: [""],
      2: ["R2"],
      3: [""],
      4: [""],
      5: [""],
      6: [""],
      7: [""],
      8: [""],
      9: [""],
    };
    return condition[status as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9] || [];
  } else if (role && role == "sap-code") {
    const condition = {
      1: [""],
      2: [""],
      3: [""],
      4: [""],
      5: [""],
      6: [""],
      7: [""],
      8: [""],
      9: [""],
    };
    return condition[status as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9] || [];
  } else {
    const condition = {
      1: [""],
      2: [""],
      3: [""],
      4: [""],
      5: [""],
      6: [""],
      7: [""],
      8: [""],
      9: [""],
    };
    return condition[status as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9] || [];
  }
};

/**
 * The function `ConditionHeight` returns a CSS class based on the value of the `status` parameter.
 * @param {number} status - The `status` parameter is a number that represents a certain condition or
 * state.
 * @returns a string value. If the `status` parameter is equal to 1, 2, or 3, it returns the string
 * "h-[calc(100%-0.5rem)]". Otherwise, it returns the string "h-[calc(73%-0.5rem)]".
 */
export const ConditionHeight = (status: number) => {
  if (status === 0 || status === 1) {
    return "h-[calc(100%-0.5rem)]";
  }
  return "h-[calc(73%-0.5rem)]";
};

/**
 * The function returns "R4" if the status is greater than or equal to 4 and the role is "approver",
 * otherwise it returns "R1".
 * @param {number} status - The `status` parameter represents the status of a user. It is expected to
 * be a number.
 * @param {string} role - The role parameter is a string that represents the user's role.
 * @returns either "R4" or "R1" based on the conditions specified in the if statement. If the status is
 * greater than or equal to 4 and the role is "approver", then "R4" is returned. Otherwise, "R1" is
 * returned.
 */
export const InitialTabs = (status: number) => {
  if (status >= 4) {
    return "R4";
  }
  return "R1";
};
