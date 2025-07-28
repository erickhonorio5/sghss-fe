'use client';

import { Control } from 'react-hook-form';
import { FormField, FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { LoginSchemaType } from "@/lib/schema/SignInSchema";

type Props = {
    control: Control<LoginSchemaType>;
};

const inputClassName = "w-full border-b border-stroke bg-transparent py-3 text-sm placeholder:text-gray-400 focus:border-black dark:border-strokedark dark:text-white dark:focus:border-white";

export const SignInFields = ({ control }: Props) => (
    <>
        <FormField
            control={control}
            name="emailOrUsername"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder="E-mail ou Nome de Usuário"
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