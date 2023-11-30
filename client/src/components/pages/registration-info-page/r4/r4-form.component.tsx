import TableSummary from "@/components/common/table-summary";
import { FC } from "react";
import { EvaluateFormComponent } from "../../evaluate";

const R4Form: FC = () => {
  const Data = [
    {
      Grade: "A",
      Score: "10",
      Note: "> 5,000 MB/Year",
    },
    {
      Grade: "B",
      Score: "8",
      Note: "> 1,000 - 5,000MB/Year",
    },
    {
      Grade: "C",
      Score: "5",
      Note: "> 500 - 1,000MB/Year",
    },
    {
      Grade: "D",
      Score: "0",
      Note: "≤ 500 MB/Year",
    },
  ];
  return (
    <div className="relative flex w-full flex-col gap-2">
      <h3 className="text-base font-bold">
        ภาพรวมผลการประเมิน / Overall Assessment
      </h3>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <h3 className="text-sm font-bold">รายได้หลัก (ฐานข้อมูลงบ DBD)</h3>
          <TableSummary
            className="w-full"
            TableHeaderText={["เกรด", "คะแนน", "Sales"]}
            Data={Data}
          />
        </div>
        <div>
          <h3 className="text-sm font-bold">สัดส่วนวัตถุดิบ ต้นทุน และกำไร</h3>
          <TableSummary
            className="w-full"
            TableHeaderText={["เกรด", "คะแนน", "Mat' I Ratio"]}
            Data={Data}
          />
        </div>
        <div>
          <h3 className="text-sm font-bold">ออเดอร์ ต่อ/ปี</h3>
          <TableSummary
            className="w-full"
            TableHeaderText={["เกรด", "คะแนน", "Sales"]}
            Data={Data}
          />
        </div>
        <div>
          <h3 className="text-sm font-bold">เครดิตเทอมการจ่ายเงินของลูกค้า</h3>
          <TableSummary
            className="w-full"
            TableHeaderText={["เกรด", "คะแนน", "Credit Terms (Customer)"]}
            Data={Data}
          />
        </div>
        <div>
          <h3 className="text-sm font-bold">เครดิตเทอม ซัพพลายเออร์หลัก</h3>
          <TableSummary
            className="w-full"
            TableHeaderText={["เกรด", "คะแนน", "Credit Terms (Vendor)"]}
            Data={Data}
          />
        </div>
        <div>
          <h3 className="text-sm font-bold">
            ระยะเวลาจัดเก็บสินค้า (Inventory day)
          </h3>
          <TableSummary
            className="w-full"
            TableHeaderText={["เกรด", "คะแนน", "Inventory"]}
            Data={Data}
          />
        </div>
      </div>
      <div className="mt-4">
        <EvaluateFormComponent />
      </div>
    </div>
  );
};

export default R4Form;
