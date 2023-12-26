import { Icons } from "@/components/common/icons";
import RequiredTopic from "@/components/common/required-topic";
import { Button } from "@/components/ui/button";
import { LatitudesLongitudes } from "@/helpers/common.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import MockCarType from "@/mock/car-list.json";
import { FC, useEffect, useState } from "react";

export const R1AdminInformation: FC = () => {
  const {
    generalAssessmentForm,
    setGeneralAssessmentForm,
    countryCodeList,
    registration,
    companyList,
    common,
  } = useAtomStore();

  const [transportDistance, setTransportDistance] = useState<
    "thailand" | "other" | ""
  >("");

  const [priceConditions, setPriceConditions] = useState("");

  useEffect(() => {
    if (generalAssessmentForm?.transport_distance?.transport) {
      setTransportDistance(
        generalAssessmentForm?.transport_distance?.transport === "thailand"
          ? "thailand"
          : "other",
      );
    }
  }, [generalAssessmentForm?.transport_distance?.transport]);

  //! For initial value
  const companyAdmin = registration?.company_information?.company_admin;
  const Plant = companyList?.find((item) => item?.company === companyAdmin);
  const PlantLatLong =
    LatitudesLongitudes?.[
      Plant?.province as keyof typeof LatitudesLongitudes
    ] || LatitudesLongitudes?.RAYONG;

  useEffect(() => {
    setGeneralAssessmentForm((prev) => ({
      ...prev,
      transport_distance: {
        ...prev?.transport_distance,
        origin: `${PlantLatLong?.latitude},${PlantLatLong?.longitude}`,
      },
    }));
  }, [registration?.company_information?.company_admin, companyList]);

  if (!generalAssessmentForm) return null;

  return (
    <div className="pl-1 text-xs">
      <div className="grid grid-cols-4 items-center gap-y-1">
        <h4 className="whitespace-nowrap">
          1. สินค้าที่ผลิต (Part, OEM, Tooling ,Other)
        </h4>
        <div className="col-span-3">
          <input
            type="text"
            placeholder="โปรดระบุสินค้าที่ผลิต"
            className="w-[30rem] border-0 border-b  p-0.5 text-primary outline-0"
            onChange={(e) => {
              setGeneralAssessmentForm((prev) => ({
                ...prev,
                products: e.target.value,
              }));
            }}
            value={generalAssessmentForm?.products || ""}
            required
            readOnly={!common?.isEditGeneralAssessmentForm}
          />
        </div>

        <h4 className="whitespace-nowrap">
          2. ออเดอร์ ต่อ/ปี <RequiredTopic />
        </h4>
        <div className="col-span-3">
          <div className="flex items-center gap-x-1">
            <input
              type="number"
              placeholder="โปรดระบุ"
              value={generalAssessmentForm?.orders || ""}
              onChange={(e) => {
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  orders: isNaN(+e.target.value) ? 0 : +e.target.value,
                }));
              }}
              readOnly={!common?.isEditGeneralAssessmentForm}
              onWheel={(e) => e.currentTarget.blur()}
              className="w-[15rem] border-0 border-b  p-0.5 text-primary outline-0"
            />
            <span>MB</span>
          </div>
        </div>

        <h4 className="whitespace-nowrap">3. จำนวนที่ผลิต ต่อ/ปี</h4>
        <div className="col-span-3">
          <div className="flex items-center gap-x-1">
            <input
              type="number"
              placeholder="โปรดระบุ"
              onChange={(e) => {
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  quantity_per_year: isNaN(+e.target.value)
                    ? 0
                    : +e.target.value,
                }));
              }}
              required
              readOnly={!common?.isEditGeneralAssessmentForm}
              value={generalAssessmentForm?.quantity_per_year || ""}
              className="w-[15rem] border-0 border-b  p-0.5 text-primary outline-0"
            />
            <span>หน่วย</span>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          4. ระยะเวลา (Lead Time) การสั่งซื้อ
        </h4>
        <div className="col-span-3">
          <div className={cn("flex items-center gap-x-1")}>
            <input
              type="number"
              placeholder="โปรดระบุ"
              value={generalAssessmentForm?.lead_time || ""}
              onChange={(e) => {
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  lead_time: isNaN(+e.target.value) ? 0 : +e.target.value,
                }));
              }}
              readOnly={!common?.isEditGeneralAssessmentForm}
              required
              className="w-[15rem] border-0 border-b  p-0.5 text-primary outline-0"
            />
            <span>วัน</span>
          </div>
        </div>
        <h4 className="whitespace-nowrap">
          5. เงื่อนไขการปรับราคา
          <RequiredTopic />
        </h4>
        <div className="col-span-3">
          <div className="flex items-center gap-2">
            <select
              placeholder="เลือกเงื่อนไขการปรับราคา"
              className={cn(
                "w-[15rem] border-b text-primary focus:outline-0 [&_option:not(:checked)]:text-black",
              )}
              onChange={(e) => {
                if (e.target.value === "other") {
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    price_conditions: {
                      peroid: "month",
                      value: 7,
                    },
                  }));
                  setPriceConditions("other");
                }
                setPriceConditions(e.target.value);
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  price_conditions: {
                    peroid: "month",
                    value: isNaN(+e.target.value) ? 0 : +e.target.value,
                  },
                }));
              }}
              value={
                generalAssessmentForm?.price_conditions?.value === 1 ||
                generalAssessmentForm?.price_conditions?.value === 3 ||
                generalAssessmentForm?.price_conditions?.value === 6
                  ? generalAssessmentForm?.price_conditions?.value
                  : priceConditions
              }
              disabled={!common?.isEditGeneralAssessmentForm}
              required
            >
              <option value="">เลือกเงื่อนไขการปรับราคา</option>
              <option value={"1"}>ทุก 1 เดือน</option>
              <option value={"3"}>ทุก 3 เดือน</option>
              <option value={"6"}>ทุก 6 เดือน</option>
              <option value={"other"}>อื่นๆ</option>
            </select>
            {priceConditions === "other" && (
              <input
                type="number"
                placeholder="โปรดระบุ ระยะเวลา (เดือน)"
                value={
                  generalAssessmentForm?.price_conditions?.value === 1 ||
                  generalAssessmentForm?.price_conditions?.value === 3 ||
                  generalAssessmentForm?.price_conditions?.value === 6
                    ? ""
                    : generalAssessmentForm?.price_conditions?.value || ""
                }
                onChange={(e) => {
                  const price = [1, 3, 6];
                  const value = isNaN(+e.target.value) ? 0 : +e.target.value;
                  if (price.includes(value)) {
                    setPriceConditions(value.toString());
                  }
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    price_conditions: {
                      peroid: "month",
                      value: isNaN(+e.target.value) ? 0 : +e.target.value,
                    },
                  }));
                }}
                readOnly={!common?.isEditGeneralAssessmentForm}
                required
                className="w-[15rem] border-0 border-b  p-0.5 text-primary outline-0"
              />
            )}
          </div>
        </div>
        <h4 className="whitespace-nowrap">
          6. เครื่องจักรที่ใช้ผลิต <RequiredTopic />
        </h4>
        <div className="col-span-4 select-none pl-1">
          {/* {generalAssessmentForm?.machine_produce?.map((item, i) => (
            <div className="mb-1 flex items-center gap-x-1" key={i}>
              <input
                type="checkbox"
                id={item?.id}
                className="cursor-pointer [&:checked+label]:text-primary"
                value={item?.is_checked ? "true" : ""}
                checked={item?.is_checked}
                onChange={(e) => {
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    machine_produce: prev?.machine_produce?.map((item) => {
                      if (item?.id === e.target.id) {
                        const initialValue = {
                          amount: 0,
                          ROI: 0,
                          ROA: 0,
                          payback: 0,
                        };
                        return {
                          ...item,
                          is_checked: e.target.checked,
                          value:
                            item.id === "machine-produce-id-3" &&
                            e.target.checked
                              ? initialValue
                              : null,
                        };
                      }
                      return item;
                    }),
                  }));
                }}
                disabled={!common?.isEditGeneralAssessmentForm}
              />
              <label htmlFor={item?.id} className="cursor-pointer">
                {item?.label_th}
              </label>
            </div>
          ))} */}
          {generalAssessmentForm?.machine_produce?.map((item, i) => (
            <div className="mb-1 flex items-center gap-x-1" key={i}>
              <input
                type="radio"
                name="machine_produce"
                id={item?.id}
                className="cursor-pointer [&:checked+label]:text-primary"
                checked={item?.is_checked}
                readOnly={!common?.isEditGeneralAssessmentForm}
                onChange={(e) => {
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    machine_produce: prev?.machine_produce?.map((item) => {
                      if (item?.id === e.target.id) {
                        const initialValue = {
                          amount: 0,
                          ROI: 0,
                          ROA: 0,
                          payback: 0,
                        };
                        return {
                          ...item,
                          is_checked: e.target.checked,
                          value:
                            item.id === "machine-produce-id-3" &&
                            e.target.checked
                              ? initialValue
                              : null,
                        };
                      }
                      return {
                        ...item,
                        is_checked: false,
                        value: null,
                      };
                    }),
                  }));
                }}
                disabled={!common?.isEditGeneralAssessmentForm}
                value={item?.is_checked ? "true" : ""}
              />
              <label htmlFor={item?.id} className="cursor-pointer">
                {item?.label_th}
              </label>
            </div>
          ))}
          <div
            className={cn(
              generalAssessmentForm?.machine_produce?.find(
                (item) =>
                  item?.is_checked && item?.id === "machine-produce-id-3",
              )
                ? "pl-4"
                : "hidden",
            )}
          >
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">จำนวนเงินลงทุน</p>
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  value={
                    generalAssessmentForm?.machine_produce?.find(
                      (item) => item?.id === "machine-produce-id-3",
                    )?.value?.amount || ""
                  }
                  readOnly={!common?.isEditGeneralAssessmentForm}
                  onChange={(e) => {
                    setGeneralAssessmentForm((prev) => ({
                      ...prev,
                      machine_produce: prev?.machine_produce?.map((item) => {
                        if (item?.id === "machine-produce-id-3") {
                          return {
                            ...item,
                            value: {
                              amount: isNaN(+e.target.value)
                                ? 0
                                : +e.target.value,
                              ROI: item?.value?.ROI || 0,
                              ROA: item?.value?.ROA || 0,
                              payback: item?.value?.payback || 0,
                            },
                          };
                        }
                        return item;
                      }),
                    }));
                  }}
                  disabled={!common?.isEditGeneralAssessmentForm}
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                />
                <span>MB</span>
              </div>
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">ROI</p>
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                  value={
                    generalAssessmentForm?.machine_produce?.find(
                      (item) => item?.id === "machine-produce-id-3",
                    )?.value?.ROI || ""
                  }
                  readOnly={!common?.isEditGeneralAssessmentForm}
                  onChange={(e) => {
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
                              ROI: isNaN(+e.target.value) ? 0 : +e.target.value,
                            },
                          };
                        }
                        return item;
                      }),
                    }));
                  }}
                />
                <span>%</span>
              </div>
              {/* <CalculateRoi /> */}
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">ROA</p>
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                  value={
                    generalAssessmentForm?.machine_produce?.find(
                      (item) => item?.id === "machine-produce-id-3",
                    )?.value?.ROA || ""
                  }
                  readOnly={!common?.isEditGeneralAssessmentForm}
                  onChange={(e) => {
                    setGeneralAssessmentForm((prev) => ({
                      ...prev,
                      machine_produce: prev?.machine_produce?.map((item) => {
                        if (item?.id === "machine-produce-id-3") {
                          return {
                            ...item,
                            value: {
                              amount: item?.value?.amount || 0,
                              ROI: item?.value?.ROI || 0,
                              payback: item?.value?.payback || 0,
                              ROA: isNaN(+e.target.value) ? 0 : +e.target.value,
                            },
                          };
                        }
                        return item;
                      }),
                    }));
                  }}
                />
                <span>%</span>
              </div>
              {/* <CalculateRoa /> */}
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">Payback</p>
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                  value={
                    generalAssessmentForm?.machine_produce?.find(
                      (item) => item?.id === "machine-produce-id-3",
                    )?.value?.payback || ""
                  }
                  readOnly={!common?.isEditGeneralAssessmentForm}
                  onChange={(e) => {
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
                              payback: isNaN(+e.target.value)
                                ? 0
                                : +e.target.value,
                            },
                          };
                        }
                        return item;
                      }),
                    }));
                  }}
                />
                <span>ปี</span>
              </div>
              {/* <CalculatePlayback /> */}
            </div>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          7. แม่พิมพ์ที่ใช้ <RequiredTopic />
        </h4>
        <div className="col-span-4 select-none pl-1">
          {/* {generalAssessmentForm?.mold_use?.map((item, i) => (
            <div className="mb-1 flex items-center gap-x-1" key={i}>
              <input
                type="checkbox"
                id={item?.id}
                className="cursor-pointer [&:checked+label]:text-primary"
                value={item?.is_checked ? "true" : ""}
                checked={item?.is_checked}
                disabled={
                  (generalAssessmentForm?.mold_use?.find(
                    (item) => item?.id === "mold-use-id-1",
                  )?.is_checked &&
                    item?.id !== "mold-use-id-1") ||
                  !common?.isEditGeneralAssessmentForm
                }
                onChange={(e) => {
                  if (item.id === "mold-use-id-1") {
                    setGeneralAssessmentForm((prev) => ({
                      ...prev,
                      mold_use: prev?.mold_use?.map((item) => {
                        if (item?.id === "mold-use-id-1") {
                          return {
                            ...item,
                            is_checked: e.target.checked,
                            value: null,
                          };
                        }
                        return {
                          ...item,
                          is_checked: false,
                          value: null,
                        };
                      }),
                    }));
                  }
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    mold_use: prev?.mold_use?.map((item) => {
                      if (item?.id === e.target.id) {
                        const initialValue = {
                          amount: 0,
                          ROI: 0,
                          ROA: 0,
                          payback: 0,
                        };
                        return {
                          ...item,
                          is_checked: e.target.checked,
                          value:
                            item.id === "mold-use-id-4" && e.target.checked
                              ? initialValue
                              : null,
                        };
                      }
                      return item;
                    }),
                  }));
                }}
                readOnly={!common?.isEditGeneralAssessmentForm}
              />
              <label htmlFor={item?.id} className={cn("cursor-pointer")}>
                {item?.label_th}
              </label>
            </div>
          ))} */}
          {generalAssessmentForm?.mold_use?.map((item, i) => (
            <div className="mb-1 flex items-center gap-x-1" key={i}>
              <input
                type="radio"
                name="mold_use"
                id={item?.id}
                checked={item?.is_checked}
                className="cursor-pointer [&:checked+label]:text-primary"
                onChange={(e) => {
                  if (item.id === "mold-use-id-1") {
                    setGeneralAssessmentForm((prev) => ({
                      ...prev,
                      mold_use: prev?.mold_use?.map((item) => {
                        if (item?.id === "mold-use-id-1") {
                          return {
                            ...item,
                            is_checked: e.target.checked,
                            value: null,
                          };
                        }
                        return {
                          ...item,
                          is_checked: false,
                          value: null,
                        };
                      }),
                    }));
                  }
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    mold_use: prev?.mold_use?.map((item) => {
                      if (item?.id === e.target.id) {
                        const initialValue = {
                          amount: 0,
                          ROI: 0,
                          ROA: 0,
                          payback: 0,
                        };
                        return {
                          ...item,
                          is_checked: e.target.checked,
                          value:
                            item.id === "mold-use-id-4" && e.target.checked
                              ? initialValue
                              : null,
                        };
                      }
                      return {
                        ...item,
                        is_checked: false,
                        value: null,
                      };
                    }),
                  }));
                }}
                value={item?.is_checked ? "true" : ""}
                readOnly={!common?.isEditGeneralAssessmentForm}
                disabled={!common?.isEditGeneralAssessmentForm}
              />
              <label htmlFor={item?.id} className={cn("cursor-pointer")}>
                {item?.label_th}
              </label>
            </div>
          ))}
          <div
            className={cn(
              generalAssessmentForm?.mold_use?.find(
                (item) => item?.is_checked && item?.id === "mold-use-id-4",
              )
                ? "pl-4"
                : "hidden",
            )}
          >
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">จำนวนเงินลงทุน</p>
              {/* <div className="col-span-3 flex items-center gap-2" /> */}
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                  value={
                    generalAssessmentForm?.mold_use?.find(
                      (item) => item?.id === "mold-use-id-4",
                    )?.value?.amount || ""
                  }
                  onChange={(e) => {
                    setGeneralAssessmentForm((prev) => ({
                      ...prev,
                      mold_use: prev?.mold_use?.map((item) => {
                        if (item?.id === "mold-use-id-4") {
                          return {
                            ...item,
                            value: {
                              amount: isNaN(+e.target.value)
                                ? 0
                                : +e.target.value,
                              ROI: item?.value?.ROI || 0,
                              ROA: item?.value?.ROA || 0,
                              payback: item?.value?.payback || 0,
                            },
                          };
                        }
                        return item;
                      }),
                    }));
                  }}
                  readOnly={!common?.isEditGeneralAssessmentForm}
                />
                <span>MB</span>
              </div>
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">ROI</p>
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                  value={
                    generalAssessmentForm?.mold_use?.find(
                      (item) => item?.id === "mold-use-id-4",
                    )?.value?.ROI || ""
                  }
                  onChange={(e) => {
                    setGeneralAssessmentForm((prev) => ({
                      ...prev,
                      mold_use: prev?.mold_use?.map((item) => {
                        if (item?.id === "mold-use-id-4") {
                          return {
                            ...item,
                            value: {
                              amount: item?.value?.amount || 0,
                              ROI: isNaN(+e.target.value) ? 0 : +e.target.value,
                              ROA: item?.value?.ROA || 0,
                              payback: item?.value?.payback || 0,
                            },
                          };
                        }
                        return item;
                      }),
                    }));
                  }}
                  readOnly={!common?.isEditGeneralAssessmentForm}
                />
                <span>%</span>
              </div>
              {/* <CalculateRoi /> */}
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">ROA</p>
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                  value={
                    generalAssessmentForm?.mold_use?.find(
                      (item) => item?.id === "mold-use-id-4",
                    )?.value?.ROA || ""
                  }
                  onChange={(e) => {
                    setGeneralAssessmentForm((prev) => ({
                      ...prev,
                      mold_use: prev?.mold_use?.map((item) => {
                        if (item?.id === "mold-use-id-4") {
                          return {
                            ...item,
                            value: {
                              amount: item?.value?.amount || 0,
                              ROI: item?.value?.ROI || 0,
                              ROA: isNaN(+e.target.value) ? 0 : +e.target.value,
                              payback: item?.value?.payback || 0,
                            },
                          };
                        }
                        return item;
                      }),
                    }));
                  }}
                  readOnly={!common?.isEditGeneralAssessmentForm}
                />
                <span>%</span>
              </div>
              {/* <CalculateRoa /> */}
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">Payback</p>
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                  value={
                    generalAssessmentForm?.mold_use?.find(
                      (item) => item?.id === "mold-use-id-4",
                    )?.value?.payback || ""
                  }
                  onChange={(e) => {
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
                              payback: isNaN(+e.target.value)
                                ? 0
                                : +e.target.value,
                            },
                          };
                        }
                        return item;
                      }),
                    }));
                  }}
                  readOnly={!common?.isEditGeneralAssessmentForm}
                />
                <span>ปี</span>
              </div>
              {/* <CalculatePlayback />  */}
            </div>
            Ii
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          8. วัตถุดิบหลักในการผลิตสินค้า{" "}
          <span>(สามารถเลือกได้มากกว่า 1 ข้อ)</span>
        </h4>
        <div className="col-span-4 select-none pl-1">
          <div className="grid grid-cols-3">
            {generalAssessmentForm?.main_material?.map((item, i) => (
              <div>
                <div key={i} className="mb-1 flex items-center gap-x-1 gap-y-1">
                  <input
                    type="checkbox"
                    id={item?.id}
                    className="cursor-pointer [&:checked+label]:text-primary"
                    checked={item?.is_checked}
                    onChange={(e) => {
                      setGeneralAssessmentForm((prev) => ({
                        ...prev,
                        main_material: prev?.main_material?.map((item) => {
                          if (item?.id === e.target.id) {
                            return {
                              ...item,
                              is_checked: e.target.checked,
                              value:
                                item?.id === "main-material-id-9" ? "" : "",
                            };
                          }
                          return item;
                        }),
                      }));
                    }}
                    value={item?.is_checked ? "true" : ""}
                    disabled={!common?.isEditGeneralAssessmentForm}
                    readOnly={!common?.isEditGeneralAssessmentForm}
                  />
                  <label htmlFor={item?.id} className="cursor-pointer">
                    {item?.label_th}
                  </label>
                </div>
                <div
                  className={cn(
                    "col-span-3 mb-1 flex items-center gap-x-1 gap-y-1",
                    item.is_checked && item.id === "main-material-id-9"
                      ? "block"
                      : "hidden",
                  )}
                >
                  <input
                    type="text"
                    placeholder="โปรดระบุ"
                    value={item?.value || ""}
                    onChange={(e) => {
                      setGeneralAssessmentForm((prev) => ({
                        ...prev,
                        main_material: prev?.main_material?.map((item) => {
                          if (item?.id === "main-material-id-9") {
                            return {
                              ...item,
                              value: e.target.value,
                            };
                          }
                          return item;
                        }),
                      }));
                    }}
                    readOnly={!common?.isEditGeneralAssessmentForm}
                    className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <h4 className="whitespace-nowrap">
          9. ระยะทางในการขนส่งสินค้า / ค่าใช้จ่าย (บาท/เที่ยว) <RequiredTopic />
        </h4>
        <div className="col-span-4 pl-1">
          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="radio"
              name="transport_distance"
              id="thailand"
              value="thailand"
              checked={transportDistance === "thailand"}
              className="cursor-pointer [&:checked+label]:text-primary"
              onChange={(e) => {
                const companyAdmin =
                  registration?.company_information?.company_admin;

                const Plant = companyList?.find(
                  (item) => item?.company === companyAdmin,
                );
                setTransportDistance(e.target.value as "thailand" | "other");
                const PlantLatLong =
                  LatitudesLongitudes?.[
                    Plant?.province as keyof typeof LatitudesLongitudes
                  ] || LatitudesLongitudes?.RAYONG;
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  transport_distance: {
                    ...prev?.transport_distance,
                    transport: e.target.value,
                    origin: `${PlantLatLong?.latitude},${PlantLatLong?.longitude}`,
                    destination: "",
                    distance: 0,
                    car_type: "",
                    fuel_type: "",
                    shipping_cost: 0,
                  },
                }));
              }}
              disabled={!common?.isEditGeneralAssessmentForm}
              readOnly={!common?.isEditGeneralAssessmentForm}
            />
            <label htmlFor="thailand" className="cursor-pointer" id="thailand">
              ขนส่งในประเทศไทย
            </label>
          </div>
          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="radio"
              className="cursor-pointer [&:checked+label]:text-primary"
              id="other"
              name="transport_distance"
              value="other"
              checked={transportDistance === "other"}
              onChange={(e) => {
                const companyAdmin =
                  registration?.company_information?.company_admin;

                const Plant = companyList?.find(
                  (item) => item?.company === companyAdmin,
                );

                setTransportDistance(e.target.value as "thailand" | "other");

                const PlantLatLong =
                  LatitudesLongitudes?.[
                    Plant?.province as keyof typeof LatitudesLongitudes
                  ] || LatitudesLongitudes?.RAYONG;
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  transport_distance: {
                    ...prev?.transport_distance,
                    transport: e.target.value,
                    origin: `${PlantLatLong?.latitude},${PlantLatLong?.longitude}`,
                    destination: "",
                    distance: 0,
                    car_type: "",
                    fuel_type: "",
                    shipping_cost: 0,
                  },
                }));
              }}
              disabled={!common?.isEditGeneralAssessmentForm}
            />
            <label className="cursor-pointer" htmlFor="other" id="other">
              ขนส่งไปต่างประเทศ
            </label>
            <select
              className={cn(
                "ml-3 w-[15rem] border-b text-primary focus:outline-0 [&_option:not(:checked)]:text-black",
                transportDistance === "other" ? "block" : "hidden",
              )}
              onChange={(e) => {
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  transport_distance: {
                    ...prev?.transport_distance,
                    transport: e.target.value,
                  },
                }));
              }}
              disabled={!common?.isEditGeneralAssessmentForm}
              value={generalAssessmentForm?.transport_distance?.transport || ""}
            >
              <option value="">โปรดระบุประเทศปลายทาง</option>
              {countryCodeList
                .filter((item) => item.alpha2 !== "TH")
                .map((info, i) => (
                  <option key={i} value={info.alpha2}>
                    {info?.country}
                  </option>
                ))}
            </select>
          </div>
          <div className={cn("pl-4")}>
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ต้นทาง</p>
              <input
                type="text"
                placeholder="โปรดระบุ ละติจูด,ลองจิจูด"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
                readOnly
                value={generalAssessmentForm?.transport_distance?.origin ?? ""}
              />
              <span className="flex items-center gap-x-1">GPS</span>
              <button
                type="button"
                className="flex items-center gap-x-0.5 text-primary hover:text-primary/70 hover:underline"
                onClick={() => {
                  const companyAdmin =
                    registration?.company_information?.company_admin;

                  const Plant = companyList?.find(
                    (item) => item?.company === companyAdmin,
                  );

                  const PlantLatLong =
                    LatitudesLongitudes?.[
                      Plant?.province as keyof typeof LatitudesLongitudes
                    ] || LatitudesLongitudes?.RAYONG;
                  window.open(
                    `https://www.google.com/maps/place/${PlantLatLong?.latitude},${PlantLatLong?.longitude}`,
                  );
                }}
              >
                <Icons.mapPin className="h-3 w-3" /> ดูแผนที่
              </button>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ปลายทาง</p>
              <input
                type="text"
                placeholder="โปรดระบุ ละติจูด,ลองจิจูด"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
                value={
                  generalAssessmentForm?.transport_distance?.destination ?? ""
                }
                onChange={(e) => {
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    transport_distance: {
                      ...prev?.transport_distance,
                      destination: e.target.value,
                    },
                  }));
                }}
                readOnly={!common?.isEditGeneralAssessmentForm}
              />
              <span>GPS</span>
              <button
                type="button"
                className="flex items-center gap-x-0.5 text-primary hover:text-primary/70 hover:underline"
                onClick={() => {
                  const PlantLatLong =
                    LatitudesLongitudes?.[
                      Plant?.province as keyof typeof LatitudesLongitudes
                    ] || LatitudesLongitudes?.RAYONG;
                  window.open(
                    `https://www.google.com/maps/place/${
                      generalAssessmentForm?.transport_distance?.destination ===
                      ""
                        ? `${PlantLatLong?.latitude},${PlantLatLong?.longitude}`
                        : generalAssessmentForm?.transport_distance?.destination
                    }`,
                  );
                }}
                // disabled={
                //   !generalAssessmentForm?.transport_distance?.destination
                // }
              >
                <Icons.mapPin className="h-3 w-3" /> ดูแผนที่
              </button>
            </div>

            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ระยะทาง (ต่อเที่ยว)</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
                value={
                  generalAssessmentForm?.transport_distance?.distance || ""
                }
                onChange={(e) => {
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    transport_distance: {
                      ...prev?.transport_distance,
                      distance: isNaN(+e.target.value) ? 0 : +e.target.value,
                    },
                  }));
                }}
                readOnly={!common?.isEditGeneralAssessmentForm}
              />
              <span>km.</span>
            </div>

            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ประเภทรถ</p>
              <select
                placeholder="กรุณาเลือกประเภทรถ"
                className={cn(
                  "w-[15rem] border-b text-primary focus:outline-0 [&_option:not(:checked)]:text-black",
                  // "[&_option:checked]:hidden",
                )}
                value={
                  generalAssessmentForm?.transport_distance?.car_type || ""
                }
                onChange={(e) => {
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    transport_distance: {
                      ...prev?.transport_distance,
                      car_type: e.target.value,
                      fuel_type: "",
                    },
                  }));
                }}
                disabled={!common?.isEditGeneralAssessmentForm}
              >
                <option value="">เลือกประเภทรถ</option>
                {MockCarType?.map((item, i) => (
                  <option key={i} value={item?.car_type}>
                    {item?.car_type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">
                ประเภทเชื่อเพลิงที่ใช้
              </p>
              <select
                placeholder="เลือกประเภทเชื่อเพลิงที่ใช้"
                className={cn(
                  "w-[15rem] border-b text-primary focus:outline-0 [&_option:not(:checked)]:text-black",
                  // "[&_option:checked]:hidden",
                )}
                onChange={(e) => {
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    transport_distance: {
                      ...prev?.transport_distance,
                      fuel_type: e.target.value,
                    },
                  }));
                }}
                value={
                  generalAssessmentForm?.transport_distance?.fuel_type || ""
                }
                disabled={
                  !common?.isEditGeneralAssessmentForm || !transportDistance
                }
              >
                <option value="">เลือกประเภทเชื่อเพลิงที่ใช้</option>
                {MockCarType?.find(
                  (item) =>
                    item?.car_type ===
                    generalAssessmentForm?.transport_distance?.car_type,
                )?.fuel_type.map((info, i) => (
                  <option key={i} value={info?.fuel_name}>
                    {info?.fuel_type_th}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ค่าขนส่ง</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
                onChange={(e) => {
                  setGeneralAssessmentForm((prev) => ({
                    ...prev,
                    transport_distance: {
                      ...prev?.transport_distance,
                      shipping_cost: isNaN(+e.target.value)
                        ? 0
                        : +e.target.value,
                    },
                  }));
                }}
                value={
                  generalAssessmentForm?.transport_distance?.shipping_cost || ""
                }
                readOnly={!common?.isEditGeneralAssessmentForm}
              />
              <span>บาท/เที่ยว</span>
            </div>
            {/* <div className="flex items-center gap-x-1 font-semibold text-primary">
              <Icons.cloudy className="h-5 w-5" />
              <p className="truncate whitespace-nowrap">
                Carbon Emission (CO2)
              </p>
              <p className="whitespace-nowrap">
                0.00 kgCO<sub>2</sub>e
              </p>
            </div>
            <div className="flex items-center gap-x-1 font-semibold text-red-600">
              <p className="w-[7rem] truncate whitespace-nowrap">
                Scope 1 (Direct)
              </p>
              <p className="w-[15rem] whitespace-nowrap">(ของลูกค้า)</p>
            </div> */}
          </div>
        </div>

        {/* //! SNC Relationship */}
        {/* <h4 className="whitespace-nowrap">9. ความสัมพันธ์บุคคลใน SNC</h4>
        <div className="col-span-4 pl-1">
          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="radio"
              name={companyRelationshipName}
              id={companyRelationshipIds?.have}
              className="cursor-pointer [&:checked+label]:text-primary"
              defaultChecked
            />
            <label
              htmlFor={companyRelationshipIds?.have}
              className="cursor-pointer"
            >
              มี
            </label>
            <input
              type="text"
              placeholder="โปรดระบุชื่อบุคคล"
              className="ml-4 w-[20rem] border-0 border-b p-0.5 text-primary outline-0"
            />
          </div>
          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="radio"
              name={companyRelationshipName}
              id={companyRelationshipIds?.dontHave}
              className="cursor-pointer [&:checked+label]:text-primary"
            />
            <label
              htmlFor={companyRelationshipIds?.dontHave}
              className="cursor-pointer"
            >
              ไม่มี
            </label>
          </div>
        </div> */}

        <h4 className="whitespace-nowrap">
          10. เครดิตเทอม ซัพพลายเออร์หลัก <RequiredTopic />
        </h4>
        <div className="col-span-4 pl-1">
          {generalAssessmentForm?.main_supplier_credit_terms.map((_, i) => {
            return (
              <div key={i} className="mb-2">
                <div className="mb-1 flex items-center gap-x-1">
                  <p className="w-[7rem] whitespace-nowrap">
                    {i + 1}. ชื่อซัพพลายเออร์
                  </p>
                  <input
                    type="text"
                    placeholder="โปรดระบุ"
                    className="ml-2 w-[30rem] border-0 border-b p-0.5 text-primary outline-0"
                    onChange={(e) => {
                      setGeneralAssessmentForm((prev) => ({
                        ...prev,
                        main_supplier_credit_terms:
                          prev?.main_supplier_credit_terms?.map(
                            (item, index) => {
                              if (index === i) {
                                return {
                                  ...item,
                                  supplier_name: e.target.value,
                                };
                              }
                              return item;
                            },
                          ),
                      }));
                    }}
                    value={
                      generalAssessmentForm?.main_supplier_credit_terms?.[i]
                        ?.supplier_name || ""
                    }
                    readOnly={!common?.isEditGeneralAssessmentForm}
                  />
                </div>
                <div className="mb-1 flex items-center gap-x-1">
                  <p className="w-[7rem] whitespace-nowrap">
                    &nbsp;&nbsp;&nbsp;&nbsp;สัดส่วนการใช้
                  </p>
                  <input
                    type="number"
                    placeholder="โปรดระบุ"
                    className="ml-2 w-[10rem] border-0 border-b p-0.5 text-primary outline-0"
                    onChange={(e) => {
                      setGeneralAssessmentForm((prev) => ({
                        ...prev,
                        main_supplier_credit_terms:
                          prev?.main_supplier_credit_terms?.map(
                            (item, index) => {
                              if (index === i) {
                                return {
                                  ...item,
                                  ratio: isNaN(+e.target.value)
                                    ? 0
                                    : +e.target.value,
                                };
                              }
                              return item;
                            },
                          ),
                      }));
                    }}
                    value={
                      generalAssessmentForm?.main_supplier_credit_terms?.[i]
                        ?.ratio || ""
                    }
                    readOnly={!common?.isEditGeneralAssessmentForm}
                  />
                  <span>%</span>
                </div>
                <div className="mb-1 flex items-center gap-x-1">
                  <p className="w-[7rem] whitespace-nowrap">
                    &nbsp;&nbsp;&nbsp;&nbsp;เครดิตเทอม
                  </p>
                  <input
                    type="number"
                    placeholder="โปรดระบุ จำนวนวัน"
                    className="ml-2 w-[10rem] border-0 border-b p-0.5 text-primary outline-0"
                    onChange={(e) => {
                      setGeneralAssessmentForm((prev) => ({
                        ...prev,
                        main_supplier_credit_terms:
                          prev?.main_supplier_credit_terms?.map(
                            (item, index) => {
                              if (index === i) {
                                return {
                                  ...item,
                                  credit_terms: isNaN(+e.target.value)
                                    ? 0
                                    : +e.target.value,
                                };
                              }
                              return item;
                            },
                          ),
                      }));
                    }}
                    value={
                      generalAssessmentForm?.main_supplier_credit_terms?.[i]
                        ?.credit_terms || ""
                    }
                    readOnly={!common?.isEditGeneralAssessmentForm}
                  />
                  <span>วัน</span>
                </div>
                <div className="mb-1 grid w-[50rem] grid-cols-5 items-center pl-2.5">
                  <div className="flex select-none items-center gap-x-1">
                    <input
                      type="radio"
                      value="thailand-credit"
                      id={`thailand-credit-${i}`}
                      className="cursor-pointer [&:checked+label]:text-primary"
                      onChange={(e) => {
                        setGeneralAssessmentForm((prev) => ({
                          ...prev,
                          main_supplier_credit_terms:
                            prev?.main_supplier_credit_terms?.map(
                              (item, index) => {
                                if (index === i) {
                                  return {
                                    ...item,
                                    country: {
                                      label: e.target.value,
                                      value: "TH",
                                    },
                                  };
                                }
                                return item;
                              },
                            ),
                        }));
                      }}
                      checked={
                        generalAssessmentForm?.main_supplier_credit_terms?.[i]
                          ?.country?.label === "thailand-credit"
                      }
                      disabled={!common?.isEditGeneralAssessmentForm}
                      readOnly={!common?.isEditGeneralAssessmentForm}
                    />
                    <label
                      className="cursor-pointer"
                      htmlFor={`thailand-credit-${i}`}
                    >
                      ในประเทศไทย
                    </label>
                  </div>
                  <div className="flex select-none items-center gap-x-1">
                    <input
                      type="radio"
                      value="other-credit"
                      id={`other-credit-${i}`}
                      disabled={!common?.isEditGeneralAssessmentForm}
                      className="cursor-pointer [&:checked+label]:text-primary"
                      onChange={(e) => {
                        setGeneralAssessmentForm((prev) => ({
                          ...prev,
                          main_supplier_credit_terms:
                            prev?.main_supplier_credit_terms?.map(
                              (item, index) => {
                                if (index === i) {
                                  return {
                                    ...item,
                                    country: {
                                      label: e.target.value,
                                      value: "-",
                                    },
                                  };
                                }
                                return item;
                              },
                            ),
                        }));
                      }}
                      checked={
                        generalAssessmentForm?.main_supplier_credit_terms?.[i]
                          ?.country?.label === "other-credit"
                      }
                      readOnly={!common?.isEditGeneralAssessmentForm}
                    />
                    <label
                      className="cursor-pointer"
                      htmlFor={`other-credit-${i}`}
                    >
                      ต่างประเทศ
                    </label>
                  </div>
                  <div
                    className={cn(
                      "col-span-3 flex items-center gap-x-1",
                      generalAssessmentForm?.main_supplier_credit_terms?.[i]
                        ?.country?.label === "other-credit"
                        ? "block"
                        : "hidden",
                    )}
                  >
                    {/* <input
                      type="text"
                      placeholder="โปรดระบุ"
                      className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
                      onChange={(e) => {
                        setGeneralAssessmentForm((prev) => ({
                          ...prev,
                          main_supplier_credit_terms:
                            prev?.main_supplier_credit_terms?.map(
                              (item, index) => {
                                if (index === i) {
                                  return {
                                    ...item,
                                    country: {
                                      ...item?.country,
                                      value: e.target.value,
                                    },
                                  };
                                }
                                return item;
                              },
                            ),
                        }));
                      }}
                      value={
                        generalAssessmentForm?.main_supplier_credit_terms?.[i]
                          ?.country?.value || ""
                      }
                      readOnly={!common?.isEditGeneralAssessmentForm}
                    /> */}
                    <select
                      className="w-[15rem] border-b text-primary focus:outline-0 [&_option:not(:checked)]:text-black"
                      onChange={(e) => {
                        setGeneralAssessmentForm((prev) => ({
                          ...prev,
                          main_supplier_credit_terms:
                            prev?.main_supplier_credit_terms?.map(
                              (item, index) => {
                                if (index === i) {
                                  return {
                                    ...item,
                                    country: {
                                      ...item?.country,
                                      value: e.target.value,
                                    },
                                  };
                                }
                                return item;
                              },
                            ),
                        }));
                      }}
                      value={
                        generalAssessmentForm?.main_supplier_credit_terms?.[i]
                          ?.country?.value || ""
                      }
                      disabled={!common?.isEditGeneralAssessmentForm}
                    >
                      <option value="">โปรดระบุประเทศ</option>
                      {countryCodeList
                        .filter((item) => item?.alpha2 !== "TH")
                        .map((info, i) => (
                          <option key={i} value={info.alpha2}>
                            {info?.country}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-x-1">
            <Button
              size={"sm"}
              type="button"
              className="bg-green-600 hover:bg-green-600/80"
              onClick={() => {
                const initialValue = {
                  supplier_name: "",
                  ratio: 0,
                  credit_terms: 0,
                  country: {
                    label: "thailand-credit",
                    value: "TH",
                  },
                };
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  main_supplier_credit_terms: [
                    ...prev.main_supplier_credit_terms,
                    initialValue,
                  ],
                }));
              }}
              disabled={!common?.isEditGeneralAssessmentForm}
            >
              เพิ่ม
            </Button>
            <Button
              size={"sm"}
              type="button"
              className="bg-red-600 hover:bg-red-600/80"
              onClick={() => {
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  main_supplier_credit_terms:
                    prev?.main_supplier_credit_terms?.filter(
                      (_, index) =>
                        index !== prev?.main_supplier_credit_terms?.length - 1,
                    ),
                }));
              }}
              disabled={!common?.isEditGeneralAssessmentForm}
            >
              ลบ
            </Button>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          11. สัดส่วนการซื้อวัตถุดิบหลัก <RequiredTopic />
        </h4>
        <div className="col-span-4 pl-2">
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">ซื้อในประเทศไทย</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              value={generalAssessmentForm?.main_mat_ratio?.thailand || ""}
              onChange={(e) => {
                const value = isNaN(+e.target.value) ? 0 : +e.target.value;
                const foreign = 100 - value < 0 ? 0 : 100 - value;
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  main_mat_ratio: {
                    thailand: value > 100 ? 100 : value,
                    foreign: foreign,
                  },
                }));
              }}
              min={0}
              max={100}
              readOnly={!common?.isEditGeneralAssessmentForm}
            />
            <span>%</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">ซื้อต่างประเทศ</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              readOnly
              value={generalAssessmentForm?.main_mat_ratio?.foreign || ""}
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
            />
            <span>%</span>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          12. สัดส่วนวัตถุดิบ ต้นทุน และกำไร
        </h4>
        <div className="col-span-4 pl-2">
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">Raw Material</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              value={generalAssessmentForm?.ratio_of_raw_mat?.RM || ""}
              onChange={(e) => {
                const RM = isNaN(+e.target.value) ? 0 : +e.target.value;
                const GP = generalAssessmentForm?.ratio_of_raw_mat?.GP || 0;
                const COGS = 100 - (RM + GP) < 0 ? 0 : 100 - (RM + GP);
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  ratio_of_raw_mat: {
                    ...prev?.ratio_of_raw_mat,
                    RM: RM > 100 ? 100 : RM,
                    COGS: COGS > 100 ? 100 : COGS,
                  },
                }));
              }}
              readOnly={!common?.isEditGeneralAssessmentForm}
            />
            <span>%</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">COGs</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              value={generalAssessmentForm?.ratio_of_raw_mat?.COGS || ""}
              onChange={(e) => {
                const RM = generalAssessmentForm?.ratio_of_raw_mat?.RM || 0;
                const COGS = isNaN(+e.target.value) ? 0 : +e.target.value;
                const GP = 100 - (RM + COGS) < 0 ? 0 : 100 - (RM + COGS);
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  ratio_of_raw_mat: {
                    ...prev?.ratio_of_raw_mat,
                    COGS: COGS > 100 ? 100 : COGS,
                    GP: GP > 100 ? 100 : GP,
                  },
                }));
              }}
              readOnly={!common?.isEditGeneralAssessmentForm}
            />
            <span>%</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">GP (Gross Profit)</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              value={generalAssessmentForm?.ratio_of_raw_mat?.GP || ""}
              onChange={(e) => {
                const RM = generalAssessmentForm?.ratio_of_raw_mat?.RM || 0;
                const GP = isNaN(+e.target.value) ? 0 : +e.target.value;
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  ratio_of_raw_mat: {
                    ...prev?.ratio_of_raw_mat,
                    GP: GP > 100 ? 100 : GP,
                    COGS: 100 - (RM + GP) < 0 ? 0 : 100 - (RM + GP),
                  },
                }));
              }}
              readOnly={!common?.isEditGeneralAssessmentForm}
            />
            <span>%</span>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          13. ระยะเวลาจัดเก็บสินค้า (Inventory day)
        </h4>
        <div className="col-span-4 pl-2">
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">
              เรียกสินค้าล่วงหน้า (RM)
            </p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              value={generalAssessmentForm?.inventory_day?.RM || ""}
              onChange={(e) => {
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  inventory_day: {
                    ...prev?.inventory_day,
                    RM: isNaN(+e.target.value) ? 0 : +e.target.value,
                  },
                }));
              }}
              readOnly={!common?.isEditGeneralAssessmentForm}
            />
            <span>วัน</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">
              ระยะเวลาในการผลิต (PRD.)
            </p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              value={generalAssessmentForm?.inventory_day?.PRD || ""}
              onChange={(e) => {
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  inventory_day: {
                    ...prev?.inventory_day,
                    PRD: isNaN(+e.target.value) ? 0 : +e.target.value,
                  },
                }));
              }}
              readOnly={!common?.isEditGeneralAssessmentForm}
            />
            <span>วัน</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">เก็บสินค้า (FG)</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              value={generalAssessmentForm?.inventory_day?.FG || ""}
              onChange={(e) => {
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  inventory_day: {
                    ...prev?.inventory_day,
                    FG: isNaN(+e.target.value) ? 0 : +e.target.value,
                  },
                }));
              }}
              readOnly={!common?.isEditGeneralAssessmentForm}
            />
            <span>วัน</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">
              สินค้าคงคลัง (Inventory)
            </p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              value={generalAssessmentForm?.inventory_day?.inventory || ""}
              onChange={(e) => {
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  inventory_day: {
                    ...prev?.inventory_day,
                    inventory: isNaN(+e.target.value) ? 0 : +e.target.value,
                  },
                }));
              }}
              readOnly={!common?.isEditGeneralAssessmentForm}
            />
            <span>วัน</span>
          </div>
        </div>
      </div>
    </div>
  );
};
