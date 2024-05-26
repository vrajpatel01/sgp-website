"use client";
import { QueryClientProvider, QueryClient, QueryCache, MutationCache } from "@tanstack/react-query"
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    },
    queryCache: new QueryCache({
        onError: (error) => {
            const err = error.response
            if (err.status == 401) {
                toast.error('Session expired, please login again')
                signOut({
                    redirect: true,
                    callbackUrl: '/auth/login'
                })
            }
        }
    }),
    mutationCache: new MutationCache({
        onError: async (error) => {
            const err = error.response
            toast.error('Session expired, please login again')
            if (err.status == 401) {
                const status = await signOut({
                    redirect: true,
                    callbackUrl: '/auth/login'
                })
                console.log(status);
            }
        }
    })
})

export default function QueryProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}