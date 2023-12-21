import { CompanyInfo } from "@/helpers/company.helper";
import { CopyToClipboardCustom } from "@/hooks/use-copy-to-clipboard";
import { useAtomStore } from "@/jotai/use-atom-store";
import { FC, Fragment } from "react";

const CustomerDetails: FC = () => {
  const { registration } = useAtomStore();
  const { company_information } = registration;

  const companyInfo = Object.entries(company_information)
    ?.filter(([key]) => key !== "company_registration")
    .map(([key, value]) => {
      const label = CompanyInfo.find((item) => item.name === key)?.label;
      return { label, value };
    });

  return (
    <div className="grid grid-cols-4 pl-1 pr-4 text-xs">
      {companyInfo?.map((item, i) => (
        <Fragment key={i}>
          <h4 className="font-semibold">{item?.label}</h4>
          <div className="col-span-3 flex items-center gap-x-1">
            <CopyToClipboardCustom
              text={item?.label}
              delay={500}
              className="h-3 w-3"
            />

            <p className="w-full truncate border-b text-primary">
              {item?.value.toString()}
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default CustomerDetails;
