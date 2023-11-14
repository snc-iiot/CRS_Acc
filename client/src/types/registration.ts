import { registrationSchema } from "@/lib/validation/registration";
import * as z from "zod";

export type TRegistrationForm = z.infer<typeof registrationSchema>;
