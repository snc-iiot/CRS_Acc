import { Icons } from "@/components/common/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { groupByField } from "@/helpers/array.helper";
import { CopyToClipboardCustom } from "@/hooks/use-copy-to-clipboard";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { FC, Fragment, useMemo } from "react";
import {
  AssessmentDetailsSectionComponent,
  EvaluateFormComponent,
} from "../../evaluate";

const R4Form: FC = () => {
  const { summaryPart2, companyProfile, summaryPart1 } = useAtomStore();
  const allSection = groupByField(summaryPart1, "topic_no_hint");

  const Section1: {
    label: string;
    activeScore: number;
    maxScore: number;
  }[] = [
    {
      label: `${allSection["1.1.1"]?.[0]?.topic_no_hint} ${allSection["1.1.1"]?.[0]?.label_th} (${allSection["1.1.1"]?.[0]?.label_en})`,
      activeScore: allSection["1.1.1"]?.[0]?.score,
      maxScore: allSection["1.1.1"]?.[0]?.max_score,
    },
    {
      label: `${allSection["1.1.2"]?.[0]?.topic_no_hint} ${allSection["1.1.2"]?.[0]?.label_th} (${allSection["1.1.2"]?.[0]?.label_en})`,
      activeScore: allSection["1.1.2"]?.[0]?.score,
      maxScore: allSection["1.1.2"]?.[0]?.max_score,
    },
    {
      label: `${allSection["1.1.3"]?.[0]?.topic_no_hint} ${allSection["1.1.3"]?.[0]?.label_th} (${allSection["1.1.3"]?.[0]?.label_en})`,
      activeScore: allSection["1.1.3"]?.[0]?.score,
      maxScore: allSection["1.1.3"]?.[0]?.max_score,
    },
    {
      label: `${allSection["1.1.4"]?.[0]?.topic_no_hint} ${allSection["1.1.4"]?.[0]?.label_th} (${allSection["1.1.4"]?.[0]?.label_en})`,
      activeScore: allSection["1.1.4"]?.[0]?.score,
      maxScore: allSection["1.1.4"]?.[0]?.max_score,
    },
  ];

  const Section2: {
    label: string;
    activeScore: number;
    maxScore: number;
  }[] = [
    {
      label: `${allSection["1.2.1"]?.[0]?.topic_no_hint} ${allSection["1.2.1"]?.[0]?.label_th} (${allSection["1.2.1"]?.[0]?.label_en})`,
      activeScore: allSection["1.2.1"]?.[0]?.score,
      maxScore: allSection["1.2.1"]?.[0]?.max_score,
    },
    {
      label: `${allSection["1.2.2"]?.[0]?.topic_no_hint} ${allSection["1.2.2"]?.[0]?.label_th} (${allSection["1.2.2"]?.[0]?.label_en})`,
      activeScore: allSection["1.2.2"]?.[0]?.score,
      maxScore: allSection["1.2.2"]?.[0]?.max_score,
    },
  ];

  const Section3: {
    label: string;
    activeScore: number;
    maxScore: number;
  }[] = [
    {
      label: `${allSection["1.3.1"]?.[0]?.topic_no_hint} ${allSection["1.3.1"]?.[0]?.label_th} (${allSection["1.3.1"]?.[0]?.label_en})`,
      activeScore: allSection["1.3.1"]?.[0]?.score,
      maxScore: allSection["1.3.1"]?.[0]?.max_score,
    },
    {
      label: `${allSection["1.3.2"]?.[0]?.topic_no_hint} ${allSection["1.3.2"]?.[0]?.label_th} (${allSection["1.3.2"]?.[0]?.label_en})`,
      activeScore: allSection["1.3.2"]?.[0]?.score,
      maxScore: allSection["1.3.2"]?.[0]?.max_score,
    },
    {
      label: `${allSection["1.3.3"]?.[0]?.topic_no_hint} ${allSection["1.3.3"]?.[0]?.label_th} (${allSection["1.3.3"]?.[0]?.label_en})`,
      activeScore: allSection["1.3.3"]?.[0]?.score,
      maxScore: allSection["1.3.3"]?.[0]?.max_score,
    },
  ];

  const Section4: {
    label: string;
    activeScore: number;
    maxScore: number;
  }[] = [
    {
      label: `${allSection["1.4.1"]?.[0]?.topic_no_hint} ${allSection["1.4.1"]?.[0]?.label_th} (${allSection["1.4.1"]?.[0]?.label_en})`,
      activeScore: allSection["1.4.1"]?.[0]?.score,
      maxScore: allSection["1.4.1"]?.[0]?.max_score,
    },
    {
      label: `${allSection["1.4.2"]?.[0]?.topic_no_hint} ${allSection["1.4.2"]?.[0]?.label_th} (${allSection["1.4.2"]?.[0]?.label_en})`,
      activeScore: allSection["1.4.2"]?.[0]?.score,
      maxScore: allSection["1.4.2"]?.[0]?.max_score,
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

  const companyInformation: { label: string; value: string }[] = [
    {
      label: "บริษัทลูกค้า (Company Name)",
      value: companyProfile?.company_name ?? "-",
    },
    {
      label: "ขึ้นทะเบียนกับบริษัท (To Register With)",
      value: `[${companyProfile?.company_admin ?? "-"}] ${
        companyProfile?.company_full_name_th ?? "-"
      }`,
    },
    {
      label: "สินค้า (Product)",
      value: companyProfile?.products ?? "-",
    },
    {
      label: "ประเภทกิจการ (Type of Business)",
      value: companyProfile?.business_type_th ?? "-",
    },
  ];

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

  const GradeDetail = [
    {
      label: "A",
      value: "80 - 100",
    },
    {
      label: "B",
      value: "60 - 79.99",
    },
    {
      label: "C",
      value: "50 - 59.99",
    },
    {
      label: "D",
      value: "0 - 49.99",
    },
  ];

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

  // useMemo(() => {
  //   const sumScore = Object.values(labelScore).reduce((a, b) => a + b, 0);
  //   setCalculatePart1(sumScore);
  // }, [labelScore]);

  // cal part2: (Σ score / Σ max_score) x 60

  const AssessmentDetails = [
    {
      label: `ส่วนที่ 1: การเงินและการลงทุน (${CalculatePart1}/40 คะแนน)`,
      component: <AssessmentDetailsSectionComponent />,
    },
    {
      label: `ส่วนที่ 2: การจัดการ เงื่อนไข และนโยบาย (${CalculatePart2()}/60 คะแนน)`,
      component: <EvaluateFormComponent />,
    },
  ];

  if (summaryPart1.length === 0 || summaryPart2.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-2xl font-bold text-gray-400">
          ไม่มีข้อมูลการประเมิน
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col gap-4">
      <h3 className="text-base font-bold">
        สรุปผลการประเมินคะแนน (Assessment Result)
      </h3>
      <div className="grid grid-cols-4 gap-1 pl-1 pr-4 text-xs">
        {companyInformation?.map((item, i) => (
          <Fragment key={i}>
            <h4>{item?.label}</h4>
            <div className="col-span-3 flex items-center gap-x-1">
              <CopyToClipboardCustom
                text={item?.value}
                delay={500}
                className="h-3 w-3"
              />
              <p className="w-full truncate border-b text-primary">
                {item?.value}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div>
        <Table>
          <TableHeader className="bg-secondary text-xs font-bold text-white">
            <TableRow>
              <TableHead
                colSpan={5}
                className="border text-center font-bold text-secondary-foreground"
              >
                สรุปผลการประเมิน (Assessment Summary)
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="border text-center font-bold text-secondary-foreground">
                ส่วนที่ 1: การเงินและการลงทุน (40)
              </TableHead>
              <TableHead className="border text-center font-bold text-secondary-foreground">
                ส่วนที่ 2: การจัดการ เงื่อนไข และนโยบาย (60)
              </TableHead>
              <TableHead className="border text-center font-bold text-secondary-foreground">
                คะแนนรวม (100)
              </TableHead>
              <TableHead className="flex items-center justify-center gap-2 border text-center font-bold text-secondary-foreground">
                <p className="flex items-center justify-center">เกรด (Grade)</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Icons.helpCircle className="h-4 w-4" />
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex flex-col gap-1 p-2"
                    side="bottom"
                    align="end"
                  >
                    <h2 className="text-sm font-bold">
                      เกณฑ์การประเมิน (Assessment Criteria)
                    </h2>
                    <Table>
                      <TableHeader className="bg-secondary">
                        <TableRow className="text-xs text-black">
                          <TableHead className="border font-semibold text-secondary-foreground">
                            เกรด
                          </TableHead>
                          <TableHead className="border font-semibold text-secondary-foreground">
                            ผลการประเมิน (Assessment Result)
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {GradeDetail?.map((item, i) => (
                          <TableRow key={i} className="text-xs">
                            <TableCell className="border">
                              {item?.label}
                            </TableCell>
                            <TableCell className="border">
                              {item?.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead className="border text-center font-bold text-secondary-foreground">
                สรุปผล
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SummaryData?.map((item, i) => (
              <TableRow key={i} className="h-14">
                <TableCell className="border text-center text-lg font-bold text-primary">
                  {item?.section_1}
                </TableCell>
                <TableCell className="border text-center text-lg font-bold text-primary">
                  {item?.section_2}
                </TableCell>
                <TableCell className="border text-center text-lg font-bold text-primary">
                  {item?.summary}
                </TableCell>
                <TableCell className="border text-center text-lg font-bold text-primary">
                  {item?.grade}
                </TableCell>
                <TableCell
                  className={cn(
                    "border text-center text-lg font-bold",
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
      <div>
        <h3 className="text-sm font-bold">
          รายละเอียดผลการประเมิน (Assessment Details)
        </h3>
        <div>
          <Accordion type="multiple">
            {AssessmentDetails?.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className={cn("p-1 text-xs font-bold")}>
                  {item?.label}
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  {item?.component}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default R4Form;
