'use client'

import { PatientStatsCards } from "@/components/dashboard/PatientStatsCards";
import { PatientStatsChart } from "@/components/dashboard/PatientStatsChart";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { LineChart, ActivitySquare, UserRound, Settings } from "lucide-react";

export default function Dashboard() {
    const { resolvedTheme } = useTheme();

    const bgPattern = resolvedTheme === 'dark'
        ? "url('/images/shape/shape-03.svg')"
        : "url('/images/shape/shape-02.svg')";

    // Animação para o título
    const titleAnimation = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative overflow-hidden">
            {/* Fundo decorativo */}
            <div className="absolute top-0 right-0 w-1/3 h-64 opacity-5 bg-no-repeat bg-right-top pointer-events-none z-0"
                 style={{ backgroundImage: bgPattern }}/>

            <div className="container relative z-10 space-y-8 p-8 pt-6">
                {/* Cabeçalho do Dashboard */}
                <motion.div
                    className="flex items-center justify-between"
                    initial="hidden"
                    animate="visible"
                    variants={titleAnimation}
                >
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <ActivitySquare className="h-8 w-8 text-primary" />
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Acompanhe as estatísticas e dados dos pacientes em um só lugar
                        </p>
                    </div>

                    <motion.div
                        className="hidden md:flex items-center gap-2 bg-secondary/80 backdrop-blur-sm p-2 px-4 rounded-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    >
                        <UserRound className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Área Médica</span>
                    </motion.div>
                </motion.div>

                <div className="space-y-8">
                    {/* Cards de estatísticas */}
                    <PatientStatsCards />

                    {/* Seção de Gráficos */}
                    <div className="grid gap-8 md:grid-cols-2">
                        <PatientStatsChart />

                        {/* Cartão de informações adicionais */}
                        <motion.div
                            className="grid gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <div className="bg-card rounded-lg border border-border p-6 h-full relative overflow-hidden">
                                {/* Fundo decorativo */}
                                <div className="absolute inset-0 opacity-5 bg-no-repeat bg-right pointer-events-none"
                                     style={{ backgroundImage: "url('/images/shape/shape-01.png')" }}/>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <LineChart className="h-5 w-5 text-primary" />
                                        <h2 className="text-xl font-semibold">Visão Geral do Sistema</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-muted-foreground">
                                            Este dashboard fornece uma visão geral dos pacientes cadastrados no sistema.
                                            Os gráficos são atualizados automaticamente com base nos dados mais recentes.
                                        </p>

                                        <div className="space-y-3">
                                            <h3 className="font-medium">Recursos Disponíveis:</h3>
                                            {[
                                                "Visualização de pacientes ativos e inativos",
                                                "Análise de tendências mensais de cadastros",
                                                "Acompanhamento de novos pacientes",
                                                "Estatísticas gerais da base de pacientes"
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-center gap-2"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.6 + (index * 0.1) }}
                                                >
                                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                                    <p className="text-sm">{item}</p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.div
                                            className="flex items-center justify-between bg-primary/10 p-3 rounded-lg"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 1.1 }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Settings className="h-4 w-4 text-primary" />
                                                <span className="text-sm font-medium">Configurações do Sistema</span>
                                            </div>
                                            <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                                Atualizado
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}