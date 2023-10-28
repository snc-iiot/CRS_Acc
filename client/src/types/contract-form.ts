// export type IContractForm = {
//   name: string;
//   label: string;
//   type:
//     | "text"
//     | "select"
//     | "number"
//     | "email"
//     | "password"
//     | "textarea"
//     | "tel"
//     | "date"
//     | "time"
//     | "url";
//   placeholder: string;
//   options?: { value: string; label: string }[];
//   required: boolean;
// };

export type IContractForm = {
  id: string;
  group: string;
  fields: {
    name: string;
    label: string;
    type:
      | "text"
      | "select"
      | "number"
      | "email"
      | "password"
      | "textarea"
      | "tel"
      | "date"
      | "time"
      | "url";
    placeholder: string;
    required: boolean;
  }[];
};
