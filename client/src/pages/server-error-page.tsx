import { FadeIn } from "@/components/common/framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link } from "react-router-dom";

const ServerErrorPage: FC = () => {
  return (
    <FadeIn>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <img
          src="https://img.freepik.com/premium-vector/flat-illustration-500-internal-server-error-concept-can-t-connect-server-internet_258153-329.jpg"
          alt="500"
          className="h-1/2 w-auto"
        />
        <h1 className="text-center text-4xl font-bold">
          ขออภัย มีบางอย่างผิดพลาด
        </h1>
        <p className="text-center text-lg">
          กรุณาติดต่อผู้ดูแลระบบหรือลองใหม่อีกครั้ง หรือกลับไปหน้าหลัก
        </p>
        <Link to="/" className={cn(buttonVariants())}>
          กลับหน้าหลัก
        </Link>
      </div>
    </FadeIn>
  );
};

export default ServerErrorPage;
