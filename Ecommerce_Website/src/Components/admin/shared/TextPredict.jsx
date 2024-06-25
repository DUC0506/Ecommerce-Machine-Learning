import { getAnalysisPredict } from "../../../api/predict";
import React, { useEffect, useState } from "react";

export default function TextPredict({ startDate, endDate, dataPredict }) {
  const [text, setText] = useState();
  const fetchAnalysis = async () => {
    if (startDate && endDate && dataPredict) {
      const data = {
        startDate,
        endDate,
        dataPredict,
      };
      setText();
      const { type, queryAnalysis } = await getAnalysisPredict(data);
      if (type === "Success") {
        setText(queryAnalysis);
      }
    }
  };
  useEffect(() => {
    fetchAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, dataPredict]);
  return (
    <div className="bg-white rounded p-8 mt-2">
      {text ? (
        <div>
          <h4 class="mb-4 text-2xl font-extrabold leading-none tracking-tight border-b border-yellow-400 pb-6 text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Product{" "}
            <mark class="px-2 text-white bg-yellow-400 rounded ">analysis</mark>{" "}
            and advice for you
          </h4>
          <p class="mb-3 rounded-lg p-4  whitespace-pre-line font-sans bg-gradient-to-tr from-[#facc15] to-[#5FC3E4] shadow-md ">
            {text}
          </p>
        </div>
      ) : (
        <div role="status" class="max-w-sm animate-pulse w-full">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}
