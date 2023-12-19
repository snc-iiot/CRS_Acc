import { Icons } from "@/components/common/icons";
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
import { HeaderConditions, Sections } from "@/helpers/register.helper";
import { useSwal } from "@/hooks/use-swal";
import { cn } from "@/lib/utils";
import { useCustomer } from "@/services/hooks";
import { useAtomStore } from "@/store/use-atom-store";
import { FC, useEffect, useState } from "react";

const RegistrationPage: FC = () => {
  const { mutateRegisterCustomer } = useCustomer();
  const { confirmSwal } = useSwal();
  const { registration } = useAtomStore();
  const MODE = "register";

  const onSubmit = async () => {
    const isConfirm = await confirmSwal(
      "ยืนยันการลงทะเบียน",
      "ต้องการลงทะเบียนใช่หรือไม่",
    );
    if (isConfirm) {
      await mutateRegisterCustomer(registration);
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
                <section className="flex h-full w-full flex-col py-1">
                  <ScrollArea className="h-0 flex-grow">
                    <CompanyInformationForm />
                    <ShareholderInformationForm />
                    <ContactInformationForm />
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
            <Button variant="secondary" type="button">
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
