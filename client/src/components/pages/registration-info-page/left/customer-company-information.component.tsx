import { Icons } from "@/components/common/icons";
import { CompanyInfo } from "@/helpers/company.helper";
import { CopyToClipboardCustom } from "@/hooks/use-copy-to-clipboard";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { FC, Fragment } from "react";

const CustomerDetails: FC = () => {
  const { registration, businessTypeList } = useAtomStore();
  const { company_information } = registration;

  return (
    <div className="grid grid-cols-4 pl-1 pr-4 text-xs">
      {CompanyInfo?.filter(
        (item) =>
          item?.name !== "company_registration" &&
          item?.name !== "nature_of_business",
      )?.map((item, i) => (
        <Fragment key={i}>
          <h4 className="truncate font-semibold">{item?.label}</h4>
          <div className="col-span-3 flex items-center gap-x-1">
            <CopyToClipboardCustom
              text={
                company_information[
                  item?.name as keyof typeof company_information
                ] as string
              }
              delay={500}
              className="h-3 w-3"
            />

            <p className="w-full truncate border-b text-primary">
              {String(
                company_information[
                  item?.name as keyof typeof company_information
                ],
              )}
            </p>
          </div>
        </Fragment>
      ))}
      <h4 className="truncate font-semibold">
        ประเภทกิจการตามใบอนุญาตประกอบการ
      </h4>
      <div className="col-span-3 flex items-center gap-x-1">
        <CopyToClipboardCustom text="" delay={500} className="h-3 w-3" />
        <p className="w-full truncate border-b text-primary">
          {businessTypeList?.find(
            (item) =>
              item?.business_type_id ===
              company_information?.nature_of_business,
          )?.business_type_th ?? "-"}
        </p>
      </div>
      <h4 className="font-semibold">การจดทะเบียนบริษัท</h4>
      <div className="col-span-3 flex items-center gap-x-1">
        <p className="flex w-full items-center">
          {company_information?.company_registration?.is_thai ? (
            <Icons.checkCircle className="h-3 w-3 text-primary" />
          ) : (
            <Icons.circle className="h-3 w-3" />
          )}
          <span
            className={cn(
              "ml-1",
              company_information?.company_registration?.is_thai
                ? "text-primary"
                : "",
            )}
          >
            จดทะเบียนในประเทศไทย
          </span>
        </p>
        <p className="flex w-full items-center">
          {!company_information?.company_registration?.is_thai ? (
            <Icons.checkCircle className="h-3 w-3 text-primary" />
          ) : (
            <Icons.circle className="h-3 w-3" />
          )}
          <span className="ml-1">จดทะเบียนนอกประเทศ</span>
          <span className="ml-1 text-primary">
            {company_information?.company_registration?.country}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CustomerDetails;
