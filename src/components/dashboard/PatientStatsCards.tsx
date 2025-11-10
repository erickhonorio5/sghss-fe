"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPatients } from "@/services/patientService";
import { PatientResponseDTO } from "@/types/patient";
import { Users, UserPlus, UserCheck, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function PatientStatsCards() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [activePatients, setActivePatients] = useState(0);
  const [inactivePatients, setInactivePatients] = useState(0);
  const [newPatients, setNewPatients] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getPatients(0, 100);

        if (response.content && response.content.length > 0) {
          setTotalPatients(response.totalElements);

          const activePatientsCount = response.content.filter(
            (patient: PatientResponseDTO) => patient.active
          ).length;
          setActivePatients(activePatientsCount);

          setInactivePatients(response.totalElements - activePatientsCount);

          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          const newPatientsCount = response.content.filter((patient: PatientResponseDTO) => {
            const registrationDate = new Date(patient.birthDate);
            return registrationDate >= thirtyDaysAgo;
          }).length;

          setNewPatients(newPatientsCount);
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas de pacientes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total de Pacientes",
      value: totalPatients,
      icon: Users,
      description: "Total de pacientes cadastrados",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      borderColor: "border-blue-300 dark:border-blue-800",
      gradientFrom: "from-blue-50 dark:from-blue-900/10",
      gradientTo: "to-white dark:to-transparent"
    },
    {
      title: "Pacientes Ativos",
      value: activePatients,
      icon: UserCheck,
      description: "Pacientes com status ativo",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
      borderColor: "border-emerald-300 dark:border-emerald-800",
      gradientFrom: "from-emerald-50 dark:from-emerald-900/10",
      gradientTo: "to-white dark:to-transparent"
    },
    {
      title: "Pacientes Inativos",
      value: inactivePatients,
      icon: UserX,
      description: "Pacientes com status inativo",
      color: "text-rose-500",
      bgColor: "bg-rose-100 dark:bg-rose-900/20",
      borderColor: "border-rose-300 dark:border-rose-800",
      gradientFrom: "from-rose-50 dark:from-rose-900/10",
      gradientTo: "to-white dark:to-transparent"
    },
    {
      title: "Novos Pacientes",
      value: newPatients,
      icon: UserPlus,
      description: "Últimos 30 dias",
      color: "text-violet-500",
      bgColor: "bg-violet-100 dark:bg-violet-900/20",
      borderColor: "border-violet-300 dark:border-violet-800",
      gradientFrom: "from-violet-50 dark:from-violet-900/10",
      gradientTo: "to-white dark:to-transparent"
    }
  ];

  // Variantes de animação para os cartões
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const Counter = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isLoading) return;

      let start = 0;
      const end = value;
      const duration = 1500;
      const step = Math.max(1, Math.floor(end / (duration / 16)));

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value, isLoading]);

    return isLoading ? "..." : count.toLocaleString();
  };

  const bgPattern = resolvedTheme === 'dark'
    ? "url('/images/shape/shape-dotted-dark.svg')"
    : "url('/images/shape/shape-dotted-light.svg')";

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div key={index} variants={item} className="h-full">
            <Card className={`overflow-hidden border ${stat.borderColor} h-full relative`}>
              <div className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-cover pointer-events-none"
                   style={{ backgroundImage: bgPattern }}/>
              <div className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t ${stat.gradientFrom} ${stat.gradientTo}`} />

              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 z-10">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>

              <CardContent className="z-10">
                <motion.div
                  className="text-3xl font-bold"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    delay: 0.2 + index * 0.1,
                    duration: 0.6
                  }}
                >
                  <Counter value={stat.value} />
                </motion.div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  );
}
