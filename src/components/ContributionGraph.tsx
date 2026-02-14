import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { getContributions } from "../api/github";

interface Props {
  username: string;
}

const ContributionGraph = ({ username }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await getContributions(username);

      if (!data?.contributions?.length) return;

      const contributions = data.contributions.map((d: any) => [
        d.date,
        d.count,
      ]);

      // 🔥 Last 365 days range
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 365);

      const chart = echarts.init(chartRef.current!);

      chart.setOption({
        tooltip: {
          backgroundColor: "#161b22",
          borderColor: "#30363d",
          textStyle: { color: "#c9d1d9" },
          formatter: (p: any) =>
            `${p.value[1]} contributions on ${p.value[0]}`,
        },

        visualMap: {
          min: 0,
          max: Math.max(...contributions.map((d: any) => d[1])),
          type: "piecewise",
          orient: "horizontal",
          left: "center",
          bottom: 0,
          itemWidth: 12,
          itemHeight: 12,
          inRange: {
            color: [
              "#161b22",   // 0
              "#0e4429",
              "#006d32",
              "#26a641",
              "#39d353",   // high
            ],
          },
        },

        calendar: {
          top: 40,
          left: 40,
          right: 20,
          cellSize: [12, 12],
          range: [
            start.toISOString().split("T")[0],
            end.toISOString().split("T")[0],
          ],
          orient: "horizontal",

          splitLine: {
            show: false,
          },

          dayLabel: {
            show: true,
            firstDay: 1,
            nameMap: ["Sun", "", "Tue", "", "Thu", "", "Sat"],
            color: "#8b949e",
            fontSize: 10,
          },

          monthLabel: {
            show: true,
            nameMap: "en",
            color: "#8b949e",
            fontSize: 10,
          },

          itemStyle: {
            borderWidth: 1,
            borderColor: "#0d1117",
          },
        },

        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            data: contributions,
          },
        ],
      });

      window.addEventListener("resize", () => chart.resize());
    };

    loadData();
  }, [username]);

  return (
    <div className="bg-githubCard border border-githubBorder rounded-lg p-4 mt-8">
      {/* <div className="text-sm text-githubMuted mb-4">
        Contribution Activity (Last 365 days)
      </div> */}
      <div ref={chartRef} className="w-full h-56" />
    </div>
  );
};

export default ContributionGraph;