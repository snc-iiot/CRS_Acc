import { Icons } from "@/components/common/icons";
import { FC } from "react";

const Relationship: FC = () => {
  return (
    <div className="w-full text-xs">
      <h5>4.1 ความสัมพันธ์กับบุคคลใน SNC</h5>
      <div className="grid w-full grid-cols-4 items-center pl-1">
        <div className="flex items-center gap-x-1">
          <Icons.checkCircle className="h-3 w-3 text-primary" />
          <p className="text-primary">มี</p>
        </div>
        <div className="col-span-3 h-full w-full border-b pl-1 text-primary">
          นาย อนุวัฒน์ ทีสุกะ
        </div>
        <div className="col-span-4 flex items-center gap-x-1">
          <Icons.circle className="h-3 w-3" />
          <p>ไม่มี</p>
        </div>
      </div>
    </div>
  );
};

export default Relationship;
