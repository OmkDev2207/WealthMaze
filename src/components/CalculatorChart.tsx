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

interface CalculatorChartProps {
  chartData: any[];
  calculatorId: string;
}

// Indian Rupees short formatter for axes
const formatShortCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
};

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);

export function CalculatorChart({ chartData, calculatorId }: CalculatorChartProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Small RAF delay so the DOM has finished layout before Recharts measures
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted || !chartData || chartData.length === 0) {
    return (
      <div
        className="w-full h-80 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl animate-pulse"
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
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
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
            <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (isBarChart) {
    return (
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
            <YAxis stroke="#a1a1aa" fontSize={11} tickFormatter={formatShortCurrency} />
            <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
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
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%" debounce={50}>
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
          <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
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
