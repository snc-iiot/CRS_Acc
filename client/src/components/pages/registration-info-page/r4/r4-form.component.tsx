import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { FC } from "react";

const R4Form: FC = () => {
  const data = [
    {
      name: "อัตราส่วนสภาพคล่อง",
      data: [
        {
          list_name: "อัตราส่วนทุนหมุนเวียน",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "อัตราส่วนทุนหมุนเวียนเร็ว",
          note: "เท่า",
          current: 1.2,
        },
      ],
    },
    {
      name: "อัตราส่วนโครงสร้างทางการเงิน",
      data: [
        {
          list_name: "อัตราส่วนหนี้สินต่อส่วนของผู้ถือหุ้น",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "อัตราส่วนหนี้สินรวมต่อสินทรัพย์รวม",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "อัตราส่วนหนี้สินรวมต่อสินทรัพย์รวม",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "อัตราส่วนความสามารถในการจ่ายดอกเบี้ย",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "อัตราส่วนความสามารถในการจ่ายชำระหนี้",
          note: "เท่า",
          current: 1.2,
        },
      ],
    },
    {
      name: "อัตราส่วนวัดความสามารถในการทำกำไร",
      data: [
        {
          list_name: "อัตรากำไรขั้นต้น",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "อัตรากำไรสุทธิ",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "อัตราผลตอบแทนจากสินทรัพย์",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "อัตราผลตอบแทนจากส่วนของผู้ถือหุ้น",
          note: "เท่า",
          current: 1.2,
        },
      ],
    },
    {
      name: "อัตราส่วนรประสิทธิภาพในการบริหารสินทรัพย์",
      data: [
        {
          list_name: "อัตราส่วนหมุนเวียนของสินทรัพย์รวม",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "ระยะเก็บหนี้เฉลี่ย (วัน)",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "ระยะขายสินค้าเฉลี่ย (วัน)",
          note: "เท่า",
          current: 1.2,
        },
        {
          list_name: "ระยะเวลาชำระหนี้เจ้าหนี้เฉลี่ย (วัน)",
          note: "เท่า",
          current: 1.2,
        },
      ],
    },
  ];

  return (
    <div className="relative flex w-full flex-col gap-2">
      <div>
        <h3 className="text-base font-bold">
          อัตราส่วนทางการเงิน (Financial Ratio)
        </h3>
      </div>
      <div className="overflow-x-auto">
        <Table className="relative h-full w-full border-separate border-spacing-0">
          <TableHeader
            className={cn("top-0 z-10 bg-primary-foreground", "sticky")}
          >
            <TableRow className="text-xs">
              <TableHead rowSpan={2} className="border">
                รายการ
              </TableHead>
              <TableHead rowSpan={2} className="border-x-none border-y">
                Note
              </TableHead>
              <TableHead className="border-b-none border-l border-t text-end">
                งบการเงินกิจการ
              </TableHead>
            </TableRow>
            <TableRow className="text-xs">
              <TableHead className="border text-end">2565 (ปีล่าสุด)</TableHead>
            </TableRow>
          </TableHeader>
          {data.map((item) => (
            <TableBody>
              <TableRow className="bg-primary-foreground text-xs">
                <TableCell className="font-bold" colSpan={3}>
                  {item.name}
                </TableCell>
              </TableRow>
              {item.data.map((data) => (
                <TableRow className="text-xs">
                  <TableCell className="">{data.list_name}</TableCell>
                  <TableCell className="">{data.note}</TableCell>
                  <TableCell className=" text-end">{data.current}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default R4Form;
