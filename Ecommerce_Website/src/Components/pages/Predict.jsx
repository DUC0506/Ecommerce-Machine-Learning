import React from "react";
import TransactionChartSeller from "../admin/TransactionChartSeller";

export default function Predict() {
  return (
    <div className="h-screen bg-white rounded">
      <h1 class="mb-4 p-4 text-2xl font-extrabold border-b border-slate-400 text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Predict product sales
        </span>{" "}
        using AI.
      </h1>

      <TransactionChartSeller />
    </div>
  );
}
