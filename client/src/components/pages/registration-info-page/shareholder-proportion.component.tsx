import { FC } from "react";

const ShareholderProportion: FC = () => {
  return (
    <div className="grid grid-cols-4 pl-1 pr-4 text-xs">
      <h4 className="font-semibold">สัดส่วนผู้ถือหุ้น</h4>
      <h4 className="text-center font-semibold">สัดส่วน %</h4>
      <div />
      <div />

      <h4 className="font-semibold">สัญชาติผู้ถือหุ้นสูงสุด</h4>
      <p className="border pr-1 text-right">90</p>
      <div />
      <div />

      <h4 className="font-semibold">สัญชาติไทย</h4>
      <p className="border pr-1 text-right">5</p>
      <div />
      <div />

      <h4 className="font-semibold">สัญชาติอื่นๆ</h4>
      <p className="border pr-1 text-right">95</p>
      <div />
      <div />

      <h4 className="font-semibold">รวมทุกสัญชาติ</h4>
      <p className="border pr-1 text-right">100</p>
      <div />
      <div />
    </div>
  );
};

export default ShareholderProportion;
