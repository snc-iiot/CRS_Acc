import { Icons } from "@/components/common/icons";
import {
  CompanyInformationForm,
  ConsentForm,
  ContractInformationForm,
  DocumentUploadForm,
  RelationshipInformationForm,
  ShareholderInformationForm,
  StandardInformationForm,
} from "@/components/pages/registration";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { HeaderConditions, Sections } from "@/helpers/register.helper";
import { validateRegisterForm } from "@/helpers/validate.helper";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { useForm } from "@/services";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const RegistrationPage: FC = () => {
  const { confirmSwal, showError } = useSwal();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("RegisID");
  const MODE = "register";
  const { mutateCreateNewCustomer } = useForm();
  const {
    registration,
    setRegistration,
    certificatedList,
    benefitsList,
    deliveryTermsList,
    companyPolicyList,
  } = useAtomStore();

  const navigate = useNavigate();
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

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
used to create an `IntersectionObserver` that observes the sections on the page and updates the
active section based on the intersection. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
    Sections?.forEach((section) => {
      const element = document.getElementById(section.id);
      element && observer.observe(element);
    });

    return () => {
      Sections?.forEach((section) => {
        const element = document.getElementById(section.id);
        element && observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    setRegistration({
      ...registration,
      regis_id: id ? id : "",
      payment_term: {
        ...registration?.payment_term,
        company_policy: companyPolicyList,
        delivery_term: deliveryTermsList,
      },
      standard: {
        certificate: certificatedList?.map((item) => {
          return {
            ...item,
            value: "-",
          };
        }),
        benefit: benefitsList?.map((item) => {
          return {
            ...item,
            value: "-",
          };
        }),
      },
    });
  }, [
    benefitsList,
    certificatedList,
    companyPolicyList,
    deliveryTermsList,
    id,
    registration,
    setRegistration,
  ]);

  return (
    <div className="relative h-full w-full overflow-y-auto py-2">
      <form
        className="flex h-full w-full flex-col gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const { isValid, error_th } = validateRegisterForm(registration);
          if (!isValid) {
            showError(error_th, "กรุณากรอกข้อมูลให้ครบถ้วน");
          } else {
            const idConfirm = await confirmSwal(
              "ยืนยันการลงทะเบียน",
              "คุณต้องการลงทะเบียนใช่หรือไม่",
            );
            if (idConfirm) {
              const cer = registration?.standard?.certificate?.filter(
                (item) => item.is_checked === true,
              );
              const benefit = registration?.standard?.benefit?.filter(
                (item) => item.is_checked === true,
              );
              const data = {
                ...registration,
                standard: {
                  ...registration?.standard,
                  certificate: cer,
                  benefit: benefit,
                },
              };
              mutateCreateNewCustomer(data);
            }
          }
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
                  <Icons.checkCircle2
                    className={cn(
                      "h-4 w-4 text-muted-foreground",
                      activeSection === item.id && "text-green-500",
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
                <section className="flex h-full w-full flex-col">
                  <ScrollArea className="h-0 flex-grow">
                    <CompanyInformationForm />
                    <ShareholderInformationForm />
                    <ContractInformationForm />
                    <RelationshipInformationForm />
                    <StandardInformationForm />
                    <DocumentUploadForm />
                    <ConsentForm />
                    <ScrollBar />
                  </ScrollArea>
                </section>
              </main>
            </article>
          </section>
          <Separator />
          <section className="flex w-full items-center justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              ยกเลิก
            </Button>
            <Button type="submit">ลงทะเบียน</Button>
          </section>
        </main>
      </form>
    </div>
  );
};

export default RegistrationPage;
