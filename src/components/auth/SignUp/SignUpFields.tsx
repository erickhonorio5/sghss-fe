'use client';

import type { Control } from 'react-hook-form';
import { FormField, FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { SignUpSchema } from "@/lib/schema/signUpSchema";

type Props = {
    control: Control<SignUpSchema>;
};

const inputClassName = "w-full border-b border-stroke bg-transparent py-3 text-sm placeholder:text-gray-400 focus:border-black dark:border-strokedark dark:text-white dark:focus:border-white";

export const SignUpFields = ({ control }: Props) => (
    <>
        <FormField
            control={control}
            name="fullName"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder="Nome Completo"
                            {...field}
                            className={inputClassName}
                        />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
            )}
        />

        <FormField
            control={control}
            name="username"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder="Nome de Usuário"
                            {...field}
                            className={inputClassName}
                        />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
            )}
        />

        <FormField
            control={control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder="E-mail"
                            type="email"
                            {...field}
                            className={inputClassName}
                        />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
            )}
        />

        <FormField
            control={control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            type="password"
                            placeholder="Senha"
                            {...field}
                            className={inputClassName}
                        />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
            )}
        />
    </>
);