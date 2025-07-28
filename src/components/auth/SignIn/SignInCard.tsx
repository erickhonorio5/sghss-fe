'use client';

import { motion } from 'framer-motion';
import { SignInForm } from './SignInForm';
import { useSearchParams } from 'next/navigation';

export const SignInCard = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-white px-8 py-10 shadow-lg dark:border dark:border-strokedark dark:bg-black"
        >
            {/* Cabeçalho */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-black dark:text-white">
                    Acesse sua Conta
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Utilize seu e-mail ou nome de usuário para entrar
                </p>
            </div>

            {/* Mensagem de erro (se houver) */}
            {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {error === 'CredentialsSignin'
                        ? 'Credenciais inválidas'
                        : 'Ocorreu um erro ao fazer login'}
                </div>
            )}

            {/* Formulário */}
            <SignInForm />

            {/* Divisor opcional */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500 dark:bg-black dark:text-gray-400">
            Ou continue com
          </span>
                </div>
            </div>

            {/* Botões de autenticação social (opcional) */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        {/* Ícone do Google */}
                    </svg>
                    Google
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        {/* Ícone do GitHub */}
                    </svg>
                    GitHub
                </button>
            </div>
        </motion.div>
    );
};