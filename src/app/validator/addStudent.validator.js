import { z } from "zod";

export default z.object({
    name: z.string(),
    rollNumber: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().min(10, {
        message: "Phone number must be at least 10 characters"
    }),
    institute: z.string(),
    department: z.string(),
    batch: z.string(),
    semester: z.string(),
    division: z.string(),
})