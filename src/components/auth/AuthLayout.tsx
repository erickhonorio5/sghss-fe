'use client';

import { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => (
    <>
        <Toaster position="top-right" />
        <section className="pb-12 pt-32 lg:pb-24 lg:pt-44 xl:pb-28 xl:pt-48">
            <div className="relative z-10 mx-auto max-w-screen-md px-6 pb-8 pt-10 lg:px-12 xl:px-20">
                {/* Fundo decorativo */}
                <div className="absolute left-0 top-0 -z-10 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:to-[#252A42]" />
                <div className="absolute bottom-20 left-0 -z-10 h-1/3 w-full">
                    <Image
                        src="/images/shape/shape-dotted-light.svg"
                        alt="Shape Light"
                        fill
                        className="dark:hidden"
                    />
                    <Image
                        src="/images/shape/shape-dotted-dark.svg"
                        alt="Shape Dark"
                        fill
                        className="hidden dark:block"
                    />
                </div>
                {children}
            </div>
        </section>
    </>
);