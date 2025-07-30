import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import {RootProvider} from "@/context/RootProvider";

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
            {children}
        </RootProvider>
        </body>
        </html>
    );
}