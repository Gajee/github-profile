import { useState } from "react";

const Tabs = () => {
  const [active, setActive] = useState("Overview");

  const tabs = ["Overview", "Repositories", "Projects", "Packages", "Stars"];

  return (
    <div className="border-b border-[#30363d]">
      <div className="flex gap-6 text-sm">
        {tabs.map((tab) => {
          const isActive = active === tab;

          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative py-3 ${
                isActive
                    ? "text-red-500 font-semibold"
                    : "text-[#8b949e]"
              }`}
            >
              {tab}

              {isActive && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#f78166]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;