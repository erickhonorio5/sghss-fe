"use client";

import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "@/lib/schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignUpForm = () => {
  return useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
  });
};
