// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Icons } from "@/components/common/icons";
import { CopyToClipboardCustom } from "@/hooks/use-copy-to-clipboard";
import { FC, Fragment } from "react";

// import { CopyToClipboard } from "react-copy-to-clipboard";

// import { toast } from "react-toastify";

// import { cn } from "@/lib/utils";

const CustomerDetails: FC = () => {
  const companyInformation: { label: string; value: string }[] = [
    {
      label: "ขึ้นทะเบียนกับบริษัท",
      value: "[MERCURY] บริษัท เมอร์คิวรี่ ทรานส์ฟอร์ม จำกัด",
    },
    { label: "เรียน", value: "กรรมการผู้จัดการ" },
    { label: "ชื่อบริษัท", value: "บริษัท สแควร์ อินเตอร์เนชั่นแนล จำกัด" },
    {
      label: "ที่อยู่",
      value:
        "เลขที่ 1 ซอยรามคำแหง 39 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพมหานคร 10240",
    },
    { label: "โทรศัพท์", value: "02-735-5000" },
    { label: "เลขนิติบุคคล", value: "0107556000091" },
    { label: "ประเภทของกิจการ", value: "บริษัทจำกัด" },
  ];

  return (
    <div className="grid grid-cols-4 pl-1 pr-4 text-xs">
      {companyInformation?.map((item, i) => (
        <Fragment key={i}>
          <h4 className="font-semibold">{item?.label}</h4>
          <div className="col-span-3 flex items-center gap-x-1">
            <CopyToClipboardCustom
              text={item?.value}
              delay={500}
              className="h-3 w-3"
            />

            <p className="w-full truncate border-b">{item?.value}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default CustomerDetails;
