import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCustomerForeigner } from "@/helpers/common.helper";
import { Sections } from "@/helpers/register.helper";
import {
  BenefitsStandards,
  CertificationStandards,
  CompanyPolicies,
  DeliveryTerms,
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
  const isForeigner = CheckCustomerForeigner(registration);
  const currencyList: TCurrency[] = CurrencyList;
  const incotermList: TIncoterm[] = IncotermList;
  const countryList: TCountryList[] = CountryList;

  const CreditTerm = ["cash", "30", "60", "75", "90"];

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
                              (info) => info?.cer_id === item?.name,
                            )?.is_checked ?? false
                          }
                          disabled={
                            registration?.standard?.certificate?.find(
                              (info) => info?.cer_id === "none-certification",
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
                                        value: "",
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
                                        value: "",
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
                                        (info) => info?.cer_id !== item?.name,
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
                              (info) => info?.cer_id === "none-certification",
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
                            item?.name !== "green-industry" ? "hidden" : "",
                          )}
                          value={
                            registration?.standard?.certificate?.find(
                              (info) => info?.cer_id === item?.name,
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
                                      if (info?.cer_id === item?.name) {
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
                              (info) => info?.cer_id === item?.name,
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
                              (info) => info?.cer_id === item?.name,
                            )?.is_checked
                          }
                          onChange={(e) => {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                certificate: [
                                  ...prev.standard?.certificate.map((info) => {
                                    if (info?.cer_id === item?.name) {
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
                              (info) => info?.cer_id === item?.name,
                            )?.exp ?? ""
                          }
                        />
                      </div>
                      {item?.name === "other" &&
                        registration?.standard?.certificate?.find(
                          (info) => info?.cer_id === "other",
                        )?.is_checked && (
                          <div className="col-span-2 flex items-center gap-2">
                            <Input
                              type="text"
                              placeholder="โปรดระบุ"
                              className={cn("col-span-3 w-full")}
                              variant="flushed"
                              disabled={
                                !registration?.standard?.certificate?.find(
                                  (info) => info?.cer_id === item?.name,
                                )?.is_checked
                              }
                              onChange={(e) => {
                                setRegistration((prev) => ({
                                  ...prev,
                                  standard: {
                                    ...prev.standard,
                                    certificate: [
                                      ...prev.standard?.certificate.map(
                                        (info) => {
                                          if (info?.cer_id === item?.name) {
                                            return {
                                              ...info,
                                              label_th: "อื่นๆ",
                                              label_en: "other",
                                              value: e.target.value,
                                            };
                                          }
                                          return info;
                                        },
                                      ),
                                    ],
                                  },
                                }));
                              }}
                              value={
                                registration?.standard?.certificate?.find(
                                  (info) => info?.cer_id === item?.name,
                                )?.value ?? ""
                              }
                            />
                          </div>
                        )}
                    </div>
                  ))}
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
                              (info) => info?.cer_id === item?.id,
                            )?.is_checked ?? false
                          }
                          disabled={
                            registration?.standard?.benefit?.find(
                              (info) => info?.cer_id === "none-benefit",
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
                                        value: "",
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
                                        value: "",
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
                                        (info) => info?.cer_id !== item?.id,
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
                              (info) => info?.cer_id === "none-benefit",
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
                              (info) => info?.cer_id === item?.id,
                            )?.is_checked
                          }
                          onChange={(e) => {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                benefit: [
                                  ...prev.standard?.benefit.map((info) => {
                                    if (info?.cer_id === item?.id) {
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
                              (info) => info?.cer_id === item?.id,
                            )?.exp ?? ""
                          }
                        />
                      </div>
                      {item?.id === "other-benefit" &&
                        registration?.standard?.benefit?.find(
                          (info) => info?.cer_id === "other-benefit",
                        )?.is_checked && (
                          <div className="col-span-2 flex items-center gap-2">
                            <Input
                              type="text"
                              placeholder="โปรดระบุ"
                              className={cn("col-span-3 w-full")}
                              variant="flushed"
                              disabled={
                                !registration?.standard?.benefit?.find(
                                  (info) => info?.cer_id === item?.id,
                                )?.is_checked
                              }
                              onChange={(e) => {
                                setRegistration((prev) => ({
                                  ...prev,
                                  standard: {
                                    ...prev.standard,
                                    benefit: [
                                      ...prev.standard?.benefit.map((info) => {
                                        if (info?.cer_id === item?.id) {
                                          return {
                                            ...info,
                                            label_th: "อื่นๆ",
                                            label_en: "other-benefit",
                                            value: e.target.value,
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
                                  (info) => info?.cer_id === item?.id,
                                )?.value ?? ""
                              }
                            />
                          </div>
                        )}
                    </div>
                  ))}
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
                  className="flex flex-col gap-1"
                  onValueChange={(e) => {
                    setRegistration((prev) => ({
                      ...prev,
                      payment_term: {
                        ...prev.payment_term,
                        credit_term: {
                          ...prev.payment_term?.credit_term,
                          name: e,
                          value: "",
                        },
                      },
                    }));
                  }}
                  required
                  value={registration?.payment_term?.credit_term?.name ?? ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <label
                      htmlFor="credit"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      เครดิตเทอม
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        className="w-full rounded-sm border px-2 py-[0.1rem] text-sm"
                        disabled={
                          registration?.payment_term?.credit_term?.name !==
                          "credit"
                        }
                        required={
                          registration?.payment_term?.credit_term?.name ===
                          "credit"
                        }
                        value={
                          registration?.payment_term?.credit_term?.value ?? ""
                        }
                        onChange={(e) => {
                          setRegistration((prev) => ({
                            ...prev,
                            payment_term: {
                              ...prev.payment_term,
                              credit_term: {
                                ...prev.payment_term?.credit_term,
                                value: e.target.value,
                              },
                            },
                          }));
                        }}
                      >
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
                  className={cn(
                    "w-full",
                    registration?.payment_term?.credit_term?.name !==
                      "other-term"
                      ? "hidden"
                      : "",
                  )}
                  variant="flushed"
                  onChange={(e) => {
                    if (CreditTerm.includes(e.target.value)) return;
                    setRegistration((prev) => ({
                      ...prev,
                      payment_term: {
                        ...prev.payment_term,
                        credit_term: {
                          ...prev.payment_term?.credit_term,
                          value: e.target.value,
                        },
                      },
                    }));
                  }}
                  value={registration?.payment_term?.credit_term?.value ?? ""}
                  required={
                    registration?.payment_term?.credit_term?.name ===
                    "other-term"
                  }
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
                  value={registration?.payment_term?.billing_term?.name ?? ""}
                  onValueChange={(e) => {
                    setRegistration((prev) => ({
                      ...prev,
                      payment_term: {
                        ...prev.payment_term,
                        billing_term: {
                          ...prev.payment_term?.billing_term,
                          name: e,
                          value: "",
                        },
                      },
                    }));
                  }}
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
                  disabled={
                    registration?.payment_term?.billing_term?.name !== "check"
                  }
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
                  <Select
                    onChange={(e) => {
                      setRegistration((prev) => ({
                        ...prev,
                        payment_term: {
                          ...prev.payment_term,
                          currency: e.target.value,
                        },
                      }));
                    }}
                    required
                    value={registration?.payment_term?.currency ?? ""}
                  >
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
                <h3
                  className={cn(
                    "text-sm font-bold",
                    registration?.company_information?.company_registration
                      ?.is_thai
                      ? "opacity-50"
                      : "",
                  )}
                >
                  Incoterm
                </h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <div className="w-full">
                  <Select
                    placeholder="โปรดเลือก Incoterm"
                    disabled={
                      registration?.company_information?.company_registration
                        ?.is_thai
                    }
                    onChange={(e) => {
                      setRegistration((prev) => ({
                        ...prev,
                        payment_term: {
                          ...prev.payment_term,
                          incoterm: e.target.value,
                        },
                      }));
                    }}
                    required={
                      !registration?.company_information?.company_registration
                        ?.is_thai
                    }
                    value={
                      registration?.payment_term?.incoterm ??
                      registration?.company_information?.company_registration
                        ?.is_thai
                        ? registration?.payment_term?.incoterm
                        : ""
                    }
                  >
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
                <h3
                  className={cn(
                    "text-sm font-bold",
                    registration?.company_information?.company_registration
                      ?.is_thai
                      ? "opacity-50"
                      : "",
                  )}
                >
                  เงื่อนไขการเปิด L/C หรือ L/C Terms
                </h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <RadioGroup
                  className="flex w-full flex-col gap-1"
                  disabled={
                    registration?.company_information?.company_registration
                      ?.is_thai
                  }
                  value={
                    registration?.payment_term?.lc_term?.is_lc
                      ? "lc"
                      : "none-lc"
                  }
                  onValueChange={(e) => {
                    if (e === "lc") {
                      setRegistration((prev) => ({
                        ...prev,
                        payment_term: {
                          ...prev.payment_term,
                          lc_term: {
                            ...prev.payment_term?.lc_term,
                            is_lc: true,
                            lc_type: "",
                          },
                        },
                      }));
                    } else {
                      setRegistration((prev) => ({
                        ...prev,
                        payment_term: {
                          ...prev.payment_term,
                          lc_term: {
                            ...prev.payment_term?.lc_term,
                            is_lc: false,
                            lc_type: "",
                          },
                        },
                      }));
                    }
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lc" id="lc" />
                      <label
                        htmlFor="lc"
                        className={cn(
                          "whitespace-nowrap text-sm font-medium",
                          registration?.company_information
                            ?.company_registration?.is_thai
                            ? "opacity-50"
                            : "",
                        )}
                      >
                        มี
                      </label>
                    </div>
                    <select
                      className="rounded-sm border px-2 py-[0.1rem] text-sm"
                      disabled={
                        registration?.company_information?.company_registration
                          ?.is_thai
                      }
                      value={registration?.payment_term?.lc_term?.lc_type ?? ""}
                      onChange={(e) => {
                        setRegistration((prev) => ({
                          ...prev,
                          payment_term: {
                            ...prev.payment_term,
                            lc_term: {
                              ...prev.payment_term?.lc_term,
                              lc_type: e.target.value,
                            },
                          },
                        }));
                      }}
                      required={
                        registration?.payment_term?.lc_term?.is_lc &&
                        !registration?.company_information?.company_registration
                          ?.is_thai
                      }
                    >
                      <option value="" className="text-sm">
                        โปรดเลือกเงื่อนไขการเปิด L/C
                      </option>
                      <option value="lc-sight">L/C at sight</option>
                      <option value="lc-30">L/C term 30</option>
                      <option value="lc-60">L/C term 60</option>
                      <option value="lc-90">L/C term 90</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none-lc" id="none-lc" />
                    <label
                      htmlFor="none-lc"
                      className={cn(
                        "whitespace-nowrap text-sm font-medium",
                        registration?.company_information?.company_registration
                          ?.is_thai
                          ? "opacity-50"
                          : "",
                      )}
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
                  {DeliveryTerms?.map((item, i) => (
                    <div className="flex items-center gap-2" key={i}>
                      <Checkbox
                        id={item?.label}
                        checked={
                          registration?.payment_term?.delivery_term?.find(
                            (info) => info?.cer_id === item?.label,
                          )?.is_checked ?? false
                        }
                        onCheckedChange={(e) => {
                          if (e) {
                            setRegistration((prev) => ({
                              ...prev,
                              payment_term: {
                                ...prev.payment_term,
                                delivery_term: [
                                  ...prev.payment_term?.delivery_term,
                                  {
                                    cer_id: item?.label,
                                    label_th: item?.label,
                                    label_en: item?.label_en,
                                    is_checked: true,
                                  },
                                ],
                              },
                            }));
                          } else {
                            setRegistration((prev) => ({
                              ...prev,
                              payment_term: {
                                ...prev.payment_term,
                                delivery_term: [
                                  ...prev.payment_term?.delivery_term.filter(
                                    (info) => info?.cer_id !== item?.label,
                                  ),
                                ],
                              },
                            }));
                          }
                        }}
                      />
                      <label
                        htmlFor={item?.label}
                        className="whitespace-nowrap text-sm font-medium"
                      >
                        {item?.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </article>
          {/* //!เงื่อนไขในการวางเงินมัดจำ */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3
                  className={cn(
                    "text-sm font-bold",
                    !isForeigner ? "opacity-50" : "",
                  )}
                >
                  เงื่อนไขในการวางเงินมัดจำ / Deposit Terms
                </h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex w-full flex-col gap-1"
                  disabled={!isForeigner}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="deposit" id="deposit" />
                      <label
                        htmlFor="deposit"
                        className={cn(
                          "whitespace-nowrap text-sm font-medium",
                          !isForeigner ? "opacity-50" : "",
                        )}
                      >
                        มี
                      </label>
                    </div>
                    <select
                      className="rounded-sm border px-2 py-[0.1rem] text-sm"
                      disabled={!isForeigner}
                    >
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

                  <Input
                    type="text"
                    placeholder="โปรดระบุ"
                    variant="flushed"
                    disabled={!isForeigner}
                  />
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
