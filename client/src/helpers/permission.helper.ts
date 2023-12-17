export enum ROLES {
  MD = "MD",
  MINI_MD = "MINI_MD",
  MG_ACC = "MG_ACC",
  ACC = "ACC",
  APPROVER = "APPROVER",
  USER = "USER",
  ADMIN = "ADMIN",
}

export type TPermission = {
  CUSTOMERS_REGISTRATION: {
    CREATE: boolean;
    READ: boolean;
    UPDATE: boolean;
    DELETE: boolean;
  };
  DBD_SERVICES: {
    UPLOAD_EXCEL: boolean;
    DOWNLOAD_EXCEL: boolean;
    SYNC_DATA: boolean;
  };
};

export type Permissions = {
  [key in ROLES]: TPermission;
};

export const PERMISSION: Permissions = {
  ADMIN: {
    CUSTOMERS_REGISTRATION: {
      CREATE: true,
      READ: true,
      UPDATE: true,
      DELETE: true,
    },
    DBD_SERVICES: {
      UPLOAD_EXCEL: true,
      DOWNLOAD_EXCEL: true,
      SYNC_DATA: true,
    },
  },
  MD: {
    CUSTOMERS_REGISTRATION: {
      CREATE: true,
      READ: true,
      UPDATE: true,
      DELETE: true,
    },
    DBD_SERVICES: {
      UPLOAD_EXCEL: true,
      DOWNLOAD_EXCEL: true,
      SYNC_DATA: true,
    },
  },
  MINI_MD: {
    CUSTOMERS_REGISTRATION: {
      CREATE: true,
      READ: true,
      UPDATE: true,
      DELETE: true,
    },
    DBD_SERVICES: {
      UPLOAD_EXCEL: true,
      DOWNLOAD_EXCEL: true,
      SYNC_DATA: true,
    },
  },
  MG_ACC: {
    CUSTOMERS_REGISTRATION: {
      CREATE: false,
      READ: true,
      UPDATE: false,
      DELETE: false,
    },
    DBD_SERVICES: {
      UPLOAD_EXCEL: true,
      DOWNLOAD_EXCEL: true,
      SYNC_DATA: true,
    },
  },
  ACC: {
    CUSTOMERS_REGISTRATION: {
      CREATE: false,
      READ: true,
      UPDATE: false,
      DELETE: false,
    },
    DBD_SERVICES: {
      UPLOAD_EXCEL: true,
      DOWNLOAD_EXCEL: true,
      SYNC_DATA: true,
    },
  },
  APPROVER: {
    CUSTOMERS_REGISTRATION: {
      CREATE: false,
      READ: true,
      UPDATE: false,
      DELETE: false,
    },
    DBD_SERVICES: {
      UPLOAD_EXCEL: true,
      DOWNLOAD_EXCEL: true,
      SYNC_DATA: true,
    },
  },
  USER: {
    CUSTOMERS_REGISTRATION: {
      CREATE: false,
      READ: true,
      UPDATE: false,
      DELETE: false,
    },
    DBD_SERVICES: {
      UPLOAD_EXCEL: true,
      DOWNLOAD_EXCEL: true,
      SYNC_DATA: true,
    },
  },
};
