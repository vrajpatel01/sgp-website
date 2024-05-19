import AuthProvider from "./authProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SGP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
