import React from "react";
import "../App.css";

function ProgressBar({ label, currentValue, maxValue }) {

  let percentage = ((currentValue / maxValue) * 100).toFixed(1);
  percentage = percentage == "NaN" ? 0 : percentage

  return (
    <div className=" flex justify-between items-stretch ">
      <div className="w-[10%]">
      <label htmlFor="progress-bar" className="font-bold ">
        {label}
      </label></div>

      <div className="w-[90%] ml-[4rem] mr-[1.5rem]">
        <div
          className="inline-block mb-2 py-0.5 px-1.5 bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 rounded-lg transition-all duration-500 shadow-sm"
          style={{ marginInlineStart: `calc(${percentage}% - 1.25rem)` }} 
        >
          {percentage}%
        </div>
        <div
          className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden transition-all duration-500"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="flex flex-col justify-center rounded-full overflow-hidden bg-black text-xs text-white text-center whitespace-nowrap transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
