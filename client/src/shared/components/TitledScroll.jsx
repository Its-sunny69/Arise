const TiltedScroll = () => {
    const items = [
      { id: "1", text: "Complete Math Assignment" },
      { id: "2", text: "Prepare for Science Quiz" },
      { id: "3", text: "Organize Study Materials" },
      { id: "4", text: "Join Study Group Session" },
      { id: "5", text: "Work on Project" },
      { id: "6", text: "Practice Presentation" },
      { id: "7", text: "Revise Class Notes" },
      { id: "8", text: "Exercise for 30 Minutes" },
    ];
  
    return (
      <div className="flex items-center justify-center">
        <div className="relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_5rem),linear-gradient(to_left,transparent,black_5rem),linear-gradient(to_bottom,transparent,black_5rem),linear-gradient(to_top,transparent,black_5rem)]">
          <div className="grid h-[250px] w-[300px] gap-5 animate-skew-scroll grid-cols-1 sm:w-[300px] sm:grid-cols-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 cursor-pointer rounded-md border border-gray-800 p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 mr-2"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <p className="text-black">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default TiltedScroll;
  