export type ICompanyForm = {
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
  options?: { value: string; label: string }[];
  required: boolean;
};

// export interface ICompanyForm {
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
// }
