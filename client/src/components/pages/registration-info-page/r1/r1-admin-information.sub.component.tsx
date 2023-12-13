// import { Icons } from "@/components/common/icons";
// import {
//   Input,
//   InputGroup,
//   InputLeftAddon,
//   InputRightAddon,
// } from "@/components/ui/input-custom";
// import { Input } from "@/components/ui/input";
// import { Select } from "@/components/ui/select-custom";
import CalculatePlayback from "@/components/common/calculate-playback";
import CalculateRoa from "@/components/common/calculate-roa";
import CalculateRoi from "@/components/common/calculate-roi";
import { Icons } from "@/components/common/icons";
import RequiredTopic from "@/components/common/required-topic";
import { Button } from "@/components/ui/button";
import { LatitudesLongitudes } from "@/helpers/common.helper";
import { cn } from "@/lib/utils";
import CountyList from "@/mock/county-list.json";
import { FC, useId, useState } from "react";

export const R1AdminInformation: FC = () => {
  const priceAdjustmentConditions: { label: string; value: string }[] = [
    { label: "ทุก 1 เดือน", value: "1" },
    { label: "ทุก 3 เดือน", value: "3" },
    { label: "ทุก 6 เดือน", value: "6" },
    { label: "อื่นๆ", value: "other" },
  ];
  const [mcAddInvert, setMCAddInvert] = useState<boolean>(false);
  const [moldAddInvert, setMoldAddInvert] = useState<boolean>(false);
  const [mainSupplierCreditTerm, setMainSupplierCreditTerm] =
    useState<number>(1);

  const mcCheckboxIds: {
    enough: string;
    useCustomer: string;
    addInvest: string;
  } = {
    enough: useId(),
    useCustomer: useId(),
    addInvest: useId(),
  };

  const moldCheckboxIds: {
    notUsed: string;
    enough: string;
    useCustomer: string;
    addInvest: string;
  } = {
    notUsed: useId(),
    enough: useId(),
    useCustomer: useId(),
    addInvest: useId(),
  };

  // const companyRelationshipName = useId();
  // const companyRelationshipIds: { have: string; dontHave: string } = {
  //   have: useId(),
  //   dontHave: useId(),
  // };

  const materialsProduce: {
    id: string;
    label: string;
    isChecked: boolean;
    value: string;
  }[] = [
    { id: useId(), label: "เหล็ก", isChecked: false, value: "" },
    { id: useId(), label: "อะลูมิเนียม", isChecked: false, value: "" },
    { id: useId(), label: "มอเตอร์", isChecked: false, value: "" },
    { id: useId(), label: "พลาสติก", isChecked: false, value: "" },
    { id: useId(), label: "สแตนเลส", isChecked: false, value: "" },
    { id: useId(), label: "คอมเพรสเซอร์", isChecked: false, value: "" },
    { id: useId(), label: "ทองแดง", isChecked: false, value: "" },
    { id: useId(), label: "ทองเหลือง", isChecked: false, value: "" },
    { id: useId(), label: "อื่นๆ", isChecked: false, value: "" },
  ];

  const transferProductName = useId();
  const transferProductIds: {
    thai: string;
    abroard: string;
  } = {
    thai: useId(),
    abroard: useId(),
  };

  const mainSupplierCreditTermId = useId();

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
          />
        </div>

        <h4 className="whitespace-nowrap">2. ออเดอร์ ต่อ/ปี</h4>
        <div className="col-span-3">
          <div className="flex items-center gap-x-1">
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b  p-0.5 text-primary outline-0"
            />
            <span>MB</span>
          </div>
        </div>

        <h4 className="whitespace-nowrap">2. จำนวนที่ผลิต ต่อ/ปี</h4>
        <div className="col-span-3">
          <div className="flex items-center gap-x-1">
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b  p-0.5 text-primary outline-0"
            />
            <span>หน่วย</span>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          3. ระยะเวลา (Lead Time) การสั่งซื้อ
        </h4>
        <div className="col-span-3">
          <div className="flex items-center gap-x-1">
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b  p-0.5 text-primary outline-0"
            />
            <span>วัน</span>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          4. เงื่อนไขการปรับราคา
          <RequiredTopic />
        </h4>
        <div className="col-span-3">
          <div className="flex items-center gap-2">
            <select
              placeholder="เลือกเงื่อนไขการปรับราคา"
              className={cn(
                "w-[15rem] border-b text-primary focus:outline-0 [&_option:not(:checked)]:text-black",
                // "[&_option:checked]:hidden",
              )}
              required
            >
              <option value="">เลือกเงื่อนไขการปรับราคา</option>
              {priceAdjustmentConditions?.map((item, i) => (
                <option key={i} value={item?.value}>
                  {item?.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b  p-0.5 text-primary outline-0"
            />
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          5. เครื่องจักรที่ใช้ผลิต (ระบุอย่างน้อย 1 รายการ)
        </h4>
        <div className="col-span-4 select-none pl-1">
          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="checkbox"
              id={mcCheckboxIds?.enough}
              className="cursor-pointer [&:checked+label]:text-primary"
            />
            <label htmlFor={mcCheckboxIds?.enough} className="cursor-pointer">
              มีอยู่เพียงพอ
            </label>
          </div>

          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="checkbox"
              id={mcCheckboxIds?.useCustomer}
              className="cursor-pointer [&:checked+label]:text-primary"
            />
            <label
              htmlFor={mcCheckboxIds?.useCustomer}
              className="cursor-pointer"
            >
              ใช้ของลูกค้า
            </label>
          </div>

          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="checkbox"
              id={mcCheckboxIds?.addInvest}
              className="cursor-pointer [&:checked+label]:text-primary"
              onChange={(e) => setMCAddInvert(e.target.checked)}
            />
            <label
              htmlFor={mcCheckboxIds?.addInvest}
              className="cursor-pointer"
            >
              ลงทุนเพิ่ม
            </label>
          </div>
          <div className={mcAddInvert ? "pl-4" : "hidden"}>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">จำนวนเงินลงทุน</p>
              {/* <div className="col-span-3 flex items-center gap-2" /> */}
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                />
                <span>MB</span>
              </div>
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">ROI</p>
              {/* <div className="col-span-3 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="roi" id="auto-roi" />
                  <label htmlFor="auto-roi">
                    <CalculateRoi />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="roi" id="manual-roi" />
                  <label htmlFor="manual-roi">manual</label>
                </div>
              </div> */}
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                />
                <span>%</span>
              </div>
              <CalculateRoi />
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">ROA</p>
              {/* <div className="col-span-3 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="roa" id="auto-roa" />
                  <label htmlFor="auto-roa">Auto</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="roa" id="manual-roa" />
                  <label htmlFor="manual-roa">manual</label>
                </div>
              </div> */}
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                />
                <span>%</span>
              </div>
              <CalculateRoa />
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">Payback</p>
              {/* <div className="col-span-3 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="payback" id="auto-payback" />
                  <label htmlFor="auto-payback">Auto</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="payback" id="manual-payback" />
                  <label htmlFor="manual-payback">manual</label>
                </div>
              </div> */}
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                />
                <span>ปี</span>
              </div>
              <CalculatePlayback />
            </div>
          </div>
        </div>

        <h4 className="whitespace-nowrap">6. แม่พิมพ์ที่ใช้</h4>
        <div className="col-span-4 select-none pl-1">
          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="checkbox"
              id={moldCheckboxIds?.notUsed}
              className="cursor-pointer [&:checked+label]:text-primary"
            />
            <label
              htmlFor={moldCheckboxIds?.notUsed}
              className="cursor-pointer"
            >
              ไม่ใช้แม่พิมพ์
            </label>
          </div>

          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="checkbox"
              id={moldCheckboxIds?.enough}
              className="cursor-pointer [&:checked+label]:text-primary"
            />
            <label htmlFor={moldCheckboxIds?.enough} className="cursor-pointer">
              มีอยู่เพียงพอ
            </label>
          </div>

          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="checkbox"
              id={moldCheckboxIds?.useCustomer}
              className="cursor-pointer [&:checked+label]:text-primary"
            />
            <label
              htmlFor={moldCheckboxIds?.useCustomer}
              className="cursor-pointer"
            >
              ใช้ของลูกค้า
            </label>
          </div>

          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="checkbox"
              id={moldCheckboxIds?.addInvest}
              className="cursor-pointer [&:checked+label]:text-primary"
              onChange={(e) => setMoldAddInvert(e.target.checked)}
            />
            <label
              htmlFor={moldCheckboxIds?.addInvest}
              className="cursor-pointer"
            >
              ลงทุนเพิ่ม
            </label>
          </div>

          <div className={moldAddInvert ? "pl-4" : "hidden"}>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">จำนวนเงินลงทุน</p>
              {/* <div className="col-span-3 flex items-center gap-2" /> */}
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                />
                <span>MB</span>
              </div>
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">ROI</p>
              {/* <div className="col-span-3 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="roi" id="auto-roi" />
                  <label htmlFor="auto-roi">Auto</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="roi" id="manual-roi" />
                  <label htmlFor="manual-roi">manual</label>
                </div>
              </div> */}
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                />
                <span>%</span>
              </div>
              <CalculateRoi />
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">ROA</p>
              {/* <div className="col-span-3 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="roa" id="auto-roa" />
                  <label htmlFor="auto-roa">Auto</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="roa" id="manual-roa" />
                  <label htmlFor="manual-roa">manual</label>
                </div>
              </div> */}
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                />
                <span>%</span>
              </div>
              <CalculateRoa />
            </div>
            <div className="grid w-[30rem] grid-cols-10 gap-x-1">
              <p className="col-span-2 whitespace-nowrap">Payback</p>
              {/* <div className="col-span-3 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="payback" id="auto-payback" />
                  <label htmlFor="auto-payback">Auto</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="payback" id="manual-payback" />
                  <label htmlFor="manual-payback">manual</label>
                </div>
              </div> */}
              <div className="col-span-5 flex items-center gap-x-1">
                <input
                  type="number"
                  placeholder="โปรดระบุ"
                  className="w-full border-0 border-b p-0.5 text-primary outline-0"
                />
                <span>ปี</span>
              </div>
              <CalculatePlayback />
            </div>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          7. วัตถุดิบหลักในการผลิตสินค้า{" "}
          <span>(สามารถเลือกได้มากกว่า 1 ข้อ)</span>
        </h4>
        <div className="col-span-4 select-none pl-1">
          <div className="grid grid-cols-3">
            {materialsProduce?.slice(0, -1)?.map((item, i) => (
              <div key={i} className="mb-1 flex items-center gap-x-1 gap-y-1">
                <input
                  type="checkbox"
                  id={item?.id}
                  className="cursor-pointer [&:checked+label]:text-primary"
                />
                <label htmlFor={item?.id} className="cursor-pointer">
                  {item?.label}
                </label>
              </div>
            ))}

            {materialsProduce?.slice(-1)?.map((item, i) => (
              <div
                key={i}
                className="col-span-3 mb-1 flex items-center gap-x-1 gap-y-1"
              >
                <input
                  type="checkbox"
                  id={item?.id}
                  className="cursor-pointer whitespace-nowrap [&:checked+label]:text-primary"
                />
                <label
                  htmlFor={item?.id}
                  className="cursor-pointer whitespace-nowrap"
                >
                  {item?.label}
                </label>
                <input
                  type="text"
                  placeholder="โปรดระบุ"
                  className="ml-2 w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
                />
              </div>
            ))}
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          8. ระยะทางในการขนส่งสินค้า / ค่าใช้จ่าย (บาท/เที่ยว) <RequiredTopic />
        </h4>
        <div className="col-span-4 pl-1">
          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="radio"
              name={transferProductName}
              id={transferProductIds?.thai}
              className="cursor-pointer [&:checked+label]:text-primary"
              defaultChecked
            />
            <label
              htmlFor={transferProductIds?.thai}
              className="cursor-pointer"
            >
              ขนส่งในประเทศไทย
            </label>
          </div>
          <div className="mb-1 flex items-center gap-x-1">
            <input
              type="radio"
              name={transferProductName}
              id={transferProductIds?.abroard}
              className="cursor-pointer [&:checked+label]:text-primary"
            />
            <label
              htmlFor={transferProductIds?.abroard}
              className="cursor-pointer"
            >
              ขนส่งไปต่างประเทศ
            </label>
            {/* <input
              type="text"
              placeholder="โปรดระบุประเทศปลายทาง"
              className="ml-2 w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
            /> */}
            <select className="ml-3 w-[15rem] border-b text-primary focus:outline-0 [&_option:not(:checked)]:text-black">
              <option value="">โปรดระบุประเทศปลายทาง</option>
              {CountyList.sort((a) => {
                if (a.alpha2 === "TH") return -1;
                return 0;
              }).map((info, i) => (
                <option key={i} value={info.alpha2}>
                  {info?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pl-4">
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ต้นทาง</p>
              <input
                type="text"
                placeholder="โปรดระบุ ละติจูด,ลองจิจูด"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
                defaultValue={`${LatitudesLongitudes?.RAYONG?.latitude},${LatitudesLongitudes?.RAYONG?.longitude}`}
              />
              <span className="flex items-center gap-x-1">GPS</span>
              <button
                type="button"
                className="flex items-center gap-x-0.5 text-primary hover:text-primary/70 hover:underline"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/place/${LatitudesLongitudes?.RAYONG?.latitude},${LatitudesLongitudes?.RAYONG?.longitude}`,
                  )
                }
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
              />
              <span>GPS</span>
              <button
                type="button"
                className="flex items-center gap-x-0.5 text-primary hover:text-primary/70 hover:underline"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/place/12.884426690936518,101.09545134163946",
                  )
                }
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
              />
              <span>km.</span>
            </div>

            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ประเภทรถ</p>
              <select
                placeholder="เลือกเงื่อนไขการปรับราคา"
                className={cn(
                  "w-[15rem] border-b text-primary focus:outline-0 [&_option:not(:checked)]:text-black",
                  // "[&_option:checked]:hidden",
                )}
                required
              >
                <option value="">เลือกประเภทรถ</option>
                {new Array(3).fill(0).map((_, i) => (
                  <option key={i} value={"car-type-" + (i + 1)}>
                    ประเภทรถที่ {i + 1}
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
                required
              >
                <option value="">เลือกประเภทเชื่อเพลิงที่ใช้</option>
                {new Array(3).fill(0).map((_, i) => (
                  <option key={i} value={"fuel-type-" + (i + 1)}>
                    ประเภทเชื่อเพลิงที่ใช้ {i + 1}
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
              />
              <span>บาท/เที่ยว</span>
            </div>
            <div className="flex items-center gap-x-1 font-semibold text-primary">
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
            </div>
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

        <h4 className="whitespace-nowrap">9. เครดิตเทอม ซัพพลายเออร์หลัก</h4>
        <div className="col-span-4 pl-1">
          {new Array(mainSupplierCreditTerm).fill(0).map((_, i) => {
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
                  />
                  <span>%</span>
                </div>
                <div className="mb-1 flex items-center gap-x-1">
                  <p className="w-[7rem] whitespace-nowrap">
                    &nbsp;&nbsp;&nbsp;&nbsp;เครดิตเทอม
                  </p>
                  <input
                    type="number"
                    placeholder="โปรดระบุ"
                    className="ml-2 w-[10rem] border-0 border-b p-0.5 text-primary outline-0"
                  />
                  <span>วัน</span>
                </div>
                <div className="mb-1 grid w-[50rem] grid-cols-5 items-center pl-2.5">
                  <div className="flex select-none items-center gap-x-1">
                    <input
                      type="radio"
                      name={`${mainSupplierCreditTermId}_${i}`}
                      id={`${mainSupplierCreditTermId}_${i}_thai`}
                      className="cursor-pointer [&:checked+label]:text-primary"
                      defaultChecked
                    />
                    <label
                      htmlFor={`${mainSupplierCreditTermId}_${i}_thai`}
                      className="cursor-pointer"
                    >
                      ในประเทศไทย
                    </label>
                  </div>

                  <div className="flex select-none items-center gap-x-1">
                    <input
                      type="radio"
                      name={`${mainSupplierCreditTermId}_${i}`}
                      id={`${mainSupplierCreditTermId}_${i}_abroad`}
                      className="cursor-pointer [&:checked+label]:text-primary"
                    />
                    <label
                      htmlFor={`${mainSupplierCreditTermId}_${i}_abroad`}
                      className="cursor-pointer"
                    >
                      ต่างประเทศ
                    </label>
                  </div>

                  <div className="col-span-3 flex items-center gap-x-1">
                    <input
                      type="text"
                      placeholder="โปรดระบุ"
                      className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
                    />
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
              onClick={() => setMainSupplierCreditTerm((value) => value + 1)}
            >
              เพิ่ม
            </Button>
            <Button
              size={"sm"}
              type="button"
              className="bg-red-600 hover:bg-red-600/80"
              onClick={() =>
                setMainSupplierCreditTerm((value) =>
                  value > 1 ? value - 1 : value,
                )
              }
            >
              ลบ
            </Button>
          </div>
        </div>

        <h4 className="whitespace-nowrap">10. สัดส่วนการซื้อวัตถุดิบหลัก</h4>
        <div className="col-span-4 pl-2">
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">ซื้อในประเทศไทย</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
            />
            <span>%</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">ซื้อต่างประเทศ</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
            />
            <span>%</span>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          11. สัดส่วนวัตถุดิบ ต้นทุน และกำไร
        </h4>
        <div className="col-span-4 pl-2">
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">Raw Material</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
            />
            <span>%</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">COGs</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
            />
            <span>%</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">GP (Gross Profit)</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
            />
            <span>%</span>
          </div>
        </div>

        <h4 className="whitespace-nowrap">
          12. ระยะเวลาจัดเก็บสินค้า (Inventory day)
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
            />
            <span>วัน</span>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="w-[12rem] whitespace-nowrap">เก็บสินค้า (FG)</p>
            <input
              type="number"
              placeholder="โปรดระบุ"
              className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
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
            />
            <span>วัน</span>
          </div>
        </div>
      </div>
    </div>
  );
};
