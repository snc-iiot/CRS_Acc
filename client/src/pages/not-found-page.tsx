import { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <img
        src="/assets/images/empty-state/404.svg"
        alt="404"
        className="h-1/2 w-1/2"
      />
      <h1 className="text-center text-4xl font-bold">
        ขออภัย ไม่พบหน้าเว็บไซต์ที่ต้องการ
      </h1>
      <p className="text-center text-lg">
        หน้าเว็บไซต์ดังกล่าวอาจมีการเปลี่ยนที่อยู่ เปลี่ยนชื่อ หรือพิมพ์ URL
        ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง
      </p>
    </div>
  );
};

export default NotFoundPage;
