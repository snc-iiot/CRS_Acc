import { useAtom } from "jotai";
import { registrationAtom } from "./atom";

export const useAtomStore = () => {
  const [registration, setRegistration] = useAtom(registrationAtom);

  return {
    registration,
    setRegistration,
  };
};
