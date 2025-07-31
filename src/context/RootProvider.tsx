// context/RootProvider.tsx
import { ReactNode } from "react";
import { QueryProvider } from "@/context/QueryProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

export const RootProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryProvider>
                <Toaster
                    position="top-right"
                    gutter={8}
                    toastOptions={{
                        className: '',
                        style: {
                            padding: 0,
                            margin: 0,
                            boxShadow: 'none',
                        },
                    }}
                />
                {children}
            </QueryProvider>
        </ThemeProvider>
    );
};