import { TRegistrationForm } from "@/types";

export const validateRegisterForm = (values: TRegistrationForm) => {
  let isValid: boolean = true;
  let error_th: string = "";
  let error_en: string = "";

  if (values?.regis_id === "") {
    isValid = false;
    error_th = "ฟอร์มการลงทะเบียนไม่ถูกต้อง";
    error_en = "Invalid registration form";
  }
  if (
    values?.standard?.certificate.every((item) => item.is_checked === false)
  ) {
    isValid = false;
    error_th = "กรุณาระบุมาตรฐานการรับรองที่ได้รับ";
    error_en = "Standard certificate";
  } else if (
    values?.standard?.benefit.every((item) => item.is_checked === false)
  ) {
    isValid = false;
    error_th = "กรุณาระบุสิทธิประโยชน์ที่ได้รับ";
    error_en = "Benefit";
  } else if (
    values?.payment_term?.delivery_term.every(
      (item) => item.is_checked === false,
    )
  ) {
    isValid = false;
    error_th = "กรุณาระบุเงื่อนไขการขนส่งสินค้า";
    error_en = "Delivery term";
  }
  return {
    isValid,
    error_th,
    error_en,
  };
};
