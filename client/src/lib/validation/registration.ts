import * as z from "zod";

export const registrationSchema = z.object({
  company_admin: z.string().min(2),
  company_name: z.string().min(2),
  address: z.string().min(2),
  country: z.string().min(2),
  province: z.string().min(2),
  district: z.string().min(2),
  sub_district: z.string().min(2),
  zip_code: z.string().min(2),
  phone_number: z.string().min(2),
  juristic_id: z.string().min(2),
  website: z.string().min(2),
  nature_of_business: z.string().min(2),
  shareholder: z.object({
    hight_nationalities: z.object({
      nationalities: z.string().min(2),
      percentage: z.number().min(1),
    }),
    thai_nationalities: z.number().min(1),
    other_nationalities: z.number().min(1),
  }),
  contract_person: z.array(
    z.object({
      position: z.enum([
        "manager_scm",
        "manager_accounting",
        "manager_director",
      ]),
      name: z.string().min(2),
      phone_number: z.string().min(2),
      email: z.string().min(2),
    }),
  ),
  relationship: z.object({
    is_relationship: z.boolean(),
    relationship_name: z.string().min(2),
  }),
  certificate: z.array(
    z.object({
      cer_name: z.string().min(2),
      label: z.string().min(2),
      is_active: z.boolean(),
      cer_value: z.string().min(2).nullable(),
      expired_date: z.string().min(2).nullable(),
    }),
  ),
  benefits: z.array(
    z.object({
      name: z.string().min(2),
      label: z.string().min(2),
      is_active: z.boolean(),
      value: z.string().min(2),
      expired_date: z.string().min(2).nullable(),
    }),
  ),
});
