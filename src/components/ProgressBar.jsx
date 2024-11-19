import React from "react";
import "../css/progressbar.css";

function ProgressBar({ label, currentValue, maxValue }) {
  return (
    <div>
      <label htmlFor="progress-bar">{label} : </label>
      <progress id="progress-bar" value={currentValue} max={maxValue}>
        {currentValue}%
      </progress>
    </div>
  );
}

export default ProgressBar;
