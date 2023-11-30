import { Icons } from "@/components/common/icons";
import TableDBD, { ITableDBD } from "@/components/common/table-dbd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MockDBDData from "@/mock/dbd.mock.json";
import { FC, useState } from "react";
import { TableFinancialRatio } from "../../analytics";

const R2Form: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ITableDBD[]>([]);

  const handleSyncDBD = () => {
    setLoading(true);
    setTimeout(() => {
      setData(MockDBDData);
      setLoading(false);
    }, 3000);
  };

  if (loading || data.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h3 className="text-lg font-bold">ดึงข้อมูลจากฐานข้อมูล DBD</h3>
        <Button onClick={handleSyncDBD} variant="outline">
          <Icons.refreshCcwIcon
            className={cn(loading ? "animate-spin" : "", "mr-2")}
          />
          {loading ? "กำลังโหลดข้อมูล" : "Sync ข้อมูล DBD"}
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-4">
      <h3 className="text-lg font-bold">
        รายงานข้อมูลทางการเงิน / Financial Report by DBD
      </h3>
      <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-1 text-xs font-bold">
            งบการเงิน / Statement of Financial Position
          </AccordionTrigger>
          <AccordionContent>
            <TableDBD className="w-full" data={data} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="p-1 text-xs font-bold">
            งบกำไรขาดทุน / Income Statement
          </AccordionTrigger>
          <AccordionContent>
            <TableDBD className="w-full" data={data} />
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
