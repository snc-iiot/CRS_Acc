import { TypeWithKey } from "@/types";

export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: "Network error",
  };

  return codeMatcher[errorCode];
};
