'use client';

import { motion } from 'framer-motion';
import { SignUpForm } from './SignUpForm';

export const SignUpCard = () => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="rounded-xl bg-white px-8 py-10 shadow-lg dark:border dark:border-strokedark dark:bg-black"
    >
        <h2 className="mb-10 text-center text-3xl font-bold text-black dark:text-white">
            Criar uma Conta
        </h2>
        <SignUpForm />
    </motion.div>
);