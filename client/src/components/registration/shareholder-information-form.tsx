import { Sections } from "@/helpers/register.helper";
import { FC } from "react";

const ShareholderInformationForm: FC = () => {
  return (
    <section id="shareholder-info" className="flex flex-col gap-2">
      <div className="h-[900px] w-full">
        <h2 className="text-base font-bold">
          {Sections?.find((item) => item.id === "shareholder-info")?.title}
        </h2>
      </div>
    </section>
  );
};

export default ShareholderInformationForm;
