import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CompanyInfo } from "@/helpers/company.helper";
import { ConditionalInput, Sections } from "@/helpers/register.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import CountryList from "@/mocks/country-list-th.json";
import { ChangeEvent, FC, useMemo } from "react";
import { Label } from "../ui/label";

const CompanyInformationForm: FC = () => {
  const { setRegistration, registration, thaiProvince } = useAtomStore();
  const { company_information } = registration;
  const { country } = company_information;

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRegistration((prev) => ({
      ...prev,
      company_information: {
        ...prev.company_information,
        [name]: value,
      },
    }));
  };

  const newCompanyInfo = CompanyInfo?.map((item) => {
    const { country, province, district } = registration?.company_information;
    switch (item?.name) {
      case "province":
        return {
          ...item,
          disabled: !country,
          type: country !== "TH" ? "text" : item?.type,
          options:
            country === "TH"
              ? thaiProvince.map((item) => ({
                  label: item?.name_th,
                  value: item?.name_en,
                }))
              : [],
        };
      case "district":
        return {
          ...item,
          disabled: !province || !country,
          type: country !== "TH" ? "text" : item?.type,
          options:
            (province &&
              thaiProvince
                .find((item) => item?.name_en === province)
                ?.amphure?.map((item) => ({
                  label: item?.name_th,
                  value: item?.name_en,
                }))) ||
            [],
        };
      case "sub_district":
        return {
          ...item,
          type: country !== "TH" ? "text" : item?.type,
          disabled: !district || !province,
          options:
            (district &&
              thaiProvince
                .find((item) => item?.name_en === province)
                ?.amphure?.find((item) => item?.name_en === district)
                ?.tambon?.map((item) => ({
                  label: item?.name_th,
                  value: item?.name_en,
                }))) ||
            [],
        };
      case "zip_code":
        return {
          ...item,
          disabled: !district || !province,
        };
      default:
        return item;
    }
  });

  useMemo(() => {
    if (country !== "TH") {
      setRegistration((prev) => ({
        ...prev,
        company_information: {
          ...prev.company_information,
          province: "",
          district: "",
          sub_district: "",
          zip_code: "",
        },
      }));
    }
  }, [country]);

  return (
    <section id="company-info" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "company-info")?.title}
          </h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          {newCompanyInfo?.map((item, index) => (
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
                {ConditionalInput(
                  item,
                  handleOnChange,
                  registration.company_information,
                )}
              </div>
              <div className="col-span-2 flex justify-end">
                <p className="text-sm text-red-500">{item?.required && "*"}</p>
              </div>
            </div>
          ))}
          <div className={cn("grid w-full grid-cols-10 gap-2", "items-start")}>
            <div className="col-span-4 flex justify-end">
              <label htmlFor="company_address" className="text-sm">
                การจดทะเบียนบริษัท
              </label>
            </div>
            <div className="col-span-4">
              <RadioGroup
                value={
                  registration?.company_information?.company_registration
                    .is_thai
                    ? "thai-company"
                    : "foreign-company"
                }
                onValueChange={(value) => {
                  setRegistration((prev) => ({
                    ...prev,
                    company_information: {
                      ...prev.company_information,
                      company_registration: {
                        ...prev.company_information.company_registration,
                        is_thai: value === "thai-company",
                        country: "",
                      },
                    },
                  }));
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="thai-company" id="thai-company" />
                  <Label htmlFor="thai-company">จดทะเบียนในประเทศไทย</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="foreign-company"
                    id="foreign-company"
                  />
                  <Label
                    htmlFor="foreign-company"
                    className="whitespace-nowrap"
                  >
                    จดทะเบียนนอกประเทศ
                  </Label>
                  <select
                    className="w-full border-b text-sm focus:border-blue-500 focus:outline-none"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setRegistration((prev) => ({
                        ...prev,
                        company_information: {
                          ...prev?.company_information,
                          company_registration: {
                            ...prev?.company_information?.company_registration,
                            [name]: value,
                          },
                        },
                      }));
                    }}
                    value={
                      registration?.company_information?.company_registration
                        ?.country
                    }
                    name="country"
                    disabled={
                      registration?.company_information?.company_registration
                        ?.is_thai
                    }
                  >
                    <option value="">เลือกประเทศ</option>
                    {CountryList?.map((item, index) => (
                      <option key={index} value={item?.alpha2}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default CompanyInformationForm;
