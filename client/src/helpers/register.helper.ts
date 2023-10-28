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
    id: "upload-documents",
    title: "เอกสารอัพโหลด / Upload Documents",
    description: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },
];
