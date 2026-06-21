/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { useCurrency } from "@/lib/CurrencyContext";

interface CalculatorChartProps {
  chartData: any[];
  calculatorId: string;
  isIndiaSpecific?: boolean;
}

export function CalculatorChart({ chartData, calculatorId, isIndiaSpecific = false }: CalculatorChartProps) {
  const [mounted, setMounted] = React.useState(false);
  const { currencyDetails, formatCurrency: globalFormatCurrency } = useCurrency();

  React.useEffect(() => {
    // A small timeout delay ensures the browser has completed layout calculations
    // for grid/flex containers before Recharts measures their dimensions.
    const timer = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Format currency values for axis ticks (compact notation)
  const formatShortCurrency = React.useCallback((val: number) => {
    if (isIndiaSpecific || currencyDetails.code === "INR") {
      const abs = Math.abs(val);
      const sign = val < 0 ? "-" : "";
      if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(1)}Cr`;
      if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(1)}L`;
      if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(0)}k`;
      return `${sign}₹${abs}`;
    }
    return globalFormatCurrency(val, true);
  }, [isIndiaSpecific, currencyDetails, globalFormatCurrency]);

  // Format currency values for tooltips (full precision notation)
  const formatFullCurrency = React.useCallback((val: number) => {
    if (isIndiaSpecific) {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(val);
    }
    return globalFormatCurrency(val, false);
  }, [isIndiaSpecific, globalFormatCurrency]);

  if (!mounted || !chartData || chartData.length === 0) {
    return (
      <div
        className="w-full h-80 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl animate-pulse"
      >
        <span className="text-sm text-zinc-400">
          {!mounted ? "Loading Chart..." : "No chart data available."}
        </span>
      </div>
    );
  }

  const isPieChart =
    calculatorId === "net-worth-calculator" || calculatorId === "emi-calculator";
  const isBarChart = calculatorId === "income-tax-calculator";

  const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6"];

  if (isPieChart) {
    return (
      <div className="w-full h-80 min-w-0 min-h-0">
        <ResponsiveContainer width="100%" height={320} minWidth={0} debounce={50}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="Value"
            >
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => formatFullCurrency(Number(value))} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (isBarChart) {
    return (
      <div className="w-full h-80 min-w-0 min-h-0">
        <ResponsiveContainer width="100%" height={320} minWidth={0} debounce={50}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
            <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={formatShortCurrency} />
            <Tooltip formatter={(value: any) => formatFullCurrency(Number(value))} />
            <Bar dataKey="Tax" radius={[8, 8, 0, 0]}>
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#10b981" : "#6366f1"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Default: Area chart for growth over time
  const keys =
    chartData.length > 0
      ? Object.keys(chartData[0]).filter((k) => k !== "name" && k !== "Target")
      : [];

  return (
    <div className="w-full h-80 min-w-0 min-h-0">
      <ResponsiveContainer width="100%" height={320} minWidth={0} debounce={50}>
        <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} />
          <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={formatShortCurrency} />
          <Tooltip formatter={(value: any) => formatFullCurrency(Number(value))} />
          <Legend verticalAlign="top" height={36} />
          {keys.map((key, idx) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={idx === 0 ? "#6366f1" : "#10b981"}
              fillOpacity={1}
              fill={`url(#color${idx + 1})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
