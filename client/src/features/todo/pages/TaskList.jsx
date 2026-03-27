import Todo from "../components/Todo";
import RandomQuote from "../components/RandomQuote";
import ShinyText from "../../../shared/components/ShinyText";
import { PaperBackground } from "../../../assets/images";

function TaskList() {
  return (
    <div className="gradient-bg relative h-full overflow-y-auto rounded-xl border-2 border-white">
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
        <div className="rounded-xl border-2 border-white shadow-[inset_0px_0px_25px_0px_#ffffff] bg-white/40 backdrop-blur-lg">
          <RandomQuote />
        </div>
      </div>

      <Todo />
    </div>
  );
}

export default TaskList;
