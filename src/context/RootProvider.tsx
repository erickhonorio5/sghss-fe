import { ReactNode } from "react";
import { QueryProvider } from "@/context/QueryProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";

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
          toastOptions={{
            className: "dark:bg-gray-800 dark:text-white",
          }}
        />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
};
