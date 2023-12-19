import { KEY_LOCAL_STORAGE } from "@/helpers/common.helper";
import useLocalStorage from "@/hooks/use-local-storage";
import { TProfile } from "@/types/profile";

export const useProfile = () => {
  const { setValue: setProfile, storedValue: profile } = useLocalStorage(
    KEY_LOCAL_STORAGE.ICRS_ADMIN_LOCAL_STORAGE,
    {
      username: "",
      name: {
        en: "",
        th: "",
      },
      token: "",
    } as TProfile,
  );

  if (!profile) {
    return {
      setProfile,
      profile: {
        username: "",
        name: {
          en: "",
          th: "",
        },
        token: "",
      },
    };
  }

  return {
    setProfile,
    profile,
  };
};
