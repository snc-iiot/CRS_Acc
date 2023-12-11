// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FC } from "react";

const EvaluateForm: FC = () => {
  const evaluates: {
    Name: string;
    InputType: "radio" | "select" | "text" | "number";
    RadioOptions: {
      label: string;
      value: string;
      isSelect?: boolean;
    }[];
    Options: {
      label: string;
      value: string;
    }[];
  }[] = [
    {
      Name: "เงื่อนไขการปรับราคา",
      InputType: "radio",

      RadioOptions: [
        {
          label: "มี",
          value: "yes",
          isSelect: true,
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [
        {
          label: "ทุก 3 เดือน",
          value: "",
        },
        {
          label: "ทุก 3 เดือน",
          value: "3",
        },
        {
          label: "ทุก 6 เดือน",
          value: "6",
        },
      ],
    },
    {
      Name: "ระยะทางในการขนส่งสินค้า / ค่าใช้จ่าย",
      InputType: "radio",
      RadioOptions: [
        {
          label: "30 Km",
          value: "30",
        },
        {
          label: "มากกว่า 30-100 km ",
          value: "30-100",
        },
        {
          label: "มากกว่า 100 km",
          value: "100",
        },
      ],
      Options: [],
    },
    {
      Name: "BOM + Process",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "ระเบียบการวางบิล / รับเงิน",
      InputType: "radio",
      RadioOptions: [
        {
          label: "โอน, เงินสด",
          value: "yes",
        },
        {
          label: "เช็ค",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "Incoterm",
      InputType: "radio",
      RadioOptions: [
        {
          label: "EXW",
          value: "exw",
        },
        {
          label: "FOB/CIF",
          value: "fob-cif",
        },
        {
          label: "อื่นๆ",
          value: "other",
        },
      ],
      Options: [],
    },
    {
      Name: "เงื่อนไขการเปิด LC",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "เงื่อนไขการขนส่งสินค้า",
      InputType: "radio",
      RadioOptions: [
        {
          label: "SNC เป็นผู้ขนส่งสินค้า",
          value: "snc",
        },
        {
          label: "ผู้รับ (Customer) เป็นผู้ขนส่งสินค้า",
          value: "customer",
        },
      ],
      Options: [],
    },
    {
      Name: "เงื่อนไขในการวางเงินมัดจำ",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
          isSelect: true,
        },
        {
          label: "ไม่มี, อื่นๆ",
          value: "no",
        },
      ],
      Options: [
        {
          label: "100/0",
          value: "",
        },
      ],
    },
    {
      Name: "รับประกันสินค้า",
      InputType: "radio",
      RadioOptions: [
        {
          label: "ต้องการ",
          value: "yes",
          isSelect: true,
        },
        {
          label: "ไม่ต้องการ",
          value: "no",
        },
      ],
      Options: [
        {
          label: "1 ปี",
          value: "",
        },
      ],
    },
    {
      Name: "การรับรองที่ได้รับ ISO",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "มีนโยบายการต่อต้านทุจริตคอร์รัปชั่น",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "มีนโยบายไม่รับแรงงานต่ำกวา 18 ปีขึ้นไป",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "มีนโยบายการประเมินผลกระทบต่อสื่งแวดล้อมต่อตนเอง และชุมชนโดยรอบ",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "มีนโยบายการเปิดเผยช่องทางให้ติดต่อร้องเรียน",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "มีนโยบายประเมินความปลอดภัย อาชีวอนามัยและสภาพแวดล้อมในการทำงาน",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "มีนโยบายสวัสดิการแรงงานตามกฎหมายกำหนด",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "งบการเงิน 5 ปี",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "สัญญาซื้อขายกับลูกค้า",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "เยี่ยมชมโรงงาน / รูปถ่าย",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
    {
      Name: "สภาพเครื่องจักร + รูปถ่าย",
      InputType: "radio",
      RadioOptions: [
        {
          label: "มี",
          value: "yes",
        },
        {
          label: "ไม่มี",
          value: "no",
        },
      ],
      Options: [],
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* <h3 className="text-sm font-bold underline">ผลการประเมินคะแนน</h3> */}
      <div className="flex flex-col gap-2 text-xs">
        {evaluates?.map((evaluate, i) => (
          <div
            key={i}
            className="flex w-[75%] items-center justify-between gap-2"
          >
            <h2 className="whitespace-nowrap">
              {i + 1}. {evaluate?.Name}
            </h2>
            <div className="overflow-hidden">
              {new Array(400).fill(0).map((_, i) => (
                <span key={i}>.</span>
              ))}
            </div>
            <div className={`flex items-center gap-2`}>
              <strong className="text-xs">มี</strong>
              <div className="flex items-center">
                <strong className="text-xs">10</strong>
                <p className="whitespace-nowrap text-xs">/10 คะแนน</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluateForm;
