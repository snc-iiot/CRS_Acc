import { useAtomStore } from "@/jotai/use-atom-store";
import { FC } from "react";

const ShareholderProportion: FC = () => {
  const { registration, countryCodeList } = useAtomStore();
  const { share_holder } = registration;

  const findCountry = (code: string): string => {
    if (code == "") {
      return "-";
    }
    const country = countryCodeList?.find((item) => item.alpha2 === code);
    return country?.country ?? "-";
  };

  if (!share_holder) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 pl-1 pr-4 text-xs">
      <h4 className="font-semibold">สัดส่วนผู้ถือหุ้น</h4>
      <h4 className="text-center font-semibold">สัดส่วน %</h4>
      <div />
      <div />
      <h4 className="font-semibold">สัญชาติผู้ถือหุ้นสูงสุด</h4>
      <p className="border pr-1 text-right text-primary">{share_holder?.hight_nationalities?.percentage}%</p>
      <div className="ml-2">
        <p className="text-primary">{findCountry(share_holder?.hight_nationalities?.nationalities) ?? "-"}</p>
      </div>
      <div />
      <h4 className="font-semibold">สัญชาติไทย</h4>
      <p className="border pr-1 text-right text-primary">
        {share_holder?.hight_nationalities?.nationalities === "TH"
          ? share_holder?.hight_nationalities?.percentage
          : share_holder?.thai_nationalities}
        %
      </p>
      <div />
      <div />
      <h4 className="font-semibold">สัญชาติอื่นๆ</h4>
      <p className="border pr-1 text-right text-primary">{share_holder?.other_nationalities}%</p>
      <div />
      <div />
      <h4 className="font-semibold">รวมทุกสัญชาติ</h4>
      <p className="border pr-1 text-right text-primary">100%</p>
      <div />
      <div />
    </div>
  );
};

export default ShareholderProportion;
