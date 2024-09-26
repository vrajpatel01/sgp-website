import { z } from "zod";

export default z.object({
    name: z.string().nonempty(),
    employeeNumber: z.string().nonempty(),
    email: z.string().email(),
    phoneNumber: z.string().nonempty(),
    designation: z.string().nonempty(),
    institute: z.string().nonempty(),
    department: z.string().nonempty(),
    subjectCode: z.string().nonempty(),
    subjectName: z.string().nonempty(),
})