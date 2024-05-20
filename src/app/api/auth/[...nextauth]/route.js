import NextAuth from "next-auth/next";

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
                let user = null;
                const { email, password } = credentials;
                // throw new Error("Error on login");
                if (email === 'd23dcs157@charusat.edu.in' && password === '123456') {
                    user = {
                        token: '1331eadd6ca66097a015b5ec53c5dcd13feb6b86a040721e6b32787658efdb94',
                        role: 'admin'
                    }
                    return user
                }

                throw new Error("Invalid email and password");
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
        newUser: '/auth/signup'
    }
})


export { handler as GET, handler as POST }