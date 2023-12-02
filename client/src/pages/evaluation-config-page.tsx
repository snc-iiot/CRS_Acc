import { BreadcrumbItem, Breadcrumbs } from "@/components/common/breadcrumbs";
import { FadeIn } from "@/components/common/framer-motion";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import MockData from "@/mock/financial-ratio-analytics.mock.json";
import { FC, useState } from "react";

const EvaluationConfigPage: FC = () => {
  const [edit, setEdit] = useState<{
    mainIndex: number;
    subIndex: number;
    value: number;
  }>({
    mainIndex: -1,
    subIndex: -1,
    value: 0,
  });

  return (
    <FadeIn>
      <div className="relative h-full w-full">
        <main className="h-full flex-col space-y-4">
          <section className="flex flex-col">
            <Breadcrumbs>
              <BreadcrumbItem title={"ตั้งค่าระบบ"} link={"/settings"} />
              <BreadcrumbItem title={"ตั้งค่าเกณฑ์การประเมิน"} />
            </Breadcrumbs>
          </section>
          <section className="flex flex-col">
            <h1 className="text-xl font-bold">ตั้งค่าเกณฑ์การประเมิน</h1>
            <p className="text-sm text-muted-foreground">
              ท่านสามารถตั้งค่าเกณฑ์การประเมินได้ที่นี่
            </p>
          </section>
          <section className="flex h-[79.5%] w-full flex-col">
            <article className="flex w-full flex-grow flex-col gap-2 overflow-y-auto px-2 text-xs">
              {MockData?.map((evaluate, i) => (
                <div key={i} className="flex w-full flex-col">
                  <h2 className="whitespace-nowrap text-sm font-semibold text-primary">
                    {i + 1}. {evaluate?.Topic}
                  </h2>
                  <div className="flex w-full flex-col gap-1">
                    {evaluate.info?.map((info, j) => (
                      <div
                        key={i}
                        className="flex w-full items-center justify-between text-xs"
                      >
                        <p className="whitespace-nowrap text-xs">
                          {i + 1}.{j + 1}. {info?.FinancialRatio}
                        </p>
                        <div className={`flex items-center gap-2`}>
                          <p className="whitespace-nowrap text-xs">
                            มากกว่าหรือเท่ากับ
                          </p>
                          <input
                            readOnly={
                              edit.mainIndex !== i || edit.subIndex !== j
                            }
                            defaultValue={20}
                            type="number"
                            step={1}
                            className="shrink-1 h-6 w-16 border-b text-right focus:border-primary focus:outline-none"
                          />
                          {edit.mainIndex !== i || edit.subIndex !== j ? (
                            <p
                              onClick={() => {
                                setEdit({
                                  mainIndex: i,
                                  subIndex: j,
                                  value: 0,
                                });
                              }}
                              className="cursor-pointer whitespace-nowrap text-xs text-primary hover:underline"
                            >
                              แก้ไขเกณฑ์การประเมิน
                            </p>
                          ) : (
                            <>
                              <p className="cursor-pointer whitespace-nowrap text-xs text-green-600 hover:underline">
                                บันทึกเกณฑ์การประเมิน
                              </p>
                              <p
                                onClick={() => {
                                  setEdit({
                                    mainIndex: -1,
                                    subIndex: -1,
                                    value: 0,
                                  });
                                }}
                                className="cursor-pointer whitespace-nowrap text-xs text-red-600 hover:underline"
                              >
                                ยกเลิกการแก้ไข
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </article>
          </section>
        </main>
      </div>
    </FadeIn>
  );
};

export default EvaluationConfigPage;
