import TableAssessmentSummary from "@/components/common/table-assessment-summary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { groupByField } from "@/helpers/array.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { FC } from "react";

const AssessmentDetailsSection: FC = () => {
  const { summaryPart1 } = useAtomStore();

  const allSection = groupByField(summaryPart1, "topic_no_hint");

  const Section1: {
    label: string;
    activeScore: number;
    maxScore: number;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: `${allSection["1.1.1"]?.[0]?.topic_no_hint} ${allSection[
        "1.1.1"
      ]?.[0]?.label_th} ${
        allSection["1.1.1"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.1.1"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.1.1"]?.[0]?.score,
      maxScore: allSection["1.1.1"]?.[0]?.max_score,
      data: [
        {
          Topic: "> 5,000.00 MB/Year",
          Score: 10,
        },
        {
          Topic: "1,000.01 – 5,000.00 MB/Year",
          Score: 8,
        },
        {
          Topic: "500.01 – 1000.00 MB/Year",
          Score: 5,
        },
        {
          Topic: "≤ 500.00 MB/Year",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.1.2"]?.[0]?.topic_no_hint} ${allSection[
        "1.1.2"
      ]?.[0]?.label_th} ${
        allSection["1.1.2"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.1.2"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.1.2"]?.[0]?.score,
      maxScore: allSection["1.1.2"]?.[0]?.max_score,
      data: [
        {
          Topic: "≥ 13.00",
          Score: 10,
        },
        {
          Topic: "8.00 - 12.99",
          Score: 8,
        },
        {
          Topic: "3.00 – 7.99",
          Score: 6,
        },
        {
          Topic: "0 – 2.99",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.1.3"]?.[0]?.topic_no_hint} ${allSection[
        "1.1.3"
      ]?.[0]?.label_th} ${
        allSection["1.1.3"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.1.3"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.1.3"]?.[0]?.score,
      maxScore: allSection["1.1.3"]?.[0]?.max_score,
      data: [
        {
          Topic: "≤ 1.40",
          Score: 10,
        },
        {
          Topic: "1.41 – 2.00",
          Score: 8,
        },
        {
          Topic: "2.01 – 2.50",
          Score: 6,
        },
        {
          Topic: "> 2.50",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.1.4"]?.[0]?.topic_no_hint} ${allSection[
        "1.1.4"
      ]?.[0]?.label_th} ${
        allSection["1.1.4"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.1.4"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.1.4"]?.[0]?.score,
      maxScore: allSection["1.1.4"]?.[0]?.max_score,
      data: [
        {
          Topic: "≥ 45.00",
          Score: 10,
        },
        {
          Topic: "30.00 – 44.99",
          Score: 8,
        },
        {
          Topic: "15.00 – 29.99",
          Score: 6,
        },
        {
          Topic: "< 15.00",
          Score: 0,
        },
      ],
    },
  ];

  const Section2: {
    label: string;
    activeScore: number;
    maxScore: number;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: `${allSection["1.2.1"]?.[0]?.topic_no_hint} ${allSection[
        "1.2.1"
      ]?.[0]?.label_th} ${
        allSection["1.2.1"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.2.1"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.2.1"]?.[0]?.score,
      maxScore: allSection["1.2.1"]?.[0]?.max_score,
      data: [
        {
          Topic: "≤ 65.00%",
          Score: 10,
        },
        {
          Topic: "65.01 - 75.00%",
          Score: 8,
        },
        {
          Topic: "75.01 - 85.00%",
          Score: 5,
        },
        {
          Topic: "> 85.00%",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.2.2"]?.[0]?.topic_no_hint} ${allSection[
        "1.2.2"
      ]?.[0]?.label_th} ${
        allSection["1.2.2"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.2.2"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.2.2"]?.[0]?.score,
      maxScore: allSection["1.2.2"]?.[0]?.max_score,
      data: [
        {
          Topic: "> 300.00 MB/Year",
          Score: 10,
        },
        {
          Topic: "80.01 – 300.00 MB/Year",
          Score: 8,
        },
        {
          Topic: "20.01 – 80.00 MB/Year",
          Score: 5,
        },
        {
          Topic: "≤ 20.00 MB/Year",
          Score: 0,
        },
      ],
    },
  ];

  const Section3: {
    label: string;
    activeScore: number;
    maxScore: number;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: `${allSection["1.3.1"]?.[0]?.topic_no_hint} ${allSection[
        "1.3.1"
      ]?.[0]?.label_th} ${
        allSection["1.3.1"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.3.1"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.3.1"]?.[0]?.score,
      maxScore: allSection["1.3.1"]?.[0]?.max_score,
      data: [
        {
          Topic: "เงินสด - 30 วัน",
          Score: 10,
        },
        {
          Topic: "31 - 60 วัน",
          Score: 8,
        },
        {
          Topic: "61 - 90 วัน",
          Score: 5,
        },
        {
          Topic: "90 วัน",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.3.2"]?.[0]?.topic_no_hint} ${allSection[
        "1.3.2"
      ]?.[0]?.label_th} ${
        allSection["1.3.2"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.3.2"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.3.2"]?.[0]?.score,
      maxScore: allSection["1.3.2"]?.[0]?.max_score,
      data: [
        {
          Topic: "> 90 วัน",
          Score: 10,
        },
        {
          Topic: "61 - 90 วัน",
          Score: 8,
        },
        {
          Topic: "31 - 60 วัน",
          Score: 5,
        },
        {
          Topic: "30 วัน - เงินสด",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.3.3"]?.[0]?.topic_no_hint} ${allSection[
        "1.3.3"
      ]?.[0]?.label_th} ${
        allSection["1.3.3"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.3.3"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.3.3"]?.[0]?.score,
      maxScore: allSection["1.3.3"]?.[0]?.max_score,
      data: [
        {
          Topic: "0 - 3 วัน",
          Score: 10,
        },
        {
          Topic: "4 - 7 วัน",
          Score: 8,
        },
        {
          Topic: "8 - 10 วัน",
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
    activeScore: number;
    maxScore: number;
    data: {
      Topic: string;
      Score: number;
    }[];
  }[] = [
    {
      label: `${allSection["1.4.1"]?.[0]?.topic_no_hint} ${allSection[
        "1.4.1"
      ]?.[0]?.label_th} ${
        allSection["1.4.1"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.4.1"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.4.1"]?.[0]?.score,
      maxScore: allSection["1.4.1"]?.[0]?.max_score,
      data: [
        {
          Topic: "มีเพียงพอ",
          Score: 10,
        },
        {
          Topic: "ใช้ของลูกค้า",
          Score: 8,
        },
        {
          Topic: "ลงทุนเพิ่ม",
          Score: 0,
        },
      ],
    },
    {
      label: `${allSection["1.4.2"]?.[0]?.topic_no_hint} ${allSection[
        "1.4.2"
      ]?.[0]?.label_th} ${
        allSection["1.4.2"]?.[0]?.label_en === ""
          ? ""
          : `(${allSection["1.4.2"]?.[0]?.label_en})`
      }`,
      activeScore: allSection["1.4.2"]?.[0]?.score,
      maxScore: allSection["1.4.2"]?.[0]?.max_score,
      data: [
        {
          Topic: "ไม่ใช้แม่พิมพ์",
          Score: 10,
        },
        {
          Topic: "มีอยู่เพียงพอ",
          Score: 10,
        },
        {
          Topic: "ใช้ของลูกค้า",
          Score: 6,
        },
        {
          Topic: "ลงทุนเพิ่ม",
          Score: 0,
        },
      ],
    },
  ];

  const CalculateSection1 = () => {
    const sumScore = Section1?.reduce((a, b) => a + b?.activeScore, 0);
    const sumMaxScore = Section1?.reduce((a, b) => a + b?.maxScore, 0);
    const result = (sumScore / sumMaxScore) * 10;
    return Math.floor(result);
  };

  const CalculateSection2 = () => {
    const sumScore = Section2?.reduce((a, b) => a + b?.activeScore, 0);
    const sumMaxScore = Section2?.reduce((a, b) => a + b?.maxScore, 0);
    const result = (sumScore / sumMaxScore) * 10;
    return Math.floor(result);
  };

  const CalculateSection3 = () => {
    const sumScore = Section3?.reduce((a, b) => a + b?.activeScore, 0);
    const sumMaxScore = Section3?.reduce((a, b) => a + b?.maxScore, 0);
    const result = (sumScore / sumMaxScore) * 10;
    return Math.floor(result);
  };

  const CalculateSection4 = () => {
    const sumScore = Section4?.reduce((a, b) => a + b?.activeScore, 0);
    const sumMaxScore = Section4?.reduce((a, b) => a + b?.maxScore, 0);
    const result = (sumScore / sumMaxScore) * 10;
    return Math.floor(result);
  };

  const AssessmentDetails = [
    {
      label: "1.1 รายได้และผลตอบแทนผู้ถือหุ้น",
      component: (
        <div className="grid grid-cols-2 gap-2">
          {Section1.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info.label}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={info?.activeScore}
              data={info.data}
            />
          ))}
        </div>
      ),
    },
    {
      label: "1.2 ออร์เดอร์และสัดส่วนวัตถุดิบ",
      component: (
        <div className="grid grid-cols-2 gap-2 ">
          {Section2.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info.label}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={info?.activeScore}
              data={info.data}
            />
          ))}
        </div>
      ),
    },
    {
      label: "1.3 เครดิตเทอม และสินค้าคงคลัง",
      component: (
        <div className="grid grid-cols-2 gap-2">
          {Section3.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info.label}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={info.activeScore}
              data={info.data}
            />
          ))}
        </div>
      ),
    },
    {
      label: "1.4 การลงทุนเครื่องจักร และแม่พิมพ์",
      component: (
        <div className="grid grid-cols-2 gap-2">
          {Section4.map((info, index) => (
            <TableAssessmentSummary
              key={index}
              Header={info.label}
              className="w-full gap-0"
              TableHeaderText={["หัวข้อ / เงื่อนไข / เกณฑ์", "คะแนน"]}
              activeScore={info?.activeScore}
              data={info.data}
            />
          ))}
        </div>
      ),
    },
  ];

  const labelScore: {
    [key: number]: number;
    1: number;
    2: number;
    3: number;
    4: number;
  } = {
    1: CalculateSection1(),
    2: CalculateSection2(),
    3: CalculateSection3(),
    4: CalculateSection4(),
  };

  return (
    <div>
      <Accordion type="multiple">
        {AssessmentDetails.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="p-1 text-xs">
              <p>
                {item.label}{" "}
                <span className="text-primary">
                  ({labelScore[index + 1] as number}/10) คะแนน
                </span>
              </p>
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
