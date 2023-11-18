import TableSummary from "@/components/common/table-summary";
import { FC } from "react";

const R5Form: FC = () => {
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

  const Mock = [
    "Sales",
    "Order/Year",
    "Mat' l Ratio",
    "Cerdit Terms (Customer)",
    "Cerdit term Vendor",
    "Inventory",
    "CCC (Project)",
    "Financial Ratio",
    "ผลสรุป",
  ];

  return (
    <div className="pb-4">
      <h3 className="text-base font-bold">
        ผลการประเมิน / Summary of Assessment
      </h3>
      {Mock?.map((info, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 border-b border-primary-foreground"
        >
          <TableSummary
            Header={info}
            TableHeaderText={["เกรด", "คะแนน", "Sales"]}
            Data={Data}
          />
        </div>
      ))}
    </div>
  );
};

export default R5Form;
