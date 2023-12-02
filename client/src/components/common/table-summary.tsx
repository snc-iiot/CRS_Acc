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
}

const TableSummary: FC<TableSummaryProps> = ({
  TableHeaderText,
  data,
  Header,
  className,
  activeGrade = "A",
}) => {
  const getGradeColor = (
    activeGrade: "A" | "B" | "C" | "D" | "E" | "F",
    grade: "A" | "B" | "C" | "D" | "E" | "F" = "A",
  ) => {
    if (activeGrade === grade && grade === "A") {
      return "bg-green-600 text-white hover:bg-green-700";
    } else if (activeGrade === grade && grade === "B") {
      return "bg-yellow-500 text-white hover:bg-yellow-500/80";
    } else if (activeGrade === grade && grade === "C") {
      return "bg-red-600 text-white hover:bg-red-700/80";
    } else if (activeGrade === grade && grade === "D") {
      return "bg-gray-500 text-white hover:bg-gray-500/80";
    } else if (activeGrade === grade && grade === "E") {
      return "bg-gray-600 text-white hover:bg-gray-700/80";
    }
    return "";
  };

  return (
    <div className={cn("flex w-max flex-col gap-1", className)}>
      <h3 className="text-sm font-bold">{Header}</h3>
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
