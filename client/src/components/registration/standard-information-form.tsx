import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sections } from "@/helpers/register.helper";
import {
  BenefitsStandards,
  CertificationStandards,
  CompanyPolicies,
  MainCustomerOfCompany,
  ObjectivePurchasing,
} from "@/helpers/standards.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import CountryList from "@/mocks/country-list-th.json";
import CurrencyList from "@/mocks/currency-list.json";
import IncotermList from "@/mocks/incoterm-list.json";
import { TCountryList, TCurrency, TIncoterm } from "@/types";
import { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select-custom";

const StandardInformationForm: FC = () => {
  const { registration, setRegistration } = useAtomStore();
  const currencyList: TCurrency[] = CurrencyList;
  const incotermList: TIncoterm[] = IncotermList;
  const countryList: TCountryList[] = CountryList;

  return (
    <section id="standard-certification-info" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        {/* //! Header */}
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "standard-certification-info")
              ?.title ?? "-"}
          </h2>
        </section>
        {/* //! Certificate */}
        <section className="flex h-full w-full flex-col gap-2">
          {/* //! การรับรองที่ได้รับ / Certifications */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  การรับรองที่ได้รับ / Certifications
                </h3>
              </div>
              <div className="col-span-6 flex justify-start">
                <div className="grid w-full grid-cols-1 gap-1">
                  {CertificationStandards?.map((item) => (
                    <div key={item.id} className="grid grid-cols-5 gap-2">
                      <div className="col-span-2 flex items-center gap-2">
                        <Checkbox
                          checked={
                            registration?.standard?.certificate?.find(
                              (info) => info?.value === item?.name,
                            )?.is_checked ?? false
                          }
                          disabled={
                            registration?.standard?.certificate?.find(
                              (info) => info?.value === "none-certification",
                            )?.is_checked && item?.name !== "none-certification"
                          }
                          id={item.name?.toString()}
                          onCheckedChange={(e) => {
                            if (item?.name === "none-certification") {
                              if (e) {
                                setRegistration({
                                  ...registration,
                                  standard: {
                                    ...registration?.standard,
                                    certificate: [
                                      {
                                        cer_id: item?.name,
                                        label_th: item?.label,
                                        label_en: item?.label,
                                        is_checked: true,
                                        value: item.name,
                                        exp: null,
                                      },
                                    ],
                                  },
                                });
                              } else {
                                setRegistration({
                                  ...registration,
                                  standard: {
                                    ...registration?.standard,
                                    certificate: [],
                                  },
                                });
                              }
                            } else {
                              if (e) {
                                setRegistration((prev) => ({
                                  ...prev,
                                  standard: {
                                    ...prev.standard,
                                    certificate: [
                                      ...prev.standard?.certificate,
                                      {
                                        cer_id: item?.name,
                                        label_th: item?.label,
                                        label_en: item?.label,
                                        is_checked: true,
                                        value: item.name,
                                        exp: null,
                                      },
                                    ],
                                  },
                                }));
                              } else {
                                setRegistration((prev) => ({
                                  ...prev,
                                  standard: {
                                    ...prev.standard,
                                    certificate: [
                                      ...prev.standard?.certificate.filter(
                                        (info) => info?.value !== item?.name,
                                      ),
                                    ],
                                  },
                                }));
                              }
                            }
                          }}
                        />
                        <label
                          htmlFor={item.name?.toString()}
                          className={cn(
                            "whitespace-nowrap text-sm font-medium",
                            registration?.standard?.certificate?.find(
                              (info) => info?.value === "none-certification",
                            )?.is_checked && item?.name !== "none-certification"
                              ? "line-through opacity-50"
                              : "",
                          )}
                        >
                          {item.label}
                        </label>
                      </div>
                      <div className={cn("col-span-1 flex items-center gap-2")}>
                        <select
                          className={cn(
                            "w-full rounded-sm border px-2 py-[0.1rem] text-sm",
                            item?.id !== 14 ? "hidden" : "",
                          )}
                          value={
                            registration?.standard?.certificate?.find(
                              (info) => info?.value === item?.name,
                            )?.value ?? ""
                          }
                          onChange={(e) => {
                            setRegistration({
                              ...registration,
                              standard: {
                                ...registration?.standard,
                                certificate: [
                                  ...registration?.standard?.certificate.map(
                                    (info) => {
                                      if (info?.value === item?.name) {
                                        return {
                                          ...info,
                                          value: e.target.value,
                                        };
                                      }
                                      return info;
                                    },
                                  ),
                                ],
                              },
                            });
                          }}
                          disabled={
                            !registration?.standard?.certificate?.find(
                              (info) => info?.value === item?.name,
                            )?.is_checked
                          }
                        >
                          <option value="" className="text-sm">
                            โปรดเลือก
                          </option>
                          {new Array(5).fill(0).map((_, i) => (
                            <option key={i} value={i + 1}>
                              ระดับ {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className={cn(
                          "col-span-2 flex items-center gap-2",
                          item?.name === "none-certification" ? "hidden" : "",
                        )}
                      >
                        <p className="whitespace-nowrap text-sm font-normal">
                          วันที่หมดอายุ
                        </p>
                        <input
                          type="date"
                          className="w-full rounded-sm border px-2 text-sm"
                          required
                          disabled={
                            !registration?.standard?.certificate?.find(
                              (info) => info?.value === item?.name,
                            )?.is_checked
                          }
                          onChange={(e) => {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                certificate: [
                                  ...prev.standard?.certificate.map((info) => {
                                    if (info?.value === item?.name) {
                                      return {
                                        ...info,
                                        exp: e.target.value,
                                      };
                                    }
                                    return info;
                                  }),
                                ],
                              },
                            }));
                          }}
                          value={
                            registration?.standard?.certificate?.find(
                              (info) => info?.value === item?.name,
                            )?.exp ?? ""
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="other-certification"
                        disabled={
                          registration?.standard?.certificate?.find(
                            (info) => info?.value === "none-certification",
                          )?.is_checked ?? false
                        }
                        checked={
                          registration?.standard?.certificate?.find(
                            (info) => info?.value === "other",
                          )?.is_checked ?? false
                        }
                        onCheckedChange={(e) => {
                          if (e) {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                certificate: [
                                  ...prev.standard?.certificate,
                                  {
                                    cer_id: "other",
                                    label_th: "",
                                    label_en: "",
                                    is_checked: true,
                                    value: "other",
                                    exp: null,
                                  },
                                ],
                              },
                            }));
                          } else {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                certificate: [
                                  ...prev.standard?.certificate.filter(
                                    (info) => info?.value !== "other",
                                  ),
                                ],
                              },
                            }));
                          }
                        }}
                      />
                      <label
                        htmlFor="other-certification"
                        className={cn(
                          "whitespace-nowrap text-sm font-medium",
                          registration?.standard?.certificate?.find(
                            (info) => info?.value === "none-certification",
                          )?.is_checked && "line-through opacity-50",
                        )}
                      >
                        อื่นๆ
                      </label>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <Input
                        type="text"
                        placeholder="โปรดระบุ"
                        className={cn("col-span-3 w-full")}
                        variant="flushed"
                        disabled={
                          !registration?.standard?.certificate?.find(
                            (info) => info?.value === "other",
                          )?.is_checked
                        }
                        onChange={(e) => {
                          setRegistration((prev) => ({
                            ...prev,
                            standard: {
                              ...prev.standard,
                              certificate: [
                                ...prev.standard?.certificate.map((info) => {
                                  if (info?.value === "other") {
                                    return {
                                      ...info,
                                      label_th: e.target.value,
                                      label_en: e.target.value,
                                    };
                                  }
                                  return info;
                                }),
                              ],
                            },
                          }));
                        }}
                        value={
                          registration?.standard?.certificate?.find(
                            (info) => info?.value === "other",
                          )?.label_th ?? ""
                        }
                      />
                      <div className="col-span-2 flex items-center gap-2">
                        <p className="whitespace-nowrap text-sm font-normal">
                          วันที่หมดอายุ
                        </p>
                        <input
                          type="date"
                          className="w-full rounded-sm border px-2 text-sm"
                          required
                          disabled={
                            !registration?.standard?.certificate?.find(
                              (info) => info?.value === "other",
                            )?.is_checked
                          }
                          onChange={(e) => {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                certificate: [
                                  ...prev.standard?.certificate.map((info) => {
                                    if (info?.value === "other") {
                                      return {
                                        ...info,
                                        exp: e.target.value,
                                      };
                                    }
                                    return info;
                                  }),
                                ],
                              },
                            }));
                          }}
                          value={
                            registration?.standard?.certificate?.find(
                              (info) => info?.value === "other",
                            )?.exp ?? ""
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </article>
          {/* //! Benefits */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  สิทธิประโยชน์ที่ได้รับ / Benefits
                </h3>
              </div>
              <div className="col-span-6 flex justify-start">
                <div className="grid w-full grid-cols-1 gap-1">
                  {BenefitsStandards?.map((item) => (
                    <div key={item.id} className="grid grid-cols-5 gap-2">
                      <div className="col-span-3 flex items-center gap-2">
                        <Checkbox
                          id={item.id?.toString()}
                          checked={
                            registration?.standard?.benefit?.find(
                              (info) => info?.value === item?.id,
                            )?.is_checked ?? false
                          }
                          disabled={
                            registration?.standard?.benefit?.find(
                              (info) => info?.value === "none-benefit",
                            )?.is_checked && item?.id !== "none-benefit"
                          }
                          onCheckedChange={(e) => {
                            if (item?.id === "none-benefit") {
                              if (e) {
                                setRegistration({
                                  ...registration,
                                  standard: {
                                    ...registration?.standard,
                                    benefit: [
                                      {
                                        cer_id: item?.id,
                                        label_th: item?.label,
                                        label_en: item?.label,
                                        is_checked: true,
                                        value: item.id,
                                        exp: null,
                                      },
                                    ],
                                  },
                                });
                              } else {
                                setRegistration({
                                  ...registration,
                                  standard: {
                                    ...registration?.standard,
                                    benefit: [],
                                  },
                                });
                              }
                            } else {
                              if (e) {
                                setRegistration((prev) => ({
                                  ...prev,
                                  standard: {
                                    ...prev.standard,
                                    benefit: [
                                      ...prev.standard?.benefit,
                                      {
                                        cer_id: item?.id,
                                        label_th: item?.label,
                                        label_en: item?.label,
                                        is_checked: true,
                                        value: item.id,
                                        exp: null,
                                      },
                                    ],
                                  },
                                }));
                              } else {
                                setRegistration((prev) => ({
                                  ...prev,
                                  standard: {
                                    ...prev.standard,
                                    benefit: [
                                      ...prev.standard?.benefit.filter(
                                        (info) => info?.value !== item?.id,
                                      ),
                                    ],
                                  },
                                }));
                              }
                            }
                          }}
                        />
                        <label
                          htmlFor={item.id?.toString()}
                          className={cn(
                            "whitespace-nowrap text-sm font-medium",
                            registration?.standard?.benefit?.find(
                              (info) => info?.value === "none-benefit",
                            )?.is_checked && item?.id !== "none-benefit"
                              ? "line-through opacity-50"
                              : "",
                          )}
                        >
                          {item.label}
                        </label>
                      </div>
                      <div
                        className={cn(
                          "col-span-2 flex items-center gap-2",
                          item?.id === "none-benefit" ? "hidden" : "",
                        )}
                      >
                        <p className="whitespace-nowrap text-sm font-normal">
                          วันที่หมดอายุ
                        </p>
                        <input
                          type="date"
                          className="w-full rounded-sm border px-2 text-sm"
                          required
                          disabled={
                            !registration?.standard?.benefit?.find(
                              (info) => info?.value === item?.id,
                            )?.is_checked
                          }
                          onChange={(e) => {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                benefit: [
                                  ...prev.standard?.benefit.map((info) => {
                                    if (info?.value === item?.id) {
                                      return {
                                        ...info,
                                        exp: e.target.value,
                                      };
                                    }
                                    return info;
                                  }),
                                ],
                              },
                            }));
                          }}
                          value={
                            registration?.standard?.benefit?.find(
                              (info) => info?.value === item?.id,
                            )?.exp ?? ""
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="other-benefit"
                        disabled={
                          registration?.standard?.benefit?.find(
                            (info) => info?.value === "none-benefit",
                          )?.is_checked ?? false
                        }
                        checked={
                          registration?.standard?.benefit?.find(
                            (info) => info?.value === "other",
                          )?.is_checked ?? false
                        }
                        onCheckedChange={(e) => {
                          if (e) {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                benefit: [
                                  ...prev.standard?.benefit,
                                  {
                                    cer_id: "other",
                                    label_th: "",
                                    label_en: "",
                                    is_checked: true,
                                    value: "other",
                                    exp: null,
                                  },
                                ],
                              },
                            }));
                          } else {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                benefit: [
                                  ...prev.standard?.benefit.filter(
                                    (info) => info?.value !== "other",
                                  ),
                                ],
                              },
                            }));
                          }
                        }}
                      />
                      <label
                        htmlFor="other-benefit"
                        className={cn(
                          "whitespace-nowrap text-sm font-medium",
                          registration?.standard?.benefit?.find(
                            (info) => info?.value === "none-benefit",
                          )?.is_checked && "line-through opacity-50",
                        )}
                      >
                        อื่นๆ
                      </label>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <Input
                        type="text"
                        placeholder="โปรดระบุ"
                        className={cn("col-span-3 w-full")}
                        variant="flushed"
                        disabled={
                          !registration?.standard?.benefit?.find(
                            (info) => info?.value === "other",
                          )?.is_checked
                        }
                        onChange={(e) => {
                          setRegistration((prev) => ({
                            ...prev,
                            standard: {
                              ...prev.standard,
                              benefit: [
                                ...prev.standard?.benefit.map((info) => {
                                  if (info?.value === "other") {
                                    return {
                                      ...info,
                                      label_th: e.target.value,
                                      label_en: e.target.value,
                                    };
                                  }
                                  return info;
                                }),
                              ],
                            },
                          }));
                        }}
                        value={
                          registration?.standard?.benefit?.find(
                            (info) => info?.value === "other",
                          )?.label_th ?? ""
                        }
                      />
                      <div className="col-span-2 flex items-center gap-2">
                        <p className="whitespace-nowrap text-sm font-normal">
                          วันที่หมดอายุ
                        </p>
                        <input
                          type="date"
                          className="w-full rounded-sm border px-2 text-sm"
                          required
                          disabled={
                            !registration?.standard?.benefit?.find(
                              (info) => info?.value === "other",
                            )?.is_checked
                          }
                          onChange={(e) => {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                benefit: [
                                  ...prev.standard?.benefit.map((info) => {
                                    if (info?.value === "other") {
                                      return {
                                        ...info,
                                        exp: e.target.value,
                                      };
                                    }
                                    return info;
                                  }),
                                ],
                              },
                            }));
                          }}
                          value={
                            registration?.standard?.benefit?.find(
                              (info) => info?.value === "other",
                            )?.exp ?? ""
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </article>
          {/* //!Sales and Payment Terms */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  {/* เงื่อนไขการขายและรับชำระเงิน / Sales and Payment Terms */}
                  เงื่อนไขการซื้อขายและการชำระเงิน / Sales and Payment Terms
                </h3>
              </div>
              <div className="col-span-6" />
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  เครดิตเทอมการจ่ายเงิน / Credit Term
                </h3>
              </div>
              <div className="col-span-6 flex flex-col justify-start">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-term" id="credit-term" />
                    <label
                      htmlFor="credit-term"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      เครดิตเทอม
                    </label>
                    <div className="flex items-center gap-2">
                      <select className="w-full rounded-sm border px-2 py-[0.1rem] text-sm">
                        <option value="" className="text-sm">
                          โปรดเลือกจำนวนวัน
                        </option>
                        <option value="cash">เงินสด</option>
                        <option value="30">30 วัน</option>
                        <option value="60">60 วัน</option>
                        <option value="75">75 วัน</option>
                        <option value="90">90 วัน</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other-term" id="other-term" />
                    <label
                      htmlFor="other-term"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      อื่นๆ
                    </label>
                  </div>
                </RadioGroup>
                <Input
                  type="text"
                  placeholder="โปรดระบุ จำนวนวัน"
                  className={cn("w-full")}
                  variant="flushed"
                />
              </div>
            </article>
          </article>
          {/* //!ระเบียบการวางบิล / Billing Terms */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  ระเบียบการวางบิล / Billing Terms
                </h3>
              </div>
              <div className="col-span-6 flex flex-col justify-start">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bill" id="bill" />
                    <label
                      htmlFor="bill"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      เงินสด
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <label
                      htmlFor="transfer"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      โอน
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="check" id="check" />
                    <label
                      htmlFor="check"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      รับเช็ค
                    </label>
                  </div>
                </RadioGroup>
                <Input
                  type="text"
                  placeholder="โปรดระบุสถานที่รับเช็ค, เวลา, ผู้ติดต่อ"
                  className={cn("w-full")}
                  variant="flushed"
                />
              </div>
            </article>
          </article>
          {/* //! สกุลเงิน / Currency */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-center justify-end">
                <h3 className="text-sm font-bold">สกุลเงิน / Currency</h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <div className="w-full">
                  <Select>
                    <option value="">โปรดเลือกสกุลเงิน</option>
                    {currencyList?.map((item) => (
                      <option key={item.cc} value={item.cc}>
                        {item.cc} - {item.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </article>
          </article>
          {/* //! Incoterm / Incoterm */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-center justify-end">
                <h3 className="text-sm font-bold">Incoterm</h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <div className="w-full">
                  <Select placeholder="โปรดเลือก Incoterm">
                    {incotermList?.map((item, i) => (
                      <option key={i} value={item?.labelEN}>
                        {item?.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </article>
          </article>
          {/* //!เงื่อนไขการเปิด L/C / L/C Terms */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  เงื่อนไขการเปิด L/C หรือ L/C Terms
                </h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex w-full flex-col gap-1"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lc" id="lc" />
                      <label
                        htmlFor="lc"
                        className="whitespace-nowrap text-sm font-medium"
                      >
                        มี
                      </label>
                    </div>
                    <select className="rounded-sm border px-2 py-[0.1rem] text-sm">
                      <option value="" className="text-sm">
                        โปรดเลือกเงื่อนไขการเปิด L/C
                      </option>
                      <option value="lc-sight">L/C at sight</option>
                      <option value="lc-30">L/C term 30</option>
                      <option value="lc-60">L/C term 60</option>
                      <option value="lc-90">L/C term 90</option>
                    </select>
                  </div>
                  {/* <div className="w-full">
                    <Select placeholder="โปรดเลือกเงื่อนไขการเปิด L/C">
                      <option value="lc-sight">L/C at sight</option>
                      <option value="lc-30">L/C term 30</option>
                      <option value="lc-60">L/C term 60</option>
                      <option value="lc-90">L/C term 90</option>
                    </Select>
                  </div> */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none-lc" id="none-lc" />
                    <label
                      htmlFor="none-lc"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      ไม่มี
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </article>
          </article>
          {/* //! การขนส่งสินค้า / Delivery Terms */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  เงื่อนไขการขนส่งสินค้า / Delivery Terms
                </h3>
              </div>
              <div className="col-span-6 flex justify-start">
                <div className="grid w-full grid-cols-1 gap-1">
                  <div className="flex items-center gap-2">
                    <Checkbox id="customer" />
                    <label
                      htmlFor="customer"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      {/* บริษัทขนส่งสินค้าเอง */}
                      SNC เป็นผู้ขนส่งสินค้า
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="customer-2" />
                    <label
                      htmlFor="customer-2"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      {/* ลูกค้าจัดส่งเอง */}
                      ผู้รับ (Customer) เป็นผู้ขนส่งสินค้า
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="customer-3" />
                    <label
                      htmlFor="customer-3"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      {/* ลูกค้าจัดส่งเอง */}
                      ผู้รับ (Customer) จ้างขนส่งภายนอก
                    </label>
                  </div>
                </div>
              </div>
            </article>
          </article>
          {/* //!เงื่อนไขในการวางเงินมัดจำ */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  เงื่อนไขในการวางเงินมัดจำ / Deposit Terms
                </h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex w-full flex-col gap-1"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="deposit" id="deposit" />
                      <label
                        htmlFor="deposit"
                        className="whitespace-nowrap text-sm font-medium"
                      >
                        มี
                      </label>
                    </div>
                    <select className="rounded-sm border px-2 py-[0.1rem] text-sm">
                      <option value="" className="text-sm">
                        โปรดเลือกเงื่อนไขการวางเงินมัดจำ
                      </option>
                      <option value="30-70">30/70 (%)</option>
                      <option value="50-50">50/50 (%)</option>
                      <option value="60-40">60/40 (%)</option>
                      <option value="70-30">70/30 (%)</option>
                      <option value="other">อื่นๆ</option>
                    </select>
                  </div>

                  <Input type="text" placeholder="โปรดระบุ" variant="flushed" />
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none-deposit" id="none-deposit" />
                    <label
                      htmlFor="none-deposit"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      ไม่มี
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </article>
          </article>
          {/* //!รับประกันสินค้า */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  เงื่อนไขการประกันสินค้า / Product Warranty
                </h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex w-full flex-col gap-1"
                >
                  <div className="item-center flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="warranty" id="warranty" />
                      <label
                        htmlFor="warranty"
                        className="whitespace-nowrap text-sm font-medium"
                      >
                        ต้องการ
                      </label>
                    </div>
                    <select className="rounded-sm border px-2 py-[0.1rem] text-sm">
                      <option value="" className="text-sm">
                        โปรดเลือกเงื่อนไขการรับประกันสินค้า
                      </option>
                      <option value="1">1 ปี</option>
                      <option value="2">2 ปี</option>
                      <option value="3">3 ปี</option>
                      <option value="5">5 ปี</option>
                      <option value="other">อื่นๆ</option>
                    </select>
                  </div>
                  <Input
                    type="text"
                    placeholder="โปรดระบุ ปี"
                    variant="flushed"
                  />
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none-warranty" id="none-warranty" />
                    <label
                      htmlFor="none-warranty"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      ไม่ต้องการ
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </article>
          </article>
          {/* //!นโยบายการดำเนินการ / Company Policies */}
          <article>
            <section className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  นโยบายการดำเนินการ / Company Policies
                </h3>
              </div>
              <div className="col-span-6 grid grid-cols-1 gap-1">
                {CompanyPolicies?.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <Label>{item}</Label>
                    <div className="flex flex-col gap-1">
                      <RadioGroup
                        defaultValue="option-one"
                        className="flex gap-5"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={`${item}-yes`}
                            id={`${item}-yes`}
                          />
                          <Label htmlFor={`${item}-yes`}>มี</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={`${item}-no`}
                            id={`${item}-no`}
                          />
                          <Label htmlFor={`${item}-no`}>ไม่มี</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                ))}
                <Input
                  type="text"
                  placeholder="โปรดระบุ นโยบายการดำเนินการอื่นๆ"
                  variant="flushed"
                />
              </div>
            </section>
          </article>
          {/* //!วัตถุประสงค์หลักการซื้อสินค้า / The objective of purchasing. */}
          <article>
            <section className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  วัตถุประสงค์หลักการซื้อสินค้า / The objective of purchasing
                </h3>
              </div>
              <div className="col-span-6 flex flex-col justify-start">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex flex-col gap-1"
                >
                  {ObjectivePurchasing?.map((item, i) => (
                    <div className="flex items-center space-x-2" key={i}>
                      <RadioGroupItem value={item?.name} id={item?.name} />
                      <Label htmlFor={item?.name}>{item?.label ?? "-"}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <Input type="text" placeholder="โปรดระบุ" variant="flushed" />
              </div>
            </section>
          </article>
          {/* //! ลูกค้าหลักของลูกค้า / Main customer of customer */}
          <article>
            <section className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  ลูกค้าหลักของลูกค้า / Main customer of customer
                </h3>
              </div>
              <div className="col-span-4 flex items-center justify-start gap-2">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex flex-col gap-1"
                >
                  {MainCustomerOfCompany?.map((item, i) => (
                    <div className="flex items-center space-x-2" key={i}>
                      <RadioGroupItem value={item?.name} id={item?.name} />
                      <Label htmlFor={item?.name} className="whitespace-nowrap">
                        {item?.label ?? "-"}
                      </Label>
                      <select
                        placeholder="เลือกประเทศ"
                        className={cn(
                          "w-full rounded-sm border px-2 py-[0.1rem] text-sm",
                          i === 0 ? "hidden" : "",
                        )}
                      >
                        <option value="">เลือกประเทศ</option>
                        {countryList?.map((item, i) => (
                          <option key={i} value={item?.name}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </section>
          </article>
        </section>
      </main>
    </section>
  );
};

export default StandardInformationForm;
