import RequiredTopic from "@/components/common/required-topic";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select-custom";
import { CheckCustomerForeigner } from "@/helpers/common.helper";
import { Sections } from "@/helpers/register.helper";
import {
  MainCustomerOfCompany,
  ObjectivePurchasing,
} from "@/helpers/standards.helper";
import { cn } from "@/lib/utils";
import CurrentCode from "@/mocks/currency-list.json";
import IncotermList from "@/mocks/incoterm-list.json";
import { useAtomStore } from "@/store/use-atom-store";
import { FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const StandardInformationForm: FC = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const refCertification = useRef<HTMLDivElement>(null);
  const [depositType, setDepositType] = useState<string>("");
  const [warranty, setWarranty] = useState<string>("");
  const [creditTerm, setCreditTerm] = useState<string>("");
  const {
    registration,
    certificatedList,
    setRegistration,
    benefitsList,
    deliveryTermsList,
    companyPolicyList,
    countryCodeList,
  } = useAtomStore();

  const isForeigner = CheckCustomerForeigner(registration);

  const CreditTerm = ["cash", "30", "60", "75", "90"];

  useEffect(() => {
    setRegistration((prev) => ({
      ...prev,
      payment_term: {
        ...prev.payment_term,
        company_policy: companyPolicyList,
        delivery_term: deliveryTermsList,
      },
      standard: {
        certificate: certificatedList?.map((item) => {
          return {
            ...item,
            value: "-",
          };
        }),
        benefit: benefitsList?.map((item) => {
          return {
            ...item,
            value: "-",
          };
        }),
      },
    }));
  }, [companyPolicyList, certificatedList, benefitsList, deliveryTermsList]);

  useEffect(() => {
    if (mode?.toLowerCase() === "edit") {
      setDepositType(
        registration?.payment_term?.deposit_term?.deposit_type ?? "",
      );
      setCreditTerm(registration?.payment_term?.credit_term?.name ?? "");
      setWarranty(
        registration?.payment_term?.product_warranty?.value !== 1 &&
          registration?.payment_term?.product_warranty?.value !== 2 &&
          registration?.payment_term?.product_warranty?.value !== 3 &&
          registration?.payment_term?.product_warranty?.value !== 5
          ? "other"
          : "",
      );
    }
  }, []);

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
                  การรับรองที่ได้รับ / Certifications <RequiredTopic />
                </h3>
              </div>
              <div className="col-span-6 flex justify-start">
                <div
                  className="grid w-full grid-cols-1 gap-1"
                  ref={refCertification}
                >
                  {registration?.standard?.certificate
                    ?.filter((item) => item.cer_id !== 15)
                    ?.map((item, i) => (
                      <div key={i} className="grid grid-cols-5 gap-2">
                        <div className="col-span-2 flex items-center gap-2">
                          <Checkbox
                            checked={
                              registration?.standard?.certificate?.find(
                                (info) => info?.cer_id === item.cer_id,
                              )?.is_checked ?? false
                            }
                            disabled={
                              registration?.standard?.certificate?.find(
                                (info) => info?.cer_id === 17,
                              )?.is_checked && item?.cer_id !== 17
                            }
                            name={item.cer_name_en?.toString()}
                            id={item.cer_id?.toString()}
                            onCheckedChange={(e) => {
                              if (item.cer_id === 17) {
                                setRegistration((prev) => ({
                                  ...prev,
                                  standard: {
                                    ...prev.standard,
                                    certificate: [
                                      ...prev.standard.certificate.map(
                                        (info) => {
                                          if (info?.cer_id !== 17) {
                                            return {
                                              ...info,
                                              is_checked: false,
                                              exp: "",
                                              value: "-",
                                            };
                                          }
                                          return info;
                                        },
                                      ),
                                    ],
                                  },
                                }));
                              }
                              setRegistration((prev) => ({
                                ...prev,
                                standard: {
                                  ...prev.standard,
                                  certificate: [
                                    ...prev.standard.certificate.map((info) => {
                                      if (info?.cer_id === item?.cer_id) {
                                        return {
                                          ...info,
                                          is_checked: JSON.parse(e.toString()),
                                        };
                                      }
                                      return info;
                                    }),
                                  ],
                                },
                              }));
                            }}
                          />
                          <label
                            htmlFor={item.cer_id?.toString()}
                            className={cn(
                              "whitespace-nowrap text-sm font-medium",
                              registration?.standard?.certificate?.find(
                                (info) => info?.cer_id === 17,
                              )?.is_checked && item?.cer_id !== 17
                                ? "line-through opacity-50"
                                : "",
                            )}
                          >
                            {item.cer_name_th}
                          </label>
                        </div>
                        <div
                          className={cn("col-span-1 flex items-center gap-2")}
                        >
                          <select
                            className={cn(
                              "w-full rounded-sm border px-2 py-[0.1rem] text-sm",
                              item?.cer_id !== 12 ? "hidden" : "",
                            )}
                            name="level"
                            value={
                              registration?.standard?.certificate
                                ?.find((info) => info?.cer_id === item?.cer_id)
                                ?.value?.toString() ?? ""
                            }
                            onChange={(e) => {
                              setRegistration({
                                ...registration,
                                standard: {
                                  ...registration?.standard,
                                  certificate: [
                                    ...registration.standard.certificate.map(
                                      (info) => {
                                        if (info?.cer_id === item?.cer_id) {
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
                                (info) => info?.cer_id === item?.cer_id,
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
                            item?.cer_id === 17 ? "hidden" : "",
                          )}
                        >
                          <p className="whitespace-nowrap text-sm font-normal">
                            วันที่หมดอายุ
                          </p>
                          <input
                            type="date"
                            name={`exp-${item?.cer_id}`}
                            className="w-full rounded-sm border px-2 text-sm"
                            required={
                              registration?.standard?.certificate?.find(
                                (info) => info?.cer_id === item?.cer_id,
                              )?.is_checked && item?.cer_id !== 17
                            }
                            disabled={
                              !registration.standard.certificate?.find(
                                (info) => info?.cer_id === item?.cer_id,
                              )?.is_checked
                            }
                            onChange={(e) => {
                              setRegistration((prev) => ({
                                ...prev,
                                standard: {
                                  ...prev.standard,
                                  certificate: [
                                    ...prev.standard.certificate.map((info) => {
                                      if (info?.cer_id === item?.cer_id) {
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
                                (info) => info?.cer_id === item?.cer_id,
                              )?.exp ?? ""
                            }
                          />
                        </div>
                        {item?.cer_id === 18 &&
                          registration?.standard?.certificate?.find(
                            (info) => info?.cer_id === 18,
                          )?.is_checked && (
                            <div className="col-span-2 flex items-center gap-2">
                              <Input
                                type="text"
                                placeholder="โปรดระบุ"
                                className={cn("col-span-3 w-full")}
                                variant="flushed"
                                disabled={
                                  !registration?.standard?.certificate?.find(
                                    (info) => info?.cer_id === item?.cer_id,
                                  )?.is_checked
                                }
                                onChange={(e) => {
                                  setRegistration((prev) => ({
                                    ...prev,
                                    standard: {
                                      ...prev.standard,
                                      certificate: [
                                        ...prev.standard.certificate.map(
                                          (info) => {
                                            if (info?.cer_id === item?.cer_id) {
                                              return {
                                                ...info,
                                                cer_name_en: "Other",
                                                cer_name_th: "อื่นๆ",
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
                                    (info) => info?.cer_id === item?.cer_id,
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
                  {registration?.standard?.benefit?.map((item, i) => (
                    <div key={i} className="grid grid-cols-5 gap-2">
                      <div className="col-span-3 flex items-center gap-2">
                        <Checkbox
                          id={item.cer_name_en?.toString()}
                          checked={
                            registration.standard?.benefit?.find(
                              (info) => info?.cer_id === item?.cer_id,
                            )?.is_checked ?? false
                          }
                          disabled={
                            registration?.standard?.benefit?.find(
                              (info) => info?.cer_id === 4,
                            )?.is_checked && item?.cer_id !== 4
                          }
                          onCheckedChange={(e) => {
                            if (item.cer_id === 4) {
                              setRegistration((prev) => ({
                                ...prev,
                                standard: {
                                  ...prev.standard,
                                  benefit: [
                                    ...prev.standard.benefit.map((info) => {
                                      if (info?.cer_id !== 4) {
                                        return {
                                          ...info,
                                          is_checked: false,
                                          exp: "",
                                          value: "-",
                                        };
                                      }
                                      return info;
                                    }),
                                  ],
                                },
                              }));
                            }
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                benefit: [
                                  ...prev.standard.benefit.map((info) => {
                                    if (info?.cer_id === item?.cer_id) {
                                      return {
                                        ...info,
                                        is_checked: JSON.parse(e.toString()),
                                      };
                                    }
                                    return info;
                                  }),
                                ],
                              },
                            }));
                          }}
                        />
                        <label
                          htmlFor={item.cer_name_en?.toString()}
                          className={cn(
                            "whitespace-nowrap text-sm font-medium",
                            registration?.standard?.benefit?.find(
                              (info) => info?.cer_id === 4,
                            )?.is_checked && item?.cer_id !== 4
                              ? "line-through opacity-50"
                              : "",
                          )}
                        >
                          {item.cer_name_th}
                        </label>
                      </div>
                      <div
                        className={cn(
                          "col-span-2 flex items-center gap-2",
                          item?.cer_id === 4 ? "hidden" : "",
                        )}
                      >
                        <p className="whitespace-nowrap text-sm font-normal">
                          วันที่หมดอายุ
                        </p>
                        <input
                          type="date"
                          className="w-full rounded-sm border px-2 text-sm"
                          required={
                            registration?.standard?.benefit?.find(
                              (info) => info?.cer_id === item?.cer_id,
                            )?.is_checked && item?.cer_id !== 4
                          }
                          disabled={
                            !registration?.standard?.benefit?.find(
                              (info) => info?.cer_id === item?.cer_id,
                            )?.is_checked
                          }
                          onChange={(e) => {
                            setRegistration((prev) => ({
                              ...prev,
                              standard: {
                                ...prev.standard,
                                benefit: [
                                  ...prev.standard.benefit.map((info) => {
                                    if (info?.cer_id === item?.cer_id) {
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
                              (info) => info?.cer_id === item?.cer_id,
                            )?.exp ?? ""
                          }
                        />
                      </div>
                      {item?.cer_id === 5 &&
                        registration?.standard?.benefit?.find(
                          (info) => info?.cer_id === 5,
                        )?.is_checked && (
                          <div className="col-span-2 flex items-center gap-2">
                            <Input
                              type="text"
                              placeholder="โปรดระบุ"
                              className={cn("col-span-3 w-full")}
                              variant="flushed"
                              disabled={
                                !registration?.standard?.benefit?.find(
                                  (info) => info?.cer_id === item?.cer_id,
                                )?.is_checked
                              }
                              required={
                                registration?.standard?.benefit?.find(
                                  (info) => info?.cer_id === item?.cer_id,
                                )?.is_checked
                              }
                              onChange={(e) => {
                                setRegistration((prev) => ({
                                  ...prev,
                                  standard: {
                                    ...prev.standard,
                                    benefit: [
                                      ...prev.standard.benefit.map((info) => {
                                        if (info?.cer_id === item?.cer_id) {
                                          return {
                                            ...info,
                                            cer_name_en: "Others",
                                            cer_name_th: "อื่นๆ",
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
                                  (info) => info?.cer_id === item?.cer_id,
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
                  เครดิตเทอมการจ่ายเงิน / Credit Term <RequiredTopic />
                </h3>
              </div>
              <div className="col-span-6 flex flex-col justify-start">
                <RadioGroup
                  className="flex flex-col gap-1"
                  onValueChange={(e) => {
                    setCreditTerm(e);
                    setRegistration((prev) => ({
                      ...prev,
                      payment_term: {
                        ...prev.payment_term,
                        credit_term: {
                          ...prev.payment_term?.credit_term,
                          name: e,
                          value: null,
                        },
                      },
                    }));
                  }}
                  onInvalid={(e) => {
                    e.preventDefault();
                  }}
                  required
                  value={creditTerm}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <label
                      htmlFor="credit"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      เครดิตเทอม
                    </label>
                    <div className={cn("flex items-center gap-2")}>
                      <select
                        className="w-full rounded-sm border px-2 py-[0.1rem] text-sm"
                        disabled={
                          registration?.payment_term?.credit_term?.name ===
                          "other"
                        }
                        required={
                          registration?.payment_term?.credit_term?.name ===
                          "credit"
                        }
                        value={
                          registration?.payment_term?.credit_term?.value ?? ""
                        }
                        onChange={(e) => {
                          if (e.target.value === "0") {
                            setRegistration((prev) => ({
                              ...prev,
                              payment_term: {
                                ...prev.payment_term,
                                credit_term: {
                                  name: "cash",
                                  value: 0,
                                },
                              },
                            }));
                          } else {
                            setRegistration((prev) => ({
                              ...prev,
                              payment_term: {
                                ...prev.payment_term,
                                credit_term: {
                                  name: "credit",
                                  value: Number(e.target.value),
                                },
                              },
                            }));
                          }
                        }}
                      >
                        <option value="" className="text-sm">
                          โปรดเลือกจำนวนวัน
                        </option>
                        <option value="0">เงินสด</option>
                        <option value="30">30 วัน</option>
                        <option value="60">60 วัน</option>
                        <option value="75">75 วัน</option>
                        <option value="90">90 วัน</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <label
                      htmlFor="other"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      อื่นๆ
                    </label>
                  </div>
                </RadioGroup>
                <Input
                  type="number"
                  placeholder="โปรดระบุ จำนวนวัน"
                  className={cn(
                    "w-full",
                    creditTerm !== "other" ? "hidden" : "",
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
                          value: isNaN(e.target.valueAsNumber)
                            ? 0
                            : e.target.valueAsNumber,
                        },
                      },
                    }));
                  }}
                  value={registration?.payment_term?.credit_term?.value || ""}
                  required={creditTerm === "other"}
                />
              </div>
            </article>
          </article>
          {/* //!ระเบียบการวางบิล / Billing Terms */}
          <article>
            <article className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  ระเบียบการวางบิล / Billing Terms <RequiredTopic />
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
                    <RadioGroupItem value="cash" id="cash" />
                    <label
                      htmlFor="cash"
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
                {registration?.payment_term.billing_term?.name === "check" && (
                  <Input
                    type="text"
                    placeholder="โปรดระบุสถานที่รับเช็ค, เวลา, ผู้ติดต่อ"
                    className={cn("w-full")}
                    variant="flushed"
                    disabled={
                      registration?.payment_term?.billing_term?.name !== "check"
                    }
                    required={
                      registration?.payment_term?.billing_term?.name === "check"
                    }
                    onChange={(e) => {
                      setRegistration((prev) => ({
                        ...prev,
                        payment_term: {
                          ...prev.payment_term,
                          billing_term: {
                            ...prev.payment_term?.billing_term,
                            value: e.target.value,
                          },
                        },
                      }));
                    }}
                    value={
                      registration?.payment_term?.billing_term?.value ?? ""
                    }
                  />
                )}
              </div>
            </article>
          </article>
          {/* //! สกุลเงิน / Currency */}
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
                  {CurrentCode?.map((item) => (
                    <option key={item.cc} value={item.cc}>
                      {item.cc} - {item.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
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
                  Incoterm <RequiredTopic />
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
                    {IncotermList?.map((item, i) => (
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
                  เงื่อนไขการเปิด L/C หรือ L/C Terms <RequiredTopic />
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
                          ?.is_thai ||
                        !registration?.payment_term?.lc_term?.is_lc
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
                  เงื่อนไขการขนส่งสินค้า / Delivery Terms <RequiredTopic />
                </h3>
              </div>
              <div className="col-span-6 flex justify-start">
                <div className="grid w-full grid-cols-1 gap-1">
                  {registration?.payment_term?.delivery_term?.map((item, i) => (
                    <div className="flex items-center gap-2" key={i}>
                      <Checkbox
                        id={item?.cer_name_en}
                        checked={
                          registration?.payment_term?.delivery_term?.find(
                            (info) => info?.cer_id === item?.cer_id,
                          )?.is_checked ?? false
                        }
                        onCheckedChange={(e) => {
                          setRegistration((prev) => ({
                            ...prev,
                            payment_term: {
                              ...prev.payment_term,
                              delivery_term: [
                                ...prev.payment_term.delivery_term.map(
                                  (info) => {
                                    if (info?.cer_id === item?.cer_id) {
                                      return {
                                        ...info,
                                        is_checked: JSON.parse(e.toString()),
                                      };
                                    }
                                    return info;
                                  },
                                ),
                              ],
                            },
                          }));
                        }}
                      />
                      <label
                        htmlFor={item?.cer_name_en}
                        className="whitespace-nowrap text-sm font-medium"
                      >
                        {item?.cer_name_th}
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
                <h3 className={cn("text-sm font-bold")}>
                  เงื่อนไขในการวางเงินมัดจำ / Deposit Terms <RequiredTopic />
                </h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <RadioGroup
                  value={
                    registration?.payment_term?.deposit_term?.is_deposit
                      ? "deposit"
                      : "none-deposit"
                  }
                  required={isForeigner}
                  onValueChange={(e) => {
                    setRegistration((prev) => ({
                      ...prev,
                      payment_term: {
                        ...prev.payment_term,
                        deposit_term: {
                          ...prev.payment_term?.deposit_term,
                          is_deposit: e === "deposit",
                          deposit_type: "",
                        },
                      },
                    }));
                  }}
                  className="flex w-full flex-col gap-1"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="deposit" id="deposit" />
                      <label
                        htmlFor="deposit"
                        className={cn(
                          "whitespace-nowrap text-sm font-medium",
                          // !isForeigner ? "opacity-50" : "",
                        )}
                      >
                        มี
                      </label>
                    </div>
                    <select
                      className="rounded-sm border px-2 py-[0.1rem] text-sm"
                      disabled={
                        !registration?.payment_term?.deposit_term?.is_deposit
                      }
                      required={
                        registration?.payment_term?.deposit_term?.is_deposit &&
                        isForeigner
                      }
                      value={depositType}
                      onChange={(e) => {
                        setDepositType(e.target.value);
                        setRegistration((prev) => ({
                          ...prev,
                          payment_term: {
                            ...prev.payment_term,
                            deposit_term: {
                              ...prev.payment_term?.deposit_term,
                              deposit_type:
                                e.target.value === "other"
                                  ? ""
                                  : e.target.value,
                            },
                          },
                        }));
                      }}
                    >
                      <option value="" className="text-sm">
                        โปรดเลือกเงื่อนไขการวางเงินมัดจำ
                      </option>
                      <option value="30-70">30/70 (%)</option>
                      <option value="50-50">50/50 (%)</option>
                      <option value="100-0">100/0 (%)</option>
                      {/* <option value="other">อื่นๆ</option> */}
                    </select>
                  </div>
                  <Input
                    type="text"
                    className={cn(
                      "w-full",
                      depositType !== "other" ? "hidden" : "",
                    )}
                    placeholder="โปรดระบุ"
                    variant="flushed"
                    disabled={!isForeigner}
                    required={
                      registration?.payment_term?.deposit_term?.is_deposit &&
                      isForeigner
                    }
                    onChange={(e) => {
                      setRegistration((prev) => ({
                        ...prev,
                        payment_term: {
                          ...prev.payment_term,
                          deposit_term: {
                            ...prev.payment_term?.deposit_term,
                            deposit_type: e.target.value,
                          },
                        },
                      }));
                    }}
                    value={
                      registration?.payment_term?.deposit_term?.deposit_type
                    }
                  />
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none-deposit" id="none-deposit" />
                    <label
                      htmlFor="none-deposit"
                      className={cn("whitespace-nowrap text-sm font-medium")}
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
                  value={
                    registration?.payment_term?.product_warranty?.is_warranty
                      ? "warranty"
                      : "none-warranty"
                  }
                  className="flex w-full flex-col gap-1"
                  onValueChange={(e) => {
                    setWarranty("");
                    setRegistration((prev) => ({
                      ...prev,
                      payment_term: {
                        ...prev.payment_term,
                        product_warranty: {
                          is_warranty: e === "warranty",
                          value: 0,
                        },
                      },
                    }));
                  }}
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
                    <select
                      className={cn(
                        "rounded-sm border px-2 py-[0.1rem] text-sm",
                        !registration?.payment_term?.product_warranty
                          ?.is_warranty
                          ? "hidden"
                          : "",
                      )}
                      disabled={
                        !registration?.payment_term?.product_warranty
                          ?.is_warranty
                      }
                      required={
                        registration?.payment_term?.product_warranty
                          ?.is_warranty
                      }
                      value={warranty}
                      onChange={(e) => {
                        setWarranty(e.target.value);
                        setRegistration((prev) => ({
                          ...prev,
                          payment_term: {
                            ...prev.payment_term,
                            product_warranty: {
                              ...prev.payment_term?.product_warranty,
                              value: Number(e.target.value),
                            },
                          },
                        }));
                      }}
                    >
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
                    type="number"
                    placeholder="โปรดระบุ ปี"
                    variant="flushed"
                    className={cn(
                      "w-full",
                      warranty !== "other" ? "hidden" : "",
                    )}
                    disabled={
                      !registration?.payment_term?.product_warranty?.is_warranty
                    }
                    required={
                      registration?.payment_term?.product_warranty?.is_warranty
                    }
                    onChange={(e) => {
                      setRegistration((prev) => ({
                        ...prev,
                        payment_term: {
                          ...prev.payment_term,
                          product_warranty: {
                            ...prev.payment_term?.product_warranty,
                            value: Number(e.target.value),
                          },
                        },
                      }));
                    }}
                    value={
                      registration?.payment_term?.product_warranty?.value || ""
                    }
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
                {registration.payment_term.company_policy?.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <Label>
                      {item.cer_name_th}
                      {item?.cer_id === 1 ||
                      item?.cer_id === 2 ||
                      item?.cer_id === 3 ||
                      item?.cer_id === 4 ||
                      item?.cer_id === 5 ||
                      item?.cer_id === 6 ? (
                        <RequiredTopic />
                      ) : null}
                    </Label>
                    <div className="flex flex-col gap-1">
                      <RadioGroup
                        className="flex gap-5"
                        value={
                          item.is_checked
                            ? `${item.cer_name_en}-yes`
                            : `${item.cer_name_en}-no`
                        }
                        onValueChange={(e) => {
                          if (e === `${item.cer_name_en}-yes`) {
                            setRegistration((prev) => ({
                              ...prev,
                              payment_term: {
                                ...prev.payment_term,
                                company_policy: [
                                  ...prev.payment_term.company_policy.map(
                                    (info) => {
                                      if (info?.cer_id === item?.cer_id) {
                                        return {
                                          ...info,
                                          is_checked: true,
                                        };
                                      }
                                      return info;
                                    },
                                  ),
                                ],
                              },
                            }));
                          } else {
                            setRegistration((prev) => ({
                              ...prev,
                              payment_term: {
                                ...prev.payment_term,
                                company_policy: [
                                  ...prev.payment_term.company_policy.map(
                                    (info) => {
                                      if (info?.cer_id === item?.cer_id) {
                                        return {
                                          ...info,
                                          is_checked: false,
                                        };
                                      }
                                      return info;
                                    },
                                  ),
                                ],
                              },
                            }));
                          }
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={`${item.cer_name_en}-yes`}
                            id={`${item.cer_name_en}-yes`}
                          />
                          <Label htmlFor={`${item.cer_name_en}-yes`}>มี</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={`${item.cer_name_en}-no`}
                            id={`${item.cer_name_en}-no`}
                          />
                          <Label htmlFor={`${item.cer_name_en}-no`}>
                            ไม่มี
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                ))}
                {registration.payment_term.company_policy?.find(
                  (info) => info?.cer_id === 8,
                )?.is_checked && (
                  <Input
                    type="text"
                    placeholder="โปรดระบุ นโยบายการดำเนินการอื่นๆ"
                    variant="flushed"
                    className="w-full"
                    disabled={
                      !registration?.payment_term?.company_policy?.find(
                        (info) => info?.cer_id === 8,
                      )?.is_checked
                    }
                    value={
                      registration?.payment_term?.company_policy?.find(
                        (info) => info?.cer_id === 8,
                      )?.value ?? ""
                    }
                    onChange={(e) => {
                      setRegistration((prev) => ({
                        ...prev,
                        payment_term: {
                          ...prev.payment_term,
                          company_policy: [
                            ...prev.payment_term.company_policy.map((info) => {
                              if (info?.cer_id === 8) {
                                return {
                                  ...info,
                                  value: e.target.value,
                                };
                              }
                              return info;
                            }),
                          ],
                        },
                      }));
                    }}
                  />
                )}
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
                  className="flex flex-col gap-1"
                  onValueChange={(e) => {
                    setRegistration((prev) => ({
                      ...prev,
                      payment_term: {
                        ...prev.payment_term,
                        objective_purchasing: {
                          name: e,
                          value: "",
                        },
                      },
                    }));
                  }}
                  value={
                    registration?.payment_term?.objective_purchasing?.name ?? ""
                  }
                >
                  {ObjectivePurchasing?.map((item, i) => (
                    <div className="flex items-center space-x-2" key={i}>
                      <RadioGroupItem value={item?.name} id={item?.name} />
                      <Label htmlFor={item?.name}>{item?.label ?? "-"}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {registration?.payment_term?.objective_purchasing?.name ===
                  "other" && (
                  <Input
                    type="text"
                    placeholder="โปรดระบุ"
                    variant="flushed"
                    value={
                      registration?.payment_term?.objective_purchasing?.value ??
                      ""
                    }
                    onChange={(e) => {
                      setRegistration((prev) => ({
                        ...prev,
                        payment_term: {
                          ...prev.payment_term,
                          objective_purchasing: {
                            ...prev.payment_term?.objective_purchasing,
                            value: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                )}
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
                  className="flex flex-col gap-1"
                  onValueChange={(e) => {
                    setRegistration((prev) => ({
                      ...prev,
                      payment_term: {
                        ...prev.payment_term,
                        main_customer: {
                          name: e,
                          name_helper: "",
                          value: "",
                        },
                      },
                    }));
                  }}
                  value={registration?.payment_term?.main_customer?.name ?? ""}
                >
                  {MainCustomerOfCompany?.map((item, i) => (
                    <div className="flex items-center space-x-2" key={i}>
                      <RadioGroupItem value={item?.name} id={item?.name} />
                      <Label htmlFor={item?.name} className="whitespace-nowrap">
                        {item?.label ?? "-"}
                      </Label>
                      {registration?.payment_term?.main_customer?.name ===
                        "foreign" && (
                        <select
                          placeholder="เลือกประเทศ"
                          className={cn(
                            "w-full rounded-sm border px-2 py-[0.1rem] text-sm",
                            i === 0 ? "hidden" : "",
                          )}
                          onChange={(e) => {
                            setRegistration((prev) => ({
                              ...prev,
                              payment_term: {
                                ...prev.payment_term,
                                main_customer: {
                                  ...prev.payment_term?.main_customer,
                                  value: e.target.value,
                                },
                              },
                            }));
                          }}
                          required={
                            registration?.payment_term?.main_customer?.name ===
                            "foreign"
                          }
                          value={
                            registration?.payment_term?.main_customer?.value ??
                            ""
                          }
                        >
                          <option value="">เลือกประเทศ</option>
                          {countryCodeList?.map((item, i) => (
                            <option key={i} value={item?.alpha2}>
                              {item?.country}
                            </option>
                          ))}
                        </select>
                      )}
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
