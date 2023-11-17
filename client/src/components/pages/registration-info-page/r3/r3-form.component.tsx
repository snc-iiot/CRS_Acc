import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import MockData from "@/mock/r4.mock.json";
import { FC } from "react";

const R3Form: FC = () => {
  const data = MockData;
  return (
    <div className="relative flex w-full flex-col gap-2">
      <div>
        <h3 className="text-base font-bold">
          อัตราส่วนทางการเงิน (Financial Ratio)
        </h3>
      </div>
      <Table className="w-full border-separate border-spacing-0">
        <TableHeader
          className={cn("top-0 z-10 bg-primary-foreground", "sticky")}
        >
          <TableRow className="text-xs">
            <TableHead rowSpan={2} className="border text-center">
              รายการ
            </TableHead>
            <TableHead
              rowSpan={2}
              className="border-x-none border-y text-center"
            >
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
  );
};

export default R3Form;
