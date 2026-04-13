import Todo from "../components/Todo";
import RandomQuote from "../components/RandomQuote";
import ShinyText from "../../../shared/components/ShinyText";
import { PaperBackground } from "../../../assets/images";

function TaskList() {
  return (
    <div className="gradient-bg mask-bg relative h-full overflow-y-auto rounded-xl border-2 border-white">
      <div className="px-4">
        <div className="my-20 sm:my-10">
          <div className="w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
            <ShinyText
              text="✔️ | Task List"
              disabled={false}
              speed={3}
              className=""
            />
          </div>
        </div>

        {/* work here on quote background... */}
        <div className="relative z-0 overflow-hidden rounded-xl border-2 border-white bg-white/40 shadow-[0px_0px_25px_0px_#ffffff]">
          <div className="relative z-10 overflow-hidden rounded-xl bg-white/40 backdrop-blur-xl">
            <RandomQuote />
          </div>

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl">
            <svg
              viewBox="0 0 1200 300"
              xmlns="http://www.w3.org/2000/svg"
              className="block h-full w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="w1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ddd6fe" stopOpacity="0.4" />
                </linearGradient>

                <linearGradient id="w2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
                </linearGradient>

                <linearGradient id="w3" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
                </linearGradient>

                <linearGradient id="w4" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              <path
                d="
    M0,0
    C100,40 200,140 300,80
    C400,30 500,130 600,70
    C700,40 800,120 900,60
    C1000,30 1100,100 1200,50
    L1200,300 L0,300 Z"
                fill="url(#w1)"
              />

              <path
                d="
    M0,0
    C100,80 200,180 300,120
    C400,70 500,170 600,110
    C700,80 800,160 900,100
    C1000,70 1100,140 1200,90
    L1200,300 L0,300 Z"
                fill="url(#w2)"
              />

              <path
                d="
    M0,0
    C100,120 200,220 300,160
    C400,110 500,210 600,150
    C700,120 800,200 900,140
    C1000,110 1100,180 1200,130
    L1200,300 L0,300 Z"
                fill="url(#w3)"
              />

              <path
                d="
    M0,0
    C100,160 200,260 300,200
    C400,150 500,250 600,190
    C700,160 800,240 900,180
    C1000,150 1100,220 1200,170
    L1200,300 L0,300 Z"
                fill="url(#w4)"
              />
            </svg>
          </div>
        </div>
      </div>

      <Todo />
    </div>
  );
}

export default TaskList;
