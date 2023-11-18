import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import MockData from "@/mock/financial-ratio-analytics.mock.json";
import { TFinancialRatioAnalytics } from "@/models/types";
import { FC } from "react";

const TableFinancialRatio: FC = () => {
  const HEADER: string[] = [
    "Financial ratio",
    "ความหมาย",
    "สูตรคำนวณ (Eng)",
    "Target",
    "ผลการวิเคราะห์งบ",
    "หน่วย",
    "อ้างอิง ฐานข้อมูล",
  ];

  const data: TFinancialRatioAnalytics[] = MockData;

  return (
    <div className="h-full w-full">
      <Table className="relative h-full w-full">
        <TableHeader className="bg-primary-foreground">
          <TableRow>
            {HEADER.map((item, index) => (
              <TableHead
                key={index}
                className={cn(
                  "whitespace-nowrap border  text-xs font-bold text-foreground",
                  index === 0 ? "text-start" : "text-center",
                )}
              >
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {data.map((table) => (
          <TableBody key={table?.Topic ?? "-"}>
            <TableRow className="bg-primary-foreground text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-foreground">
              <TableCell colSpan={HEADER?.length} className="border font-bold">
                {table?.Topic}
              </TableCell>
            </TableRow>
            {table?.info?.map((info) => (
              <TableRow
                key={info?.FinancialRatio ?? "-"}
                className="text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                <TableCell className="whitespace-nowrap border">
                  {info?.FinancialRatio}
                </TableCell>
                <TableCell className="whitespace-nowrap border">
                  {info?.Meaning}
                </TableCell>
                <TableCell className="border">
                  {info?.Formula?.map((formula, i) => (
                    <div
                      key={formula}
                      className={cn(
                        i === 0 ? "border-b text-center" : "text-center",
                        "w-full whitespace-nowrap border-foreground",
                      )}
                    >
                      {formula}
                    </div>
                  ))}
                </TableCell>
                <TableCell className="whitespace-nowrap border">
                  {info?.Target}
                </TableCell>
                <TableCell className="border text-end">
                  {info?.Result}
                </TableCell>
                <TableCell className="border text-center">
                  {info?.Unit}
                </TableCell>
                <TableCell className="whitespace-nowrap border">
                  {info?.Reference}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default TableFinancialRatio;
