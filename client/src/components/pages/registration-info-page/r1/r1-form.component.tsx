import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FC } from "react";
import { R1UpdateDocuments } from "./r1-update-documents.sub.component";

const R1Form: FC = () => {
  const accordionList: {
    topic: string;
    title: string;
    content: JSX.Element;
  }[] = [
    {
      topic: "r1-topic-1",
      title: "ข้อมูลส่วน SNC / SNC Information",
      content: <div>Hello</div>,
    },
    {
      topic: "r1-topic-2",
      title: "เอกสารอัพโหลด",
      content: <R1UpdateDocuments />,
    },
  ];

  return (
    <div>
      <h3 className="text-md font-bold">
        แบบฟอร์มคัดเลือกลูกค้า / Customer Evaluation Form
      </h3>
      <Accordion
        type="multiple"
        className="mb-[3rem]"
        defaultValue={accordionList?.map((item) => item?.topic)}
      >
        {accordionList?.map((item, i) => (
          <AccordionItem value={item?.topic} key={i}>
            <AccordionTrigger className="py-1 text-xs font-bold">
              {item?.title}
            </AccordionTrigger>
            <AccordionContent>{item?.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default R1Form;
