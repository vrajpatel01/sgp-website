import AuthProvider from "../components/authProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../components/queryProvider";

export const metadata = {
  title: "SGP",
};

export default function RootLayout({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <html lang="en">
          <body className="overflow-hidden h-screen w-screen">
            {children}
            <Toaster position="top-right" />
          </body>
        </html>
      </AuthProvider>
    </QueryProvider>
  );
}
