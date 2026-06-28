"use client";

import * as React from "react";
import { useCurrency } from "@/lib/CurrencyContext";
import { Plus, Trash2, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";

export interface XirrCashFlow {
  id: string;
  date: string;
  amount: number;
  type: "invested" | "received" | "current_value";
}

interface XirrCalculatorFormProps {
  values: Record<string, any>;
  onBatchChange: (newValues: Record<string, any>) => void;
}

export function getDefaultXirrState() {
  const today = new Date();
  const flows: XirrCashFlow[] = [];
  
  // 12 monthly investments of $500 prior to today
  for (let i = 11; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, today.getDate());
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    flows.push({
      id: `flow_${11 - i}`,
      date: `${year}-${month}-${day}`,
      amount: 500,
      type: "invested",
    });
  }

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;
  const currentValue = 6600;

  return { xirrFlows: flows, currentDate, currentValue };
}

export function XirrCalculatorForm({ values, onBatchChange }: XirrCalculatorFormProps) {
  const { currencyDetails } = useCurrency();
  const symbol = currencyDetails.symbol;

  const flows: XirrCashFlow[] = React.useMemo(() => {
    if (Array.isArray(values.xirrFlows) && values.xirrFlows.length > 0) {
      return values.xirrFlows;
    }
    return getDefaultXirrState().xirrFlows;
  }, [values.xirrFlows]);

  const currentDate: string = values.currentDate || getDefaultXirrState().currentDate;
  const currentValue: number = values.currentValue !== undefined ? Number(values.currentValue) : getDefaultXirrState().currentValue;

  // Sync default state if empty on mount
  React.useEffect(() => {
    if (!values.xirrFlows || !values.currentDate || values.currentValue === undefined) {
      onBatchChange(getDefaultXirrState());
    }
  }, [values.xirrFlows, values.currentDate, values.currentValue, onBatchChange]);

  const updateFlows = (newFlows: XirrCashFlow[]) => {
    onBatchChange({ xirrFlows: newFlows });
  };

  const handleAddFlow = () => {
    if (flows.length >= 25) return;
    const lastDate = flows.length > 0 ? new Date(flows[flows.length - 1].date) : new Date();
    lastDate.setMonth(lastDate.getMonth() + 1);
    const year = lastDate.getFullYear();
    const month = String(lastDate.getMonth() + 1).padStart(2, "0");
    const day = String(lastDate.getDate()).padStart(2, "0");

    const newFlow: XirrCashFlow = {
      id: `flow_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      date: `${year}-${month}-${day}`,
      amount: 500,
      type: "invested",
    };
    updateFlows([...flows, newFlow]);
  };

  const handleRemoveFlow = (index: number) => {
    if (flows.length <= 1) return;
    const next = flows.filter((_, i) => i !== index);
    updateFlows(next);
  };

  const handleFlowChange = (index: number, field: keyof XirrCashFlow, val: any) => {
    const next = [...flows];
    next[index] = { ...next[index], [field]: val };
    updateFlows(next);
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Wallet className="h-4 w-4 text-emerald-500" />
          Transaction Cash Flows
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Enter each deposit or withdrawal along with its exact calendar date. XIRR calculates your true annualized return based on when money entered or left your portfolio.
        </p>
      </div>

      {/* Transaction Rows */}
      <div className="space-y-3">
        {flows.map((flow, idx) => (
          <div
            key={flow.id}
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 shadow-sm space-y-3 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-2.5">
              <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Transaction #{idx + 1}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleFlowChange(idx, "type", "invested")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    flow.type === "invested"
                      ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 shadow-sm"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <ArrowDownLeft className="h-3 w-3" />
                  Investment (money going in)
                </button>

                <button
                  type="button"
                  onClick={() => handleFlowChange(idx, "type", "received")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    flow.type === "received"
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shadow-sm"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <ArrowUpRight className="h-3 w-3" />
                  Withdrawal (money coming out)
                </button>

                <button
                  type="button"
                  onClick={() => handleFlowChange(idx, "type", "current_value")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    flow.type === "current_value"
                      ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 shadow-sm"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <Wallet className="h-3 w-3" />
                  Current Portfolio Value
                </button>
              </div>

              {flows.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFlow(idx)}
                  title="Remove row"
                  className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Transaction Date
                </label>
                <input
                  type="date"
                  value={flow.date}
                  onChange={(e) => handleFlowChange(idx, "date", e.target.value)}
                  className="w-full h-11 px-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-sm font-semibold text-zinc-400">{symbol}</span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={flow.amount || ""}
                    placeholder="0"
                    onChange={(e) => handleFlowChange(idx, "amount", Math.max(0, Number(e.target.value)))}
                    className="w-full h-11 pl-9 pr-4 text-right font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Cash Flow Button */}
      <button
        type="button"
        onClick={handleAddFlow}
        disabled={flows.length >= 25}
        className="w-full py-3 border-2 border-dashed border-emerald-500/30 hover:border-emerald-500 dark:border-emerald-500/20 dark:hover:border-emerald-400 rounded-xl text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-50/10 hover:bg-emerald-50/30 dark:bg-emerald-950/10"
      >
        <Plus className="h-4 w-4" />
        Add Cash Flow Row ({flows.length}/25)
      </button>

      {/* Dedicated Current Portfolio Value Row */}
      <div className="p-5 rounded-2xl border-2 border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-3">
        <div className="flex items-center justify-between gap-2 border-b border-emerald-500/15 dark:border-emerald-500/10 pb-2.5">
          <div>
            <h4 className="text-sm font-extrabold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              Current Portfolio Value (today&apos;s date)
            </h4>
            <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
              What the investment is worth today if liquidated (treated as final inflow)
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white font-extrabold text-[10px] tracking-wider uppercase">
            Final Entry
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-emerald-900/80 dark:text-emerald-300/80 mb-1">
              Valuation Date
            </label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => onBatchChange({ currentDate: e.target.value })}
              className="w-full h-11 px-3 bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-800/60 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-900/80 dark:text-emerald-300/80 mb-1">
              Current Market Value
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{symbol}</span>
              <input
                type="number"
                min="0"
                step="any"
                value={currentValue === 0 ? "" : currentValue}
                placeholder="0"
                onChange={(e) => onBatchChange({ currentValue: Math.max(0, Number(e.target.value)) })}
                className="w-full h-11 pl-9 pr-4 text-right font-extrabold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-800/60 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
