import regex from "@/lib/regex";
import { z } from "zod";

export default z.object({
    name: z.string(),
    rollNumber: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().refine(data => regex.phone.test(data), {
        message: 'Enter valid phone number'
    }),
    institute: z.string(),
    department: z.string(),
    batch: z.string(),
    semester: z.string(),
    division: z.string(),
})