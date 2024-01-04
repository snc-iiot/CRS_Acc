import { Input, InputGroup, InputRightAddon } from "@/components/ui/input";
import { Select } from "@/components/ui/select-custom";
import { Sections } from "@/helpers/register.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { FC } from "react";

const ShareholderInformationForm: FC = () => {
  const { registration, setRegistration, countryCodeList } = useAtomStore();

  const { hight_nationalities, thai_nationalities, other_nationalities } = registration.share_holder;

  return (
    <section id="shareholder-info" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">{Sections?.find((item) => item.id === "shareholder-info")?.title}</h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          <div className="grid w-full grid-cols-10 items-center gap-2">
            <div className="col-span-4 flex justify-end">
              <h3 className="text-sm font-bold">สัดส่วนผู้ถือหุ้น</h3>
            </div>
            <div className="col-span-6 flex">
              <h3 className="text-sm font-bold">%</h3>
            </div>
          </div>
          <div className="grid w-full grid-cols-10 items-center gap-2">
            <div className="col-span-4 flex justify-end">
              <div className="w-3/4">
                <Select
                  id="shareholder-type"
                  placeholder="เลือกสัญชาติผู้ถือหุ้นสูงสุด"
                  className="text-sm"
                  onChange={(e) => {
                    setRegistration((prev) => ({
                      ...prev,
                      share_holder: {
                        ...prev.share_holder,
                        hight_nationalities: {
                          ...prev.share_holder.hight_nationalities,
                          nationalities: e.target.value,
                          percentage: 0,
                        },
                        thai_nationalities: 0,
                        other_nationalities: 0,
                      },
                    }));
                  }}
                  value={hight_nationalities?.nationalities}
                  required
                >
                  {countryCodeList
                    .sort((a, b) => {
                      if (a.value === "TH") {
                        return -1;
                      }
                      if (b.value === "TH") {
                        return 1;
                      }
                      return 0;
                    })
                    ?.map((item, i) => (
                      <option key={i} value={item?.alpha2}>
                        {item.country}
                      </option>
                    ))}
                </Select>
              </div>
            </div>
            <div className="col-span-4 flex">
              <InputGroup>
                <Input
                  type="number"
                  placeholder="กรอกสัดส่วนผู้ถือหุ้น"
                  className="text-sm"
                  max={"100"}
                  min={"0"}
                  onChange={(e) => {
                    const max = 100 - (thai_nationalities || 0) - (other_nationalities || 0);
                    setRegistration((prev) => ({
                      ...prev,
                      share_holder: {
                        ...prev.share_holder,
                        hight_nationalities: {
                          ...prev.share_holder.hight_nationalities,
                          percentage: +e.target.value > max ? max : +e.target.value,
                        },
                      },
                    }));
                  }}
                  value={hight_nationalities?.percentage || ""}
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </div>
            <div className="col-span-2 flex justify-end">
              <p className="text-sm text-red-500">*</p>
            </div>
          </div>
          <div
            className={cn(
              "grid w-full grid-cols-10 items-center gap-2",
              hight_nationalities?.nationalities === "TH" ? "hidden" : ""
            )}
          >
            <div className="col-span-4 flex justify-end">
              <h3 className="text-sm">สัญชาติไทย</h3>
            </div>
            <div className="col-span-4 flex">
              <InputGroup>
                <Input
                  type="number"
                  placeholder="กรอกสัดส่วนผู้ถือหุ้น"
                  className={cn("text-sm")}
                  onChange={(e) => {
                    if (+e.target.value > 100) return;
                    const max = 100 - (hight_nationalities?.percentage || 0) - (other_nationalities || 0);
                    setRegistration((prev) => ({
                      ...prev,
                      share_holder: {
                        ...prev.share_holder,
                        thai_nationalities: +e.target.value > max ? max : +e.target.value,
                      },
                    }));
                  }}
                  value={thai_nationalities || ""}
                  disabled={hight_nationalities?.nationalities === "TH" || hight_nationalities?.percentage === 100}
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </div>
            <div className="col-span-2 flex justify-end">
              <p className="text-sm text-red-500">*</p>
            </div>
          </div>
          <div className="grid w-full grid-cols-10 items-center gap-2">
            <div className="col-span-4 flex justify-end">
              <h3 className="text-sm ">สัญชาติอื่นๆ</h3>
            </div>
            <div className="col-span-4 flex">
              <InputGroup>
                <Input
                  type="number"
                  placeholder="กรอกสัดส่วนผู้ถือหุ้น"
                  className="text-sm"
                  onChange={(e) => {
                    const max = 100 - (hight_nationalities?.percentage || 0) - (thai_nationalities || 0);
                    setRegistration((prev) => ({
                      ...prev,
                      share_holder: {
                        ...prev.share_holder,
                        other_nationalities: +e.target.value > max ? max : +e.target.value,
                      },
                    }));
                  }}
                  value={other_nationalities || ""}
                  // disabled={
                  //   hight_nationalities?.percentage === 100 ||
                  //   thai_nationalities === 100 ||
                  //   hight_nationalities?.percentage + thai_nationalities === 100
                  // }
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </div>
            <div className="col-span-2 flex justify-end">
              <p className="text-sm text-red-500">*</p>
            </div>
          </div>
          <div className="grid w-full grid-cols-10 items-center gap-2">
            <div className="col-span-4 flex justify-end">
              <h3 className="text-sm ">รวมทุกสัญชาติ</h3>
            </div>
            <div className="col-span-4 flex">
              <InputGroup>
                <Input
                  type="string"
                  placeholder="กรอกสัดส่วนผู้ถือหุ้น"
                  readOnly
                  className={cn(
                    "text-sm",
                    hight_nationalities?.percentage + thai_nationalities + other_nationalities !== 100
                      ? "border border-red-500"
                      : ""
                  )}
                  value={hight_nationalities?.percentage + thai_nationalities + other_nationalities}
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </div>
            <div
              className={cn(
                "col-span-2 flex items-center",
                hight_nationalities?.percentage + thai_nationalities + other_nationalities !== 100
                  ? "justify-between"
                  : "justify-end"
              )}
            >
              {hight_nationalities?.percentage + thai_nationalities + other_nationalities !== 100 ? (
                <p className="text-xs text-red-500">รวมสัดส่วนผู้ถือหุ้นไม่เท่ากับ 100% กรุณาตรวจสอบ อีกครั้ง</p>
              ) : null}
              <p className="text-sm text-red-500">*</p>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default ShareholderInformationForm;
