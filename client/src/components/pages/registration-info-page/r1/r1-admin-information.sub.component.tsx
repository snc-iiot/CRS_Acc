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
import { FC } from "react";

export const R1AdminInformation: FC = () => {
  const priceAdjustmentConditions: { label: string; value: string }[] = [
    { label: "ทุก 1 เดือน", value: "1" },
    { label: "ทุก 3 เดือน", value: "3" },
    { label: "ทุก 6 เดือน", value: "6" },
    { label: "อื่นๆ", value: "other" },
  ];

  return (
    <div className="pl-1 text-xs">
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
        <div className="col-span-4 pl-1">
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              id="r1-mc-produce1"
              name="r1-mc"
              className="[&:checked+label]:text-primary"
            />
            <label htmlFor="r1-mc-produce1">มีอยู่เพียงพอ</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              id="r1-mc-produce2"
              name="r1-mc"
              className="[&:checked+label]:text-primary"
            />
            <label htmlFor="r1-mc-produce2">ใช้ของลูกค้า</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              id="r1-mc-produce3"
              name="r1-mc"
              className="[&:checked+label]:text-primary"
            />
            <label htmlFor="r1-mc-produce3">ลงทุนเพิ่ม</label>
          </div>
        </div>
      </div>
    </div>
  );
};
