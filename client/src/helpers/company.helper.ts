import CompanyList from "@/mocks/company-list.json";
import CountryList from "@/mocks/country-list-th.json";
import { ICompanyForm, TCompanyList } from "@/types";

export const CompanyInfo: ICompanyForm[] = [
  {
    name: "CompanyAdmin",
    label: "ขึ้นทะเบียนกับบริษัท",
    type: "select",
    placeholder: "เลือกบริษัท",
    options: CompanyList?.map((company: TCompanyList) => ({
      value: company?.Company,
      label: `[${company?.Company}] ${company?.CompanyFullNameEN} `,
    })),
    required: true,
  },
  // {
  //   name: "to",
  //   label: "เรียน",
  //   type: "text",
  //   placeholder: "กรอกชื่อผู้รับ",
  //   required: true,
  // },
  {
    name: "CompanyName",
    label: "ชื่อบริษัท",
    type: "text",
    placeholder: "กรอกชื่อบริษัท",
    required: true,
  },
  {
    name: "Address",
    label: "ที่อยู่",
    type: "textarea",
    placeholder: "กรอกที่อยู่",
    required: true,
  },
  {
    name: "Country",
    label: "ประเทศ",
    type: "select",
    placeholder: "กรอกประเทศ",
    options: CountryList?.map((country) => ({
      value: country?.enName,
      label: country?.name,
    })),
    required: true,
  },
  {
    name: "Province",
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
    name: "District",
    label: "อำเภอ",
    type: "select",
    placeholder: "กรอกอำเภอ",
    options: [
      { value: "1", label: "อำเภอ 1" },
      { value: "2", label: "อำเภอ 2" },
    ],
    required: true,
  },
  {
    name: "SubDistrict",
    label: "ตำบล",
    type: "select",
    placeholder: "กรอกตำบล",
    options: [
      { value: "1", label: "ตำบล 1" },
      { value: "2", label: "ตำบล 2" },
    ],
    required: true,
  },
  {
    name: "ZipCode",
    label: "รหัสไปรษณีย์",
    type: "number",
    placeholder: "กรอกรหัสไปรษณีย์",
    required: true,
  },
  {
    name: "PhoneNumber",
    label: "เบอร์โทรศัพท์",
    type: "tel",
    placeholder: "กรอกเบอร์โทรศัพท์",
    required: true,
  },
  {
    name: "JuristicId",
    label: "เลขประจำตัวผู้เสียภาษี",
    type: "number",
    placeholder: "กรอกเลขประจำตัวผู้เสียภาษี",
    required: true,
  },
  {
    name: "Website",
    label: "เว็บไซต์",
    type: "url",
    placeholder: "กรอกเว็บไซต์",
    required: true,
  },
  {
    name: "NatureOfBusiness",
    label: "ประเภทธุรกิจ",
    type: "text",
    placeholder: "กรอกประเภทธุรกิจ",
    required: true,
  },
];
