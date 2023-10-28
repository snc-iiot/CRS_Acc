import { Sections } from "@/helpers/register.helper";
import { FC } from "react";
import { Input } from "../ui/input";

const CompanyInformationForm: FC = () => {
  return (
    <section id="company-info" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "company-info")?.title}
          </h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          {new Array(8).fill(0).map((_, index) => (
            <div
              className="grid w-full grid-cols-10 items-center gap-2"
              key={index}
            >
              <div className="col-span-4 flex justify-end">
                <label
                  htmlFor="companyName"
                  className="text-sm text-muted-foreground"
                >
                  ชื่อบริษัท
                </label>
              </div>
              <div className="col-span-6">
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="ชื่อบริษัท"
                  variant="unstyled"
                />
              </div>
            </div>
          ))}
        </section>
      </main>
    </section>
  );
};

export default CompanyInformationForm;
