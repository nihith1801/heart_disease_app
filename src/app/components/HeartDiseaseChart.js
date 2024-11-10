// components/HeartDiseaseChart.js

import { TrendingUp } from "lucide-react";
import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

export const HeartDiseaseChart = () => {
  const chartData = [
    { category: "heart disease", percentage: 32, fill: "#B700FFFF" },
  ];

  return (
      <div className="p-6">
        <div className="p-4 rounded-lg" style={{ backgroundColor: "transparent" }}>
          <h2 className="text-lg font-semibold text-center text-white">
            Heart Disease Stats
          </h2>
          <p className="text-center text-sm text-gray-300">2024</p>

          <div className="flex justify-center mt-4">
            <RadialBarChart
                width={250}
                height={250}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                barSize={15}
                data={chartData}
                startAngle={90}
                endAngle={90 + (360 * chartData[0].percentage) / 100}
                clockWise={true}
            >
              <PolarGrid gridType="circle" radialLines={false} stroke="none" />
              <RadialBar
                  minAngle={15}
                  background={{ fill: "#A9A9A900" }}
                  clockWise
                  dataKey="percentage"
                  cornerRadius={10}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
              />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <text
                  x={125}
                  y={125}
                  textAnchor="middle"
                  dominantBaseline="middle"
              >
                <tspan className="text-white text-4xl font-bold" fill="#ffffff">
                  {chartData[0].percentage}%
                </tspan>
              </text>
            </RadialBarChart>
          </div>

          <div className="text-center mt-4 text-sm text-white">
            Trending up by 5.2% this month{" "}
            <TrendingUp className="inline-block h-4 w-4 text-green-500" />
          </div>
          <p className="text-center text-gray-400 text-xs">
            Showing percentage of people suffering from heart disease worldwide
          </p>
        </div>
      </div>
  );
};
