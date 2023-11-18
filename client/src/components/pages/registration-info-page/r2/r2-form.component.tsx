import TableDBD, { ITableDBD } from "@/components/common/table-dbd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MockDBDData from "@/mock/dbd.mock.json";
import { FC } from "react";
import { TableFinancialRatio } from "../../analytics";

const R2Form: FC = () => {
  const data: ITableDBD[] = MockDBDData;
  return (
    <div className="pb-4">
      <h3 className="text-4xl font-bold">R2</h3>
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-1 text-xs font-bold">
            Statement of Financial Position
          </AccordionTrigger>
          <AccordionContent>
            <TableDBD className="w-full" data={data} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="p-1 text-xs font-bold">
            Income Statement
          </AccordionTrigger>
          <AccordionContent>
            <TableDBD className="w-full" data={data} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="p-1 text-xs font-bold">
            อัตราส่วนการเงิน (Financial Ratio)
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
