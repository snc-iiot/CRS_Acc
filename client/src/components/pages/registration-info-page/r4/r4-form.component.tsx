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
import { CopyToClipboardCustom } from "@/hooks/use-copy-to-clipboard";
import { FC, Fragment } from "react";
import {
  AssessmentDetailsSectionComponent,
  EvaluateFormComponent,
} from "../../evaluate";

const R4Form: FC = () => {
  const companyInformation: { label: string; value: string }[] = [
    {
      label: "บริษัทลูกค้า (Company Name)",
      value: "Anuwat Technology Co., Ltd.",
    },
    {
      label: "ขึ้นทะเบียนกับบริษัท (To Register With)",
      value: "บริษัท เมอร์คิวรี่ ทรานส์ฟอร์ม จำกัด",
    },
    {
      label: "สินค้า (Product)",
      value: "เครื่องมือช่าง",
    },
    {
      label: "ประเภทกิจการ (Type of Business)",
      value: "ผู้ผลิต",
    },
  ];

  const SummaryData = [
    {
      section_1: "40",
      section_2: "60",
      summary: "100",
      grade: "A",
      result: "ผ่าน",
    },
  ];

  const AssessmentDetails = [
    {
      label: "ส่วนที่ 1: การเงินและการลงทุน (40/40 คะแนน)",
      component: <AssessmentDetailsSectionComponent />,
    },
    {
      label: "ส่วนที่ 2: การจัดการ เงื่อนไข และนโยบาย (60/60 คะแนน)",
      component: <EvaluateFormComponent />,
    },
  ];

  const GradeDetail = [
    {
      label: "A",
      value: ">80 - 100",
    },
    {
      label: "B",
      value: "<80 - 80",
    },
    {
      label: "C",
      value: "<60 - 50",
    },
    {
      label: "D",
      value: "<50",
    },
  ];

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
                <TableCell className="border text-center text-lg font-bold">
                  {item?.section_1}
                </TableCell>
                <TableCell className="border text-center text-lg font-bold">
                  {item?.section_2}
                </TableCell>
                <TableCell className="border text-center text-lg font-bold">
                  {item?.summary}
                </TableCell>
                <TableCell className="border text-center text-lg font-bold">
                  {item?.grade}
                </TableCell>
                <TableCell className="border text-center text-lg font-bold">
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
                <AccordionTrigger className="p-1 text-xs font-bold">
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
