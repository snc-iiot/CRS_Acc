// import { Icons } from "@/components/common/icons";
import TableDBD from "@/components/common/table-dbd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getDateThai } from "@/helpers/calendar.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { FC } from "react";
import { TableFinancialRatio } from "../../analytics";

const R2Form: FC = () => {
  const { dbdSyncList } = useAtomStore();

  const Financial = dbdSyncList?.financial_position?.map((item) => {
    return {
      Topic: item.topic_th,
      Info: item?.info?.map((info) => {
        return {
          Year: info.year,
          Amount: info.amount,
          Change: info.change,
        };
      }),
    };
  });

  const Income = dbdSyncList?.income_statement?.map((item) => {
    return {
      Topic: item.topic_th,
      Info: item?.info?.map((info) => {
        return {
          Year: info.year,
          Amount: info.amount,
          Change: info.change,
        };
      }),
    };
  });

  if (!dbdSyncList.financial_position || !dbdSyncList.income_statement)
    return (
      <div className="flex w-full items-center justify-center">
        <h2 className="text-center text-lg font-bold">
          ไม่พบข้อมูล กรุณากดปุ่ม "Sync ข้อมูล DBD" เพื่อดำเนินการตรวจสอบข้อมูล
          และยืนยันข้อมูลการเงิน
        </h2>
      </div>
    );

  return (
    <div className="pb-4">
      <div className="item-center flex w-full justify-between">
        <h3 className="text-lg font-bold">
          รายงานข้อมูลทางการเงิน / Financial Report by DBD
        </h3>
        <h4 className="text-xs font-bold">
          อัพเดทล่าสุดเมื่อ {getDateThai(dbdSyncList?.created_at).dateTime}
        </h4>
      </div>
      <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-1 text-xs font-bold">
            งบการเงิน / Statement of Financial Position
          </AccordionTrigger>
          <AccordionContent>
            <TableDBD className="w-full" data={Financial} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="p-1 text-xs font-bold">
            งบกำไรขาดทุน / Income Statement
          </AccordionTrigger>
          <AccordionContent>
            <TableDBD className="w-full" data={Income} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="p-1 text-xs font-bold">
            อัตราส่วนทางการเงิน / Financial Ratio
          </AccordionTrigger>
          <AccordionContent>
            <TableFinancialRatio />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default R2Form;
