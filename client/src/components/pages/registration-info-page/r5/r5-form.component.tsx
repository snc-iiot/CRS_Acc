import TableSummary from "@/components/common/table-summary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { FC, useEffect } from "react";

const R5Form: FC = () => {
  const Data = [
    {
      Grade: "A",
      Score: "10",
      Note: "> 5,000 MB/Year",
    },
    {
      Grade: "B",
      Score: "8",
      Note: "> 1,000 - 5,000MB/Year",
    },
    {
      Grade: "C",
      Score: "5",
      Note: "> 500 - 1,000MB/Year",
    },
    {
      Grade: "D",
      Score: "0",
      Note: "≤ 500 MB/Year",
    },
  ];

  const Mock = [
    "Sales",
    "Order/Year",
    "Mat' l Ratio",
    "Credit Terms (Customer)",
    "Credit term Vendor",
    "Inventory",
    "CCC (Project)",
    "Financial Ratio",
    "Grand Total Score",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-4">
      <h3 className="text-base font-bold">
        ผลการประเมิน / Summary of Assessment
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {Mock?.map((info, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-2 border-b border-primary-foreground",
            )}
          >
            <TableSummary
              className="w-full"
              Header={info}
              TableHeaderText={["เกรด", "คะแนน", "Sales"]}
              Data={Data}
            />
          </div>
        ))}
      </div>
      <div className="my-4">
        <h1 className="text-xl font-bold text-[#211d62ee]">Summary Report</h1>
        <div>
          <Table>
            <TableHeader className="border bg-[#211d62ee] text-foreground">
              <TableRow className="text-xs font-bold text-foreground">
                <TableHead
                  className="border text-center font-bold  text-primary-foreground"
                  rowSpan={2}
                >
                  Customer Name
                </TableHead>
                <TableHead
                  className="border text-center font-bold   text-primary-foreground"
                  rowSpan={2}
                >
                  Product Type
                </TableHead>
                <TableHead
                  className="border text-center font-bold text-primary-foreground"
                  colSpan={4}
                >
                  Evaluation
                </TableHead>
                <TableHead
                  className="border text-center font-bold  text-primary-foreground"
                  rowSpan={2}
                >
                  Grand total score
                </TableHead>
                <TableHead
                  className="border text-center font-bold  text-primary-foreground"
                  rowSpan={2}
                >
                  Grade
                </TableHead>
                <TableHead
                  className="border text-center font-bold  text-primary-foreground"
                  rowSpan={2}
                >
                  Remark
                </TableHead>
              </TableRow>
              <TableRow className="text-xs font-bold">
                <TableHead className="border text-center font-bold text-primary-foreground">
                  Sales
                </TableHead>
                <TableHead className="border text-center font-bold text-primary-foreground">
                  Mat'l Ratio
                </TableHead>
                <TableHead className="border text-center font-bold text-primary-foreground">
                  CCC (Project)
                </TableHead>
                <TableHead className="border text-center font-bold text-primary-foreground">
                  Financial
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="cursor-pointer text-black hover:cursor-pointer hover:bg-primary hover:text-primary-foreground">
                <TableCell className="border text-center">Customer 1</TableCell>
                <TableCell className="border text-center">Product 1</TableCell>
                <TableCell className="border text-center">10</TableCell>
                <TableCell className="border text-center">10</TableCell>
                <TableCell className="border text-center">10</TableCell>
                <TableCell className="border text-center">10</TableCell>
                <TableCell className="border text-center">40</TableCell>
                <TableCell className="border text-center">A</TableCell>
                <TableCell className="border text-center">
                  เป็นลูกค้าที่ดี มีความสามารถในการชำระหนี้ที่ดี
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default R5Form;
