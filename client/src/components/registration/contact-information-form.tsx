import { ContactInfo } from "@/helpers/contract.helper";
import { Sections } from "@/helpers/register.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { TContactPerson } from "@/types";
import { FC, Fragment } from "react";
import { Input } from "../ui/input";

const ContractInformationForm: FC = () => {
  const { setRegistration, registration } = useAtomStore();

  const findContact = (position: string): TContactPerson => {
    const contact = registration?.contact_person?.find(
      (contact) => contact?.position_en === position,
    );
    if (contact) {
      return contact;
    } else {
      return {
        position_th: position,
        position_en: position,
        name: "",
        tel: "",
        email: "",
      };
    }
  };

  return (
    <section id="contract-info" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "contract-info")?.title}
          </h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          {ContactInfo?.map((item, index) => (
            <Fragment key={index}>
              <div className="grid w-full grid-cols-10 items-center gap-2">
                <div className="col-span-4 flex justify-end">
                  <h3 className="text-sm font-bold">{item?.group}</h3>
                </div>
              </div>
              {item?.fields?.map((field, j) => (
                <div
                  className="grid w-full grid-cols-10 items-center gap-2"
                  key={j}
                >
                  <div className="col-span-4 flex justify-end">
                    <h3 className="text-sm ">{field?.label}</h3>
                  </div>
                  <div className="col-span-4 flex">
                    <Input
                      name={field?.name}
                      type={field?.type}
                      placeholder={field?.placeholder}
                      className="text-sm"
                      pattern={field?.pattern || undefined}
                      required={field?.required}
                      onChange={(e) => {
                        setRegistration((prev) => ({
                          ...prev,
                          contact_person: prev?.contact_person?.map(
                            (contact) => {
                              if (contact.position_en === item.id) {
                                return {
                                  ...contact,
                                  [field?.name]: e?.target?.value,
                                };
                              }
                              return contact;
                            },
                          ),
                        }));
                      }}
                      value={
                        findContact(item?.id)?.[
                          field?.name as keyof TContactPerson
                        ]
                      }
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
