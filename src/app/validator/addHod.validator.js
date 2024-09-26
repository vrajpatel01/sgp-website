import { z } from "zod";

export default z.object({
    name: z.string().min(3, {
        message: 'Name must be 3 characters long'
    }),
    employeeNumber: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().min(10, {
        message: 'Phone number must be 10 characters long'
    }),
    designation: z.string(),
    institute: z.string(),
    department: z.string(),
    subjectCode: z.string(),
    subjectName: z.string(),
})