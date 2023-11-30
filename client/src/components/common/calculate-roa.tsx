import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FC, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CalculateRoi: FC = () => {
  const [netIncome, setNetIncome] = useState<number>(0);
  const [totalAssets, setTotalAssets] = useState<number>(0);

  const roa = useMemo(() => {
    if (isNaN(netIncome) || isNaN(totalAssets)) return 0;
    if (netIncome == 0 || totalAssets == 0) return 0;
    return (netIncome / totalAssets) * 100;
  }, [netIncome, totalAssets]);

  return (
    <Sheet>
      <SheetTrigger className="text-primary">Auto</SheetTrigger>
      <SheetContent className="w-[30vw] sm:max-w-none" side="right">
        <main className="flex h-full w-full flex-col gap-2">
          <section>
            <h2 className="text-xl font-bold">
              คำนวณ อัตราผลตอบแทนต่อสินทรัพย์ (ROA)
            </h2>
            <p className="text-sm text-muted-foreground">
              อัตราผลตอบแทนต่อสินทรัพย์ (ROA) คือ อัตราส่วนระหว่างกำไรสุทธิ
              และสินทรัพย์ทั้งหมด หรือ กำไรสุทธิต่อสินทรัพย์ทั้งหมด
              หรือกำไรสุทธิต่อทุนที่ลงทุน
            </p>
          </section>
          <section className="flex flex-col gap-2 p-1">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm">กำไรสิทธิ (Net Income) (บาท)</h3>
              <Input
                type="number"
                className="w-full"
                placeholder="กรอกจำนวนเงิน"
                onChange={(e) => {
                  setNetIncome(+e.target.value);
                }}
                value={isNaN(netIncome) ? 0 : netIncome == 0 ? "" : netIncome}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm">สินทรัพย์รวม (Total Assets) (บาท)</h3>
              <Input
                type="number"
                className="w-full"
                placeholder="กรอกจำนวนเงิน"
                onChange={(e) => setTotalAssets(+e.target.value)}
                value={
                  isNaN(totalAssets) ? 0 : totalAssets == 0 ? "" : totalAssets
                }
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <p className="w-max cursor-pointer text-xs text-primary hover:underline">
                  ศึกษาเพิ่มเติม{" "}
                </p>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="flex w-96 flex-col gap-2 p-2"
              >
                <h1 className="text-xs font-bold underline">ข้อมูลเพิ่มเติม</h1>
                <p className="text-xs">
                  1.หาข้อมูลของ กำไรสุทธิ (Net Income) และ สินทรัพย์ทั้งหมด
                  (Total Assets ) ของบริษัทที่คุณสนใจ
                  ข้อมูลเหล่านี้สามารถหาได้จากงบการเงิน (Financial Statements)
                  ของบริษัท โดยเฉพาะในงบทางการเงินประจำปี (Annual Financial
                  Statements) เช่น งบดุล, งบกำไรขาดทุน, งบแสดงรายรับ-รายจ่าย
                  เป็นต้น ซึ่งควรอ้างอิงจากแหล่งข้อมูลทางการเงินที่น่าเชื่อถือ
                  เช่น Bloomberg, Reuters
                </p>
                <p className="text-xs">
                  2.คำนวณกำไรสุทธิ (Net Income) ของบริษัท
                </p>
                <div className="rounded-md border border-dashed p-2">
                  <p className="text-xs text-primary">
                    <strong>กำไรสุทธิ (Net Income) = </strong>
                    รายได้รวม (Total Revenue) - รายจ่ายรวม (Total Expenses)
                  </p>
                  {/* <p className="text-xs text-primary"></p> */}
                </div>
              </PopoverContent>
            </Popover>
          </section>
          <section>
            <div className="relative h-[10rem] w-full rounded-md border border-dashed">
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap text-center text-2xl font-bold">
                {Number(roa.toFixed(2)).toLocaleString()}% หรือ{" "}
                {Number((roa / 100).toFixed(2))?.toLocaleString()} เท่า
              </h1>
            </div>
          </section>
          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-bold underline">
              การวิเคราะห์เบื้องต้น
            </h3>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <p className="text-xs font-semibold">ROA สูง</p>
              </div>
              <p className="col-span-3">
                <strong className="underline">ROA ที่สูง </strong>
                แสดงถึงการบริหารทรัพยากรทางการเงินอย่างมีประสิทธิภาพ
                และทรัพย์สินถูกใช้ในการสร้างกำไรอย่างดี
                นักลงทุนและผู้บริหารอาจต้องพิจารณาว่ามีเหตุผลใดที่ทำให้ ROA
                สูงและวิธีการที่สามารถเพิ่มค่า ROA ได้
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <p className="text-xs font-semibold">ROA ต่ำ</p>
              </div>
              <p className="col-span-3">
                <strong className="underline">ROA ที่ต่ำ </strong>
                อาจแสดงถึงปัญหาในการบริหารทรัพยากรทางการเงิน
                และการใช้ทรัพย์สินเพื่อสร้างกำไร ผู้บริหารควรสำรวจสาเหตุที่ทำให้
                ROA ต่ำ เช่น ความสามารถในการควบคุมค่าใช้จ่าย การบริหารลูกหนี้
                หรือการจัดการสินค้าคงคลัง เพื่อปรับปรุงส่วนที่มีปัญหา
              </p>
            </div>
          </section>
          <section className="mt-2">
            <Button className="w-full">บันทึกผลการวิเคราะห์</Button>
          </section>
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default CalculateRoi;
