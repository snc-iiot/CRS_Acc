import { Sections } from "@/helpers/register.helper";
import { FC } from "react";
import { Input, InputGroup, InputRightAddon } from "../ui/input";
import { Select } from "../ui/select-custom";

const ShareholderInformationForm: FC = () => {
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
                >
                  <option value="1">ไทย</option>
                  <option value="2">ต่างชาติ</option>
                </Select>
              </div>
            </div>
            <div className="col-span-4 flex">
              <InputGroup>
                <Input
                  type="number"
                  placeholder="กรอกสัดส่วนผู้ถือหุ้น"
                  className="text-sm"
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
                  type="number"
                  placeholder="กรอกสัดส่วนผู้ถือหุ้น"
                  className="text-sm"
                  readOnly
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </div>
            <div className="col-span-2 flex justify-end">
              <p className="text-sm text-red-500">*</p>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default ShareholderInformationForm;
