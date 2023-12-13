import ActionTab from "@/components/common/actions-tab";
import BarChartHorizontal from "@/components/common/chart/bar-chart-horizontal";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select } from "@/components/ui/select-custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, COLORS_SERIES } from "@/lib/utils";
import MockCompany from "@/mock/company.json";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const RegistrationInfo: FC = () => {
  const [searchParams] = useSearchParams();
  const RegisID = Number(searchParams.get("RegisID"));
  const navigate = useNavigate();
  const [viewPage, setViewPage] = useState<string>("2");
  const [activeTab, setActiveTab] = useState<string>("R1");
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string[]>([]);

  const actionsTab = ["R1", "R2"];
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

  const TabList = [
    {
      label: "(R1) General Assessment",
      value: "R1",
    },
    {
      label: "(R2) DBD Financial Report",
      value: "R2",
    },
    {
      label: " (R3) Financial Ratio Assessment",
      value: "R3",
    },
    {
      label: "(R4) Overall Assessment",
      value: "R4",
    },
    // {
    //   label: "Assessment Result",
    //   value: "R5",
    // },
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
          <div className="flex items-center justify-start px-4">
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
              <div className="flex items-center justify-between">
                <h3 className="text-md font-bold">
                  รายละเอียดบริษัทลูกค้า / Customer Details
                </h3>
                <h3
                  className="cursor-pointer text-sm text-primary hover:underline"
                  onClick={() => {
                    setIsOpenAccordion(!isOpenAccordion);
                    if (isOpenAccordion) {
                      setActiveAccordion([]);
                    } else {
                      setActiveAccordion(
                        leftAccordionList?.map((item) => item?.topic),
                      );
                    }
                  }}
                >
                  {leftAccordionList?.filter((item) =>
                    activeAccordion.includes(item?.topic),
                  )?.length > 0 && isOpenAccordion
                    ? "Collapse"
                    : leftAccordionList?.filter((item) =>
                        activeAccordion.includes(item?.topic),
                      )?.length > 0 && !isOpenAccordion
                    ? "Expand"
                    : "Expand"}
                </h3>
              </div>

              <Accordion
                type="multiple"
                className="mb-[3rem]"
                value={activeAccordion}
              >
                {leftAccordionList?.map((item, i) => (
                  <AccordionItem value={item?.topic} key={i}>
                    <AccordionTrigger
                      className="py-1 text-xs font-bold"
                      onClick={() => {
                        if (activeAccordion.includes(item?.topic)) {
                          setActiveAccordion(
                            activeAccordion.filter(
                              (topic) => topic !== item?.topic,
                            ),
                          );
                        } else {
                          setActiveAccordion([...activeAccordion, item?.topic]);
                        }
                      }}
                    >
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
                    ? "h-[calc(66%-0.5rem)]"
                    : "h-[calc(73%-0.5rem)]",
                )}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={(value) => setActiveTab(value)}
                  className="h-full"
                >
                  <nav className="fixed right-1 top-2">
                    <TabsList>
                      {TabList.map((info, i) => (
                        <TabsTrigger key={i} value={info?.value}>
                          {info.label}
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
                      <div className="flex h-0 flex-grow flex-col gap-1 overflow-y-auto px-2 text-xs">
                        {new Array(10).fill(0).map((_, i) => (
                          <div className="grid grid-cols-10 gap-2" key={i}>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="col-span-5 w-full text-xs">
                                    ข้อเสนอแนะที่ {i + 1}
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    ข้อเสนอแนะที่ {i + 1} ข้อเสนอแนะที่ {i + 1}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <p className="col-span-5 text-right text-xs">
                              ผู้ให้ข้อเสนอแนะ{" "}
                              {new Date().toLocaleDateString() +
                                " " +
                                new Date().toLocaleTimeString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                    <section className="px-2 py-1">
                      <Popover>
                        <PopoverTrigger className="text-xs text-primary">
                          เพิ่มข้อเสนอแนะ
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="h-60 w-72 p-1 shadow-sm"
                        >
                          <main className="flex h-full w-full flex-col gap-2 overflow-hidden p-1">
                            <h2 className="px-2 py-1 text-sm font-semibold underline">
                              เพิ่มข้อเสนอแนะ / Add Comments
                            </h2>
                            <Textarea className="h-full w-full" />
                            <div className="text-end">
                              <Button size="sm">บันทึก</Button>
                            </div>
                          </main>
                        </PopoverContent>
                      </Popover>
                    </section>
                  </main>
                </div>
                <div className="relative h-full border">
                  <Popover>
                    <PopoverTrigger className="absolute right-2 top-2">
                      <Icons.filter className="h-4 w-4 text-primary" />
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="h-60 w-72 p-0 shadow-sm"
                    >
                      <section className="flex h-full w-full flex-col gap-2 overflow-hidden p-1">
                        <h2 className="px-2 py-1 text-sm font-semibold underline">
                          ตัวกรอง
                        </h2>
                        <div>
                          <p className="px-2 py-1 text-xs font-semibold">
                            เลือกปี
                          </p>
                          <Select
                            placeholder="เลือกปี"
                            className="text-xs shadow-none"
                            defaultValue="2023"
                          >
                            <option value="2023">Y2023</option>
                          </Select>
                        </div>
                        <div>
                          <p className="px-2 py-1 text-xs font-semibold">
                            รูปแบบการแสดงผล
                          </p>
                          <Select
                            defaultValue="quarter"
                            placeholder="รูปแบบการแสดงผล"
                            className="text-xs shadow-none"
                          >
                            <option value="quarter">ไตรมาส</option>
                            <option value="month">เดือน</option>
                            <option value="year">ปี</option>
                          </Select>
                        </div>
                        <div>
                          <p className="px-2 py-1 text-xs font-semibold">
                            รูปแบบการแสดงผล
                          </p>
                          <Select
                            defaultValue="quarter-1"
                            placeholder="รูปแบบการแสดงผล"
                            className="text-xs shadow-none"
                          >
                            <option value="quarter-1">ไตรมาส 1</option>
                          </Select>
                        </div>
                      </section>
                    </PopoverContent>
                  </Popover>
                  <main className="flex h-full w-full flex-col overflow-hidden ">
                    <section>
                      <h2 className="px-2 py-1 text-sm font-semibold underline">
                        ประวัติขึ้นทะเบียนผู้ซื้อ{" "}
                        <span className="text-xs text-red-600">
                          **ไม่รวมรายการนี้ / Exclude this form
                        </span>
                      </h2>
                    </section>
                    <section className="grid h-full w-full grid-cols-3">
                      <div className="col-span-2 h-full flex-grow overflow-y-auto px-2">
                        <BarChartHorizontal
                          data={MockCompany?.slice(0, 6)?.map((item, i) => ({
                            name: item?.Company,
                            value: 89,
                            color: COLORS_SERIES[9 + i],
                          }))}
                          keyMap={["value", "name"]}
                          label="รายการ"
                          keyXAxis="name"
                          keyYAxis="value"
                          isLabelInside={true}
                        />
                      </div>
                      <div className="relative flex h-full w-full flex-col">
                        <h5 className="px-2 text-xs font-semibold underline">
                          รวมลูกค้าทั้งหมด
                        </h5>
                        <div className="flex w-full flex-col rounded-sm border border-dashed border-border">
                          <div className="flex justify-between border-primary-foreground">
                            <h3 className="px-2 py-1 text-xs font-semibold">
                              Total (East)
                            </h3>
                            <h3 className="px-2 py-1 text-xs font-semibold">
                              12 รายการ
                            </h3>
                          </div>
                          <div className="flex justify-between border-primary-foreground">
                            <h3 className="px-2 py-1 text-xs font-semibold">
                              Total (West)
                            </h3>
                            <h3 className="px-2 py-1 text-xs font-semibold">
                              12 รายการ
                            </h3>
                          </div>
                          <div className="flex justify-between border-primary-foreground">
                            <h3 className="px-2 py-1 text-xs font-semibold">
                              Total
                            </h3>
                            <h3 className="px-2 py-1 text-xs font-semibold">
                              24 รายการ
                            </h3>
                          </div>
                        </div>
                        <div className="flex justify-end border-primary-foreground">
                          <Popover>
                            <PopoverTrigger asChild>
                              <h3 className="cursor-pointer px-2 py-1 text-xs font-semibold text-primary hover:underline">
                                คลิกดูรายละเอียด
                              </h3>
                            </PopoverTrigger>
                            <PopoverContent
                              align="start"
                              className="h-72 w-96 overflow-hidden p-1 shadow-sm"
                            >
                              <article className="flex h-full w-full flex-col gap-2 overflow-hidden p-1">
                                <h2 className="px-2 py-1 text-sm font-semibold underline">
                                  รายละเอียด
                                </h2>
                                <div className="flex h-full w-full flex-col gap-1 overflow-hidden">
                                  <div className="flex flex-grow flex-col overflow-y-auto text-xs">
                                    <Accordion
                                      type="multiple"
                                      defaultValue={["east", "west"]}
                                    >
                                      <AccordionItem value="east">
                                        <AccordionTrigger className="py-1 text-xs font-bold">
                                          Total (East)
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="flex flex-grow flex-col overflow-y-auto px-2 text-xs">
                                            {MockCompany?.slice(0, 6)?.map(
                                              (item, i) => (
                                                <div
                                                  key={i}
                                                  className="flex justify-between"
                                                >
                                                  <p className="text-xs">
                                                    {i + 1}. {item?.Company}
                                                  </p>
                                                  <p className="text-xs">
                                                    {~~(Math.random() * 100)}{" "}
                                                    รายการ
                                                  </p>
                                                </div>
                                              ),
                                            )}
                                            <div className="flex justify-between  font-bold text-primary">
                                              <p className="text-xs">รวม</p>
                                              <p className="overflow-hidden text-xs">
                                                {new Array(100)
                                                  .fill(0)
                                                  .map((_, i) => (
                                                    <span key={i}>.</span>
                                                  ))}
                                              </p>
                                              <p className="whitespace-nowrap text-xs">
                                                20 รายการ
                                              </p>
                                            </div>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                      <AccordionItem value="west">
                                        <AccordionTrigger className="py-1 text-xs font-bold">
                                          Total (West)
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="flex flex-grow flex-col overflow-y-auto px-2 text-xs">
                                            {MockCompany?.slice(6)?.map(
                                              (item, i) => (
                                                <div
                                                  key={i}
                                                  className="flex justify-between"
                                                >
                                                  <p className="text-xs">
                                                    {i + 1}. {item?.Company}
                                                  </p>
                                                  <p className="text-xs">
                                                    {~~(Math.random() * 100)}{" "}
                                                    รายการ
                                                  </p>
                                                </div>
                                              ),
                                            )}
                                            <div className="flex justify-between  font-bold text-primary">
                                              <p className="text-xs">รวม</p>
                                              <p className="overflow-hidden text-xs">
                                                {new Array(100)
                                                  .fill(0)
                                                  .map((_, i) => (
                                                    <span key={i}>.</span>
                                                  ))}
                                              </p>
                                              <p className="whitespace-nowrap text-xs">
                                                20 รายการ
                                              </p>
                                            </div>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                                  </div>
                                </div>
                              </article>
                            </PopoverContent>
                          </Popover>
                        </div>
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
