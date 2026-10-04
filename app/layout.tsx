import type { Metadata } from "next";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import { Montserrat } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
// import Header from "../components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "RelaxMap",
  description: "App for finding new, beautiful places in Ukraine",
  openGraph: {
    title: "RelaxMap",
    description: "App for finding new, beautiful places in Ukraine",
    url: "",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "RelaxMap application",
      },
    ],
  },
};

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <TanStackProvider>
          <AuthProvider>
            <>
              {children}
              {modal}
            </>
            {/* <Footer /> */}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
