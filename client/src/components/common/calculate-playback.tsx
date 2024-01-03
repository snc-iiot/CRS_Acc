import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAtomStore } from "@/jotai/use-atom-store";
import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "./icons";

interface CalculatePlaybackProps {
  mode: "machine" | "mold";
}

const CalculatePlayback: FC<CalculatePlaybackProps> = ({ mode }) => {
  const { setGeneralAssessmentForm } = useAtomStore();
  const [isInvestment, setIsInvestment] = useState<boolean>(true);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [growthRate, setGrowthRate] = useState<number>(0);
  const [numberOfPeriods, setNumberOfPeriods] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [newPayback, setNewPayback] = useState<
    {
      label: string;
      value: number;
      label_2: string;
      value_2: number;
    }[]
  >([
    {
      label: "งวดที่ 1",
      value: totalProfit,
      label_2: "งวดที่ 1",
      value_2: totalProfit,
    },
  ]);

  const payback = useMemo(() => {
    if (isInvestment) {
      if (totalInvestment === 0 || totalProfit === 0) return 0;
      return totalInvestment / totalProfit;
    }
  }, [isInvestment, totalInvestment, totalProfit]);

  useMemo(() => {
    if (numberOfPeriods === 0) return;
    setNewPayback(
      new Array(numberOfPeriods).fill(0).map((_, i) => ({
        label: `งวดที่ ${i + 1}`,
        value: Number(
          new Array(i + 1)
            .fill(0)
            .reduce((acc, _, i) => {
              let result = acc;
              if (i === 0) {
                result = totalProfit;
              } else {
                result = result + (result * growthRate) / 100;
              }
              return result;
            }, 0)
            .toFixed(2),
        ),
        label_2: `งวดที่ ${i + 1}`,
        value_2: Number(
          new Array(i + 1)
            ?.fill(0)
            ?.reduce((acc, _, i) => {
              // (-$H$20)+H23
              let result = acc;
              if (i === 0) {
                result = totalProfit - totalInvestment;
              } else {
                result = (result * growthRate) / 100;
              }
              return result;
            }, 0)
            ?.toFixed(2),
        ),
      })),
    );
  }, [numberOfPeriods, totalProfit, growthRate, totalInvestment]);

  useEffect(() => {
    setIsInvestment(true);
    setTotalInvestment(0);
    setTotalProfit(0);
    setGrowthRate(0);
    setNumberOfPeriods(0);
  }, [isInvestment]);

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
                ROI: item?.value?.ROI || 0,
                ROA: item?.value?.ROA || 0,
                payback: Number(((payback ?? 0) / 12)?.toFixed(2)) || 0,
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
                ROI: item?.value?.ROI || 0,
                ROA: item?.value?.ROA || 0,
                payback: Number(((payback ?? 0) / 12)?.toFixed(2)) || 0,
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
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <SheetTrigger
        className="text-primary"
        asChild
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Icons.calculator className="h-4 w-4 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="w-[30vw] sm:max-w-none" side="right">
        <main className="flex h-full w-full flex-col gap-2">
          <section>
            <h2 className="text-xl font-bold">คำนวนระยะเวลาคืนทุน (Payback)</h2>
            <p className="text-sm text-muted-foreground">
              ท่านสามารถคำนวนระยะเวลาคืนทุน (Payback) จาก 2 ทางเลือก ดังนี้
            </p>
          </section>
          <section className="h-full">
            <Accordion type="single">
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className="p-1 font-semibold"
                  onClick={() => setIsInvestment(!isInvestment)}
                >
                  ทางเลือก 1: ไม่ทราบอัตราการเติบโตของผลตอบแทน (กำไร)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 p-1">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm">
                        เงินลงทุนรวม (Total Investment) (บาท)
                      </h3>
                      <Input
                        type="number"
                        className="w-full"
                        placeholder="เงินลงทุนรวม (Total Investment) (บาท)"
                        onChange={(e) => setTotalInvestment(+e.target.value)}
                        value={totalInvestment === 0 ? "" : totalInvestment}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm">
                        ประมาณผลตอบแทนขั้นต้น (กำไร) (บาท/เดือน)
                      </h3>
                      <Input
                        type="number"
                        className="w-full"
                        placeholder=" ประมาณผลตอบแทนขั้นต้น (กำไร) (บาท/เดือน)"
                        onChange={(e) => setTotalProfit(+e.target.value)}
                        value={totalProfit === 0 ? "" : totalProfit}
                      />
                    </div>
                    <div>
                      <div className="flex w-full">
                        <h3 className="text-md whitespace-nowrap font-bold">
                          Payback Period
                        </h3>
                        <h4 className="w-max overflow-hidden text-sm text-muted-foreground">
                          {new Array(100).fill(0).map((_, i) => (
                            <span key={i}>.</span>
                          ))}
                        </h4>
                        <div>
                          <h3 className="text-md whitespace-nowrap text-right font-bold text-primary">
                            {payback?.toFixed(2)} เดือน
                          </h3>
                          <h3 className="text-md whitespace-nowrap text-right font-bold text-primary">
                            {((payback ?? 0) / 12)?.toFixed(2)} ปี
                          </h3>
                        </div>
                      </div>
                      <div className="mt-3 text-right">
                        <Button
                          className="ml-auto"
                          onClick={() => {
                            SetValue();
                            setOpen(false);
                            setIsInvestment(true);
                            setTotalInvestment(0);
                            setTotalProfit(0);
                            setGrowthRate(0);
                            setNumberOfPeriods(0);
                          }}
                        >
                          <Icons.save className="mr-2 h-5 w-5" />
                          บันทึกผลการคำนวน
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger
                  className="cursor-not-allowed p-1 font-semibold opacity-50"
                  onClick={() => setIsInvestment(!isInvestment)}
                  disabled
                >
                  ทางเลือก 2: ทราบอัตราการเติบโตของผลตอบแทน (กำไร) ต่องวด
                </AccordionTrigger>
                <AccordionContent>
                  <main className="flex h-[40rem] flex-col gap-2  p-1">
                    <section className="flex flex-col gap-1">
                      <h3 className="text-sm">
                        เงินลงทุนรวม (Total Investment) (บาท)
                      </h3>
                      <Input
                        type="number"
                        className="w-full"
                        placeholder="เงินลงทุนรวม (Total Investment) (บาท)"
                        onChange={(e) => setTotalInvestment(+e.target.value)}
                        value={totalInvestment === 0 ? "" : totalInvestment}
                      />
                    </section>
                    <section className="flex flex-col gap-1">
                      <h3 className="text-sm">
                        อัตราการเติบโต (%) ของผลตอบแทน (กำไร) ต่องวด
                      </h3>
                      <Input
                        type="number"
                        className="w-full"
                        placeholder="อัตราการเติบโต (%) ของผลตอบแทน (กำไร) ต่องวด"
                        onChange={(e) => setGrowthRate(+e.target.value)}
                        value={growthRate === 0 ? "" : growthRate}
                      />
                    </section>

                    <section className="flex flex-col gap-1">
                      <h3 className="text-sm">
                        จำนวนงวดที่ได้รับผลตอบแทน (กำไร) (งวด)
                      </h3>
                      <Input
                        type="number"
                        className="w-full"
                        placeholder="จำนวนงวดที่ได้รับผลตอบแทน (กำไร) (งวด)"
                        onChange={(e) => setNumberOfPeriods(+e.target.value)}
                        value={numberOfPeriods === 0 ? "" : numberOfPeriods}
                      />
                    </section>
                    <section className="flex flex-col gap-1">
                      <h3 className="text-sm">
                        ประมาณผลตอบแทนขั้นต้น (กำไร) (บาท/งวด)
                      </h3>
                      <Input
                        type="number"
                        className="w-full"
                        placeholder="ประมาณผลตอบแทนขั้นต้น (กำไร) (บาท/งวด)"
                        onChange={(e) => setTotalProfit(+e.target.value)}
                        value={totalProfit === 0 ? "" : totalProfit}
                      />
                    </section>
                    <section className="h-full rounded-md border border-dashed">
                      <article className="flex h-full flex-col gap-1">
                        <article className="flex h-0 w-full flex-grow flex-col gap-1 overflow-y-auto p-1">
                          {newPayback.map((info, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-5 gap-1 border-b border-dashed text-xs"
                            >
                              <p className="col-span-1 truncate">
                                {info?.label}
                              </p>
                              <p className="col-span-2 text-right">
                                {info?.value?.toLocaleString()} บาท
                              </p>
                              <p className="col-span-2 text-right">
                                {info?.value_2?.toLocaleString()} บาท
                              </p>
                            </div>
                          ))}
                        </article>
                      </article>
                    </section>
                    <section>
                      <div className="flex w-full">
                        <h3 className="text-md whitespace-nowrap font-bold">
                          Payback Period
                        </h3>
                        <h4 className="w-max overflow-hidden text-sm text-muted-foreground">
                          {new Array(100).fill(0).map((_, i) => (
                            <span key={i}>.</span>
                          ))}
                        </h4>
                        <div>
                          <h3 className="text-md whitespace-nowrap text-right font-bold text-primary">
                            {payback?.toFixed(2)} เดือน
                          </h3>
                          <h3 className="text-md whitespace-nowrap text-right font-bold text-primary">
                            {payback?.toFixed(2)} ปี
                          </h3>
                        </div>
                      </div>
                      <div className="mt-3 text-right">
                        <Button className="ml-auto">
                          <Icons.save className="mr-2 h-5 w-5" />
                          บันทึกผลการคำนวน
                        </Button>
                      </div>
                    </section>
                  </main>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default CalculatePlayback;
