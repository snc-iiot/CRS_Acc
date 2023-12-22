import { KEY_LOCAL_STORAGE } from "@/helpers/common.helper";
import useLocalStorage from "@/hooks/use-local-storage";
import { TProfile } from "@/types/profile";

export const useProfile = () => {
  const {
    setValue: setProfile,
    storedValue: profile,
    clearValue: clearProfile,
  } = useLocalStorage(KEY_LOCAL_STORAGE.ICRS_ADMIN_LOCAL_STORAGE, {
    username: "",
    name: {
      en: "",
      th: "",
    },
    token: "",
    role: "",
  } as TProfile);

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
        role: "",
      },
      clearProfile,
    };
  }

  return {
    setProfile,
    profile,
    clearProfile,
  };
};
