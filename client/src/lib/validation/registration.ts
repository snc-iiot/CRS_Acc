import * as z from "zod";

export const registrationSchema = z.object({
  CompanyAdmin: z
    .string()
    .min(2, { message: "กรุณาเลือกบริษัทที่ท่านต้องการขึ้นทะเบียน" }),
  CompanyName: z.string().min(2, { message: "กรุณาระบุชื่อบริษัทของท่าน" }),
  Address: z.string().min(2, { message: "กรุณาระบุที่อยู่ของท่าน" }),
  Country: z.string().min(2, { message: "กรุณาระบุประเทศของท่าน" }),
  Province: z.string().min(2, { message: "กรุณาระบุจังหวัดของท่าน" }),
  District: z.string().min(2, { message: "กรุณาระบุอำเภอของท่าน" }),
  SubDistrict: z.string().min(2, { message: "กรุณาระบุตำบลของท่าน" }),
  ZipCode: z.string().min(2, { message: "กรุณาระบุรหัสไปรษณีย์ของท่าน" }),
  PhoneNumber: z.string().min(2, { message: "กรุณาระบุเบอร์โทรศัพท์ของท่าน" }),
  JuristicId: z
    .string()
    .min(2, { message: "กรุณาระบุเลขประจำตัวผู้เสียภาษีของท่าน" }),
  Website: z.string().min(2, { message: "กรุณาระบุเว็บไซต์ของท่าน" }),
  NatureOfBusiness: z
    .string()
    .min(2, { message: "กรุณาระบุลักษณะธุรกิจของท่าน" }),
});
