import { FadeIn } from "@/components/common/framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <FadeIn>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <img src="/404.svg" alt="404" className="h-1/2 w-1/2" />
        <h1 className="text-center text-4xl font-bold">
          ขออภัย ไม่พบหน้าเว็บไซต์ที่ต้องการ
        </h1>
        <p className="text-center text-lg">
          หน้าเว็บไซต์ดังกล่าวอาจมีการเปลี่ยนที่อยู่ เปลี่ยนชื่อ หรือพิมพ์ URL
          ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง
        </p>
        <Link to="/" className={cn(buttonVariants())}>
          กลับหน้าหลัก
        </Link>
      </div>
    </FadeIn>
  );
};

export default NotFoundPage;
