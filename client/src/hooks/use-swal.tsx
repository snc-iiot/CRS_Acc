import { PRIMARY_COLOR } from "@/helpers/common.helper";
import Swal from "sweetalert2";

export const useSwal = () => {
  const showLoading = (
    title = "กำลังบันทึกข้อมูล",
    message = "กรุณารอสักครู่...",
  ) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const showSuccess = (title: string, message: string) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showError = (
    title: string,
    message: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
  ) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonText: confirmButtonText || "ตกลง",
      cancelButtonText: cancelButtonText || "ยกเลิก",
      confirmButtonColor: PRIMARY_COLOR,
    });
  };

  const confirmSwal = async (
    title: string,
    message: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
    showCancelButton?: boolean,
  ): Promise<boolean> => {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: showCancelButton === false ? false : true,
      confirmButtonText: confirmButtonText || "ตกลง",
      cancelButtonText: cancelButtonText || "ยกเลิก",
      confirmButtonColor: PRIMARY_COLOR,
    });
    return result.isConfirmed;
  };

  const closeSwal = () => {
    Swal.close();
  };

  return {
    showLoading,
    showSuccess,
    showError,
    confirmSwal,
    closeSwal,
  };
};
