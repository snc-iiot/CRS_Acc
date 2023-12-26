import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { useUtils } from "@/services";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

const R3Form: FC = () => {
  const { confirmSwal } = useSwal();
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID");
  const { mutateCreateCommentR3 } = useUtils();
  const { commentR3, financialRatio } = useAtomStore();
  const [comment, setComment] = useState<string>("");

  const data = [
    {
      topic: "อัตราส่วนแสดงความสามารถในการทำกำไร",
      short_key: [
        "ROA",
        "ROE",
        "gross_profit_margin",
        "operating_income_on_revenue_ratio",
        "net_profit_margin",
      ],
    },
    {
      topic: "ตัวชี้วัดสภาพคล่อง",
      short_key: [
        "current_ratio",
        "accounts_receivable_turnover",
        "inventory_turnover",
        "accounts_payable_turnover",
      ],
    },
    {
      topic: "อัตราส่วนแสดงประสิทธิภาพในการดำเนินงาน",
      short_key: [
        "total_assets_turnover",
        "operation_expense_to_total_revenue_ratio",
      ],
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

  if (!financialRatio?.financial_ratios) return <div>loading...</div>;

  return (
    <div className="relative flex w-full flex-col gap-2">
      <div>
        <h3 className="text-base font-bold">
          ผลประเมินอัตราส่วนทางการเงิน / Financial Ratio Assessment Report
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <Table className="w-full border-collapse border-spacing-0 border border-black">
            <TableHeader className={cn("top-0 z-10 bg-[#dee4e7]", "sticky")}>
              <TableRow className="text-xs ">
                <TableHead
                  rowSpan={2}
                  className="border border-black text-start font-bold text-black"
                >
                  อัตราส่วน
                </TableHead>
              </TableRow>
              <TableRow className="text-xs">
                {financialRatio?.financial_ratios?.[0]?.info.map((data) => (
                  <TableHead
                    key={data?.year}
                    className="border border-black text-center font-bold text-black"
                  >
                    {data?.year}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            {data?.map((table, i) => (
              <TableBody key={i}>
                <TableRow className="text-xs">
                  <TableCell
                    colSpan={
                      financialRatio?.financial_ratios?.[0]?.info?.length + 1
                    }
                    className="whitespace-nowrap border border-black bg-[#dee4e7] font-bold"
                  >
                    {table?.topic}
                  </TableCell>
                </TableRow>
                {financialRatio?.financial_ratios
                  .filter((item) => {
                    return table?.short_key.includes(item?.short_key);
                  })
                  ?.map((info, index) => (
                    <TableRow key={index} className="text-xs">
                      <TableCell
                        className={cn("whitespace-nowrap  text-start")}
                      >
                        {info?.topic_th}
                      </TableCell>
                      {info?.info?.map((data, i) => (
                        <TableCell
                          key={i}
                          className={cn(
                            "border-x text-center",
                            data?.ratio < 0
                              ? "font-semibold text-red-500"
                              : "text-black",
                            i === info?.info?.length - 1
                              ? "border-r-black"
                              : "",
                          )}
                          colSpan={1}
                        >
                          {data?.ratio < 0
                            ? `(${Math.abs(data?.ratio)})`
                            : data?.ratio}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            ))}
          </Table>
        </div>
        <div className="flex h-96 max-h-96 w-full flex-col gap-2">
          <h2 className="text-base font-bold">วิเคราะห์ข้อมูลการเงิน</h2>
          <div className="flex h-full w-full flex-col rounded-md border border-dashed border-primary p-2">
            <div className="flex h-0 flex-grow flex-col gap-2 overflow-auto">
              {commentR3?.comments
                ?.sort(
                  (a, b) =>
                    new Date(a?.created_at)?.getTime() -
                    new Date(b?.created_at)?.getTime(),
                )
                ?.map((info, i) => (
                  <div className="grid grid-cols-10" key={i}>
                    <p className="col-span-6 text-xs text-black">
                      {info?.comments ?? "-"}
                    </p>
                    <p className="col-span-4 text-xs text-black">
                      : {info?.name_en ?? "-"} {info?.created_at ?? "-"}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button>เพิ่มความคิดเห็น</Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="top" className="h-60 w-72 p-1">
              <main className="flex h-full w-full flex-col gap-2 overflow-hidden p-1">
                <h2 className="px-2 py-1 text-sm font-semibold underline">
                  เพิ่มข้อเสนอแนะ / Add Comments
                </h2>
                <Textarea
                  className="h-full w-full"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="text-end">
                  <Button
                    size="sm"
                    onClick={async () => {
                      const isConfirm = await confirmSwal(
                        "บันทึกข้อเสนอแนะทางการเงิน",
                        "คุณต้องการบันทึกข้อเสนอแนะทางการเงินหรือไม่",
                      );
                      if (isConfirm) {
                        await mutateCreateCommentR3({
                          comment: comment,
                          regisId: regisId ?? "",
                        });
                        setComment("");
                      }
                    }}
                  >
                    บันทึก
                  </Button>
                </div>
              </main>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default R3Form;
