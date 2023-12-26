// import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { groupByField, sortByField } from "@/helpers/array.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { TSummaryPart2 } from "@/types";
import { forwardRef, useMemo } from "react";

const PrintPage = forwardRef((_, ref: any) => {
  const { summaryPart2, summaryPart1, registration, generalAssessmentForm } =
    useAtomStore();
  const HEADER_SIZE = 14;
  const NORMAL_SIZE = 12;

  interface CompanyInfo {
    label: string;
    value: string;
    colSpan?: number;
  }

  const { contact_person } = registration;
  const { approvals } = generalAssessmentForm;

  const findContact = (key: string) => {
    const result = contact_person?.find((item) => item?.position_en === key);
    return result;
  };

  const CompanyInfo: CompanyInfo[] = [
    {
      label: "ชื่อ Customer",
      value: registration?.company_information?.company_name ?? "-",
      colSpan: 2,
    },
    {
      label: "วันที่",
      value: registration?.created_at ?? "-",
      colSpan: 1,
    },
    {
      label: "ที่อยู่",
      value: registration?.company_information?.address ?? "-",
      colSpan: 3,
    },
    {
      label: "เลขประจำตัวผู้เสียภาษี",
      value: registration?.company_information?.juristic_id ?? "-",
      colSpan: 3,
    },
    {
      label: "ฝ่ายจัดซื้อ",
      value: findContact("scm_officer")?.name ?? "-",
      colSpan: 1,
    },
    {
      label: "เบอร์โทร",
      value: findContact("scm_officer")?.tel ?? "-",
      colSpan: 1,
    },
    {
      label: "Email",
      value: findContact("scm_officer")?.email ?? "-",
      colSpan: 1,
    },
    {
      label: "ผู้จัดการฝ่ายจัดซื้อ",
      value: findContact("accounting_department_manager")?.name ?? "-",
      colSpan: 1,
    },
    {
      label: "เบอร์โทร",
      value: findContact("accounting_department_manager")?.tel ?? "-",
      colSpan: 1,
    },
    {
      label: "Email",
      value: findContact("accounting_department_manager")?.email ?? "-",
      colSpan: 1,
    },
    {
      label: "ฝ่ายบัญชีและการเงิน",
      value: findContact("accounting_officer")?.name ?? "-",
      colSpan: 1,
    },
    {
      label: "เบอร์โทร",
      value: findContact("accounting_officer")?.tel ?? "-",
      colSpan: 1,
    },
    {
      label: "Email",
      value: findContact("accounting_officer")?.email ?? "-",
      colSpan: 1,
    },
    {
      label: "ผู้จัดการฝ่ายบัญชีและการเงิน",
      value: findContact("accounting_department_manager")?.name ?? "-",
      colSpan: 1,
    },
    {
      label: "เบอร์โทร",
      value: findContact("accounting_department_manager")?.tel ?? "-",
      colSpan: 1,
    },
    {
      label: "Email",
      value: findContact("accounting_department_manager")?.email ?? "-",
      colSpan: 1,
    },
    {
      label: "กรรมการผู้จัดการ",
      value: findContact("managing_director")?.name ?? "-",
      colSpan: 1,
    },
    {
      label: "เบอร์โทร",
      value: findContact("managing_director")?.tel ?? "-",
      colSpan: 1,
    },
    {
      label: "Email",
      value: findContact("managing_director")?.email ?? "-",
      colSpan: 1,
    },
    {
      label: "ผลิตภัณฑ์ที่ขาย",
      value: generalAssessmentForm?.products ?? "-",
      colSpan: 3,
    },
  ];

  const allSection = groupByField(summaryPart1, "topic_no_hint");

  const Section1: {
    label: string;
    activeScore: number;
    maxScore: number;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: `${allSection["1.1.1"]?.[0]?.topic_no_hint} ${allSection["1.1.1"]?.[0]?.label_th} (${allSection["1.1.1"]?.[0]?.label_en})`,
      activeScore: allSection["1.1.1"]?.[0]?.score,
      maxScore: allSection["1.1.1"]?.[0]?.max_score,
      data: [
        {
          Topic: "> 5,000 MB/Year",
          Score: 10,
        },
        {
          Topic: "> 1,000 - 5,000MB/Year",
          Score: 8,
        },
        {
          Topic: "> 500 - 1,000MB/Year",
          Score: 5,
        },
        {
          Topic: "≤ 500 MB/Year",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.1.2"]?.[0]?.topic_no_hint} ${allSection["1.1.2"]?.[0]?.label_th} (${allSection["1.1.2"]?.[0]?.label_en})`,
      activeScore: allSection["1.1.2"]?.[0]?.score,
      maxScore: allSection["1.1.2"]?.[0]?.max_score,
      data: [
        {
          Topic: "≥ 13",
          Score: 10,
        },
        {
          Topic: "< 13 - 8",
          Score: 8,
        },
        {
          Topic: "< 8 - 3",
          Score: 6,
        },
        {
          Topic: "< 3",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.1.3"]?.[0]?.topic_no_hint} ${allSection["1.1.3"]?.[0]?.label_th} (${allSection["1.1.3"]?.[0]?.label_en})`,
      activeScore: allSection["1.1.3"]?.[0]?.score,
      maxScore: allSection["1.1.3"]?.[0]?.max_score,
      data: [
        {
          Topic: "≤ 1.4",
          Score: 10,
        },
        {
          Topic: "> 1.4 - 2.0",
          Score: 8,
        },
        {
          Topic: "> 2.0 - 2.5",
          Score: 6,
        },
        {
          Topic: "> 2.50",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.1.4"]?.[0]?.topic_no_hint} ${allSection["1.1.4"]?.[0]?.label_th} (${allSection["1.1.4"]?.[0]?.label_en})`,
      activeScore: allSection["1.1.4"]?.[0]?.score,
      maxScore: allSection["1.1.4"]?.[0]?.max_score,
      data: [
        {
          Topic: "≥ 45",
          Score: 10,
        },
        {
          Topic: "< 45 - 30",
          Score: 8,
        },
        {
          Topic: "< 30 - 15",
          Score: 6,
        },
        {
          Topic: "< 15",
          Score: 0,
        },
      ],
    },
  ];

  const Section2: {
    label: string;
    activeScore: number;
    maxScore: number;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: `${allSection["1.2.1"]?.[0]?.topic_no_hint} ${allSection[
        "1.2.1"
      ]?.[0]?.label_th} ${
        allSection["1.2.1"]?.[0]?.label_en !== ""
          ? `(${allSection["1.2.1"]?.[0]?.label_en})`
          : ""
      }`,
      activeScore: allSection["1.2.1"]?.[0]?.score,
      maxScore: allSection["1.2.1"]?.[0]?.max_score,
      data: [
        {
          Topic: "≤ 65%",
          Score: 10,
        },
        {
          Topic: "> 65 - 75%",
          Score: 8,
        },
        {
          Topic: ">75 - 85%",
          Score: 5,
        },
        {
          Topic: "> 85%",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.2.2"]?.[0]?.topic_no_hint} ${allSection[
        "1.2.2"
      ]?.[0]?.label_th} ${
        allSection["1.2.2"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.2.2"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.2.2"]?.[0]?.score,
      maxScore: allSection["1.2.2"]?.[0]?.max_score,
      data: [
        {
          Topic: "> 300MB/Year",
          Score: 10,
        },
        {
          Topic: "> 80 - 300MB/Year",
          Score: 8,
        },
        {
          Topic: "> 20 - 80MB/Year",
          Score: 5,
        },
        {
          Topic: "≤ 20MB/Year",
          Score: 0,
        },
      ],
    },
  ];

  const Section3: {
    label: string;
    activeScore: number;
    maxScore: number;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: `${allSection["1.3.1"]?.[0]?.topic_no_hint} ${allSection[
        "1.3.1"
      ]?.[0]?.label_th} ${
        allSection["1.3.1"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.3.1"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.3.1"]?.[0]?.score,
      maxScore: allSection["1.3.1"]?.[0]?.max_score,
      data: [
        {
          Topic: "เงินสด - 30 วัน",
          Score: 10,
        },
        {
          Topic: "> 30 - 60 วัน",
          Score: 8,
        },
        {
          Topic: "> 60 - 90 วัน",
          Score: 5,
        },
        {
          Topic: "> 90 วัน",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.3.2"]?.[0]?.topic_no_hint} ${allSection[
        "1.3.2"
      ]?.[0]?.label_th} ${
        allSection["1.3.2"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.3.2"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.3.2"]?.[0]?.score,
      maxScore: allSection["1.3.2"]?.[0]?.max_score,
      data: [
        {
          Topic: "> 90 วัน",
          Score: 10,
        },
        {
          Topic: "> 60 - 90 วัน",
          Score: 8,
        },
        {
          Topic: "> 30 - 60 วัน",
          Score: 5,
        },
        {
          Topic: "≤ 30 วัน - เงินสด",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.3.3"]?.[0]?.topic_no_hint} ${allSection[
        "1.3.3"
      ]?.[0]?.label_th} ${
        allSection["1.3.3"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.3.3"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.3.3"]?.[0]?.score,
      maxScore: allSection["1.3.3"]?.[0]?.max_score,
      data: [
        {
          Topic: "3 วัน",
          Score: 10,
        },
        {
          Topic: "> 4 - 7 วัน",
          Score: 8,
        },
        {
          Topic: "> 8 - 10 วัน",
          Score: 5,
        },
        {
          Topic: "> 10 วัน",
          Score: 0,
        },
      ],
    },
  ];

  const Section4: {
    label: string;
    activeScore: number;
    maxScore: number;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: `${allSection["1.4.1"]?.[0]?.topic_no_hint} ${allSection[
        "1.4.1"
      ]?.[0]?.label_th} ${
        allSection["1.4.1"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.4.1"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.4.1"]?.[0]?.score,
      maxScore: allSection["1.4.1"]?.[0]?.max_score,
      data: [
        {
          Topic: "มีเพียงพอ",
          Score: 10,
        },
        {
          Topic: "ใช้ของลูกค้า",
          Score: 8,
        },
        {
          Topic: "ลงทุนเพิ่ม",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.4.2"]?.[0]?.topic_no_hint} ${allSection[
        "1.4.2"
      ]?.[0]?.label_th} ${
        allSection["1.4.2"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.4.2"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.4.2"]?.[0]?.score,
      maxScore: allSection["1.4.2"]?.[0]?.max_score,
      data: [
        {
          Topic: "ไม่ใช้แม่พิมพ์",
          Score: 10,
        },
        {
          Topic: "มีอยู่เพียงพอ",
          Score: 10,
        },
        {
          Topic: "ใช้ของลูกค้า",
          Score: 6,
        },
        {
          Topic: "ลงทุนเพิ่ม",
          Score: 0,
        },
      ],
    },
  ];

  const CalculateSection1 = () => {
    const sumScore = Section1?.reduce((a, b) => a + b?.activeScore, 0);
    const sumMaxScore = Section1?.reduce((a, b) => a + b?.maxScore, 0);
    const result = (sumScore / sumMaxScore) * 10;
    return Math.floor(result);
  };

  const CalculateSection2 = () => {
    const sumScore = Section2?.reduce((a, b) => a + b?.activeScore, 0);
    const sumMaxScore = Section2?.reduce((a, b) => a + b?.maxScore, 0);
    const result = (sumScore / sumMaxScore) * 10;
    return Math.floor(result);
  };

  const CalculateSection3 = () => {
    const sumScore = Section3?.reduce((a, b) => a + b?.activeScore, 0);
    const sumMaxScore = Section3?.reduce((a, b) => a + b?.maxScore, 0);
    const result = (sumScore / sumMaxScore) * 10;
    return Math.floor(result);
  };

  const CalculateSection4 = () => {
    const sumScore = Section4?.reduce((a, b) => a + b?.activeScore, 0);
    const sumMaxScore = Section4?.reduce((a, b) => a + b?.maxScore, 0);
    const result = (sumScore / sumMaxScore) * 10;
    return Math.floor(result);
  };

  const labelScore: {
    [key: number]: number;
    1: number;
    2: number;
    3: number;
    4: number;
  } = {
    1: CalculateSection1(),
    2: CalculateSection2(),
    3: CalculateSection3(),
    4: CalculateSection4(),
  };

  const CalculatePart1 = useMemo(() => {
    const sumScore = Object.values(labelScore).reduce((a, b) => a + b, 0);
    return sumScore;
  }, [labelScore]);

  const CalculatePart2 = () => {
    const sumScore = summaryPart2?.reduce((a, b) => a + b?.score, 0);
    const sumMaxScore = summaryPart2?.reduce((a, b) => a + b?.max_score, 0);
    const result = (sumScore / sumMaxScore) * 60;
    return Math.floor(result);
  };

  const CalculateGrade = (score: number) => {
    if (score >= 80) {
      return "A";
    } else if (score >= 60 && score <= 79.99) {
      return "B";
    } else if (score >= 50 && score <= 59.99) {
      return "C";
    } else {
      return "D";
    }
  };

  const Result = (grade: string) => {
    if (grade === "D") {
      return "ไม่ขาย";
    }
    return "ขาย";
  };

  const SummaryData = [
    {
      section_1: CalculatePart1,
      section_2: CalculatePart2() ?? "-",
      summary: CalculatePart1 + CalculatePart2(),
      grade: CalculateGrade(Math.floor(CalculatePart1 + CalculatePart2())),
      result: Result(
        CalculateGrade(Math.floor(CalculatePart1 + CalculatePart2())),
      ),
    },
  ];

  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        margin: "0 auto",
        // border: "1px solid red",
        padding: "0 20px 0 ",
      }}
      ref={ref}
      className="relative flex flex-col gap-2"
    >
      {new Array(2).fill(0).map((_, index) => (
        <div key={index} className="relative flex h-full flex-col gap-2">
          <section
            className={cn(
              "relative flex w-full items-center justify-center gap-2",
              index === 1 ? "hidden" : "",
            )}
          >
            <img src="/images/logo.webp" alt="logo" className="h-16 w-auto" />
            <div>
              <h1 style={{ fontSize: 16, fontWeight: "bold" }}>
                บริษัท เอส เอ็น ซี ฟอร์เมอร์ จำกัด (มหาชน) และบริษัทในเครือ ฯ
              </h1>
              <h2 style={{ fontSize: 16, fontWeight: "bold" }}>
                SNC Former Company Limited and subsidiaries
              </h2>
            </div>
          </section>
          {index === 0 && <div className="h-[3px] border-b border-black"></div>}
          <section
            className={cn(
              "flex w-full items-center justify-center gap-2",
              index === 1 ? "hidden" : "",
            )}
          >
            <h1
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textDecoration: "underline double",
              }}
            >
              แบบฟอร์มการคัดเลือกลูกค้าใหม่
            </h1>
          </section>
          <div className="flex flex-col gap-4">
            <div
              className={cn("flex flex-col gap-4", index === 1 ? "hidden" : "")}
            >
              <section className="flex w-full flex-col items-start justify-start gap-1">
                <h1
                  style={{ fontSize: HEADER_SIZE, fontWeight: "bold" }}
                  className="underline"
                >
                  รายละเอียดลูกค้า
                </h1>
                <article className="grid w-full grid-cols-3">
                  {CompanyInfo.map((item, index) => (
                    <div
                      key={index}
                      className={`col-span-${item.colSpan} flex flex-col gap-2`}
                    >
                      <div
                        style={{ fontSize: NORMAL_SIZE }}
                        className="flex items-center gap-1"
                      >
                        <p className="font-bold">{item.label}: </p>
                        <p className="font-normal">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </article>
              </section>
              <section className="flex w-full flex-col items-start justify-start gap-1">
                <h1
                  style={{ fontSize: HEADER_SIZE, fontWeight: "bold" }}
                  className="underline"
                >
                  ส่วนที่ 1 การเงินการลงทุน{" "}
                  <span>
                    (
                    {labelScore[1] +
                      labelScore[2] +
                      labelScore[3] +
                      labelScore[4]}
                    /40 คะแนน)
                  </span>
                </h1>
                <article className="w-full">
                  <p className="whitespace-nowrap text-[12px] font-bold">
                    1.1 รายได้และผลตอบแทนผู้ถือหุ้น ({labelScore[1]}/10 คะแนน)
                  </p>
                  {Section1?.map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-between gap-2"
                    >
                      <p className="whitespace-nowrap text-[12px]">
                        {item?.label}
                      </p>
                      <div className={`flex items-center gap-2`}>
                        <div className="flex items-center">
                          <strong className="text-[12px]">
                            {item?.activeScore ?? 0}
                          </strong>
                          <p className="whitespace-nowrap text-[12px] text-black">
                            /{item?.maxScore ? item?.maxScore : 0} &nbsp; คะแนน
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </article>
                <article className="w-full">
                  <p className="whitespace-nowrap text-[12px] font-bold">
                    1.2 ออร์เดอร์และสัดส่วนวัตถุดิบ ({labelScore[2]}/10 คะแนน)
                  </p>
                  {Section2?.map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-between gap-2"
                    >
                      <p className="whitespace-nowrap text-[12px]">
                        {item?.label}
                      </p>
                      <div className={`flex items-center gap-2`}>
                        <div className="flex items-center">
                          <strong className="text-[12px]">
                            {item?.activeScore ?? 0}
                          </strong>
                          <p className="whitespace-nowrap text-[12px] text-black">
                            /{item?.maxScore ? item?.maxScore : 0} &nbsp; คะแนน
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </article>
                <article className="w-full">
                  <p className="whitespace-nowrap text-[12px] font-bold">
                    1.3 เครดิตเทอมและสินค้าคงคลัง ({labelScore[3]}/10 คะแนน)
                  </p>
                  {Section3?.map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-between gap-2"
                    >
                      <p className="whitespace-nowrap text-[12px]">
                        {item?.label}
                      </p>
                      <div className={`flex items-center gap-2`}>
                        <div className="flex items-center">
                          <strong className="text-[12px]">
                            {item?.activeScore ?? 0}
                          </strong>
                          <p className="whitespace-nowrap text-[12px] text-black">
                            /{item?.maxScore ? item?.maxScore : 0} &nbsp; คะแนน
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </article>
                <article className="w-full">
                  <p className="whitespace-nowrap text-[12px] font-bold">
                    1.4 การลงทุนเครื่องจักร และแม่พิมพ์ ({labelScore[4]}/10
                    คะแนน)
                  </p>
                  {Section4?.map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-between gap-2"
                    >
                      <p className="whitespace-nowrap text-[12px]">
                        {item?.label}
                      </p>
                      <div className={`flex items-center gap-2`}>
                        <div className="flex items-center">
                          <strong className="text-[12px]">
                            {item?.activeScore ?? 0}
                          </strong>
                          <p className="whitespace-nowrap text-[12px] text-black">
                            /{item?.maxScore ? item?.maxScore : 0} &nbsp; คะแนน
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </article>
              </section>
              <section className="flex w-full flex-col items-start justify-start gap-1">
                <h1
                  style={{ fontSize: HEADER_SIZE, fontWeight: "bold" }}
                  className="underline"
                >
                  ส่วนที่ 2 การจัดการ เงื่อนไข และนโยบาย ({CalculatePart2()}/60
                  คะแนน)
                </h1>
                <article className="flex w-full flex-col overflow-hidden">
                  {sortByField(summaryPart2, "topic_no")?.map(
                    (evaluate: TSummaryPart2, i) => (
                      <div
                        key={i}
                        className="flex w-full items-center justify-between gap-2"
                      >
                        <p className="truncate whitespace-nowrap text-[12px]">
                          {i + 1}. {evaluate?.label_th}{" "}
                          {evaluate?.label_en !== ""
                            ? `(${evaluate?.label_en})`
                            : null}
                        </p>
                        <div className={`flex items-center gap-2`}>
                          <div className="flex items-center">
                            <strong className="text-[12px]">
                              {evaluate?.score ?? 0}
                            </strong>
                            <p className="whitespace-nowrap text-[12px] text-black">
                              /{evaluate?.max_score ? evaluate?.max_score : 0}{" "}
                              &nbsp; คะแนน
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </article>
              </section>
            </div>

            <section
              className={cn(
                "flex w-full flex-col items-start justify-start gap-1",
                "pagebreak",
                index === 0 ? "" : "hidden",
              )}
            >
              <h1
                style={{ fontSize: HEADER_SIZE, fontWeight: "bold" }}
                className="underline"
              >
                ส่วนที่ 3 สรุปผลการประเมิน
              </h1>
              <article className="flex w-full flex-col overflow-hidden">
                <div>
                  <Table>
                    <TableHeader className="bg-secondary text-xs font-bold text-white">
                      <TableRow>
                        <TableHead
                          colSpan={5}
                          className="border border-black text-center font-bold text-secondary-foreground"
                        >
                          สรุปผลการประเมิน (Assessment Summary)
                        </TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead className="border border-black text-center font-bold text-secondary-foreground">
                          ส่วนที่ 1: การเงินและการลงทุน (40)
                        </TableHead>
                        <TableHead className="border border-black text-center font-bold text-secondary-foreground">
                          ส่วนที่ 2: การจัดการ เงื่อนไข และนโยบาย (60)
                        </TableHead>
                        <TableHead className="border border-black text-center font-bold text-secondary-foreground">
                          คะแนนรวม (100)
                        </TableHead>
                        <TableHead className="flex items-center justify-center gap-2 text-center font-bold text-secondary-foreground">
                          <p className="flex items-center justify-center">
                            เกรด (Grade)
                          </p>
                        </TableHead>
                        <TableHead className="border border-black text-center font-bold text-secondary-foreground">
                          สรุปผล
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SummaryData?.map((item, i) => (
                        <TableRow key={i} className="h-14">
                          <TableCell className="border border-black text-center text-lg font-bold">
                            {item?.section_1}
                          </TableCell>
                          <TableCell className="border border-black text-center text-lg font-bold">
                            {item?.section_2}
                          </TableCell>
                          <TableCell className="border border-black text-center text-lg font-bold">
                            {item?.summary}
                          </TableCell>
                          <TableCell className="border border-black text-center text-lg font-bold">
                            {item?.grade}
                          </TableCell>
                          <TableCell
                            className={cn(
                              "border border-black text-center text-lg font-bold",
                              item?.result === "ไม่ขาย"
                                ? "text-red-500"
                                : "text-green-500",
                            )}
                          >
                            {item?.result}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </article>
            </section>
            <section
              className={cn(
                "flex w-full flex-col items-center justify-start gap-1",
                index === 0 ? "" : "hidden",
              )}
            >
              <article className="grid w-full grid-cols-5 gap-2">
                {approvals
                  ?.sort((a, b) => a?.order_no - b?.order_no)
                  ?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative col-span-1 flex h-[8rem] flex-col gap-2 border border-black`}
                    >
                      <div
                        style={{ fontSize: NORMAL_SIZE }}
                        className="flex flex-col items-center gap-1"
                      >
                        <p className="w-full border-b border-black p-1 text-center font-bold">
                          {item.issued_by}:{" "}
                        </p>
                        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-1 font-normal">
                          <p className="w-full border-black p-1 text-center text-[12px]">
                            {item.is_approved === true
                              ? `${item.issued_by}`
                              : item.is_approved === false
                              ? `${item.issued_by} (ไม่อนุมัติ)`
                              : item?.is_approved === null
                              ? `${item.issued_by} (รออนุมัติ)`
                              : null}
                          </p>
                        </div>
                      </div>
                      <p className="absolute bottom-0 w-full border-black p-1 text-center text-[8px] font-bold">
                        {item?.issued_at}
                      </p>
                    </div>
                  ))}
              </article>
            </section>
          </div>
          {index === 1 && (
            <div
              style={{
                height: "1500px",
                width: "100%",
              }}
              className="pagebreak relative"
            >
              <p className="absolute bottom-0  right-0 text-xs">page 1 of 2</p>
            </div>
          )}
          {index === 0 && (
            <p className={cn("absolute  right-0 text-xs", "bottom-0")}>
              page 1 of 1
            </p>
          )}
        </div>
      ))}
    </div>
  );
});

export default PrintPage;
