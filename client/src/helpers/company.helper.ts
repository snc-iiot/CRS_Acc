import BusinessTypeList from "@/mock/business-type-list.json";
import CountryList from "@/mock/country-list.json";
import { ICompanyForm } from "@/types";

export const CompanyInfo: ICompanyForm[] = [
  {
    name: "company_admin",
    label: "ขึ้นทะเบียนกับบริษัท",
    type: "select",
    placeholder: "เลือกบริษัท",
    options: [],
    required: true,
  },
  {
    name: "company_name",
    label: "ชื่อบริษัท",
    type: "text",
    placeholder: "กรอกชื่อบริษัท",
    required: true,
  },
  {
    name: "address",
    label: "เลขที่",
    type: "textarea",
    placeholder: "กรอกเลขที่",
    required: true,
  },
  {
    name: "country",
    label: "ประเทศ",
    type: "select",
    placeholder: "กรอกประเทศ",
    options: CountryList?.map((country) => ({
      value: country?.alpha2,
      label: country?.country,
    })),
    required: true,
  },
  {
    name: "province",
    label: "จังหวัด",
    type: "select",
    placeholder: "กรอกจังหวัด",
    options: [
      { value: "1", label: "จังหวัด 1" },
      { value: "2", label: "จังหวัด 2" },
    ],
    required: true,
  },
  {
    name: "district",
    label: "อำเภอ/เขต",
    type: "select",
    placeholder: "กรอกอำเภอ/เขต",
    options: [
      { value: "1", label: "อำเภอ 1" },
      { value: "2", label: "อำเภอ 2" },
    ],
    required: true,
  },
  {
    name: "sub_district",
    label: "ตำบล/แขวง",
    type: "select",
    placeholder: "กรอกตำบล/แขวง",
    options: [
      { value: "1", label: "ตำบล 1" },
      { value: "2", label: "ตำบล 2" },
    ],
    required: true,
  },
  {
    name: "zip_code",
    label: "รหัสไปรษณีย์",
    type: "number",
    placeholder: "กรอกรหัสไปรษณีย์",
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
    name: "juristic_id",
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
    name: "nature_of_business",
    label: "ประเภทกิจการตามใบอนุญาตประกอบการ",
    type: "select",
    placeholder: "ประเภทกิจการตามใบอนุญาตประกอบการ",
    required: true,
    options: BusinessTypeList?.map((business) => ({
      value: business?.business_id,
      label: business?.business_type,
    })),
  },
];
