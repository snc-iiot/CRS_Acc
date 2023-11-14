import { CompanyInfo } from "@/helpers/company.helper";
import { ConditionalInput, Sections } from "@/helpers/register.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { TRegistrationForm } from "@/types";
import { ChangeEvent, FC } from "react";

const CompanyInformationForm: FC = () => {
  const { setRegistration, registration } = useAtomStore();
  console.table(registration);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRegistration((prev) => ({
      ...prev,
      [name as keyof TRegistrationForm]: value,
    }));
  };

  return (
    <section id="company-info" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "company-info")?.title}
          </h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          {CompanyInfo?.map((item, index) => (
            <div
              className={cn(
                "grid w-full grid-cols-10 gap-2",
                item?.type === "textarea" ? "items-start" : "items-center",
              )}
              key={index}
            >
              <div className="col-span-4 flex justify-end">
                <label htmlFor={item?.name} className="text-sm">
                  {item?.label}
                </label>
              </div>
              <div className="col-span-4">
                {ConditionalInput(item, handleOnChange, registration)}
              </div>
              <div className="col-span-2 flex justify-end">
                <p className="text-sm text-red-500">{item?.required && "*"}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </section>
  );
};

export default CompanyInformationForm;
