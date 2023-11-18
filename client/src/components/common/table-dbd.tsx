import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  header: string;
  description?: string;
  className?: string;
}

const Mock: ITableDBD[] = [
  {
    Topic: "Topic 1",
    Info: [
      {
        Year: 2022,
        Amount: 1000,
        Change: -2,
      },
      {
        Year: 2023,
        Amount: 1000,
        Change: -2,
      },
      {
        Year: 2024,
        Amount: 1000,
        Change: -2,
      },
    ],
  },
  {
    Topic: "Topic 2",
    Info: [
      {
        Year: 2022,
        Amount: 1000,
        Change: -2,
      },
      {
        Year: 2023,
        Amount: 1000,
        Change: -2,
      },
      {
        Year: 2024,
        Amount: 1000,
        Change: -2,
      },
    ],
  },
];

const TableDBD: FC<ITableDBDProps> = ({
  data = Mock,
  header,
  description,
  className,
}) => {
  return (
    <div className={className}>
      <h2 className="text-base font-bold">
        {header ?? "Statement of Financial Position"}
      </h2>
      <p className="text-sm text-muted-foreground">{description ?? ""}</p>
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
                <TableRow className="text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  <TableCell className="whitespace-nowrap border font-medium">
                    {table?.Topic ?? "-"}
                  </TableCell>
                  {table.Info?.map((info) => (
                    <Fragment key={info.Year}>
                      <TableCell className="border text-end">
                        {isNaN(info.Amount)
                          ? "-"
                          : info.Amount?.toLocaleString() ?? "-"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap border text-end">
                        {info.Change ?? "-"}
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
