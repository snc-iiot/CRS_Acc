import { FC } from "react";
import { R1AdminInformation } from "./r1-admin-information.sub.component";
import { R1UpdateDocuments } from "./r1-update-documents.sub.component";

const R1Form: FC = () => {
  return (
    <div className="item-center flex flex-col pb-4">
      <h3 className="text-md font-bold">
        แบฟอร์มประเมินลูกค้า / Customer Assessemnt Form
      </h3>
      <div className="mb-1 flex items-center gap-2 text-xs">
        <p className="font-semibold">หมายเหตุ:</p>
        <p>
          เครื่องหมาย <span className=" text-red-500">**</span>{" "}
          ใช้สำหรับการประเมินคะแนนลูกค้า
        </p>
      </div>

      <div className="text-sm">
        <h4 className="font-semibold">ข้อมูลส่วน SNC / SNC Information</h4>
        <R1AdminInformation />
        <h4 className="mt-2 font-semibold">เอกสารอัพโหลด</h4>
        <R1UpdateDocuments />
      </div>
    </div>
  );
};

export default R1Form;
