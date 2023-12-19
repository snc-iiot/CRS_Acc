import { FadeIn } from "@/components/common/framer-motion";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { API_BASE_URL } from "@/helpers/common.helper";
import { useSwal } from "@/hooks/use-swal";
import { cn } from "@/lib/utils";
import { useProfile } from "@/services/hooks/use-profile";
import { TResponseAction } from "@/types";
import axios from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSwal();
  const { setProfile } = useProfile();
  const annoucements: { label: string; link: string }[] = [
    { label: "สื่อสาธิตการใช้งานระบบ SNC-iCRS", link: "#" },
    {
      label: "รายชื่อสายอนุมัติ (Approval name list) ระบบ SNC-iCRS",
      link: "#",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const Login = async (username: string, password: string) => {
    try {
      const { data } = await axios.post<TResponseAction>(
        `${API_BASE_URL}/user/login`,
        {
          username,
          password,
        },
      );
      return data;
    } catch (error: any) {
      showError("เกิดข้อผิดพลาด", error?.response?.data?.message);
      return null;
    }
  };

  const onSubmit = handleSubmit(async () => {
    const username = watch("emailRequired");
    const password = watch("passwordRequired");

    const profile = await Login(username, password);
    if (profile?.status == "success") {
      setProfile(profile.data?.[0]);
      console.log(profile.data?.[0]);
      showSuccess("เข้าสู่ระบบสำเร็จ", "กำลังพาท่านไปยังหน้าหลัก...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      showError("เกิดข้อผิดพลาด", "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง");
    }
  });

  return (
    <FadeIn>
      <div className="relative h-screen w-full">
        <div className="bg-login h-full w-full overflow-hidden">
          {/* //! Header */}
          <div
            className={cn(
              "border-custom-border-200 bg-custom-sidebar-background-100 z-10 w-full border-b px-4 py-3",
            )}
          >
            <div>
              <img
                src="/images/logo.webp"
                alt="SNC Logo"
                width={230}
                height={230}
                className="h-auto w-[5rem] select-none"
              />
              <p className="text-sm">
                บมจ. เอส เอ็น ซี ฟอร์เมอร์ และบริษัทในเครือฯ
                asdfghjgfuicjhsdnjchdsn
              </p>
            </div>
          </div>

          {/* //! Content */}
          <div className="flex h-full">
            {/* //! Left */}
            <div className="w-[400px] border-r px-4">
              <h1 className="text-lg font-bold">
                iCRS Customer Registration (Admin)
              </h1>
              <p className="text-sm">กรุณาลงชื่อเข้าใช้เพื่อเริ่มใช้งาน</p>
              <p>
                <b className="text-red-500">SNC Group</b> please login to start
                your session
              </p>

              <form onSubmit={onSubmit} className="mt-3">
                <div className="mb-2">
                  <p className="font-[600]">Username</p>
                  <Input
                    type="text"
                    placeholder="Username"
                    {...register("emailRequired", { required: true })}
                  />
                  {errors.emailRequired && (
                    <span className="text-sm text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <p className="font-[600]">Password</p>
                  <Input
                    type="password"
                    placeholder="********"
                    {...register("passwordRequired", { required: true })}
                  />
                  {errors.passwordRequired && (
                    <span className="text-sm text-red-600">
                      This field is required
                    </span>
                  )}
                </div>

                {/* <div className="mb-2">
                  <p className="font-[600]">Business Code</p>
                  <Select
                    placeholder="Select business code"
                    {...register("buCodeRequired", { required: true })}
                  >
                    <>
                      {!businessCodes.length
                        ? null
                        : businessCodes.map((item, i) => (
                            <option key={i} value={item?.BUCode}>
                              [{item?.BUCode}] {item?.Description}
                            </option>
                          ))}
                    </>
                  </Select>
                  {errors.buCodeRequired && (
                    <span className="text-sm text-red-600">
                      This field is required
                    </span>
                  )}
                </div> */}

                <div className="mt-6 flex items-center justify-between">
                  <Button type="button" variant="link" className="text-xs">
                    ลืมรหัสผ่าน
                    <br />
                    Forgot password?
                  </Button>
                  <Button type="submit">
                    <Icons.logIn className="mr-2 w-[1.2rem]" /> เข้าสู่ระบบ
                  </Button>
                </div>
              </form>
            </div>

            {/* //! Right */}
            <div className="px-3 pt-2 ">
              <p className="pb-1 text-sm font-bold underline">
                แจ้งผู้ใช้งานเว็บไซต์
              </p>
              {annoucements.map((item, i) => (
                <div key={i} className="flex items-center text-sm">
                  <p>
                    {i + 1}. {item.label}:
                  </p>{" "}
                  <Icons.externalLink className="h-[1rem] cursor-pointer text-blue-800" />
                </div>
              ))}
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
                onClick={() =>
                  window.open("https://snc-services.sncformer.com/icsd/")
                }
              />
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-black">
              <p className="text-base">
                ยื่นคำร้องปรับปรุง และแก้ไขปัญหาโปรแกรม
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </FadeIn>
  );
};

export default LoginPage;
