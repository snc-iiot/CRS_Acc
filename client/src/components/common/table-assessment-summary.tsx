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

interface TableAssessmentSummaryProps {
  TableHeaderText: string[];
  data: {
    Topic: string;
    Score: number;
  }[];
  Header?: string;
  className?: string;
  activeScore?: number;
  activeOnly?: boolean;
}

const TableAssessmentSummary: FC<TableAssessmentSummaryProps> = ({
  TableHeaderText,
  data,
  Header,
  className,
  activeScore = 10,
  // activeOnly = false,
}) => {
  const getScoreColor = (activeScore: number, score: number) => {
    if (activeScore === score && score === 10) {
      return "text-green-600 hover:text-green-700 font-bold";
    } else if (activeScore === score && score === 8) {
      return "text-yellow-500 hover:text-yellow-500/80 font-bold";
    } else if (activeScore === score && score === 5) {
      return "text-red-600  hover:text-red-700/80 font-bold";
    } else if (activeScore === score && score === 0) {
      return "text-gray-500 hover:text-gray-500/80 font-bold";
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
                className={cn(
                  "border  text-xs font-bold text-black",
                  index === 0 ? "text-left" : "text-center",
                )}
              >
                {headerText}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell
                className={cn(
                  "border text-xs font-bold text-black",
                  getScoreColor(activeScore, item.Score),
                )}
              >
                {item.Topic}
              </TableCell>
              <TableCell
                className={cn(
                  "border text-center text-xs font-bold text-black",
                  getScoreColor(activeScore, item.Score),
                )}
              >
                {item.Score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableAssessmentSummary;
