'use client';

import { useSignInForm } from '@/hooks/auth/useSignInForm';
import { useSignInMutation } from '@/hooks/auth/useSignInMutation';
import { SignInFields } from './SignInFields';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FormProvider } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { LoginSchemaType } from "@/lib/schema/SignInSchema";
import { toast } from 'react-hot-toast';

export const SignInForm = () => {
    const formMethods = useSignInForm();
    const { mutate, isPending } = useSignInMutation();
    const router = useRouter();

    const onSubmit = (data: LoginSchemaType) => {
        mutate(data, {
            onSuccess: () => {
                toast.success('Login realizado com sucesso!');
                router.push('/dashboard');
            },
            onError: (error) => {
                toast.error(error.message || 'Erro ao fazer login');
            }
        });
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
                <SignInFields control={formMethods.control} />

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
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

                    <Link
                        href="/auth/forgot-password"
                        className="text-sm text-primary hover:underline dark:text-primary-400"
                    >
                        Esqueceu a senha?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full rounded-full bg-black py-3 text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                    disabled={isPending}
                >
                    {isPending ? 'Entrando...' : 'Entrar'}
                </Button>

                <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    Não possui uma conta?{' '}
                    <Link
                        href="/auth/signup"
                        className="font-medium text-primary hover:underline dark:text-primary-400"
                    >
                        Criar conta
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
};