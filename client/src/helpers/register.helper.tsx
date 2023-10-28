import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select-custom";
import { ICompanyForm, IContractForm } from "@/types";

export const HeaderConditions: {
  [key in "register" | "login"]: {
    title: string;
    description: string;
  };
} = {
  register: {
    title: "ลงทะเบียนผู้ซื้อ",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  login: {
    title: "เข้าสู่ระบบ",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
};

export const Sections: {
  id: string;
  title: string;
  description: string;
}[] = [
  {
    id: "company-info",
    title: "ข้อมูลบริษัท / Company Information",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "shareholder-info",
    title: "สัดส่วนผู้ถือหุ้น / Shareholder Proportion",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "contract-info",
    title: "บุคคลติดต่อ / Contact Person",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "standard-certification",
    title:
      "มาตรฐานและการรับรองที่ได้รับในปัจจุบัน / Standards and Certifications",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "upload-documents",
    title: "เอกสารอัพโหลด / Upload Documents",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
];

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
    type: "text",
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

export const ConditionalInput = (item: ICompanyForm) => {
  switch (item?.type) {
    case "select": {
      return (
        <div className="w-full">
          <Select
            id={item?.name}
            placeholder={item?.placeholder}
            className="text-sm"
          >
            {item?.options?.map((option, index) => (
              <option value={option?.value} key={index}>
                {option?.label}
              </option>
            ))}
          </Select>
        </div>
      );
    }
    case "text": {
      return (
        <Input
          id={item?.name}
          placeholder={item?.placeholder}
          className="text-sm"
        />
      );
    }
    case "tel": {
      return (
        <Input
          id={item?.name}
          type="tel"
          placeholder={item?.placeholder}
          className="text-sm"
        />
      );
    }
    case "number": {
      return (
        <Input
          id={item?.name}
          type="number"
          placeholder={item?.placeholder}
          className="text-sm"
        />
      );
    }
    case "url": {
      return (
        <Input
          id={item?.name}
          type="url"
          placeholder={item?.placeholder}
          className="text-sm"
        />
      );
    }
  }
};

export const ContractInfo: IContractForm[] = [
  {
    id: "manager-scm",
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
    id: "manager-finance",
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
    id: "manager-legal",
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
