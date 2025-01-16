import React from "react";
import "../App.css";

function ProgressBar({ label, currentValue, maxValue }) {
  const percentage = ((currentValue / maxValue) * 100).toFixed(1);

  return (
    <div className=" flex justify-center items-center ">
      <label htmlFor="progress-bar" className="font-bold w-[10%]">
        {label}
      </label>

      <div className="w-[90%] px-[2rem]">
        <div
          className="inline-block mb-2 py-0.5 px-1.5 bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 rounded-lg transition-all duration-500 shadow-sm"
          style={{ marginInlineStart: `calc(${percentage}% - 1.25rem)` }} 
        >
          {percentage == "NaN" ? 0 : percentage}%
        </div>
        <div
          className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden transition-all duration-500"
          role="progressbar"
          aria-valuenow={percentage === "NaN" ? 0 : percentage}
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
