'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, LoginSchemaType } from "@/lib/schema/SignInSchema";

export const useSignInForm = () => {
    return useForm<LoginSchemaType>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            emailOrUsername: "",
            password: "",
            rememberMe: false
        }
    });
};