import { Sections } from "@/helpers/register.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const RelationshipInformationForm: FC = () => {
  const { registration, setRegistration } = useAtomStore();
  return (
    <section id="relationship-info" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "relationship-info")?.title}
          </h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          <article className="grid w-full grid-cols-10 items-center gap-2">
            <div className="col-span-4 flex h-full items-start justify-end">
              <h3 className="text-sm">ความสัมพันธ์กับบุคคลใน SNC</h3>
            </div>
            <div className="col-span-4 flex justify-start">
              <RadioGroup
                className="flex w-full flex-col gap-1"
                value={
                  registration?.relationship?.is_relationship
                    ? "relationship"
                    : "none-relationship"
                }
                onValueChange={(value) => {
                  setRegistration((prev) => ({
                    ...prev,
                    relationship: {
                      ...prev.relationship,
                      is_relationship: value === "relationship",
                      relationship_name: "",
                    },
                  }));
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="relationship" id="relationship" />
                    <Label
                      htmlFor="relationship"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      มี
                    </Label>
                  </div>
                  <input
                    type="text"
                    className={cn(
                      "w-full border-b text-sm focus:border-blue-500 focus:outline-none",
                      !registration?.relationship?.is_relationship && "hidden",
                    )}
                    placeholder="กรุณาระบุ ชื่อ-นามสกุล"
                    value={registration?.relationship?.relationship_name}
                    onChange={(e) => {
                      setRegistration((prev) => ({
                        ...prev,
                        relationship: {
                          ...prev.relationship,
                          relationship_name: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="none-relationship"
                      id="none-relationship"
                    />
                    <Label
                      htmlFor="none-relationship"
                      className="whitespace-nowrap text-sm font-medium"
                    >
                      ไม่มี
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </article>
        </section>
      </main>
    </section>
  );
};

export default RelationshipInformationForm;
