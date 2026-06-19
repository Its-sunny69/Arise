import "../../App.css";
import PropTypes from "prop-types";

function ProgressBar({ label, currentValue, maxValue }) {
  let percentage = ((currentValue / maxValue) * 100).toFixed(1);
  percentage = percentage == "NaN" ? 0 : percentage;

  return (
    <div className="flex items-stretch justify-between">
      <div className="w-[10%]">
        <label htmlFor="progress-bar" className="font-bold">
          {label}
        </label>
      </div>

      <div className="ml-[4rem] mr-[1.5rem] w-[90%]">
        <div
          className="mb-2 inline-block rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-medium text-slate-600 shadow-sm transition-all duration-500"
          style={{ marginInlineStart: `calc(${percentage}% - 1.25rem)` }}
        >
          {percentage}%
        </div>
        <div
          className="flex h-2 w-full overflow-hidden rounded-full bg-white transition-all duration-500"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="flex flex-col justify-center overflow-hidden whitespace-nowrap rounded-full bg-black text-center text-xs text-white transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;

ProgressBar.propTypes = {
  label: PropTypes.string,
  currentValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  label: "",
};
