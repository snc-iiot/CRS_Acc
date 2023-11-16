import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select-custom";
import { Textarea } from "@/components/ui/textarea";
import { ICompanyForm, TRegistrationForm } from "@/types";
import { ChangeEvent } from "react";

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
    id: "relationship-info",
    title: "ความสัมพันธ์กับบริษัท / Relationship with Company",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
  {
    id: "standard-certification-info",
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

export const ConditionalInput = (
  item: ICompanyForm,
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void,
  value: TRegistrationForm,
) => {
  switch (item?.type) {
    case "select": {
      return (
        <div className="w-full">
          <Select
            name={item?.name}
            id={item?.name}
            placeholder={item?.placeholder}
            className="text-sm"
            required={item?.required}
            onChange={(e) => handleOnChange(e)}
            value={
              value?.[item?.name as keyof TRegistrationForm] as
                | string
                | undefined
            }
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
          type="text"
          name={item?.name}
          id={item?.name}
          placeholder={item?.placeholder}
          className="text-sm"
          required={item?.required}
          onChange={(e) => handleOnChange(e)}
          value={
            value?.[item?.name as keyof TRegistrationForm] as string | undefined
          }
        />
      );
    }
    case "tel": {
      return (
        <Input
          name={item?.name}
          id={item?.name}
          type="tel"
          placeholder={item?.placeholder}
          className="text-sm"
          required={item?.required}
          onChange={handleOnChange}
          value={
            value?.[item?.name as keyof TRegistrationForm] as string | undefined
          }
        />
      );
    }
    case "number": {
      return (
        <Input
          name={item?.name}
          id={item?.name}
          type="number"
          placeholder={item?.placeholder}
          className="text-sm"
          required={item?.required}
          onChange={handleOnChange}
          value={
            value?.[item?.name as keyof TRegistrationForm] as string | undefined
          }
        />
      );
    }
    case "url": {
      return (
        <Input
          name={item?.name}
          id={item?.name}
          type="url"
          placeholder={item?.placeholder}
          className="text-sm"
          required={item?.required}
          onChange={handleOnChange}
          value={
            value?.[item?.name as keyof TRegistrationForm] as string | undefined
          }
        />
      );
    }
    case "textarea": {
      return (
        <Textarea
          name={item?.name}
          id={item?.name}
          placeholder={item?.placeholder}
          className="max-h-[100px] text-sm"
          required={item?.required}
          onChange={handleOnChange}
          value={
            value?.[item?.name as keyof TRegistrationForm] as string | undefined
          }
        />
      );
    }
  }
};
