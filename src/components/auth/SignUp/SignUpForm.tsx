'use client';

import { useSignUpForm } from '@/hooks/auth/useSignUpForm';
import { useSignUpMutation } from '@/hooks/auth/useSignUpMutation';
import { SignUpFields } from './SignUpFields';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {FormProvider} from "react-hook-form";
import {SignUpSchema} from "@/lib/schema/signUpSchema";
import { useRouter } from 'next/navigation';

export const SignUpForm = () => {
    const formMethods = useSignUpForm();
    const { mutate, isPending } = useSignUpMutation();
    const router = useRouter();

    const onSubmit = (data: SignUpSchema) => {
        mutate(data, {
            onSuccess: () => {
                router.push('/');
            }
        });
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
                <SignUpFields control={formMethods.control} />

                {/* Checkbox controlado */}
                <div className="flex items-center space-x-2 pt-2">
                    <input
                        type="checkbox"
                        id="remember"
                        {...formMethods.register('rememberMe')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                        Manter conectado
                    </label>
                </div>

                <Button
                    type="submit"
                    className="w-full rounded-full bg-black py-3 text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                    disabled={isPending}
                >
                    {isPending ? 'Cadastrando...' : 'Criar Conta'}
                </Button>

                <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    Já possui uma conta?{' '}
                    <Link href="/auth/signin" className="font-medium text-black hover:underline dark:text-white">
                        Entrar
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
};