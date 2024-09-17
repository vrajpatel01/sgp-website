import AuthProvider from "../components/authProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../components/queryProvider";
import 'react-loading-skeleton/dist/skeleton.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProgressBarProvider from "@/components/progressBarProvider";
import NetworkProvider from "@/components/networkProvider";

export const metadata = {
  title: "SGP",
};

export default function RootLayout({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <html lang="en">
          <body className="overflow-hidden h-screen w-screen">
            <NetworkProvider>
              <ProgressBarProvider>
                {children}
                <Toaster position="top-right" />
                <ReactQueryDevtools initialIsOpen={false} />
              </ProgressBarProvider>
            </NetworkProvider>
          </body>
        </html>
      </AuthProvider>
    </QueryProvider >
  );
}
