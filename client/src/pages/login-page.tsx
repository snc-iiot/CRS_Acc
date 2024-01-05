import { FadeIn } from "@/components/common/framer-motion";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { API_BASE_URL } from "@/helpers/common.helper";
import { useSwal } from "@/hooks/use-swal";
import { cn } from "@/lib/utils";
import { useProfile } from "@/services/hooks/use-profile";
import { TResponseAction } from "@/types";
import axios from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError, showLoading, closeSwal } = useSwal();
  const { setProfile } = useProfile();
  const [isOpenEye, setIsOpenEye] = useState(false);

  const annoucements: { label: string; link: string }[] = [
    {
      label: "ผังการดำเนินการ (Flow chart) ระบบ SNC-iCRS",
      link: "https://snc-services.sncformer.com/dev/icrs/docs/pdf/icrs-dfd.pdf",
    },
    {
      label: "รายชื่อสายอนุมัติ (Approval name list) ระบบ SNC-iCRS",
      link: "https://snc-services.sncformer.com/dev/icrs/docs/pdf/icrs-authen-user.pdf",
    },
    {
      label: "ตารางการกำหนดสิทธิการเข้าถึงระบบ (Authority matrix) ระบบ SNC-iCRS",
      link: "https://snc-services.sncformer.com/dev/icrs/docs/pdf/icrs-authority-matrix.pdf",
    },
    {
      label: "ตัวอย่างเอกสารที่ Export ออกจากระบบ iCRS (PDF)",
      link: "https://snc-services.sncformer.com/dev/icrs/docs/pdf/icrs-export-sample.pdf",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const Login = async (username: string, password: string): Promise<TResponseAction> => {
    try {
      const { data } = await axios.post<TResponseAction>(`${API_BASE_URL}/user/login`, {
        username,
        password,
      });
      return data;
    } catch (error: any) {
      console.error(error);
      showError("เกิดข้อผิดพลาด", error?.response?.data?.message);
      return {
        status: "error",
        message: error?.response?.data?.message,
        data: null,
      };
    }
  };

  const submitLogin = async () => {
    showLoading("กำลังเข้าสู่ระบบ...");
    const username = watch("emailRequired");
    const password = watch("passwordRequired");
    const profile = await Login(username, password);
    closeSwal();
    if (profile?.status == "success") {
      setProfile(profile.data?.[0]);
      showSuccess(profile?.message, "กำลังพาท่านไปยังหน้าหลัก...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      showError(profile?.message || "", "กรุณาตรวจสอบ username และ password");
    }
  };

  const onSubmit = handleSubmit(submitLogin);

  return (
    <FadeIn>
      <div className="relative h-screen w-full">
        <div className="bg-login h-full w-full overflow-hidden">
          {/* //! Header */}
          <div
            className={cn("border-custom-border-200 bg-custom-sidebar-background-100 z-10 w-full border-b px-4 py-1")}
          >
            <div>
              <img
                src="/images/logo.webp"
                alt="SNC Logo"
                width={230}
                height={230}
                className="h-auto w-[5rem] select-none"
              />
              <p className="text-sm">บมจ. เอส เอ็น ซี ฟอร์เมอร์ และบริษัทในเครือฯ</p>
            </div>
          </div>

          {/* //! Content */}
          <div className="flex h-full">
            {/* //! Left */}
            <div className="w-[400px] border-r px-4">
              <h1 className="text-lg font-bold">iCRS Customer Registration (Admin)</h1>
              <p className="text-sm">กรุณาลงชื่อเข้าใช้เพื่อเริ่มใช้งาน</p>
              <p>
                <b className="text-red-500">SNC Group</b> please login to start your session
              </p>

              <form onSubmit={onSubmit} className="mt-3">
                <div className="mb-2">
                  <p className="font-[600]">Username</p>
                  <Input type="text" placeholder="Username" {...register("emailRequired", { required: true })} />
                  {errors.emailRequired && <span className="text-sm text-red-600">กรุณาระบุ username</span>}
                </div>
                <div className="relative mb-2">
                  <p className="font-[600]">Password</p>
                  <div className="relative w-full">
                    <Input
                      type={isOpenEye ? "text" : "password"}
                      placeholder="Password"
                      {...register("passwordRequired", { required: true })}
                    />
                    <div className="absolute right-0 top-0 flex h-full items-center pr-2">
                      {isOpenEye ? (
                        <Icons.eye className="h-[1rem] cursor-pointer" onClick={() => setIsOpenEye(!isOpenEye)} />
                      ) : (
                        <Icons.eyeOff className="h-[1rem] cursor-pointer" onClick={() => setIsOpenEye(!isOpenEye)} />
                      )}
                    </div>
                  </div>
                  {errors.passwordRequired && <span className="text-sm text-red-600">กรุณาระบุ password</span>}
                </div>
                <div className="mt-6 flex items-center justify-end">
                  <Button type="submit">
                    <Icons.logIn className="mr-2 w-[1.2rem]" /> เข้าสู่ระบบ
                  </Button>
                </div>
              </form>
            </div>

            {/* //! Right */}
            <div className="px-3 pt-2 ">
              <p className="pb-1 text-sm font-bold underline">แจ้งผู้ใช้งานเว็บไซต์</p>
              {annoucements.map((item, i) => (
                <div key={i} className="flex items-center text-sm">
                  <p>
                    {i + 1}. {item.label}:
                  </p>{" "}
                  <Icons.externalLink
                    className="h-[1rem] cursor-pointer text-blue-800"
                    onClick={() => window.open(item.link, "_blank")}
                  />
                </div>
              ))}
              <div className="flex items-center text-sm">
                <p>{annoucements.length + 1}. พบปัญหาการใช้งานระบบ กรุณาแจ้งผ่านไลน์กลุ่ม SNC-iCRS</p>
              </div>
            </div>
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src="https://snc-services.sncformer.com/dev/images/jpg/icsd-icon.jpg"
                width={200}
                height={200}
                alt=""
                className="request-blink absolute bottom-[2rem] right-[2rem] z-50 h-[80px] w-[80px] cursor-pointer rounded-full"
                onClick={() => window.open("https://snc-services.sncformer.com/icsd/")}
              />
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-black">
              <p className="text-base">ยื่นคำร้องปรับปรุง และแก้ไขปัญหาโปรแกรม</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </FadeIn>
  );
};

export default LoginPage;
