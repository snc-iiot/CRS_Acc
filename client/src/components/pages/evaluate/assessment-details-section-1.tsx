import TableAssessmentSummary from "@/components/common/table-assessment-summary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FC } from "react";

const AssessmentDetailsSection: FC = () => {
  // const Detail = {
  //   section_1: [
  //     "รายได้หลัก (Net Profit Margin)",
  //     "กำไรสุทธิ (EAT)",
  //     "อัตราส่วนหนี้สินต่อส่วนของผู้ถือหุ้น(D/E)",
  //     "อัตราส่วนผลตอบแทนต่อส่วนของผู้ถือหุ้น (ROE)",
  //   ],
  //   section_2: ["ออร์เดอร์ / ปี (Order/Year)", "กำไรสุทธิ (EAT)"],
  //   section_3: [
  //     "เครดิตเทอมการจ่ายเงินของลูกค้า (Customer's Credit Term)",
  //     "เครดิตเทอมการจ่ายเงินซัพพลายเออร์(Suplier's Credit Term)",
  //     "ระยะสินค้าคงคลัง (Inventory Day)",
  //   ],
  //   section_4: [
  //     "รายได้หลัก (Net Profit Margin)",
  //     "กำไรสุทธิ (EAT)",
  //     "อัตราส่วนหนี้สินต่อส่วนของผู้ถือหุ้น(D/E)",
  //     "อัตราส่วนผลตอบแทนต่อส่วนของผู้ถือหุ้น (ROE)",
  //   ],
  // };

  const Section1: {
    label: string;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: "รายได้หลัก (Net Profit Margin)",
      data: [
        {
          Topic: "> 5,000 MB/Year",
          Score: 10,
        },
        {
          Topic: "> 1,000 - 5,000MB/Year",
          Score: 8,
        },
        {
          Topic: "> 500 - 1,000MB/Year",
          Score: 5,
        },
        {
          Topic: "≤ 500 MB/Year",
          Score: 0,
        },
      ],
    },
    {
      label: "กำไรสุทธิ (EAT)",
      data: [
        {
          Topic: "≥ 13",
          Score: 10,
        },
        {
          Topic: "< 13 - 8",
          Score: 8,
        },
        {
          Topic: "< 8 - 3",
          Score: 6,
        },
        {
          Topic: "0",
          Score: 0,
        },
      ],
    },
    {
      label: "อัตราส่วนหนี้สินต่อส่วนของผู้ถือหุ้น (D/E)",
      data: [
        {
          Topic: "≤ 1.4",
          Score: 10,
        },
        {
          Topic: "> 1.4 - 2.0",
          Score: 8,
        },
        {
          Topic: "> 2.0 - 2.5",
          Score: 6,
        },
        {
          Topic: "> 2.50",
          Score: 0,
        },
      ],
    },
    {
      label: "อัตราส่วนผลตอบแทนต่อส่วนของผู้ถือหุ้น (ROE)",
      data: [
        {
          Topic: "≥ 45",
          Score: 10,
        },
        {
          Topic: "< 45 - 30",
          Score: 8,
        },
        {
          Topic: "< 30 - 15",
          Score: 6,
        },
        {
          Topic: "< 15",
          Score: 0,
        },
      ],
    },
  ];

  const Section2: {
    label: string;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: "ออร์เดอร์ / ปี (Order/Year)",
      data: [
        {
          Topic: "> 300MB/Year",
          Score: 10,
        },
        {
          Topic: "> 80 - 300MB/Year",
          Score: 8,
        },
        {
          Topic: "> 20 - 80MB/Year",
          Score: 5,
        },
        {
          Topic: "≤ 20MB/Year",
          Score: 0,
        },
      ],
    },
    {
      label: "กำไรสุทธิ (EAT)",
      data: [
        {
          Topic: "≥ 13",
          Score: 10,
        },
        {
          Topic: "< 13 - 8",
          Score: 8,
        },
        {
          Topic: "< 8 - 3",
          Score: 6,
        },
        {
          Topic: "0",
          Score: 0,
        },
      ],
    },
  ];

  const Section3: {
    label: string;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: "เครดิตเทอมการจ่ายเงินของลูกค้า (Customer's Credit Term)",
      data: [
        {
          Topic: "เงินสด - 30 วัน",
          Score: 10,
        },
        {
          Topic: "> 30 - 60 วัน",
          Score: 8,
        },
        {
          Topic: "> 60 - 90 วัน",
          Score: 5,
        },
        {
          Topic: "> 90 วัน",
          Score: 0,
        },
      ],
    },
    {
      label: "เครดิตเทอมการจ่ายเงินซัพพลายเออร์(Suplier's Credit Term)",
      data: [
        {
          Topic: "> 90 วัน",
          Score: 10,
        },
        {
          Topic: "> 60 - 90 วัน",
          Score: 8,
        },
        {
          Topic: "> 30 - 60 วัน",
          Score: 5,
        },
        {
          Topic: "≤ 30 วัน - เงินสด",
          Score: 0,
        },
      ],
    },
    {
      label: "ระยะสินค้าคงคลัง (Inventory Day)",
      data: [
        {
          Topic: "3 วัน",
          Score: 10,
        },
        {
          Topic: "> 4 - 7 วัน",
          Score: 8,
        },
        {
          Topic: "> 8 - 10 วัน",
          Score: 5,
        },
        {
          Topic: "> 10 วัน",
          Score: 0,
        },
      ],
    },
  ];

  const Section4: {
    label: string;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: "รายได้หลัก (Net Profit Margin)",
      data: [
        {
          Topic: "> 5,000 MB/Year",
          Score: 10,
        },
        {
          Topic: "> 1,000 - 5,000MB/Year",
          Score: 8,
        },
        {
          Topic: "> 500 - 1,000MB/Year",
          Score: 5,
        },
        {
          Topic: "≤ 500 MB/Year",
          Score: 0,
        },
      ],
    },
    {
      label: "กำไรสุทธิ (EAT)",
      data: [
        {
          Topic: "≥ 13",
          Score: 10,
        },
        {
          Topic: "< 13 - 8",
          Score: 8,
        },
        {
          Topic: "< 8 - 3",
          Score: 6,
        },
        {
          Topic: "0",
          Score: 0,
        },
      ],
    },
    {
      label: "อัตราส่วนหนี้สินต่อส่วนของผู้ถือหุ้น (D/E)",
      data: [
        {
          Topic: "≤ 1.4",
          Score: 10,
        },
        {
          Topic: "> 1.4 - 2.0",
          Score: 8,
        },
        {
          Topic: "> 2.0 - 2.5",
          Score: 6,
        },
        {
          Topic: "> 2.50",
          Score: 0,
        },
      ],
    },
    {
      label: "อัตราส่วนผลตอบแทนต่อส่วนของผู้ถือหุ้น (ROE)",
      data: [
        {
          Topic: "≥ 45",
          Score: 10,
        },
        {
          Topic: "< 45 - 30",
          Score: 8,
        },
        {
          Topic: "< 30 - 15",
          Score: 6,
        },
        {
          Topic: "< 15",
          Score: 0,
        },
      ],
    },
  ];

  const AssessmentDetails = [
    {
      label: "1.1 รายได้และผลตอบแทนผู้ถือหุ้น (10/10 คะแนน)",
      component: (
        <div className="grid grid-cols-2 gap-2">
          {Section1.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info.label}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={10}
              data={info.data}
            />
          ))}
        </div>
      ),
    },
    {
      label: "1.2 ออร์เดอร์และสัดส่วนวัตถุดิบ (10/10 คะแนน)",
      component: (
        <div className="grid grid-cols-2 gap-2 ">
          {Section2.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info.label}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={10}
              data={info.data}
            />
          ))}
        </div>
      ),
    },
    {
      label: "1.3 เครดิตเทอม และสินค้าคงคลัง (10/10 คะแนน)",
      component: (
        <div className="grid grid-cols-2 gap-2">
          {Section3.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info.label}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={10}
              data={info.data}
            />
          ))}
        </div>
      ),
    },
    {
      label: "1.4 การลงทุนเครื่องจักร และแม่พิมพ์ (10/10 คะแนน)",
      component: (
        <div className="grid grid-cols-2 gap-2">
          {Section4.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info.label}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={10}
              data={info.data}
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
