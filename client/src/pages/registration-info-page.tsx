import { FadeIn } from "@/components/common/framer-motion";
import { Icons } from "@/components/common/icons";
import {
  ContactPerson,
  CustomerCompanyInformation,
  ShareholderProportion,
  StandardsCertifications,
} from "@/components/pages/registration-info-page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const RegistrationInfo: FC = () => {
  const [searchParams] = useSearchParams();
  const RegisID = Number(searchParams.get("RegisID"));
  const navigate = useNavigate();

  const [viewPage, setViewPage] = useState<string>("2");

  // console.log(typeof RegisID, RegisID);
  // if (isNaN(RegisID)) {
  //   setTimeout(() => navigate("/"), 500);
  //   return <div />;
  // }

  const leftAccordionList: {
    topic: string;
    title: string;
    content: JSX.Element;
  }[] = [
    {
      topic: "topic-1",
      title: "มูลบริษัท / Company Information",
      content: <CustomerCompanyInformation />,
    },
    {
      topic: "topic-2",
      title: "สัดส่วนผู้ถือหุ้น / Shareholder Proportion",
      content: <ShareholderProportion />,
    },
    {
      topic: "topic-3",
      title: "บุคคลติดต่อ / Contact Person",
      content: <ContactPerson />,
    },
    {
      topic: "topic-4",
      title:
        "มาตรฐานและการรับรองที่ได้รับในปัจจุบัน / Standards and Certifications",
      content: <StandardsCertifications />,
    },
    {
      topic: "topic-5",
      title: "เอกสารอัพโหลด / Upload Documents",
      content: (
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          rerum quidem corrupti numquam sit repudiandae dolor in nihil. Impedit,
          officia!
        </div>
      ),
    },
  ];

  useEffect(() => {
    const initPage = setTimeout(() => {
      if (isNaN(RegisID)) {
        // console.log("Bloked!! Page");
        navigate("/");
      }
    }, 0);

    return () => {
      clearTimeout(initPage);
    };
  }, [RegisID, navigate]);

  return (
    <FadeIn>
      <div className="relative h-screen w-full">
        <div
          className={cn(
            "fixed bottom-2 left-2",
            "grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-sm border p-2 hover:translate-x-1",
            "bg-primary-foreground",
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.arrowLeft
                  className="h-5 w-5"
                  onClick={() => navigate(-1)}
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>กลับ</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <header className="relative grid h-[3rem] w-full grid-cols-2 border-b-2 py-2">
          <div className="absolute left-[50%] top-2 flex translate-x-[-50%] gap-x-3">
            <Icons.panelRight
              className="h-5 w-5 cursor-pointer hover:scale-105"
              onClick={() => setViewPage("L")}
            />
            <Icons.columns
              className="h-5 w-5 cursor-pointer hover:scale-105"
              onClick={() => setViewPage("2")}
            />
            <Icons.panelLeft
              className="h-5 w-5 cursor-pointer hover:scale-105"
              onClick={() => setViewPage("R")}
            />
          </div>
          <div className="grid place-items-center">
            {/* <h2 className="text-lg font-semibold">ข้อมูลลูกค้า</h2> */}
          </div>
          <div className="grid place-items-center">
            {/* <h2 className="text-lg font-semibold">ข้อมูลผู้ประเมิน</h2> */}
          </div>
        </header>

        <main className="h-[calc(100vh-3rem)] p-2">
          <div
            className={cn(
              "grid h-full",
              viewPage == "2" ? "grid-cols-3" : "grid-cols-1",
            )}
          >
            {/* //! Left Content */}
            <div
              className={cn(
                "h-full overflow-y-auto border-r-2 p-1",
                viewPage == "R" ? "hidden delay-500" : "block",
              )}
            >
              <h3 className="text-md font-bold">
                รายละเอียดบริษัทลูกค้า / Customer Details
              </h3>
              <form>
                <Accordion
                  type="multiple"
                  defaultValue={leftAccordionList?.map((item) => item?.topic)}
                >
                  {leftAccordionList?.map((item, i) => (
                    <AccordionItem value={item?.topic} key={i}>
                      <AccordionTrigger className="text-xs font-bold">
                        {i + 1}. {item?.title}
                      </AccordionTrigger>
                      <AccordionContent>{item?.content}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </form>
            </div>
            {/* //! Right Content */}
            <div
              className={cn(
                "p-1",
                viewPage == "L" ? "hidden delay-500" : "col-span-2 block",
              )}
            >
              Right info
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Officia, animi cum maxime fugiat molestias voluptas incidunt ad.
                Voluptatem iure repellendus non animi saepe deserunt corporis
                unde voluptas, necessitatibus ut architecto aspernatur
                temporibus, possimus amet beatae reprehenderit iste porro
                cupiditate aliquam cum, fugiat quis nihil culpa. Fuga placeat
                quo excepturi itaque dolorem maxime quos ipsa sint, aliquid,
                numquam possimus quod modi id tempore, assumenda dicta non magni
                iusto dolor magnam. Iste esse reprehenderit ducimus fugiat nisi
                velit ea. Tenetur quidem tempora non, quibusdam dolorem delectus
                sunt atque asperiores hic voluptate? Inventore repudiandae
                tempore cum culpa error adipisci eaque nisi vitae similique.
              </p>
            </div>
          </div>
        </main>
      </div>
    </FadeIn>
  );
};

export default RegistrationInfo;
