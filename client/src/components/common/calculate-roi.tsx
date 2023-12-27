import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAtomStore } from "@/jotai/use-atom-store";
import { FC, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "./icons";

interface CalculateRoiProps {
  totalInvestment?: number;
  setTotalInvestment?: (value: number) => void;
  mode: "machine" | "mold";
}

const CalculateRoi: FC<CalculateRoiProps> = ({
  totalInvestment = 25000000,
  setTotalInvestment,
  mode,
}) => {
  const { setGeneralAssessmentForm } = useAtomStore();
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  useMemo(() => {
    if (totalRevenue && totalInvestment) {
      setProfit(totalRevenue - totalInvestment);
    }
  }, [totalRevenue, totalInvestment]);

  const roi = useMemo(() => {
    if (isNaN(totalRevenue) || isNaN(profit)) return 0;
    if (totalRevenue == 0 || profit == 0) return 0;
    return (profit / totalInvestment) * 100;
  }, [totalRevenue, profit, totalInvestment]);

  const SetValue = () => {
    if (mode === "machine") {
      setGeneralAssessmentForm((prev) => ({
        ...prev,
        machine_produce: prev?.machine_produce?.map((item) => {
          if (item?.id === "machine-produce-id-3") {
            return {
              ...item,
              value: {
                amount: item?.value?.amount || 0,
                ROA: item?.value?.ROA || 0,
                payback: item?.value?.payback || 0,
                ROI: Number((roi / 100)?.toFixed(2)) || 0,
              },
            };
          }
          return item;
        }),
      }));
    } else {
      setGeneralAssessmentForm((prev) => ({
        ...prev,
        mold_use: prev?.mold_use?.map((item) => {
          if (item?.id === "mold-use-id-4") {
            return {
              ...item,
              value: {
                amount: item?.value?.amount || 0,
                ROI: Number((roi / 100)?.toFixed(2)) || 0,
                ROA: item?.value?.ROA || 0,
                payback: item?.value?.payback || 0,
              },
            };
          }
          return item;
        }),
      }));
    }
  };

  return (
    <Sheet
      onOpenChange={(open) => {
        setOpen(open);
      }}
      open={open}
    >
      <SheetTrigger asChild className="cursor-pointer text-primary">
        <Icons.calculator className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent className="w-[30vw] sm:max-w-none" side="right">
        <main className="flex h-full w-full flex-col gap-2">
          <section>
            <h2 className="text-xl font-bold">
              คำนวณ อัตราส่วนผลตอบแทนการลงทุน (ROI)
            </h2>
            <p className="text-sm text-muted-foreground">
              คำนวณอัตราส่วนผลตอบแทนการลงทุน (ROI) คือ
              อัตราส่วนระหว่างกำไรและทุนที่ลงทุน
            </p>
          </section>
          <section className="flex flex-col gap-2 p-1">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm">รายได้ทั้งหมด (Total Revenue)</h3>
              <Input
                type="number"
                className="w-full"
                placeholder="กรอกจำนวนเงิน"
                onChange={(e) => {
                  setTotalRevenue(+e.target.value);
                }}
                value={
                  totalRevenue == 0 ? "" : totalRevenue ? totalRevenue : ""
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm">เงินลงทุนทั้งหมด (Total Investment)</h3>
              <Input
                type="number"
                className="w-full"
                placeholder="กรอกจำนวนเงิน"
                onChange={(e) => {
                  if (setTotalInvestment) setTotalInvestment(+e.target.value);
                }}
                value={
                  totalInvestment
                    ? totalInvestment == 0
                      ? ""
                      : totalInvestment
                    : ""
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm">กำไร ก่อนหักค่าใช้จ่ายอื่นๆ (Profit)</h3>
              <Input
                readOnly
                type="number"
                className="w-full"
                placeholder="กรอกจำนวนเงิน"
                onChange={(e) => setProfit(+e.target.value)}
                value={profit == 0 ? "" : profit}
              />
            </div>
          </section>
          <section>
            <div className="relative h-[10rem] w-full rounded-md border border-dashed">
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap text-center text-2xl font-bold">
                {Number(roi.toFixed(2)).toLocaleString()}% หรือ{" "}
                {Number((roi / 100).toFixed(2))?.toLocaleString()} เท่า
              </h1>
            </div>
          </section>
          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-bold underline">
              การวิเคราะห์เบื้องต้น
            </h3>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <p className="text-xs font-semibold">ROI มากกว่า 0</p>
              </div>
              <p className="col-span-3">การลงทุนมีกำไร</p>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <p className="text-xs font-semibold">ROI เท่ากับ 0</p>
              </div>
              <p className="col-span-3">
                การลงทุนไม่มีกำไร แต่ก็ไม่ขาดทุน (เท่าทุน)
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <p className="text-xs font-semibold">ROI น้อยกว่า 0</p>
              </div>
              <p className="col-span-3">การลงทุนขาดทุน</p>
            </div>
          </section>
          <section className="mt-2">
            <Button
              className="w-full"
              onClick={() => {
                SetValue();
                setOpen(false);
                setTotalRevenue(0);
              }}
            >
              บันทึกผลการวิเคราะห์
            </Button>
          </section>
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default CalculateRoi;
