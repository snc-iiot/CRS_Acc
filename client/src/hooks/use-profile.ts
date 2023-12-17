import { KEY_LOCAL_STORAGE } from "@/helpers/common.helper";
import useLocalStorage from "./use-local-storage";

interface IProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  token: string;
}

export const useProfile = () => {
  const { storedValue: profile, setValue: setProfile } = useLocalStorage(
    KEY_LOCAL_STORAGE?.ICRS_LOCAL_STORAGE,
    {
      id: 0,
      username: "",
      email: "",
      role: "",
      token:
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMjgwOTAyMSwiaWF0IjoxNzAyODA5MDIxfQ.Zj9j_2PwVImPBC-fu75ZdjMY9t7HNV88dbCw9cwoPVI",
    } as IProfile,
  );

  return {
    profile,
    setProfile,
  };
};
