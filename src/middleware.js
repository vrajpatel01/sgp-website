export { default } from "next-auth/middleware"

export const config = { matcher: ["/", '/students', '/faculty', '/hod', '/institutes'] }