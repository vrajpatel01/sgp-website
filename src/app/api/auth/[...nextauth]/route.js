import NextAuth from "next-auth/next";
import axiosInstance from "@/axios.config";

// import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = await NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    const { data } = await axiosInstance.post('/admin/auth/login', {
                        email,
                        password
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (data.success === false) {
                        throw new Error(data.message)
                    }

                    return {
                        email,
                        token: data.token
                    }
                } catch (error) {
                    throw new Error(error.response.data.message)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                return {
                    ...token,
                    accessToken: user.token,
                    email: user.email
                }
            }
            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    token: token.accessToken,
                    email: token.email
                }
            }
        }
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
        newUser: '/auth/signup'
    }
})


export { handler as GET, handler as POST }