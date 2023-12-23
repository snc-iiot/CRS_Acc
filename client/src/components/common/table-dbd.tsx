import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { FC, Fragment } from "react";

export interface ITableDBD {
  Topic: string;
  Info: IInfo[];
}

interface IInfo {
  Year: number;
  Amount: number;
  Change: number;
}

interface ITableDBDProps {
  data: ITableDBD[];
  header?: string;
  description?: string;
  className?: string;
}

const TableDBD: FC<ITableDBDProps> = ({
  data,
  header,
  description,
  className,
}) => {
  return (
    <div className={className}>
      {header ? <h2 className="text-base font-bold">{header}</h2> : null}
      {description ? (
        <p className="text-xs text-muted-foreground">{description ?? ""}</p>
      ) : null}
      <Table className="b-rde w-full border-collapse border-spacing-0 border">
        <TableHeader className="bg-[#F7FAFC]">
          <TableRow className="text-xs">
            <TableHead
              rowSpan={2}
              className="w-1/3 border border-black text-center font-bold text-black"
            >
              Unit : Baht
            </TableHead>
            {data[0]?.Info?.map((info) => (
              <Fragment key={info.Year}>
                <TableHead
                  colSpan={2}
                  className="border border-black text-center font-bold text-black"
                >
                  {info.Year}
                </TableHead>
              </Fragment>
            ))}
          </TableRow>
          <TableRow className="text-xs">
            {data[0]?.Info?.map((info) => (
              <Fragment key={info.Year}>
                <TableHead className="w-max border border-b-black border-l-black text-end font-bold text-black">
                  Amount
                </TableHead>
                <TableHead className="w-max whitespace-nowrap border border-b-black border-r-black text-end font-bold text-black">
                  % Change
                </TableHead>
              </Fragment>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No data
              </TableCell>
            </TableRow>
          ) : (
            data?.map((table) => (
              <Fragment key={table?.Topic ?? "-"}>
                <TableRow
                  className={cn(
                    "text-xs hover:cursor-pointer hover:bg-[#d4eaf7]",
                    table?.Topic === "สินทรัพย์รวม" ||
                      table?.Topic === "หนี้สินรวม" ||
                      table?.Topic === "หนี้สินรวมและส่วนของผู้ถือหุ้น" ||
                      table?.Topic === "กำไร(ขาดทุน) ขั้นต้น" ||
                      table?.Topic === "รายได้หลัก" ||
                      table?.Topic === "กำไร(ขาดทุน) สุทธิ"
                      ? "bg-[#d4eaf7]"
                      : "",
                  )}
                >
                  <TableCell
                    className={
                      "whitespace-nowrap border border-x-black font-medium"
                    }
                  >
                    {table?.Topic ?? "-"}
                  </TableCell>
                  {table.Info?.map((info) => (
                    <Fragment key={info.Year}>
                      <TableCell
                        className={cn(
                          "border border-l-black text-end",
                          info.Amount < 0 ? "text-red-600" : "",
                        )}
                      >
                        {isNaN(info.Amount)
                          ? "-"
                          : info.Amount?.toLocaleString() ?? "-"}{" "}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "whitespace-nowrap border border-r-black text-end",
                          info.Change < 0
                            ? "font-semibold text-red-600"
                            : "font-semibold text-green-600",
                        )}
                      >
                        {info.Change < 0
                          ? `(${Number(
                              Math.abs(info.Change).toFixed(2),
                            )?.toLocaleString()})%`
                          : `${info.Change?.toLocaleString()}%`}
                      </TableCell>
                    </Fragment>
                  ))}
                </TableRow>
              </Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDBD;
