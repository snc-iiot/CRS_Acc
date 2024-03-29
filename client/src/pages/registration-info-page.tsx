import ActionTab from "@/components/common/actions-tab";
import TreeMap from "@/components/common/chart/tree-map";
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
  Relationship,
  ShareholderProportion,
  StandardsCertifications,
  UploadDocuments,
} from "@/components/pages/registration-info-page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select } from "@/components/ui/select-custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getDateThai } from "@/helpers/calendar.helper";
import { MODE_CODE } from "@/helpers/common.helper";
import { ConditionHeight, DisableTabs, InitialTabs, PermissionSubAction } from "@/helpers/permission.helper";
import { status } from "@/helpers/status.helper";
import { CommentType } from "@/helpers/utils.helpers";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { useForm, useUtils } from "@/services/";
import { useFormGeneral } from "@/services/hooks/use-general-form";
import { useProfile } from "@/services/hooks/use-profile";
import { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { PrintPage } from ".";

const RegistrationInfo: FC = () => {
  const location = useLocation();
  const state_location = location.state as any;
  const form_mode = state_location?.form_mode || "";

  const {
    profile: { role },
  } = useProfile();
  const {
    mutateGetApprovalsById,
    mutateGetTemplateGeneralAssessmentById,
    mutateGetSummaryPart1,
    mutateGetSummaryPart2,
    mutateGetCompanyProfile,
  } = useFormGeneral();
  const { comment, registration, generalAssessmentForm, setCommon, dataRegisCount } = useAtomStore();
  const { confirmSwal, showError, showLoading, closeSwal } = useSwal();
  const [searchParams] = useSearchParams();
  const { mutateGetRegisById } = useForm();
  const {
    mutateGetDocByRegisId,
    mutateGetCommentByRegisId,
    mutateCreateComment,
    mutateGetDBDInfo,
    mutateGetCommentByRegisIdR3,
    mutateGetFinancialRatio,
  } = useUtils();
  const RegisID = searchParams.get("RegisID");
  const navigate = useNavigate();
  const [viewPage, setViewPage] = useState<string>("2");
  const [activeTab, setActiveTab] = useState<string>("R1");
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string[]>([]);
  const [commentText, setCommentText] = useState<string>("");

  const mainActions = ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"];

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    pageStyle: "@page { size: A4; }",
    content: () => componentRef.current,
  });

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
      title: "มาตรฐานและการรับรองที่ได้รับในปัจจุบัน / Standards and Certifications",
      content: <StandardsCertifications />,
    },
    {
      topic: "topic-6",
      title: "เอกสารอัพโหลด / Upload Documents",
      content: <UploadDocuments />,
    },
  ];

  const getInfoById = async () => {
    try {
      showLoading("กำลังโหลดข้อมูล", "กรุณารอสักครู่");
      await Promise.all([
        mutateGetDocByRegisId(RegisID as string),
        mutateGetRegisById(RegisID as string),
        mutateGetApprovalsById(RegisID as string),
        mutateGetTemplateGeneralAssessmentById(RegisID as string),
        mutateGetCommentByRegisId(RegisID as string),
        mutateGetDBDInfo(RegisID as string),
        mutateGetCommentByRegisIdR3(RegisID as string),
        mutateGetFinancialRatio(RegisID as string),
        mutateGetSummaryPart2(RegisID as string),
        mutateGetCompanyProfile(RegisID as string),
        mutateGetSummaryPart1(RegisID as string),
      ]);
      if (form_mode === "") {
        setTimeout(() => {
          closeSwal();
        }, 1000);
      }
    } catch (error) {
      showError("ไม่สามารถดึงข้อมูลได้", "เกิดข้อผิดพลาด");
    }
  };

  const confirmEdit = async () => {
    if (form_mode === "edit") {
      const isConfirmed = await confirmSwal(
        "แจ้งเตือน",
        "ท่านได้มีการเเก้ไขข้อมูลส่วนของลูกค้า(ฝั่งซ้าย) ซึ่งอาจส่งผลต่อการประเมิน(ฝั่งขวา) กรุณาตรวจสอบความถูกต้องฝั่งขวาอีกครั้ง หากต้องการยืนยันเพื่อส่งเข้าสายอนุมัติ กรุณาคลิกที่ปุ่ม เเก้ไขข้อมูลแบบฟอร์มประเมินลูกค้า เเละ ยืนยันการเเก้ไขข้อมูลแบบฟอร์มประเมินลูกค้า",
        "ดำเนินการต่อ",
        undefined,
        false
      );
      if (isConfirmed) {
        navigate(`/registrations/customer/info?RegisID=${RegisID}`, {
          state: {
            form_mode: "",
          },
          replace: true,
        });
      }
    } else if (form_mode === "") {
      getInfoById();
    }
  };

  useEffect(() => {
    if (!RegisID) navigate("/registration");
    confirmEdit();
  }, [RegisID, form_mode]);

  useEffect(() => {
    if (registration?.status_no === 1) {
      setCommon((prev) => ({
        ...prev,
        isEditGeneralAssessmentForm:
          role == "approver" || role == "sap-code" || role == "fi" || role == "viewer" ? false : true,
      }));
    }
  }, [registration?.status_no]);

  useEffect(() => {
    if (!role || !registration?.status_no) return;
    if (role === "admin" || role === "user" || role === "fi" || role === "sap-code") {
      if (registration?.status_no >= 4) {
        setActiveTab("R4");
      } else {
        setActiveTab("R1");
      }
    } else if (role === "approver") {
      setActiveTab(InitialTabs(registration?.status_no as number));
    }
  }, [role, registration?.status_no]);

  return (
    <FadeIn>
      <div className="relative h-[100dvh] w-full">
        <div
          className={cn(
            "fixed bottom-2 left-2 z-50",
            "grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-sm border p-2 hover:translate-x-1",
            "bg-primary-foreground"
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.arrowLeft className="h-5 w-5" onClick={() => navigate("/registrations")} />
              </TooltipTrigger>
              <TooltipContent side="right">
                <span>กลับ</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <header className="relative grid h-[3rem] w-full grid-cols-2 border-b-2">
          <div className="flex h-full items-center justify-start gap-2 px-4">
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
            <Badge
              className={cn(
                "text-md ml-2 h-9 font-bold",
                status?.find((item) => item?.status_id === registration?.status_no)?.status_color
              )}
            >
              {generalAssessmentForm?.status_desc_th} &nbsp;
            </Badge>
            {/* {registration?.status_no === 8 && (
              <div className="flex flex-col border-x-2 px-1 text-right">
                <h1 className="text-md font-semibold">รหัสลูกค้า: {generalAssessmentForm?.customer_code}</h1>
                <p className="text-[8px]">
                  วันและเวลาที่กรอกรหัสลูกค้า:{" "}
                  {getDateThai(generalAssessmentForm?.filled_customer_code_at || "").dateTime}
                </p>
              </div>
            )} */}
            <Button
              variant="outline"
              onClick={() => {
                handlePrint();
              }}
              className={cn(
                registration?.status_no !== 8 && registration?.status_no !== 7 && registration?.status_no !== 5
                  ? "hidden"
                  : "flex items-center gap-2"
              )}
            >
              <Icons.printer className="h-5 w-5" />
              Print PDF
            </Button>
          </div>
        </header>
        <div
          style={{
            display: "none",
          }}
        >
          <PrintPage ref={componentRef} />
        </div>
        <main className="h-[calc(100%-3rem)]">
          <div className={cn("grid h-full", viewPage == "2" ? "grid-cols-3" : "grid-cols-1")}>
            {/* //! Left Content */}
            <div
              className={cn(
                "relative h-full overflow-y-auto border-r-2 p-1",
                viewPage == "R" ? "hidden delay-500" : "block"
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-md font-bold">รายละเอียดบริษัทลูกค้า / Customer Details</h3>
                <h3
                  className="cursor-pointer text-sm text-primary hover:underline"
                  onClick={() => {
                    setIsOpenAccordion(!isOpenAccordion);
                    if (isOpenAccordion) {
                      setActiveAccordion([]);
                    } else {
                      setActiveAccordion(leftAccordionList?.map((item) => item?.topic));
                    }
                  }}
                >
                  {leftAccordionList?.filter((item) => activeAccordion.includes(item?.topic))?.length > 0 &&
                  isOpenAccordion
                    ? "Collapse"
                    : leftAccordionList?.filter((item) => activeAccordion.includes(item?.topic))?.length > 0 &&
                      !isOpenAccordion
                    ? "Explode"
                    : "Explode"}
                </h3>
              </div>

              <Accordion type="multiple" className="mb-[3rem]" value={activeAccordion}>
                {leftAccordionList?.map((item, i) => (
                  <AccordionItem value={item?.topic} key={i}>
                    <AccordionTrigger
                      className="py-1 text-xs font-bold"
                      onClick={() => {
                        if (activeAccordion.includes(item?.topic)) {
                          setActiveAccordion(activeAccordion.filter((topic) => topic !== item?.topic));
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
              <div className={cn("fixed bottom-2 flex justify-end pr-8", viewPage == "L" ? "w-full" : "w-1/3")}>
                <Button
                  className={cn(
                    "flex items-center whitespace-nowrap bg-yellow-500 text-sm hover:bg-yellow-500/80",
                    (registration?.status_no === 1 || registration?.status_no === 3) &&
                      (role == "user" || role == "admin")
                      ? "flex"
                      : role === "approver" || role === "sap-code"
                      ? "hidden"
                      : "hidden"
                    // role === "approver" ? "hidden" : "",
                    // role === "sap-code" ? "hidden" : "",
                  )}
                  onClick={async () => {
                    const isConfirm = await confirmSwal("แก้ไขข้อมูลลูกค้า", "คุณต้องการแก้ไขข้อมูลลูกค้าใช่หรือไม่");
                    if (isConfirm)
                      navigate(`/registrations/customer/register?RegisID=${RegisID}&mode=${MODE_CODE.EDIT}`);
                  }}
                >
                  <Icons.edit className="mr-2 inline-block h-5 w-5" />
                  <p className="inline-block">แก้ไขข้อมูลลูกค้า</p>
                </Button>
              </div>
            </div>
            {/* //! Right Content */}
            <div className={cn("relative h-full px-1 py-0", viewPage == "L" ? "hidden delay-500" : "col-span-2 block")}>
              <div
                className={cn(
                  "relative",
                  PermissionSubAction(registration?.status_no as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, role).includes(
                    activeTab
                  )
                    ? "h-[calc(66%-0.5rem)] "
                    : role === "approver" || role === "sap-code" || role === "fi" || role === "viewer"
                    ? ConditionHeight(registration?.status_no as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)
                    : "h-[calc(73%-0.5rem)]"
                )}
              >
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="h-full">
                  <nav className="fixed right-[0.325rem] top-[0.325rem]">
                    <TabsList>
                      {TabList.map((info, i) => (
                        <TabsTrigger
                          key={i}
                          value={info?.value}
                          disabled={
                            !DisableTabs(info?.value as "R2" | "R3" | "R4" | "R5", registration?.status_no as number)
                          }
                        >
                          {info.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </nav>
                  <TabsContent value="R1" className="h-full overflow-auto">
                    {registration?.status_no === 8 && (
                      <div className="py-b sticky top-0 z-20 mb-1 flex flex-col border-b bg-white px-1 pb-2 text-right">
                        <h1 className="text-lg font-semibold">รหัสลูกค้า: {generalAssessmentForm?.customer_code}</h1>
                        <p className="text-xs">
                          วันและเวลาที่กรอกรหัสลูกค้า:{" "}
                          {getDateThai(generalAssessmentForm?.filled_customer_code_at || "")?.dateTime}
                        </p>
                      </div>
                    )}
                    <div className="flex h-0 flex-grow flex-col">
                      <R1Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R2" className="h-full overflow-auto">
                    {registration?.status_no === 8 && (
                      <div className="py-b sticky top-0 z-20 mb-1 flex flex-col border-b bg-white px-1 pb-2 text-right">
                        <h1 className="text-lg font-semibold">รหัสลูกค้า: {generalAssessmentForm?.customer_code}</h1>
                        <p className="text-xs">
                          วันและเวลาที่กรอกรหัสลูกค้า:{" "}
                          {getDateThai(generalAssessmentForm?.filled_customer_code_at || "")?.dateTime}
                        </p>
                      </div>
                    )}
                    <div className="flex h-0 flex-grow flex-col">
                      <R2Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R3" className="h-full overflow-auto">
                    {registration?.status_no === 8 && (
                      <div className="py-b sticky top-0 z-20 mb-1 flex flex-col border-b bg-white px-1 pb-2 text-right">
                        <h1 className="text-lg font-semibold">รหัสลูกค้า: {generalAssessmentForm?.customer_code}</h1>
                        <p className="text-xs">
                          วันและเวลาที่กรอกรหัสลูกค้า:{" "}
                          {getDateThai(generalAssessmentForm?.filled_customer_code_at || "")?.dateTime}
                        </p>
                      </div>
                    )}
                    <div className="flex h-0 flex-grow flex-col">
                      <R3Form />
                    </div>
                  </TabsContent>
                  <TabsContent value="R4" className="h-full overflow-auto">
                    {registration?.status_no === 8 && (
                      <div className="py-b sticky top-0 z-20 mb-1 flex flex-col border-b bg-white px-1 pb-2 text-right">
                        <h1 className="text-lg font-semibold">รหัสลูกค้า: {generalAssessmentForm?.customer_code}</h1>
                        <p className="text-xs">
                          วันและเวลาที่กรอกรหัสลูกค้า:{" "}
                          {getDateThai(generalAssessmentForm?.filled_customer_code_at || "").dateTime}
                        </p>
                      </div>
                    )}
                    <div className="flex h-0 flex-grow flex-col">
                      <R4Form />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              {/* //! Action by user */}
              {PermissionSubAction(registration?.status_no as number, role).includes(activeTab) ? (
                <div className="flex h-[7%] items-center justify-between border border-b-0 px-2">
                  <ActionTab activeTab={activeTab as "R2" | "R3" | "R4" | "R5"} />
                </div>
              ) : null}
              {/* //! Comments & Other */}
              <div className="grid h-[20%] grid-cols-2">
                <div className="h-full border border-r-0">
                  <main className="flex h-full w-full flex-col overflow-hidden">
                    <section className="flex items-center px-2 py-1">
                      <h2 className="px-2 py-1 text-sm font-semibold underline">ข้อเสนอแนะ / Comments</h2>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Icons.helpCircle className="h-4 w-4 text-primary" />
                        </PopoverTrigger>
                        <PopoverContent className="p-2" side="bottom" align="start">
                          <h3 className="text-xs font-semibold">หมายเหตุ / Note</h3>
                          {CommentType?.map((item, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <div className={cn("inline-block h-2 w-2 rounded-full text-primary", item?.color)} />
                              <p className="text-xs">{item?.label}</p>
                            </li>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </section>
                    <section className="flex h-full w-full flex-col">
                      {comment?.comments?.length === 0 ? (
                        <div className="flex h-full justify-end">
                          <p className="text-xs">ไม่มีข้อเสนอแนะ / No comments</p>
                        </div>
                      ) : (
                        <div className="flex h-0 flex-grow flex-col gap-1 overflow-y-auto px-2 text-xs">
                          {comment?.comments?.length === 0 && (
                            <div className="flex justify-center">
                              <p className="text-xs">ไม่มีข้อเสนอแนะ / No comments</p>
                            </div>
                          )}
                          {comment?.comments
                            ?.sort((a, b) => new Date(b?.created_at)?.getTime() - new Date(a?.created_at)?.getTime())
                            ?.map((item, i) => (
                              <div className="grid grid-cols-10 gap-2" key={i}>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="col-span-5 flex w-full  items-center gap-1">
                                        <div
                                          className={cn(
                                            "inline-block h-2 w-2 rounded-full text-primary",
                                            CommentType?.find((type) => type?.name === item?.comments_type)?.color
                                          )}
                                        />
                                        <p className="w-full text-xs">{item?.comments}</p>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{item?.comments}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <p className="col-span-5 text-right text-xs">
                                  {item?.name_en} {item?.created_at}
                                </p>
                              </div>
                            ))}
                        </div>
                      )}
                    </section>
                    <section className="px-2 py-1">
                      <Popover>
                        <PopoverTrigger
                          className={cn(
                            "text-xs text-primary",
                            (role !== "admin" && role !== "user" && role !== "approver") ||
                              (registration?.status_no ?? 0) > 5
                              ? "pointer-events-none opacity-50"
                              : ""
                          )}
                        >
                          เพิ่มข้อเสนอแนะ
                        </PopoverTrigger>
                        <PopoverContent align="start" className="h-60 w-72 p-1 shadow-sm">
                          <main className="flex h-full w-full flex-col gap-2 overflow-hidden p-1">
                            <h2 className="px-2 py-1 text-sm font-semibold underline">
                              เพิ่มข้อเสนอแนะ / Add Comments
                            </h2>
                            <form
                              className="flex h-full w-full flex-col gap-2 overflow-hidden p-1"
                              onSubmit={async (e) => {
                                e.preventDefault();
                                const isConfirm = await confirmSwal(
                                  "บันทึกข้อเสนอแนะ",
                                  "คุณต้องการบันทึกข้อเสนอแนะทางการเงินหรือไม่"
                                );
                                if (isConfirm) {
                                  await mutateCreateComment({
                                    comment: commentText,
                                    regisId: RegisID ?? "",
                                  });
                                  setCommentText("");
                                }
                              }}
                            >
                              <Textarea
                                className="h-full w-full"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required
                              />
                              <div className="text-end">
                                <Button size="sm" type="submit">
                                  บันทึก
                                </Button>
                              </div>
                            </form>
                          </main>
                        </PopoverContent>
                      </Popover>
                    </section>
                  </main>
                </div>
                <div className="relative h-full border">
                  {/* <Popover>
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
                  </Popover> */}
                  <main className="flex h-full w-full flex-col overflow-hidden ">
                    <section>
                      <h2 className="px-2 py-1 text-sm font-semibold underline">
                        ประวัติขึ้นทะเบียนผู้ซื้อ{" "}
                        <span className="text-xs text-red-600">**ไม่รวมรายการนี้ / Exclude this form</span>
                      </h2>
                    </section>
                    <section className="grid h-full w-full grid-cols-2">
                      <div className="col-span-2 h-full w-full flex-grow overflow-y-auto">
                        {/* <BarChartHorizontal
                          data={dataRegisCount
                            ?.filter(
                              ({ company }) =>
                                company !== "Undefine" && company !== "SNC",
                            )
                            ?.map(({ company, regis_count }, i) => ({
                              name: company,
                              value: regis_count,
                              color: COLORS_SERIES[9 + i],
                            }))
                            ?.sort((a, b) => b?.value - a?.value)}
                          keyMap={["value", "name"]}
                          label="รายการ"
                          keyXAxis="name"
                          keyYAxis="value"
                          isLabelInside={true}
                          barFontSize={8}
                        /> */}
                        <TreeMap
                          data={dataRegisCount
                            ?.filter(({ regis_count }) => regis_count > 0)
                            ?.map(({ company, regis_count }) => ({
                              name: company,
                              children: [{ name: company, size: regis_count }],
                            }))}
                          dashboardMode={false}
                        />
                      </div>
                      {/* <div className="relative flex h-full w-full flex-col">
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
                      </div> */}
                    </section>
                  </main>
                </div>
              </div>
              {/* //! Right Footer */}
              {mainActions.includes(activeTab) ? (
                <div className="h-[7%] border-t-0">
                  <MainActions activeTab={activeTab as "R1" | "R2" | "R3" | "R4"} />
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </FadeIn>
  );
};

export default RegistrationInfo;
