import { IContactForm } from "@/types";

// - ฝ่ายจัดซื้อ (SCM Officer)
// - ผู้จัดการฝ่ายจัดซื้อ (SCM Department Manager)
// - ฝ่ายบัญชีและการเงิน (Accounting & Financial officer)
// - ผู้จัดการฝ่ายบัญชีและการเงิน (Accounting & Financial Department Manager)
// - กรรมการผู้จัดการ (Managing Director)

export const ContactInfo: IContactForm[] = [
  {
    id: "scm_officer",
    group: "ฝ่ายจัดซื้อ",
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
        pattern: "^[0-9]{10}$",
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
    id: "scm_department_manager",
    group: "ผู้จัดการฝ่ายจัดซื้อ",
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
        pattern: "^[0-9]{10}$",
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
    id: "accounting_officer",
    group: "ฝ่ายบัญชีและการเงิน",
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
        pattern: "^[0-9]{10}$",
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
    id: "accounting_department_manager",
    group: "ผู้จัดการฝ่ายบัญชีและการเงิน",
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
        pattern: "^[0-9]{10}$",
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
    id: "managing_director",
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
        pattern: "^[0-9]{10}$",
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
