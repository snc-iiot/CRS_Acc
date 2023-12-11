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

interface TableSummaryProps {
  TableHeaderText: string[];
  data: {
    Grade: "A" | "B" | "C" | "D" | "E" | "F";
    Score: string;
    Note: string;
  }[];
  Header?: string;
  className?: string;
  activeGrade?: "A" | "B" | "C" | "D" | "E" | "F";
  activeOnly?: boolean;
}

const TableSummary: FC<TableSummaryProps> = ({
  TableHeaderText,
  data,
  Header,
  className,
  activeGrade = "A",
  activeOnly = false,
}) => {
  const getGradeColor = (
    activeGrade: "A" | "B" | "C" | "D" | "E" | "F",
    grade: "A" | "B" | "C" | "D" | "E" | "F" = "A",
  ) => {
    if (activeGrade === grade && grade === "A") {
      return "text-green-600 hover:text-green-700 font-bold";
    } else if (activeGrade === grade && grade === "B") {
      return "text-yellow-500 hover:text-yellow-500/80 font-bold";
    } else if (activeGrade === grade && grade === "C") {
      return "text-red-600  hover:text-red-700/80 font-bold";
    } else if (activeGrade === grade && grade === "D") {
      return "text-gray-500 hover:text-gray-500/80 font-bold";
    } else if (activeGrade === grade && grade === "E") {
      return "text-gray-600 hover:text-gray-700/80 font-bold";
    }
    return "";
  };

  return (
    <div className={cn("flex w-max flex-col gap-1", className)}>
      <h3 className="text-xs font-bold">{Header}</h3>
      <Table className="border-collapse border-spacing-0">
        <TableHeader className="bg-primary-foreground">
          <TableRow>
            {TableHeaderText.map((headerText, index) => (
              <TableHead
                key={index}
                className="border text-xs font-bold text-black"
              >
                {headerText}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((data, index) => (
            <TableRow
              key={index}
              className={cn(
                "text-xs hover:cursor-pointer hover:bg-transparent",
                getGradeColor(activeGrade, data?.Grade),
                activeOnly && data?.Grade !== activeGrade ? "hidden" : null,
              )}
            >
              <TableCell className="border">{data?.Grade ?? "-"}</TableCell>
              <TableCell className="border">{data?.Score ?? "-"}</TableCell>
              <TableCell className="border">{data?.Note ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSummary;
