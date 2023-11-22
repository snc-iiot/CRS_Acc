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
  Data: {
    Grade: string;
    Score: string;
    Note: string;
  }[];
  Header?: string;
  className?: string;
}

const TableSummary: FC<TableSummaryProps> = ({
  TableHeaderText,
  Data,
  Header,
  className,
}) => {
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
          {Data?.map((data, index) => (
            <TableRow
              key={index}
              className="text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-foreground"
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
