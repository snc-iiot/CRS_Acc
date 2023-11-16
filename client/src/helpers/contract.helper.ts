import { IContractForm } from "@/types";

export const ContractInfo: IContractForm[] = [
  {
    id: "manager_scm",
    group: "ผู้จัดการแผนกฝ่ายจัดซื้อ",
    fields: [
      {
        name: "name",
        label: "ชื่อนามสกุล",
        type: "text",
        placeholder: "กรอกชื่อนามสกุล",
        required: true,
      },
      {
        name: "phone_number",
        label: "เบอร์โทรศัพท์",
        type: "tel",
        placeholder: "กรอกเบอร์โทรศัพท์",
        required: true,
      },
      {
        name: "email",
        label: "อีเมล",
        type: "email",
        placeholder: "กรอกอีเมล",
        required: true,
      },
    ],
  },
  {
    id: "manager_accounting",
    group: "ผู้จัดการแผนกบัญชีและการเงิน",
    fields: [
      {
        name: "name",
        label: "ชื่อนามสกุล",
        type: "text",
        placeholder: "กรอกชื่อนามสกุล",
        required: true,
      },
      {
        name: "tel",
        label: "เบอร์โทรศัพท์",
        type: "tel",
        placeholder: "กรอกเบอร์โทรศัพท์",
        required: true,
      },
      {
        name: "email",
        label: "อีเมล",
        type: "email",
        placeholder: "กรอกอีเมล",
        required: true,
      },
    ],
  },
  {
    id: "manager_director",
    group: "กรรมการผู้จัดการ",
    fields: [
      {
        name: "name",
        label: "ชื่อนามสกุล",
        type: "text",
        placeholder: "กรอกชื่อนามสกุล",
        required: true,
      },
      {
        name: "tel",
        label: "เบอร์โทรศัพท์",
        type: "tel",
        placeholder: "กรอกเบอร์โทรศัพท์",
        required: true,
      },
      {
        name: "email",
        label: "อีเมล",
        type: "email",
        placeholder: "กรอกอีเมล",
        required: true,
      },
    ],
  },
];
