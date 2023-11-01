// import { Icons } from "@/components/common/icons";
// import {
//   Input,
//   InputGroup,
//   InputLeftAddon,
//   InputRightAddon,
// } from "@/components/ui/input-custom";
// import { Input } from "@/components/ui/input";
// import { Select } from "@/components/ui/select-custom";
import { cn } from "@/lib/utils";
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

  const companyRelationshipName = useId();
  const companyRelationshipIds: { have: string; dontHave: string } = {
    have: useId(),
    dontHave: useId(),
  };

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

  return (
    <div className="h-full pl-1 text-xs">
      {/* <div className="flex items-center gap-x-3 pr-4">
        <h4 className="whitespace-nowrap">
          1. สินค้าที่ผลิต (Part, OEM, Tooling ,Other)
        </h4>
        <input
          type="text"
          placeholder="โปรดระบุสินค้าที่ผลิต"
          className="w-[30rem] border-0 border-b  p-0.5 outline-0 focus:text-primary"
        />
      </div> */}
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

        <h4 className="whitespace-nowrap">3. Lead Time การสั่งซื้อ (วัน)</h4>
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

        <h4 className="whitespace-nowrap">4. เงื่อนไขการปรับราคา</h4>
        <div className="col-span-3">
          <div className="flex items-center">
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
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">จำนวนเงินลงทุน</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>MB</span>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ROI</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>%</span>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ROA</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>%</span>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">Payback</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>ปี</span>
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
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">จำนวนเงินลงทุน</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>MB</span>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ROI</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>%</span>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ROA</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>%</span>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">Payback</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>ปี</span>
            </div>
          </div>
        </div>

        <h4 className="whitespace-nowrap">7. วัตถุดิบหลักในการผลิตสินค้า</h4>
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
          8. ระยะทางในการขนส่งสินค้า / ค่าใช้จ่าย (บาท/เที่ยว)
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
            <input
              type="text"
              placeholder="โปรดระบุประเทศปลายทาง"
              className="ml-2 w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
            />
          </div>

          <div className="pl-4">
            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ต้นทาง</p>
              <input
                type="text"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>GPS</span>
            </div>

            <div className="flex items-center gap-x-1">
              <p className="w-[7rem] whitespace-nowrap">ปลายทาง</p>
              <input
                type="text"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>GPS</span>
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
              <p className="w-[7rem] whitespace-nowrap">ค่าขนส่ง</p>
              <input
                type="number"
                placeholder="โปรดระบุ"
                className="w-[15rem] border-0 border-b p-0.5 text-primary outline-0"
              />
              <span>บาท/เที่ยว</span>
            </div>
          </div>
        </div>

        <h4 className="whitespace-nowrap">9. ความสัมพันธ์บุคคลใน SNC</h4>
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
        </div>

        <h4 className="whitespace-nowrap">10. เครดิตเทอม ซัพพลายเออร์หลัก</h4>
        <div className="pl-1"></div>
      </div>
    </div>
  );
};