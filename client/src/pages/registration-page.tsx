import {
  CompanyInformationForm,
  ShareholderInformationForm,
} from "@/components/registration";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { HeaderConditions, Sections } from "@/helpers/register.helper";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";

const RegistrationPage: FC = () => {
  const MODE = "register";

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

  return (
    <div className="container relative h-full w-full overflow-y-auto py-2">
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
              <a
                href={`#${item.id}`}
                key={index}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "flex w-full items-center justify-start gap-2 rounded-md",
                )}
                onClick={() => handleLinkClick(item.id)}
              >
                <span
                  className={cn(
                    "text-sm",
                    "text-muted-foreground",
                    activeSection === item.id && "font-bold text-primary",
                  )}
                >
                  {item.title}
                </span>
              </a>
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
                  <ScrollBar />
                </ScrollArea>
              </section>
            </main>
          </article>
        </section>
        <Separator />
        <section className="flex w-full items-center justify-end gap-2">
          <Button variant="secondary">ยกเลิก</Button>
          <Button>ลงทะเบียน</Button>
        </section>
      </main>
    </div>
  );
};

export default RegistrationPage;
