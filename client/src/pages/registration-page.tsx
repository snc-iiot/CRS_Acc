import {
  CompanyInformationForm,
  ConsentForm,
  ContactInformationForm,
  DocumentUploadForm,
  RelationshipInformationForm,
  ShareholderInformationForm,
  StandardInformationForm,
} from "@/components/registration";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getParsedToken, IDecodedToken } from "@/helpers/jwt.helper";
import { HeaderConditions, Sections } from "@/helpers/register.helper";
import { useSwal } from "@/hooks/use-swal";
import { cn } from "@/lib/utils";
import { useCustomer } from "@/services/hooks";
import { useAtomStore } from "@/store/use-atom-store";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const RegistrationPage: FC = () => {
  const navigate = useNavigate();
  const [isAcceptConsent, setIsAcceptConsent] = useState({
    consent_1: false,
    consent_2: false,
    consent_3: false,
  });
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");
  const { mutateRegisterCustomer } = useCustomer();
  const { confirmSwal, confirmSwalWithHtml } = useSwal();
  const { registration } = useAtomStore();
  const MODE = "register";

  const onSubmit = async () => {
    const isConfirm = await confirmSwal(
      "ยืนยันการลงทะเบียน",
      "ต้องการลงทะเบียนใช่หรือไม่",
    );
    if (isConfirm) {
      const res = await mutateRegisterCustomer(registration);
      if (res.status === "success") {
        navigate("/success", {
          replace: true,
          state: {
            registration: res.data,
          },
        });
      }
    }
  };

  //? Observer Section
  const [activeSection, setActiveSection] = useState("section-1");
  const handleLinkClick = (section: string) => {
    setActiveSection(section);
    scrollToSection(section);
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  //? Observer Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      },
    );

    Sections?.map((item) => {
      const element = document.getElementById(item.id);
      element && observer.observe(element);
    });

    return () => {
      Sections?.map((item) => {
        const element = document.getElementById(item.id);
        element && observer.unobserve(element);
      });
    };
  }, []);

  const checkToken = (payload: IDecodedToken): boolean => {
    const date = new Date(payload.exp * 1000);
    // const date = new Date(payload.exp);
    if (date < new Date()) {
      return false;
    }
    return true;
  };

  const checkConfirm = async (payLoad: IDecodedToken) => {
    // const isConfirm = await confirmSwal(
    //   "ลิงก์หมดอายุ",
    //   `กรุณาติดต่อเจ้าหน้าที่ได้ที่
    //     Email: ${payLoad.email}`,
    //   "ตกลง",
    //   undefined,
    //   false,
    // );
    const isConfirm = await confirmSwalWithHtml(
      undefined,
      `
      <div class="flex items-center justify-center flex-col gap-1.5">
      <h1 class="text-2xl font-bold text-red-600">
      ลิงก์หมดอายุ 
      </h1>
      <p class="text-md font-semibold">กรุณาติดต่อเจ้าหน้าที่</p>
        <p>ได้ที่ Email: ${payLoad.email}</p>
      </div>
        `,
      "ดำเนินการต่อ",
      undefined,
      false,
      "error",
    );
    if (isConfirm) {
      window.open("mailto:" + payLoad.email, "_blank");
    }
  };

  useEffect(() => {
    const payLoad = getParsedToken(key as string) as IDecodedToken;
    localStorage.setItem("payload-icrs", JSON.stringify(payLoad));
    if (!checkToken(payLoad)) {
      checkConfirm(payLoad);
    }
  }, [key]);

  return (
    <div className="container relative h-full w-full overflow-y-auto py-2">
      <form
        className="flex h-full w-full flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <main className="flex h-full flex-col items-center justify-center gap-2">
          <section className="w-full py-1">
            <h1 className="text-2xl font-bold">
              {HeaderConditions[MODE]?.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {HeaderConditions[MODE]?.description}
            </p>
          </section>
          <Separator />
          <section className="flex h-full w-full">
            <article className="flex w-1/4 flex-col gap-2 border-r pr-2">
              {Sections?.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-start gap-2 truncate rounded-md"
                >
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                      }),
                      "flex w-full items-center justify-start gap-2 truncate rounded-md",
                      activeSection === item.id &&
                        "bg-secondary font-bold text-white",
                    )}
                    onClick={() => handleLinkClick(item.id)}
                  >
                    <span
                      className={cn(
                        "text-sm",
                        "text-muted-foreground",
                        activeSection === item.id &&
                          "truncate font-bold text-primary",
                      )}
                    >
                      {item.title}
                    </span>
                  </a>
                  <div
                    className={cn(
                      "h-2 w-2 text-muted-foreground",
                      activeSection === item.id && "rounded-full bg-primary",
                    )}
                  />
                </div>
              ))}
            </article>
            <article className="h-full w-3/4">
              <main className="flex h-full w-full flex-col gap-2 pl-2">
                <section className="flex w-full items-center justify-between">
                  <h2 className="text-xl font-bold">
                    รายละเอียดบริษัทผู้ซื้อ / Customer Details
                  </h2>
                </section>
                <Separator />
                <section className="flex h-full w-full flex-col py-1">
                  <ScrollArea className="h-0 flex-grow">
                    <CompanyInformationForm />
                    <ShareholderInformationForm />
                    <ContactInformationForm />
                    <RelationshipInformationForm />
                    <StandardInformationForm />
                    <DocumentUploadForm />
                    <ConsentForm
                      isAcceptConsent={isAcceptConsent}
                      setIsAcceptConsent={setIsAcceptConsent}
                    />
                    <ScrollBar />
                  </ScrollArea>
                </section>
              </main>
            </article>
          </section>
          <Separator />
          <section className="flex w-full items-center justify-end gap-2">
            <Button variant="secondary" type="button">
              ยกเลิก
            </Button>
            <Button
              type="submit"
              disabled={
                !isAcceptConsent.consent_1 ||
                !isAcceptConsent.consent_2 ||
                !isAcceptConsent.consent_3
              }
            >
              ลงทะเบียน
            </Button>
          </section>
        </main>
      </form>
    </div>
  );
};

export default RegistrationPage;
