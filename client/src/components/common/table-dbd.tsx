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
      <Table className="w-full border-collapse border-spacing-0 border">
        <TableHeader className="bg-primary-foreground">
          <TableRow className="text-xs">
            <TableHead
              rowSpan={2}
              className="w-1/3 border text-center font-bold text-black"
            >
              Unit : Baht
            </TableHead>
            {data[0]?.Info?.map((info) => (
              <Fragment key={info.Year}>
                <TableHead
                  colSpan={2}
                  className="border text-center font-bold text-black"
                >
                  {info.Year}
                </TableHead>
              </Fragment>
            ))}
          </TableRow>
          <TableRow className="text-xs">
            {data[0]?.Info?.map((info) => (
              <Fragment key={info.Year}>
                <TableHead className="w-max border text-end font-bold text-black">
                  Amount
                </TableHead>
                <TableHead className="w-max whitespace-nowrap border text-end font-bold text-black">
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
                <TableRow className="text-xs hover:cursor-pointer hover:bg-secondary hover:text-secondary-foreground">
                  <TableCell className="whitespace-nowrap border font-medium">
                    {table?.Topic ?? "-"}
                  </TableCell>
                  {table.Info?.map((info) => (
                    <Fragment key={info.Year}>
                      <TableCell
                        className={cn(
                          "border text-end",
                          info.Amount < 0 ? "text-red-600" : "",
                        )}
                      >
                        {isNaN(info.Amount)
                          ? "-"
                          : info.Amount?.toLocaleString() ?? "-"}{" "}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "whitespace-nowrap border text-end",
                          info.Change < 0
                            ? "font-semibold text-red-600"
                            : "font-semibold text-green-600",
                        )}
                      >
                        {info.Change < 0
                          ? `(${Math.abs(info.Change).toFixed(2)})%`
                          : `${info.Change}%`}
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
