import "./globals.css";
import { RootProvider } from "@/context/RootProvider";
import { Inter } from "next/font/google";
import {Metadata} from "next";
import {Header} from "@/components/header/Header";
import Lines from "@/components/lines/Lines";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SGHSS',
    description: 'Gestão Hospitalar',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
        <body className={`dark:bg-black ${inter.className}`}>
        <RootProvider>
            <Lines />
            <Header />
                {children}
            <ScrollToTop />
        </RootProvider>
        </body>
        </html>
    );
}
