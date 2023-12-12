import { Sections } from "@/helpers/register.helper";
import { FC } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

const ConsentForm: FC = () => {
  return (
    <section id="consent-form" className="flex flex-col gap-2 pr-4">
      <h2 className="text-base font-bold">
        {Sections?.find((item) => item.id === "consent-form")?.title}
      </h2>
      <div className="grid w-full grid-cols-10 items-center gap-2">
        <div className="col-span-2 flex justify-end" />
        <div className="items-top col-span-8 flex space-x-2">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label className="text-sm text-black" htmlFor="terms1">
              ข้าพเจ้าขอรับรองว่าข้อมูลและเอกสารข้างต้นเป็นความจริงทุกประการ
              หากข้อมูลหรือเอกสารใดมีข้อความอันเป็นเท็จ หรือมีการแก้ไข ทำขึ้น
              ปลอมแปลง หรือออกโดยไม่ชอบด้วยกฎหมาย อันเป็นเหตุทำให้บริษัทฯ
              ได้รับความเสียหาย จะถือว่าเป็นความผิด และบริษัทฯ
              สามารถดำเนินคดีตามกฎหมายได้
            </label>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-10 items-center gap-2">
        <div className="col-span-2 flex justify-end" />
        <div className="items-top col-span-8 flex space-x-2">
          <Checkbox id="terms2" />
          <div className="grid gap-1.5 leading-none">
            <label className="text-sm text-black" htmlFor="terms2">
              ข้าพเจ้าได้ศึกษาและยอมรับ{" "}
              <a href="#" className="text-primary underline">
                นโยบายการคุ้มครองข้อมูลส่วนบุคคล
              </a>{" "}
              ของทางบริษัท เอส เอ็น ซี ฟอร์เมอร์ จำกัด (มหาชน)
              และบริษัทในเครือเรียบร้อยแล้ว
            </label>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-10 items-center gap-2">
        <div className="col-span-2 flex justify-end" />
        <div className="items-top col-span-8 flex space-x-2">
          <Checkbox id="terms3" />
          <div className="grid gap-1.5 leading-none">
            <label className="text-sm text-black" htmlFor="terms3">
              ในกรณีที่จะยุติการซื้อขาย ข้าพเจ้าจะแจ้งล่วงหน้าอย่างน้อย 6 เดือน
            </label>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-10 items-center gap-2">
        <div className="col-span-2 flex justify-end">
          <h3 className="text-sm font-semibold">ผู้ให้ข้อมูล</h3>
        </div>
        <div className="col-span-8 flex flex-col space-y-2">
          <Input
            type="text"
            name="consent_name"
            id="consent_name"
            placeholder="ชื่อ-นามสกุล"
            className="text-sm"
            required
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-10 items-center gap-2">
        <div className="col-span-2 flex justify-end" />
        <div className="col-span-8 flex flex-col space-y-2">
          <p className="text-right text-sm">
            {new Date().toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-10 items-center gap-2">
        <div className="col-span-2 flex justify-end" />
        <div className="col-span-8 flex flex-col space-y-2">
          <p className="text-sm">
            <strong className="font-semibold">หมายเหตุ:</strong>{" "}
            หลังจากที่ท่านกด "ลงทะเบียน" เรียบร้อยแล้ว
            ท่านสามารถติดตามผลการได้ผ่าน Email ที่ท่านได้ลงทะเบียนไว้
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsentForm;
