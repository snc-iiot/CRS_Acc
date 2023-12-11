import TableAssessmentSummary from "@/components/common/table-assessment-summary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FC } from "react";

const AssessmentDetailsSection: FC = () => {
  const Detail = {
    section_1: [
      "รายได้หลัก (Net Profit Margin)",
      "กำไรสุทธิ (EAT)",
      "อัตราส่วนหนี้สินต่อส่วนของผู้ถือหุ้น (D/E)",
      "อัตราส่วนผลตอบแทนต่อส่วนของผู้ถือหุ้น (ROE)",
    ],
    section_2: ["ออร์เดอร์ / ปี (Order/Year)", "กำไรสุทธิ (EAT)"],
    section_3: [
      "เครดิตเทอมการจ่ายเงินของลูกค้า (Customer's Credit Term)",
      "เครดิตเทอมการจ่ายเงิoนซัพพลายเออร์(Suplier's Credit Term)",
      "ระยะสินค้าคงคลัง (Inventory Day)",
    ],
    section_4: [
      "รายได้หลัก (Net Profit Margin)",
      "กำไรสุทธิ (EAT)",
      "อัตราส่วนหนี้สินต่อส่วนของผู้ถือหุ้น (D/E)",
      "อัตราส่วนผลตอบแทนต่อส่วนของผู้ถือหุ้น (ROE)",
    ],
  };

  const AssessmentDetails = [
    {
      label: "1.1 รายได้และผลตอบแทนผู้ถือหุ้น (10/10 คะแนน)",
      component: (
        <div className="grid grid-cols-2 gap-2">
          {Detail.section_1.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={10}
              data={[
                { Topic: "", Score: 10 },
                { Topic: "", Score: 8 },
                { Topic: "", Score: 5 },
                { Topic: "", Score: 0 },
              ]}
            />
          ))}
        </div>
      ),
    },
    {
      label: "1.2 ออร์เดอร์และสัดส่วนวัตถุดิบ (10/10 คะแนน)",
      component: (
        <div className="grid grid-cols-2 gap-2 ">
          {Detail.section_2.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={10}
              data={[
                { Topic: "", Score: 10 },
                { Topic: "", Score: 8 },
                { Topic: "", Score: 5 },
                { Topic: "", Score: 0 },
              ]}
            />
          ))}
        </div>
      ),
    },
    {
      label: "1.3 เครดิตเทอม และสินค้าคงคลัง (10/10 คะแนน)",
      component: (
        <div className="grid grid-cols-2 gap-2">
          {Detail.section_3.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={10}
              data={[
                { Topic: "", Score: 10 },
                { Topic: "", Score: 8 },
                { Topic: "", Score: 5 },
                { Topic: "", Score: 0 },
              ]}
            />
          ))}
        </div>
      ),
    },
    {
      label: "1.4 การลงทุนเครื่องจักร และแม่พิมพ์ (10/10 คะแนน)",
      component: (
        <div className="grid grid-cols-2 gap-2">
          {Detail.section_4.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={10}
              data={[
                { Topic: "", Score: 10 },
                { Topic: "", Score: 8 },
                { Topic: "", Score: 5 },
                { Topic: "", Score: 0 },
              ]}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Accordion type="multiple">
        {AssessmentDetails.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="p-1 text-xs">
              {item.label}
            </AccordionTrigger>
            <AccordionContent className="px-6">
              {item.component}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AssessmentDetailsSection;
