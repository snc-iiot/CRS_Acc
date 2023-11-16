import { Sections } from "@/helpers/register.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import CountryList from "@/mocks/country-list-th.json";
import { TCountryList } from "@/types";
import { FC } from "react";
import { Input, InputGroup, InputRightAddon } from "../ui/input";
import { Select } from "../ui/select-custom";

const ShareholderInformationForm: FC = () => {
  const { registration, setRegistration } = useAtomStore();

  const { hight_nationalities, thai_nationalities, other_nationalities } =
    registration?.shareholder;

  const total =
    isNaN(hight_nationalities?.percentage) ||
    isNaN(thai_nationalities) ||
    isNaN(other_nationalities)
      ? 0
      : hight_nationalities?.percentage + hight_nationalities?.nationalities ==
        "ไทย"
      ? 0
      : thai_nationalities + other_nationalities;

  const countryList: TCountryList[] = CountryList;

  return (
    <section id="shareholder-info" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "shareholder-info")?.title}
          </h2>
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
                  value={
                    registration?.shareholder?.hight_nationalities
                      ?.nationalities
                  }
                  onChange={(e) => {
                    setRegistration({
                      ...registration,
                      shareholder: {
                        ...registration.shareholder,
                        hight_nationalities: {
                          ...registration.shareholder.hight_nationalities,
                          nationalities: e.target.value,
                        },
                        thai_nationalities:
                          e.target.value != "ไทย" ? thai_nationalities : 0,
                        other_nationalities:
                          e.target.value != "ไทย" ? other_nationalities : 0,
                      },
                    });
                  }}
                >
                  {countryList?.map((item, i) => (
                    <option key={i} value={item?.name}>
                      {item.name}
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
                  value={
                    registration?.shareholder?.hight_nationalities?.percentage
                  }
                  max={"100"}
                  min={"0"}
                  onChange={(e) => {
                    if (hight_nationalities?.nationalities != "ไทย") {
                      const Max =
                        100 -
                        (isNaN(thai_nationalities) ? 0 : thai_nationalities) -
                        (isNaN(other_nationalities) ? 0 : other_nationalities);
                      setRegistration({
                        ...registration,
                        shareholder: {
                          ...registration.shareholder,
                          hight_nationalities: {
                            ...registration.shareholder.hight_nationalities,
                            percentage:
                              e.target.valueAsNumber > Max
                                ? Max
                                : e.target.valueAsNumber,
                          },
                        },
                      });
                    } else {
                      const Max =
                        100 -
                        (isNaN(other_nationalities) ? 0 : other_nationalities);
                      setRegistration({
                        ...registration,
                        shareholder: {
                          ...registration.shareholder,
                          hight_nationalities: {
                            ...registration.shareholder.hight_nationalities,
                            percentage:
                              e.target.valueAsNumber > Max
                                ? Max
                                : e.target.valueAsNumber,
                          },
                        },
                      });
                    }
                  }}
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
              <h3 className="text-sm">สัญชาติไทย</h3>
            </div>
            <div className="col-span-4 flex">
              <InputGroup>
                <Input
                  type="number"
                  placeholder="กรอกสัดส่วนผู้ถือหุ้น"
                  className="text-sm"
                  value={thai_nationalities}
                  disabled={
                    registration?.shareholder?.hight_nationalities
                      ?.nationalities == "ไทย" ||
                    hight_nationalities?.percentage >= 100
                  }
                  onChange={(e) => {
                    if (
                      registration?.shareholder?.hight_nationalities
                        ?.nationalities != "ไทย"
                    ) {
                      const Max =
                        100 -
                        hight_nationalities?.percentage -
                        (isNaN(other_nationalities) ? 0 : other_nationalities);
                      setRegistration({
                        ...registration,
                        shareholder: {
                          ...registration.shareholder,
                          thai_nationalities:
                            e.target.valueAsNumber > Max
                              ? Max
                              : e.target.valueAsNumber,
                        },
                      });
                    }
                  }}
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
                  value={other_nationalities}
                  onChange={(e) => {
                    if (
                      registration?.shareholder?.hight_nationalities
                        ?.nationalities != "ไทย"
                    ) {
                      setRegistration({
                        ...registration,
                        shareholder: {
                          ...registration.shareholder,
                          other_nationalities:
                            e.target.valueAsNumber >
                            100 -
                              hight_nationalities?.percentage -
                              thai_nationalities
                              ? 100 -
                                hight_nationalities?.percentage -
                                thai_nationalities
                              : e.target.valueAsNumber,
                        },
                      });
                    } else {
                      const Max =
                        100 -
                        (isNaN(hight_nationalities?.percentage)
                          ? 0
                          : hight_nationalities?.percentage);
                      setRegistration({
                        ...registration,
                        shareholder: {
                          ...registration.shareholder,
                          other_nationalities:
                            e.target.valueAsNumber > Max
                              ? Max
                              : e.target.valueAsNumber,
                        },
                      });
                    }
                  }}
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
                    total != 100 ? "border border-red-500" : "",
                  )}
                  // defaultValue={total}
                  value={total}
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </div>
            <div
              className={cn(
                "col-span-2 flex items-center",
                total !== 100 ? "justify-between" : "justify-end",
              )}
            >
              {total !== 100 ? (
                <p className="text-xs text-red-500">
                  รวมสัดส่วนผู้ถือหุ้นไม่เท่ากับ 100% กรุณาตรวจสอบ อีกครั้ง
                </p>
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
