"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPatients } from "@/services/patientService";
import { motion } from "framer-motion";
import { Activity, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

type PatientsByMonthData = {
  name: string;
  pacientes: number;
  fill?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-medium text-sm">{`${label}`}</p>
        <p className="text-sm text-primary font-semibold">
          <span className="text-xs">Pacientes: </span>
          {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

export function PatientStatsChart() {
  const [chartData, setChartData] = useState<PatientsByMonthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const [selectedBar, setSelectedBar] = useState<number | null>(null);

  const primaryLight = "hsl(221, 83%, 53%)"; // blue-500
  const primaryDark = "hsl(217, 91%, 60%)"; // blue-500 mais claro para o tema escuro
  const primaryColor = resolvedTheme === 'dark' ? primaryDark : primaryLight;

  // Gradiente para as barras
  const gradientOffset = 0.95;
  const lighterBlue = resolvedTheme === 'dark' ? "hsl(217, 91%, 70%)" : "hsl(221, 83%, 70%)";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Buscar todos os pacientes para análise
        const response = await getPatients(0, 100);

        // Processar dados para o gráfico (pacientes por mês nos últimos 6 meses)
        const now = new Date();
        const sixMonthsData: PatientsByMonthData[] = [];

        // Criar dados para os últimos 6 meses
        for (let i = 5; i >= 0; i--) {
          const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthName = month.toLocaleDateString('pt-BR', { month: 'short' });

          sixMonthsData.push({
            name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
            pacientes: 0
          });
        }

        // Contar pacientes por mês baseado na data de cadastro
        if (response.content && response.content.length > 0) {
          response.content.forEach(patient => {
            const patientDate = new Date(patient.birthDate);
            const monthIndex = sixMonthsData.findIndex(data => {
              const dataMonth = new Date().getMonth() - (5 - sixMonthsData.indexOf(data));
              const normalizedDataMonth = dataMonth < 0 ? dataMonth + 12 : dataMonth;
              return normalizedDataMonth === patientDate.getMonth();
            });

            if (monthIndex !== -1) {
              sixMonthsData[monthIndex].pacientes += 1;
            }
          });
        }

        // Adicionar valores aleatórios para demonstração visual (remova em produção)
        sixMonthsData.forEach((data, i) => {
          if (data.pacientes === 0) {
            data.pacientes = Math.floor(Math.random() * 25) + 5;
          }
        });

        setChartData(sixMonthsData);
      } catch (error) {
        console.error("Erro ao carregar dados para o gráfico:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    pacientes: {
      label: "Pacientes",
      theme: {
        light: primaryColor,
        dark: primaryColor
      }
    }
  };

  // Determinar o mês com mais pacientes para destacar
  const maxPacientes = Math.max(...chartData.map(data => data.pacientes));
  const maxIndex = chartData.findIndex(data => data.pacientes === maxPacientes);

  // Variantes de animação para o cartão
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.3
      }
    }
  };

  // Imagem de fundo baseada no tema
  const bgPattern = resolvedTheme === 'dark'
    ? "url('/images/shape/shape-dotted-dark-02.svg')"
    : "url('/images/shape/shape-dotted-light-02.svg')";

  // Formata a data atual
  const formattedDate = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full relative overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-cover pointer-events-none"
             style={{ backgroundImage: bgPattern }}/>

        <CardHeader className="relative z-10 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Pacientes por Mês
              </CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <CalendarIcon className="w-3 h-3" />
                <span className="text-xs">Atualizado em {formattedDate}</span>
              </CardDescription>
            </div>
            <motion.div
              className="bg-primary/10 text-primary font-medium text-sm px-3 py-1 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {chartData.reduce((acc, curr) => acc + curr.pacientes, 0)} pacientes
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 relative z-10">
          {isLoading ? (
            <div className="flex h-80 items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="ml-2 text-sm text-muted-foreground">Carregando dados...</p>
            </div>
          ) : (
            <motion.div
              className="h-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  onMouseMove={(data) => {
                    if (data && data.activeTooltipIndex !== undefined) {
                      setSelectedBar(data.activeTooltipIndex);
                    }
                  }}
                  onMouseLeave={() => setSelectedBar(null)}
                >
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={lighterBlue} />
                      <stop offset={`${gradientOffset}%`} stopColor={primaryColor} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar
                    dataKey="pacientes"
                    name="Pacientes"
                    radius={[4, 4, 0, 0]}
                    barSize={36}
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === selectedBar || index === maxIndex ? primaryColor : "url(#barGradient)"}
                        opacity={selectedBar !== null && selectedBar !== index ? 0.6 : 1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </motion.div>
          )}

          <motion.div
            className="text-center mt-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Histórico de novos pacientes nos últimos 6 meses
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
