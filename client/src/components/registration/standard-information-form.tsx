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
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select-custom";

const StandardInformationForm: FC = () => {
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
                    <div key={item.id} className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id={item.id?.toString()} />
                        <label
                          htmlFor={item.id?.toString()}
                          className="whitespace-nowrap text-sm font-medium"
                        >
                          {item.label}
                        </label>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <p className="whitespace-nowrap text-sm font-normal">
                          วันที่หมดอายุ
                        </p>
                        <input
                          type="date"
                          className="w-full rounded-sm border px-2 text-sm"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="other" />
                      <label
                        htmlFor="other"
                        className="whitespace-nowrap text-sm font-medium"
                      >
                        อื่นๆ
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="text"
                        placeholder="โปรดระบุ"
                        className={cn("w-full")}
                        variant="flushed"
                      />
                      <div className="flex items-center gap-2 ">
                        <p className="whitespace-nowrap text-sm font-normal">
                          วันที่หมดอายุ
                        </p>
                        <input
                          type="date"
                          className="w-full rounded-sm border px-2 text-sm"
                          required
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
                    <div key={item.id} className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id={item.id?.toString()} />
                        <label
                          htmlFor={item.id?.toString()}
                          className="whitespace-nowrap text-sm font-medium"
                        >
                          {item.label}
                        </label>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <p className="whitespace-nowrap text-sm font-normal">
                          วันที่หมดอายุ
                        </p>
                        <input
                          type="date"
                          className="w-full rounded-sm border px-2 text-sm"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="other" />
                      <label
                        htmlFor="other"
                        className="whitespace-nowrap text-sm font-medium"
                      >
                        อื่นๆ
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="text"
                        placeholder="โปรดระบุ"
                        className={cn("w-full")}
                        variant="flushed"
                      />
                      <div className="flex items-center gap-2 ">
                        <p className="whitespace-nowrap text-sm font-normal">
                          วันที่หมดอายุ
                        </p>
                        <input
                          type="date"
                          className="w-full rounded-sm border px-2 text-sm"
                          required
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
                  เงื่อนไขการขายและรับชำระเงิน / Sales and Payment Terms
                </h3>
              </div>
              <div className="col-span-6" />
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  เครดิตเทอมการจ่ายเงินของลูกค้า / Customer Credit Term
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
                        <option value="30">30 วัน</option>
                        <option value="60">60 วัน</option>
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
                      อื่นๆ โปรดระบุ
                    </label>
                  </div>
                </RadioGroup>
                <Input
                  type="text"
                  placeholder="โปรดระบุ"
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
                <h3 className="text-sm font-bold">สกุลเงินที่ขาย / Currency</h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <div className="w-full">
                  <Select>
                    <option value="thb">THB</option>
                    <option value="usd">USD</option>
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
                  <Select>
                    <option value="exw">EXW</option>
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
                  เงื่อนไขการเปิด L/C / L/C Terms
                </h3>
              </div>
              <div className="col-span-4 flex justify-start">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex w-full flex-col gap-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lc" id="lc" />
                    <label
                      htmlFor="lc"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      มี
                    </label>
                  </div>
                  <div className="w-full">
                    <Select>
                      <option value="lc-sight">L/C at sight</option>
                      <option value="lc-30">L/C term 30</option>
                      <option value="lc-60">L/C term 60</option>
                      <option value="lc-90">L/C term 90</option>
                    </Select>
                  </div>
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
                      บริษัทขนส่งสินค้าเอง
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="customer-2" />
                    <label
                      htmlFor="customer-2"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      ลูกค้าจัดส่งเอง
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
                    <RadioGroupItem value="deposit" id="deposit" />
                    <label
                      htmlFor="deposit"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      มี
                    </label>
                  </div>
                  <div className="w-full">
                    <Select placeholder="โปรดระบุ">
                      <option value="30-70">30/70</option>
                      <option value="50-50">50/50</option>
                      <option value="60-40">60/40</option>
                      <option value="70-30">70/30</option>
                      <option value="other">อื่นๆ</option>
                    </Select>
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
          {/* //!รัับประกันสินค้า / Product Warranty */}
          <article>
            <section className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  เงื่อนไขในการวางเงินมัดจำ / Deposit Terms
                </h3>
              </div>
              <div className="col-span-6 flex flex-col justify-start">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="warranty" id="warranty" />
                    <Label htmlFor="warranty">มี</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none-warranty" id="none-warranty" />
                    <Label htmlFor="none-warranty">ไม่มี</Label>
                  </div>
                </RadioGroup>
              </div>
            </section>
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
              </div>
            </section>
          </article>
          {/* //!วัตถุประสงค์การซื้อสินค้า / The objective of purchasing. */}
          <article>
            <section className="grid w-full grid-cols-10 items-center gap-2">
              <div className="col-span-4 flex h-full items-start justify-end">
                <h3 className="text-sm font-bold">
                  วัตถุประสงค์การซื้อสินค้า / The objective of purchasing.
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
              <div className="col-span-4 flex flex-col justify-start gap-2">
                <RadioGroup
                  defaultValue="option-one"
                  className="flex flex-col gap-1"
                >
                  {MainCustomerOfCompany?.map((item, i) => (
                    <div className="flex items-center space-x-2" key={i}>
                      <RadioGroupItem value={item?.name} id={item?.name} />
                      <Label htmlFor={item?.name}>{item?.label ?? "-"}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="w-full">
                  <Select placeholder="เลือกประเทศ">
                    <option value="thailand" className="text-sm">
                      Thailand
                    </option>
                  </Select>
                </div>
              </div>
            </section>
          </article>
        </section>
      </main>
    </section>
  );
};

export default StandardInformationForm;
