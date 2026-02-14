import { useEffect, useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
import { getContributions } from "../api/github";

interface Props {
  username: string;
}

const GithubContributionGrid = ({ username }: Props) => {
  const [yearData, setYearData] = useState<Record<number, any[]>>({});
//   const [selectedYear, setSelectedYear] = useState<number>(
//     new Date().getFullYear()
//   );

  const [allContributions, setAllContributions] = useState<any[]>([]);
    const [totals, setTotals] = useState<Record<string, number>>({});
    const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
    );

//   useEffect(() => {
//     const load = async () => {
//       const data = await getContributions(username);
//       if (!data?.contributions) return;

//       const grouped: Record<number, any[]> = {};

//       data.contributions.forEach((day: any) => {
//         // const year = new Date(day.date).getFullYear();
//         // if (!grouped[year]) grouped[year] = [];
//         // grouped[year].push(day);
//         if (!day.date) return;

//         const parsed = new Date(day.date);
//         const year = parsed.getFullYear();

//         if (isNaN(year)) return;   // 🔥 Prevent NaN

//         if (!grouped[year]) grouped[year] = [];
//         grouped[year].push(day);
//       });

//       setYearData(grouped);

//       // default to current year if exists
//       if (!grouped[selectedYear]) {
//         const years = Object.keys(grouped).map(Number);
//         setSelectedYear(Math.max(...years));
//       }
//     };

//     load();
//   }, [username]);

    useEffect(() => {
    const load = async () => {
        const data = await getContributions(username);
        if (!data) return;

        setAllContributions(data.contributions || []);
        setTotals(data.total || {});
        if (data.total) {
        const availableYears = Object.keys(data.total).map(Number);
        const current = new Date().getFullYear();

        if (!availableYears.includes(current)) {
            setSelectedYear(Math.max(...availableYears));
        }
        }
        
    };

    load();
    }, [username]);
    const filtered = allContributions.filter((d) =>
    d.date.startsWith(String(selectedYear))
    );
  const currentYearData = yearData[selectedYear] || [];

  const contributionMap: Record<string, number> = {};
    filtered.forEach((d) => {
    contributionMap[d.date] = d.count;
    });
  const total = totals[selectedYear] || 0;

//   currentYearData.forEach((d: any) => {
//     contributionMap[d.date] = d.count;
//     total += d.count;
//   });
// currentYearData.forEach((d: any) => {
//   const formatted = d.date.split("T")[0]; // 🔥 normalize
//   contributionMap[formatted] = d.count;
//   total += d.count;
// });

  // Generate Jan 1 → Dec 31 for selected year
  const start = new Date(selectedYear, 0, 1);
  const end = new Date(selectedYear, 11, 31);

  const days = eachDayOfInterval({ start, end });

  // Build weeks
  const weeks: Date[][] = [];
  let week: Date[] = [];

  days.forEach((day) => {
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  });

  if (week.length) {
    while (week.length < 7) week.push(new Date(0));
    weeks.push(week);
  }

  const getColor = (count: number) => {
    if (count === 0) return "bg-[#161b22]";
    if (count <= 2) return "bg-[#0e4429]";
    if (count <= 5) return "bg-[#006d32]";
    if (count <= 10) return "bg-[#26a641]";
    return "bg-[#39d353]";
  };

//   const currentYear = new Date().getFullYear();

//     const years = Object.keys(yearData)
//     .map((y) => Number(y))
//     .filter(
//         (y) =>
//         !isNaN(y) &&
//         y >= 2016 &&
//         y <= currentYear
//     )
//     .sort((a, b) => b - a);

const currentYear = new Date().getFullYear();

// const years = Array.from(
//   { length: currentYear - 2015 },
//   (_, i) => currentYear - i
// );

const years = Object.keys(totals || {})
  .map(Number)
  .filter((y) => !isNaN(y))
  .sort((a, b) => b - a);

  return (
    <div className="flex gap-8 mt-8">
      {/* LEFT MAIN CARD */}
      <div className="flex-1 bg-githubCard border border-githubBorder rounded-lg p-6">
        <div className="text-sm font-semibold mb-4">
          {total} contributions in {selectedYear}
        </div>

        <div className="flex">
          {/* Weekday labels */}
          <div className="flex flex-col justify-between text-xs text-githubMuted mr-2">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((day, j) => {
                  if (day.getTime() === 0)
                    return (
                      <div
                        key={j}
                        className="w-[12px] h-[12px]"
                      ></div>
                    );

                  const dateStr = format(day, "yyyy-MM-dd");
                  const count = contributionMap[dateStr] || 0;
                  console.log("Selected Year:", selectedYear);
                    console.log("Contribution Map Sample:", Object.keys(contributionMap).slice(0,5));

                  return (
                    <div
                      key={j}
                      title={`${count} contributions on ${dateStr}`}
                      className={`w-[12px] h-[12px] rounded-sm ${getColor(
                        count
                      )}`}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-end items-center mt-4 text-xs text-githubMuted gap-2">
          <span>Less</span>
          <div className="w-3 h-3 bg-[#161b22] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#0e4429] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#006d32] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#26a641] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#39d353] rounded-sm"></div>
          <span>More</span>
        </div>
      </div>

      {/* RIGHT YEAR SELECTOR */}
      <div className="w-24 flex flex-col gap-3">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`py-2 rounded-md text-sm ${
              selectedYear === year
                ? "bg-blue-600 text-white"
                : "text-githubMuted hover:bg-githubCard"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GithubContributionGrid;