import { ContractInfo } from "@/helpers/contract.helper";
import { Sections } from "@/helpers/register.helper";
import { FC, Fragment } from "react";
import { Input } from "../ui/input";

const ContractInformationForm: FC = () => {
  return (
    <section id="contract-info" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "contract-info")?.title}
          </h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          {ContractInfo?.map((item, index) => (
            <Fragment key={index}>
              <div className="grid w-full grid-cols-10 items-center gap-2">
                <div className="col-span-4 flex justify-end">
                  <h3 className="text-sm font-bold">{item?.group}</h3>
                </div>
              </div>
              {item?.fields?.map((field, index) => (
                <div
                  className="grid w-full grid-cols-10 items-center gap-2"
                  key={index}
                >
                  <div className="col-span-4 flex justify-end">
                    <h3 className="text-sm ">{field?.label}</h3>
                  </div>
                  <div className="col-span-4 flex">
                    <Input
                      id={field?.name}
                      type={field?.type}
                      placeholder={field?.placeholder}
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <p className="text-sm text-red-500">*</p>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
        </section>
      </main>
    </section>
  );
};

export default ContractInformationForm;
