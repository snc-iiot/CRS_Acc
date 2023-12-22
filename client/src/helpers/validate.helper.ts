import {
  TDocByRegisId,
  TGeneralAssessmentForm,
  TRegistrationForm,
} from "@/types";

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

// export const v

export const validateGeneralAssessmentForm = (
  values: TGeneralAssessmentForm,
  doc: TDocByRegisId,
) => {
  let isValid: boolean = true;
  let error_th: string = "";
  let error_en: string = "";

  if (values?.regis_id === "") {
    isValid = false;
    error_th = "ฟอร์มการประเมินไม่ถูกต้อง";
    error_en = "Invalid assessment form";
  } else if (values.products === "") {
    isValid = false;
    error_th = "กรุณาระบุสินค้าที่ผลิต";
    error_en = "Product";
  } else if (values.orders === 0) {
    isValid = false;
    error_th = "กรุณาระบุ ออเดอร์ ต่อ/ปี";
    error_en = "Order per year";
  } else if (values?.quantity_per_year === 0) {
    isValid = false;
    error_th = "กรุณาระบุ จำนวนที่ผลิต ต่อ/ปี";
    error_en = "Quantity per year";
  } else if (values?.lead_time === null) {
    isValid = false;
    error_th = "กรุณาระบุ Lead time การสั่งซื้อ";
    error_en = "Lead time";
  } else if (values?.price_conditions?.peroid === "") {
    isValid = false;
    error_th = "กรุณาระบุ เงื่อนไขการปรับราคา";
    error_en = "Price conditions";
  } else if (
    values.machine_produce.every((item) => item.is_checked === false)
  ) {
    isValid = false;
    error_th = "กรุณาระบุ เครื่องจักรที่ใช้ผลิต";
    error_en = "Machine produce";
  } else if (values.mold_use.every((item) => item.is_checked === false)) {
    isValid = false;
    error_th = "กรุณาระบุ แม่พิมพ์ที่ใช้ผลิต";
    error_en = "Machine produce";
  } else if (values?.main_material.every((item) => item.is_checked === false)) {
    isValid = false;
    error_th = "กรุณาระบุ วัตถุดิบหลักในการผลิตสินค้า";
    error_en = "Main material";
  } else if (values.transport_distance?.transport === "") {
    isValid = false;
    error_th = "กรุณาระบุ ระยะทางในการขนส่งสินค้า";
    error_en = "Transport distance";
  } else if (
    values.main_supplier_credit_terms.every((item) => item.supplier_name == "")
  ) {
    isValid = false;
    error_th = "กรุณาระบุ เครดิตเทอม ซัพพลายเออร์หลัก";
    error_en = "Main supplier";
  } else if (
    values.main_mat_ratio.foreign + values.main_mat_ratio.thailand !==
    100
  ) {
    isValid = false;
    error_th = "สัดส่วนการซื้อวัตถุดิบหลัก ต้องรวมกันเป็น 100%";
    error_en = "Main material ratio";
  } else if (
    values.ratio_of_raw_mat.COGS +
      values.ratio_of_raw_mat.GP +
      values.ratio_of_raw_mat.RM !==
    100
  ) {
    isValid = false;
    error_th = "สัดส่วนวัตถุดิบ ต้นทุน และกำไร ต้องรวมกันเป็น 100%";
    error_en = "Main material ratio";
  } else if (
    values.inventory_day.FG === 0 &&
    values.inventory_day.PRD === 0 &&
    values.inventory_day.RM === 0 &&
    values.inventory_day.inventory === 0
  ) {
    isValid = false;
    error_th = "กรุณาระบุ ระยะเวลาจัดเก็บสินค้า";
    error_en = "Inventory day";
  } else if (doc.documents?.bom_process === "") {
    isValid = false;
    error_th = "กรุณาอัพโหลด เอกสารBOM และ Process";
    error_en = "BOM and Process";
  } else if (doc.documents?.cost_break_down === "") {
    isValid = false;
    error_th = "กรุณาอัพโหลด เอกสารโครงสร้างราคา";
    error_en = "BOM and Process";
  }

  return {
    isValid,
    error_th,
    error_en,
  };
};