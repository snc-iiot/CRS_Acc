import { ICompanyForm } from "@/types";

export const CompanyInfo: ICompanyForm[] = [
  {
    name: "company-register",
    label: "ขึ้นทะเบียนกับบริษัท",
    type: "select",
    placeholder: "เลือกบริษัท",
    options: [
      { value: "1", label: "บริษัท 1" },
      { value: "2", label: "บริษัท 2" },
    ],
    required: true,
  },
  {
    name: "to",
    label: "เรียน",
    type: "text",
    placeholder: "กรอกชื่อผู้รับ",
    required: true,
  },
  {
    name: "company-name",
    label: "ชื่อบริษัท",
    type: "text",
    placeholder: "กรอกชื่อบริษัท",
    required: true,
  },
  {
    name: "address",
    label: "ที่อยู่",
    type: "textarea",
    placeholder: "กรอกที่อยู่",
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
    name: "tax-id",
    label: "เลขประจำตัวผู้เสียภาษี",
    type: "number",
    placeholder: "กรอกเลขประจำตัวผู้เสียภาษี",
    required: true,
  },
  {
    name: "website",
    label: "เว็บไซต์",
    type: "url",
    placeholder: "กรอกเว็บไซต์",
    required: true,
  },
  {
    name: "business-type",
    label: "ประเภทธุรกิจ",
    type: "select",
    placeholder: "กรอกประเภทธุรกิจ",
    options: [
      { value: "1", label: "ประเภทธุรกิจ 1" },
      { value: "2", label: "ประเภทธุรกิจ 2" },
    ],
    required: true,
  },
];