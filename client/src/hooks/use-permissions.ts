import { PERMISSION, ROLES, TPermission } from "@/helpers/permission.helper";
import { useProfile } from "@/services/hooks/use-profile";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

/**
 * The `usePermissions` function retrieves the user's permissions based on their role stored in a JWT
 * token.
 * @returns The `usePermissions` hook returns an object with a `permissions` property.
 */
const usePermissions = () => {
  const { profile } = useProfile();
  const token = profile?.token || "";
  const [permissions, setPermissions] = useState<TPermission>({
    CUSTOMERS_REGISTRATION: {
      CREATE: false,
      READ: false,
      UPDATE: false,
      DELETE: false,
    },
    DBD_SERVICES: {
      UPLOAD_EXCEL: false,
      DOWNLOAD_EXCEL: false,
      SYNC_DATA: false,
    },
  });

  useEffect(() => {
    const decodedToken = jwtDecode(token) as any;
    const role = decodedToken?.role;
    const newRole = role?.toUpperCase() as ROLES;
    if (newRole && PERMISSION[newRole as ROLES]) {
      setPermissions(PERMISSION[role.toUpperCase() as ROLES]);
    } else {
      setPermissions({
        CUSTOMERS_REGISTRATION: {
          CREATE: false,
          READ: false,
          UPDATE: false,
          DELETE: false,
        },
        DBD_SERVICES: {
          UPLOAD_EXCEL: false,
          DOWNLOAD_EXCEL: false,
          SYNC_DATA: false,
        },
      });
    }
  }, [token]);

  return {
    permissions,
  };
};

export default usePermissions;
