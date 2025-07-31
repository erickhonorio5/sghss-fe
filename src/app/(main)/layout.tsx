import "../globals.css";
import { Metadata } from "next";
import { Header } from "@/components/header/Header";
import Lines from "@/components/lines/Lines";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "SGHSS",
  description: "Gestão Hospitalar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Lines />
      <Header />
      {children}
      <ScrollToTop />
    </>
  );
}
