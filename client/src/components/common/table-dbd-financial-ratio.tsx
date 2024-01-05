import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { FC } from "react";

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
  header?: string;
  description?: string;
  className?: string;
}

const TableDBDFinancialRatio: FC<ITableDBDProps> = ({ header, description, className }) => {
  const { dataDBDSyncList } = useAtomStore();

  const data = [
    {
      topic: "อัตราส่วนแสดงความสามารถในการทำกำไร",
      short_key: ["ROA", "ROE", "gross_profit_margin", "operating_income_on_revenue_ratio", "net_profit_margin"],
    },
    {
      topic: "ตัวชี้วัดสภาพคล่อง",
      short_key: ["current_ratio", "accounts_receivable_turnover", "inventory_turnover", "accounts_payable_turnover"],
    },
    {
      topic: "อัตราส่วนแสดงประสิทธิภาพในการดำเนินงาน",
      short_key: ["total_assets_turnover", "operation_expense_to_total_revenue_ratio"],
    },
    {
      topic: "อัตราส่วนแสดงประสิทธิภาพในการดำเนินงาน",
      short_key: [
        "total_assets_turnover",
        "operation_expense_to_total_revenue_ratio",
        "asset_to_equity_ratio_or_financial_leverage",
        "debt_to_asset_ratio",
        "debt_to_equity_ratio",
        "debt_to_capital_ratio",
      ],
    },
  ];

  return (
    <div className={className}>
      {header ? <h2 className="text-base font-bold">{header}</h2> : null}
      {description ? <p className="text-xs text-muted-foreground">{description ?? ""}</p> : null}
      <Table className="w-full border-collapse border-spacing-0 border border-black">
        <TableHeader className={cn("top-0 z-10 bg-[#dee4e7]", "sticky")}>
          <TableRow className="text-xs ">
            <TableHead rowSpan={2} className="border border-black text-start font-bold text-black">
              อัตราส่วน
            </TableHead>
          </TableRow>
          <TableRow className="text-xs">
            {dataDBDSyncList?.financial_ratio?.[0]?.info.map((data) => (
              <TableHead key={data?.year} className="border border-black text-center font-bold text-black">
                {data?.year}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {data?.map((table, i) => (
          <TableBody key={i}>
            <TableRow className="text-xs">
              <TableCell
                colSpan={dataDBDSyncList?.financial_ratio?.[0]?.info?.length + 1}
                className="whitespace-nowrap border border-black bg-[#dee4e7] font-bold"
              >
                {table?.topic}
              </TableCell>
            </TableRow>
            {dataDBDSyncList?.financial_ratio
              ?.filter((item) => {
                return table?.short_key.includes(item?.short_key);
              })
              ?.map((info, index) => (
                <TableRow key={index} className="text-xs">
                  <TableCell className={cn("whitespace-nowrap  text-start")}>{info?.topic_th}</TableCell>
                  {info?.info?.map((data, i) => (
                    <TableCell
                      key={i}
                      className={cn(
                        "border-x text-center",
                        data?.ratio !== null && data?.ratio < 0 ? "font-semibold text-red-500" : "text-black",
                        i === info?.info?.length - 1 ? "border-r-black" : ""
                      )}
                      colSpan={1}
                    >
                      {(data?.ratio !== null ? data?.ratio : 0) < 0 ? `(${Math.abs(data?.ratio ?? 0)})` : data?.ratio}
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

export default TableDBDFinancialRatio;
