// tailwind.config.js
import { type Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [forms],
};

export default config;