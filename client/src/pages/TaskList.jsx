import React from "react";
import Todo from "../components/Todo";
import RandomQuote from "../components/RandomQuote";
import { Fade } from "react-awesome-reveal";
import ShinyText from "../components/ShinyText";


function TaskList() {
  return (
    <div className="  p-2">
      <div className=" my-4">
        <div className="mb-4">
          <div className="w-fit bg-gray-2100 px-5 py-1 rounded-full border border-gray-400 text-sm">
            <ShinyText
              text="✔️ | Task List"
              disabled={false}
              speed={3}
              className=""
            />
          </div>
        </div>
        <span>{<RandomQuote />}</span>
      </div>

      <Todo />
    </div>
  );
}

export default TaskList;
