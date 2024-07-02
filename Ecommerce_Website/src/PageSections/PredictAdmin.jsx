import TransactionChartAdmin from "../Components/admin/TransactionChartAdmin";

import React from "react";

export default function PredictAdmin() {
  return (
    <div className="h-screen bg-white rounded">
      <h1 class="mb-4 p-4 text-2xl font-extrabold border-b border-slate-400 text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Predict apartment sales
        </span>{" "}
        using AI.
      </h1>

      <TransactionChartAdmin />
    </div>
  );
}
