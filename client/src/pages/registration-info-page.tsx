import ActionTab from "@/components/common/actions-tab";
import { FadeIn } from "@/components/common/framer-motion";
import { Icons } from "@/components/common/icons";
import MainActions from "@/components/common/main-actions";
import {
  ContactPerson,
  CustomerCompanyInformation,
  R1Form,
  R2Form,
  R3Form,
  R4Form,
  R5Form,
  R6Form,
  R7Form,
  R8Form,
  R9Form,
  R10Form,
  Relationship,
  ShareholderProportion,
  StandardsCertifications,
  UploadDocuments,
} from "@/components/pages/registration-info-page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [activeTab, setActiveTab] = useState<string>("R1");

  const actionsTab = ["R1", "R2", "R4"];
  const mainActions = [
    "R1",
    "R2",
    "R3",
    "R4",
    "R5",
    "R6",
    "R7",
    "R8",
    "R9",
    "R10",
  ];

  const showSplitScreen: {
    tooltip: string;
    value: string;
  }[] = [
    { tooltip: "Left form", value: "L" },
    { tooltip: "Two form", value: "2" },
    { tooltip: "Right form", value: "R" },
  ];

  const leftAccordionList: {
    topic: string;
    title: string;
    content: JSX.Element;
  }[] = [
    {
      topic: "topic-1",
      title: "ข้อมูลบริษัท / Company Information",
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
      title: "ความสัมพันธ์กับบริษัท / Relationship with Company",
      content: <Relationship />,
    },
    {
      topic: "topic-5",
      title:
        "มาตรฐานและการรับรองที่ได้รับในปัจจุบัน / Standards and Certifications",
      content: <StandardsCertifications />,
    },
    {
      topic: "topic-6",
      title: "เอกสารอัพโหลด / Upload Documents",
      content: <UploadDocuments />,
    },
  ];

  useEffect(() => {
    const initPage = setTimeout(() => {
      if (isNaN(RegisID)) {
        navigate("/");
      }
    }, 0);

    return () => {
      clearTimeout(initPage);
    };
  }, [RegisID, navigate]);

  return (
    <FadeIn>
      <div className="relative h-[100dvh] w-full">
        <div
          className={cn(
            "fixed bottom-2 left-2 z-50",
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
                <span>กลับ</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <header className="relative grid h-[3rem] w-full grid-cols-2 border-b-2 py-2">
          <div className="absolute left-[50%] top-3 flex translate-x-[-50%] gap-x-3">
            {showSplitScreen?.map((item, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger>
                    {item?.value == "L" ? (
                      <Icons.panelLeft
                        className="h-5 w-5 cursor-pointer hover:scale-105"
                        onClick={() => setViewPage(item?.value)}
                      />
                    ) : item?.value == "2" ? (
                      <Icons.columns
                        className="h-5 w-5 cursor-pointer hover:scale-105"
                        onClick={() => setViewPage(item?.value)}
                      />
                    ) : (
                      <Icons.panelRight
                        className="h-5 w-5 cursor-pointer hover:scale-105"
                        onClick={() => setViewPage(item?.value)}
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{item?.tooltip}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </header>
        <main className="h-[calc(100%-3rem)]">
          <div
            className={cn(
              "grid h-full",
              viewPage == "2" ? "grid-cols-3" : "grid-cols-1",
            )}
          >
            {/* //! Left Content */}
            <div
              className={cn(
                "relative h-full overflow-y-auto border-r-2 p-1",
                viewPage == "R" ? "hidden delay-500" : "block",
              )}
            >
              <h3 className="text-md font-bold">
                รายละเอียดบริษัทลูกค้า / Customer Details
              </h3>
              <Accordion
                type="multiple"
                className="mb-[3rem]"
                defaultValue={leftAccordionList?.map((item) => item?.topic)}
              >
                {leftAccordionList?.map((item, i) => (
                  <AccordionItem value={item?.topic} key={i}>
                    <AccordionTrigger className="py-1 text-xs font-bold">
                      {i + 1}. {item?.title}
                    </AccordionTrigger>
                    <AccordionContent>{item?.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div
                className={cn(
                  "fixed bottom-2 flex justify-end pr-8",
                  viewPage == "L" ? "w-full" : "w-1/3",
                )}
              >
                <Button className="bg-yellow-500 hover:bg-yellow-500/80">
                  <Icons.edit className="mr-2 h-5 w-5" /> แก้ไขข้อมูลลูกค้า
                </Button>
              </div>
            </div>
            {/* //! Right Content */}
            <div
              className={cn(
                "relative h-full px-1 py-0",
                viewPage == "L" ? "hidden delay-500" : "col-span-2 block",
              )}
            >
              <div
                className={cn(
                  actionsTab.includes(activeTab)
                    ? "h-[calc(66%-.5rem)]"
                    : "h-[calc(73%-.5rem)]",
                )}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={(value) => setActiveTab(value)}
                  className="h-full"
                >
                  <nav className="fixed right-1 top-2">
                    <TabsList>
                      {Array(10)
                        .fill(0)
                        .map((_, i) => (
                          <TabsTrigger key={i} value={"R" + (i + 1)}>
                            R{i + 1}
                          </TabsTrigger>
                        ))}
                    </TabsList>
                  </nav>
                  <TabsContent value="R1" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R1Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R2" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R2Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R3" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R3Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R4" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R4Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R5" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R5Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R6" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R6Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R7" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R7Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R8" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R8Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R9" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R9Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R10" className="h-full overflow-auto">
                    <div className="flex h-0 flex-grow flex-col">
                      <R10Form />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              {/* //! Action by user */}
              {actionsTab.includes(activeTab) ? (
                <div className="flex h-[7%] items-center justify-between border border-b-0 px-2">
                  <ActionTab
                    activeTab={activeTab as "R1" | "R2" | "R3" | "R4" | "R5"}
                  />
                </div>
              ) : null}
              {/* //! Comments & Other */}
              <div className="grid h-[20%] grid-cols-2">
                <div className="h-full border border-r-0">
                  <main className="flex h-full w-full flex-col overflow-hidden">
                    <section>
                      <h2 className="px-2 py-1 text-sm font-semibold underline">
                        ข้อเสนอแนะ / Comments
                      </h2>
                    </section>
                    <section className="flex h-full w-full flex-col">
                      <div className="flex h-0 flex-grow flex-col overflow-y-auto px-2 text-xs">
                        {new Array(10).fill(0).map((_, i) => (
                          <div className="grid grid-cols-6 gap-2" key={i}>
                            <input
                              type="text"
                              defaultValue=""
                              placeholder="ข้อเสนอแนะ"
                              className="col-span-4 w-full border-0 border-b bg-primary-foreground p-0.5 px-2 text-secondary-foreground outline-0"
                            />
                            <input
                              type="text"
                              defaultValue="นาย อนุวัฒน์ ทีสุกะ"
                              placeholder="ผู้ให้ข้อเสนอแนะ"
                              className="col-span-2 w-full border-0 border-b bg-primary-foreground p-0.5 px-2 text-secondary-foreground outline-0"
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                    <section className="px-2 py-1">
                      <div className="grid grid-cols-6">
                        <div className="col-span-2 flex items-center justify-start gap-x-1">
                          <input
                            type="checkbox"
                            className="mr-1"
                            id="add-comment"
                          />
                          <label htmlFor="add-comment" className="text-xs">
                            เพิ่มข้อเสนอแนะ
                          </label>
                        </div>
                        <div className="col-span-4 flex w-full items-center justify-end gap-x-1 text-xs">
                          <input
                            type="text"
                            placeholder="โปรดระบุ"
                            className="w-full border-0 border-b p-0.5 text-primary outline-0"
                          />
                        </div>
                      </div>
                    </section>
                  </main>
                </div>
                <div className="h-full border">
                  <main className="flex h-full w-full flex-col overflow-hidden">
                    <section>
                      <h2 className="px-2 py-1 text-sm font-semibold underline">
                        ภาพรวม / Overview
                      </h2>
                    </section>
                    <section className="flex h-full w-full flex-col">
                      <div className="h-0 flex-grow overflow-y-auto px-2">
                        <p className="text-xs">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Provident quisquam qui molestiae eaque natus
                          itaque minus fugit vel exercitationem hic rem, numquam
                          porro obcaecati temporibus, nihil ad, dicta explicabo
                          suscipit. Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Voluptatem et ab amet optio numquam
                          eos reprehenderit. Error tenetur aliquid ducimus cum
                          aspernatur voluptatum dolore expedita nisi labore,
                          itaque natus tempore! Lorem ipsum, dolor sit amet
                          consectetur adipisicing elit. Provident quisquam qui
                          molestiae eaque natus itaque minus fugit vel
                          exercitationem hic rem, numquam porro obcaecati
                          temporibus, nihil ad, dicta explicabo suscipit. Lorem
                          ipsum dolor sit amet consectetur adipisicing elit.
                          Voluptatem et ab amet optio numquam eos reprehenderit.
                          Error tenetur aliquid ducimus cum aspernatur
                          voluptatum dolore expedita nisi labore, itaque natus
                          tempore!
                        </p>
                      </div>
                    </section>
                  </main>
                </div>
              </div>

              {/* //! Right Footer */}
              <div className="h-[7%] border border-t-0">
                {mainActions.includes(activeTab) ? (
                  <MainActions
                    activeTab={
                      activeTab as
                        | "R1"
                        | "R2"
                        | "R3"
                        | "R4"
                        | "R5"
                        | "R6"
                        | "R7"
                        | "R8"
                        | "R9"
                        | "R10"
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>
    </FadeIn>
  );
};

export default RegistrationInfo;
