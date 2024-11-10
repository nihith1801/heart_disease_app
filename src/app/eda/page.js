"use client";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  BarChart,
  Bar,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Spinner } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppNavbar from "@/app/components/Navbar";
import NavigationArrows from "@/app/components/NavigationArrows";
const FeatureDescription = ({ title, description }) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
);

const EDA = () => {
  const [data, setData] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoricalData, setCategoricalData] = useState([]);
  const [numericalData, setNumericalData] = useState([]);
  const [numericalExpanded, setNumericalExpanded] = useState(true);
  const [categoricalExpanded, setCategoricalExpanded] = useState(true);

  const featureDescriptions = {
    Age: "Distribution of patient ages in the dataset. The trend shows age patterns across the sample population.",
    Sex: "Gender distribution of patients in the study. Helps identify any potential gender-specific patterns.",
    ChestPainType:
        "Types of chest pain reported by patients. Different categories indicate varying severity and characteristics.",
    RestingBP:
        "Resting blood pressure measurements. Shows the distribution of blood pressure readings at rest.",
    Cholesterol:
        "Cholesterol levels in the blood. Tracks the range and frequency of cholesterol measurements.",
    FastingBS:
        "Fasting blood sugar levels. Indicates the distribution of blood sugar readings after fasting.",
    RestingECG:
        "Resting electrocardiogram results. Shows the distribution of different ECG patterns.",
    MaxHR:
        "Maximum heart rate achieved. Displays the range and frequency of maximum heart rates.",
    ExerciseAngina:
        "Presence of exercise-induced angina. Shows the proportion of patients experiencing chest pain during exercise.",
    Oldpeak:
        "ST depression induced by exercise relative to rest. Higher values may indicate more severe heart issues.",
    ST_Slope:
        "Slope of the peak exercise ST segment. Different patterns can indicate various heart conditions.",
    HeartDisease:
        "Presence or absence of heart disease. Shows the distribution of positive and negative cases.",
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const spinnerStagesCount = 6;
        let progress = 0;

        setLoadingProgress((progress += 100 / spinnerStagesCount));
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await fetch("/heart.csv");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        setLoadingProgress((progress += 100 / spinnerStagesCount));
        await new Promise((resolve) => setTimeout(resolve, 500));

        const csvContent = await response.text();
        setLoadingProgress((progress += 100 / spinnerStagesCount));
        await new Promise((resolve) => setTimeout(resolve, 500));

        const rows = csvContent.split("\n").map((line) => line.split(","));
        const columns = [
          "Age",
          "Sex",
          "ChestPainType",
          "RestingBP",
          "Cholesterol",
          "FastingBS",
          "RestingECG",
          "MaxHR",
          "ExerciseAngina",
          "Oldpeak",
          "ST_Slope",
          "HeartDisease",
        ];
        setLoadingProgress((progress += 100 / spinnerStagesCount));
        await new Promise((resolve) => setTimeout(resolve, 500));

        const processedData = rows
            .slice(1)
            .map((row) => {
              const rowData = {};
              columns.forEach((col, idx) => {
                rowData[col] = row[idx]?.trim() || "N/A";
              });
              return rowData;
            })
            .filter((row) => Object.values(row).every((value) => value !== "N/A"));
        setLoadingProgress((progress += 100 / spinnerStagesCount));
        await new Promise((resolve) => setTimeout(resolve, 500));

        const catCols = [];
        const numCols = [];
        columns.forEach((col) => {
          const uniqueValues = new Set(processedData.map((row) => row[col]));
          if (uniqueValues.size <= 6) {
            catCols.push(col);
          } else {
            numCols.push(col);
          }
        });
        setLoadingProgress((progress += 100 / spinnerStagesCount));
        await new Promise((resolve) => setTimeout(resolve, 500));

        setData(processedData);
        setCategoricalData(catCols);
        setNumericalData(numCols);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load CSV data: ${err.message}`);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const spinnerStages = [
    { color: "default", label: "Starting Up..." },
    { color: "primary", label: "Fetching Data..." },
    { color: "secondary", label: "Reading Data..." },
    { color: "success", label: "Parsing CSV..." },
    { color: "warning", label: "Processing Data..." },
    { color: "danger", label: "Analyzing Data..." },
  ];

  if (loading) {
    const currentSpinnerIndex = Math.min(
        spinnerStages.length - 1,
        Math.floor((loadingProgress / 100) * spinnerStages.length)
    );

    const currentSpinner = spinnerStages[currentSpinnerIndex];

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-neutral-950">
          <Spinner size="lg" color={currentSpinner.color} />
          <span className="text-white mt-4">{currentSpinner.label}</span>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex h-screen items-center justify-center bg-neutral-950">
          <Card className="w-96 bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-red-500">Error Loading Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{error}</p>
            </CardContent>
          </Card>
        </div>
    );
  }

  const DataTable = () => {
    if (!data.length) return null;

    return (
        <Card className="w-full bg-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Data Preview</CardTitle>
            <CardDescription className="text-gray-300">
              First 10 rows of the dataset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                <tr>
                  {Object.keys(data[0]).map((col) => (
                      <th
                          key={col}
                          className="px-4 py-2 text-left text-sm font-semibold text-white"
                      >
                        {col}
                      </th>
                  ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                {data.slice(0, 10).map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((value, cellIdx) => (
                          <td
                              key={cellIdx}
                              className="px-4 py-2 text-sm text-gray-300"
                          >
                            {value}
                          </td>
                      ))}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
    );
  };

  const NumericalChart = ({ feature }) => {
    const chartData = data
        .slice(0, 100)
        .map((row, index) => ({
          index: index + 1,
          value: parseFloat(row[feature]),
        }))
        .filter((d) => !isNaN(d.value));

    const trend =
        chartData.length > 1
            ? (
                ((chartData[chartData.length - 1].value - chartData[0].value) /
                    chartData[0].value) *
                100
            ).toFixed(1)
            : 0;

    return (
        <div className="space-y-4">
          <FeatureDescription
              title={feature}
              description={featureDescriptions[feature]}
          />
          <Card className="border-none bg-transparent backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-white">{feature} Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                        dataKey="index"
                        tickFormatter={(value) => `#${value}`}
                        stroke="#9CA3AF"
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                        contentStyle={{
                          backgroundColor: "#111827",
                          border: "none",
                        }}
                        labelStyle={{ color: "#9CA3AF" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
              <span className="font-medium text-white">Trend: {trend}%</span>
              <TrendingUp className="h-4 w-4 text-white" />
            </CardFooter>
          </Card>
        </div>
    );
  };

  const CategoricalChart = ({ feature }) => {
    const counts = data.reduce((acc, row) => {
      const value = row[feature];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(counts)
        .map(([category, count]) => ({
          category,
          count,
        }))
        .sort((a, b) => b.count - a.count);

    return (
        <div className="space-y-4">
          <FeatureDescription
              title={feature}
              description={featureDescriptions[feature]}
          />
          <Card className="border-none bg-transparent backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                {feature} Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                        dataKey="category"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        stroke="#9CA3AF"
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                        contentStyle={{
                          backgroundColor: "#111827",
                          border: "none",
                        }}
                        labelStyle={{ color: "#9CA3AF" }}
                    />
                    <Bar
                        dataKey="count"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
    );
  };

  return (
      <>
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
             style={{ fontFamily: "NothingOS" }}></div>

        <AppNavbar />

        <main className="relative z-10 min-h-screen px-6 pt-24" style={{ fontFamily: "NothingOS" }}>
          <div className="mx-auto max-w-7xl space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white">
                Heart Disease Dataset Analysis
              </h1>
              <p className="max-w-3xl text-lg text-gray-300">
                An interactive visualization dashboard exploring various factors
                related to heart disease. This analysis includes both numerical
                and categorical features that may contribute to heart disease
                diagnosis.
              </p>
            </div>

            <DataTable />

            <section id="numerical" className="space-y-6">
              <h2
                  className="text-3xl font-semibold text-white cursor-pointer"
                  onClick={() => setNumericalExpanded(!numericalExpanded)}
              >
                Numerical Features
              </h2>
              {numericalExpanded && (
                  <div className="grid gap-8 md:grid-cols-2">
                    {numericalData.map((feature) => (
                        <NumericalChart key={feature} feature={feature} />
                    ))}
                  </div>
              )}
            </section>

            <section id="categorical" className="space-y-6">
              <h2
                  className="text-3xl font-semibold text-white cursor-pointer"
                  onClick={() => setCategoricalExpanded(!categoricalExpanded)}
              >
                Categorical Features
              </h2>
              {categoricalExpanded && (
                  <div className="grid gap-8 md:grid-cols-2">
                    {categoricalData.map((feature) => (
                        <CategoricalChart key={feature} feature={feature} />
                    ))}
                  </div>
              )}
            </section>
          </div>
        </main>
        {/* Navigation Arrows only appear at the end of the page */}
        <div className="mt-12 px-4 pb-6 flex justify-between items-center">
          <NavigationArrows
              prevPage="/"
              nextPage="/predictive"
              prevLabel="Home"
              nextLabel="Predictive"
          />
        </div>
      </>
  );
};

export default EDA;