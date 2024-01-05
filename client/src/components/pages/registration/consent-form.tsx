import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Sections } from "@/helpers/register.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { FC } from "react";

interface ConsentFormProps {
  isAcceptConsent: {
    consent_1: boolean;
    consent_2: boolean;
    consent_3: boolean;
  };
  setIsAcceptConsent: React.Dispatch<
    React.SetStateAction<{
      consent_1: boolean;
      consent_2: boolean;
      consent_3: boolean;
    }>
  >;
}

const ConsentForm: FC<ConsentFormProps> = ({ isAcceptConsent, setIsAcceptConsent }) => {
  const { setRegistration, registration } = useAtomStore();
  return (
    <section id="consent-form" className="flex flex-col gap-2 pr-4">
      <h2 className="text-base font-bold">{Sections?.find((item) => item.id === "consent-form")?.title}</h2>
      <div className="grid w-full grid-cols-10 items-center gap-2">
        <div className="col-span-2 flex justify-end" />
        <div className="items-top col-span-8 flex space-x-2">
          <Checkbox
            id="consent_1"
            checked={isAcceptConsent.consent_1}
            onCheckedChange={(e) => {
              setIsAcceptConsent({
                ...isAcceptConsent,
                consent_1: JSON.parse(String(e)),
              });
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label className="text-sm text-black" htmlFor="consent_1">
              ข้าพเจ้าขอรับรองว่าข้อมูลและเอกสารข้างต้นเป็นความจริงทุกประการ หากข้อมูลหรือเอกสารใดมีข้อความอันเป็นเท็จ
              หรือมีการแก้ไข ทำขึ้น ปลอมแปลง หรือออกโดยไม่ชอบด้วยกฎหมาย อันเป็นเหตุทำให้บริษัทฯ ได้รับความเสียหาย
              จะถือว่าเป็นความผิด และบริษัทฯ สามารถดำเนินคดีตามกฎหมายได้
            </label>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-10 items-center gap-2">
        <div className="col-span-2 flex justify-end" />
        <div className="items-top col-span-8 flex space-x-2">
          <Checkbox
            id="consent_2"
            checked={isAcceptConsent.consent_2}
            onCheckedChange={(e) => {
              setIsAcceptConsent({
                ...isAcceptConsent,
                consent_2: JSON.parse(String(e)),
              });
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label className="text-sm text-black" htmlFor="consent_2">
              ข้าพเจ้าได้ศึกษาและยอมรับ{" "}
              <a href="#" className="text-primary underline">
                นโยบายการคุ้มครองข้อมูลส่วนบุคคล
              </a>{" "}
              ของทางบริษัท เอส เอ็น ซี ฟอร์เมอร์ จำกัด (มหาชน) และบริษัทในเครือเรียบร้อยแล้ว
            </label>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-10 items-center gap-2">
        <div className="col-span-2 flex justify-end" />
        <div className="items-top col-span-8 flex space-x-2">
          <Checkbox
            id="consent_3"
            checked={isAcceptConsent.consent_3}
            onCheckedChange={(e) => {
              setIsAcceptConsent({
                ...isAcceptConsent,
                consent_3: JSON.parse(String(e)),
              });
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label className="text-sm text-black" htmlFor="consent_3">
              {/* ในกรณีที่จะยุติการซื้อขาย ข้าพเจ้าจะแจ้งล่วงหน้าอย่างน้อย 6 เดือน */}
              ในกรณีจะยุติการซื้อขาย ต้องเป็นไปตามเงื่อนไขที่ระบุในสัญญาการซื้อขายเท่านั้น
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
            value={registration?.informant_name}
            onChange={(e) =>
              setRegistration({
                ...registration,
                informant_name: e.target.value,
              })
            }
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
            <strong className="font-semibold">หมายเหตุ:</strong> หลังจากที่ท่านกด "ลงทะเบียน" เรียบร้อยแล้ว
            ท่านสามารถติดตามผลการได้ผ่าน Email ที่ท่านได้ลงทะเบียนไว้
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsentForm;
