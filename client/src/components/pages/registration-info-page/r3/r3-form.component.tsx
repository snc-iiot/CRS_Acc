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
      <Table className="w-full border-collapse border-spacing-0 border">
        <TableHeader
          className={cn("top-0 z-10 bg-primary-foreground", "sticky")}
        >
          <TableRow className="text-xs ">
            <TableHead
              rowSpan={2}
              className="border text-start font-bold text-black"
            >
              รายการ
            </TableHead>
            <TableHead
              rowSpan={2}
              className="border-x-none border-y text-center font-bold text-black"
            >
              Note
            </TableHead>
            <TableHead
              colSpan={data[0]?.data[0]?.current.length}
              className="border-b-none border-l border-t text-center font-bold text-black"
            >
              งบการเงินกิจการ
            </TableHead>
          </TableRow>
          <TableRow className="text-xs">
            {data[0]?.data[0]?.current.map((data) => (
              <TableHead
                key={data?.year}
                className="border text-center font-bold text-black"
              >
                {data?.year}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {data.map((item, index) => (
          <TableBody key={index}>
            <TableRow className="bg-primary-foreground text-xs">
              <TableCell className="border font-bold" colSpan={6}>
                {item.name}
              </TableCell>
            </TableRow>
            {item.data.map((data, j) => (
              <TableRow className="text-xs" key={j}>
                <TableCell className="border">{data.list_name}</TableCell>
                <TableCell className="border text-center">
                  {data.note}
                </TableCell>
                {data.current.map((data, i) => (
                  <TableCell key={i} className="border text-end">
                    {data?.value ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default R3Form;
