import Success from "@/lottie/success.json";
import Lottie from "lottie-react";
import { FC } from "react";

const SuccessPage: FC = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-white">
      <Lottie animationData={Success} style={{ width: "25rem" }} />
      <h1 className="text-3xl font-semibold text-gray-900">
        ลงทะเบียนสำเร็จแล้ว
      </h1>
      <p className="text-lg text-gray-500">
        ระบบได้รับข้อมูลการลงทะเบียนของท่านเรียบร้อยแล้ว
      </p>
      <p className="text-lg text-gray-500">
        โปรดรอการยืนยันผลทาง Email ที่ท่านได้รับคำเชิญลงทะเบียน
      </p>
    </div>
  );
};

export default SuccessPage;
