// /pages/predictive.js

"use client";
import React, { useState, useEffect } from 'react';
import {
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { Check, ChevronsUpDown, TrendingUp } from "lucide-react";
import classNames from 'classnames';
import { Button } from "@/components/ui/button"; // Ensure this component exists or replace accordingly
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"; // Ensure these components exist or replace accordingly
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Ensure these components exist or replace accordingly
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Ensure these components exist or replace accordingly
import {
  PolarGrid,
  RadialBar,
  RadialBarChart,
  Customized,
} from "recharts";
import { Typewriter } from 'react-simple-typewriter';
import NavigationArrows from "@/app/components/NavigationArrows";
// **Model Options**
const modelOptions = [
  { value: "logistic", label: "Logistic Regression" },
  { value: "svm", label: "SVM" },
];

// **Navbar Component**
const Navbar = () => (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/50 backdrop-blur-sm" style={{ fontFamily: "NothingOS" }}>
      <div className="mx-auto max-w-7xl px-6 py-4" style={{ fontFamily: "NothingOS" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <svg
                    className="w-6 h-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span className="text-xl font-bold text-white">
                Heart Disease Analysis
              </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/eda" className="text-gray-300 hover:text-white">
              Exploratory Analysis
            </Link>
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
);

// **Gemini AI Insights Component**
const GeminiAIComponent = ({ prediction, probYes }) => {
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const fetchAIResponse = async () => {
      setLoadingAI(true);
      try {
        const response = await fetch('/api/gemini-ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prediction,
            probYes,
          }),
        });

        if (response.ok) {
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setAiResponse(data.insights);
          } else {
            const text = await response.text();
            setAiResponse(text || 'No insights available.');
          }
        } else {
          let errorMessage = 'Unable to fetch AI insights.';
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          }
          setAiResponse(errorMessage);
        }
      } catch (error) {
        console.error('Error fetching AI insights:', error);
        setAiResponse('Network error while fetching AI insights.');
      }
      setLoadingAI(false);
    };

    if (prediction !== null && probYes !== null) {
      fetchAIResponse();
    }
  }, [prediction, probYes]);

  return (
      <Card className="mt-6 bg-black/50 backdrop-blur-sm p-4 rounded-lg" style={{ fontFamily: "NothingOS" }}>
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-white">Gemini AI Insights</CardTitle>
          <CardDescription className="text-gray-300">
            AI-generated insights based on the prediction
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {loadingAI ? (
              <div className="flex items-center justify-center">
                <Spinner size="lg" color="primary" />
                <span className="text-white ml-2">Fetching AI insights...</span>
              </div>
          ) : (
              <div className="text-white text-lg">
                {aiResponse ? (
                    <Typewriter
                        words={[aiResponse]}
                        loop={1}
                        cursor
                        cursorStyle='_'
                        typeSpeed={50}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                ) : (
                    <p>No insights available.</p>
                )}
              </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none text-white">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing AI-generated insights based on the latest prediction
          </div>
        </CardFooter>
      </Card>
  );
};

// **PredictivePage Component**
export default function PredictivePage() {
  const [formData, setFormData] = useState({
    Age: '',
    Sex: 'M',
    ChestPainType: 'NAP',
    RestingBP: '',
    Cholesterol: '',
    FastingBS: 0,
    RestingECG: 'Normal',
    MaxHR: '',
    ExerciseAngina: 'N',
    Oldpeak: '',
    ST_Slope: 'Up',
  });

  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('logistic');
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const spinnerStages = [
    { color: "default", label: "Preparing Data..." },
    { color: "primary", label: "Loading Model..." },
    { color: "secondary", label: "Sending Request..." },
    { color: "secondary", label: "Still taking time..hold there....." },
    { color: "success", label: "Analyzing Result..Almost there......" },
    { color: "success", label: "Done..a few moments please......" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingProgress(0);
    setPredictionResult(null);

    try {
      const spinnerStagesCount = spinnerStages.length;

      // Simulate loading steps
      for (let i = 0; i < spinnerStagesCount; i++) {
        setLoadingProgress((prev) => prev + 100 / spinnerStagesCount);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const response = await fetch('https://heroku-svm.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, model: selectedModel }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API Response:', result); // For debugging
        setPredictionResult(result);
      } else {
        console.error("API response error:", response.status, response.statusText);
        setPredictionResult({ error: `Failed to fetch prediction. Status: ${response.status} - ${response.statusText}` });
      }

    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPredictionResult({ error: 'Failed to fetch prediction due to network error.' });
    }
    setLoading(false);
  };

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

  const renderRadialChart = () => {
    if (!predictionResult || predictionResult.error) {
      return null;
    }

    const { prediction, probability } = predictionResult;

    // Initialize probabilities
    let probYes = 0;

    // Check if probability is a nested array with two elements
    if (
        Array.isArray(probability) &&
        probability.length > 0 &&
        Array.isArray(probability[0]) &&
        probability[0].length === 2
    ) {
      // Extract probabilities from the nested array
      const probs = probability[0];
      probYes = parseFloat(probs[1]); // Probability of class '1' (Yes)

      console.log('probYes:', probYes);
    } else {
      // If probabilities are not provided, assign default values based on prediction
      probYes = prediction === 1 ? 1 : 0;

      console.log('Default probYes:', probYes);
    }

    // Ensure probabilities are valid numbers
    probYes = isNaN(probYes) ? 0 : probYes;

    // Convert probability to percentage
    const yesProb = probYes * 100;

    console.log('yesProb:', yesProb);

    // Prepare data for the chart
    const chartData = [
      { name: 'Progress', value: yesProb, fill: '#EF4444' }, // Red
    ];

    console.log('Chart data:', chartData);

    // Handle edge cases where probability is zero
    if (yesProb === 0) {
      return (
          <Card className="mt-6 bg-black/50 backdrop-blur-sm p-4 rounded-lg">
            <CardHeader className="items-center pb-0">
              <CardTitle className="text-white">Prediction Probability</CardTitle>
              <CardDescription className="text-gray-300">
                No probability data available.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="text-white">No probability data to display.</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none text-white">
                {`Prediction: ${prediction === 1 ? 'Yes' : 'No'}`}
              </div>
            </CardFooter>
          </Card>
      );
    }

    return (
        <Card className="mt-6 bg-black/50 backdrop-blur-sm flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-white">Radial Chart - Probability</CardTitle>
            <CardDescription className="text-gray-300">Prediction Result</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0 flex justify-center">
            <RadialBarChart
                width={300}
                height={300}
                data={chartData}
                startAngle={90}
                endAngle={-270}
                innerRadius={80}
                outerRadius={110}
                barSize={20}
            >
              <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="#111827" // Match the page background
              />
              <RadialBar
                  minAngle={15}
                  background={{ fill: '#111827' }} // Match the page background
                  dataKey="value"
                  cornerRadius={10}
              />
              {/* Customized component to render percentage and description */}
              <Customized component={({ cx, cy }) => (
                  <>
                    <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white text-4xl font-bold"
                    >
                      {`${yesProb.toFixed(2)}%`}
                    </text>
                    <text
                        x={cx}
                        y={cy + 30}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-gray-400 text-lg"
                    >
                      Probability of Yes
                    </text>
                  </>
              )} />
            </RadialBarChart>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none text-white">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing probability of Yes based on the latest prediction
            </div>
          </CardFooter>
        </Card>
    );
  };

  return (
      <div className="min-h-screen bg-neutral-950">
        {/* Gradient overlay */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

        <Navbar />

        <div className="relative z-10 container mx-auto p-8">
          <div className="flex items-center gap-2 mb-6">
            <svg
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <h1 className="text-2xl font-bold text-white">
              Heart Disease Predictive Analysis
            </h1>
          </div>

          <p className="text-gray-300 mb-8">
            Enter patient information to predict the likelihood of heart disease.
          </p>

          <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg"
          >
            {/* Select Model */}
            <div>
              <label className="block font-medium text-white mb-2">
                Select Model
              </label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between bg-slate-700/50 text-white border-slate-600"
                  >
                    {selectedModel
                        ? modelOptions.find(
                            (model) => model.value === selectedModel
                        )?.label
                        : "Select model..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-slate-800 border-slate-700">
                  <Command className="bg-slate-800">
                    <CommandInput
                        placeholder="Search models..."
                        className="text-white"
                    />
                    <CommandList>
                      <CommandEmpty>No model found.</CommandEmpty>
                      <CommandGroup>
                        {modelOptions.map((model) => (
                            <CommandItem
                                key={model.value}
                                value={model.value}
                                onSelect={(currentValue) => {
                                  setSelectedModel(
                                      currentValue === selectedModel ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                                className="text-white hover:bg-slate-700"
                            >
                              <Check
                                  className={classNames(
                                      "mr-2 h-4 w-4",
                                      selectedModel === model.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                  )}
                              />
                              {model.label}
                            </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Numerical Inputs */}
            {['Age', 'RestingBP', 'Cholesterol', 'MaxHR', 'Oldpeak'].map(
                (field) => (
                    <div key={field}>
                      <label className="block font-medium text-white mb-2">
                        {field}
                      </label>
                      <Textarea
                          id={field}
                          name={field}
                          placeholder={`Enter ${field}`}
                          value={formData[field]}
                          onChange={handleChange}
                          className="w-full bg-slate-700/50 text-black border-slate-600"
                          required
                      />
                    </div>
                )
            )}

            {/* Categorical Inputs */}
            {[
              { name: 'Sex', options: ['M', 'F'] },
              { name: 'ChestPainType', options: ['ASY', 'NAP', 'ATA', 'TA'] },
              { name: 'FastingBS', options: [0, 1] },
              { name: 'RestingECG', options: ['Normal', 'ST', 'LVH'] },
              { name: 'ExerciseAngina', options: ['Y', 'N'] },
              { name: 'ST_Slope', options: ['Up', 'Flat', 'Down'] },
            ].map(({ name, options }) => (
                <div key={name}>
                  <label className="block font-medium text-white mb-2">
                    {name}
                  </label>
                  <select
                      id={name}
                      name={name}
                      className="w-full p-2 rounded bg-slate-700/50 text-white border-slate-600"
                      value={formData[name]}
                      onChange={handleChange}
                      required
                  >
                    <option value="" disabled>Select {name}</option>
                    {options.map((option) => (
                        <option
                            key={option}
                            value={option}
                            className="bg-slate-800 text-black"
                        >
                          {option}
                        </option>
                    ))}
                  </select>
                </div>
            ))}

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition-colors"
                disabled={loading}
            >
              Get Prediction
            </button>
          </form>

          {/* Prediction Result */}
          {predictionResult && (
              <div className="mt-6">
                {predictionResult.error ? (
                    <div className="p-4 rounded-lg bg-red-500/50 backdrop-blur-sm text-white">
                      <h2 className="font-bold text-lg mb-2">Error</h2>
                      <p className="text-white">{predictionResult.error}</p>
                    </div>
                ) : (
                    <>
                      {renderRadialChart()}
                      {/* Gemini AI Insights */}
                      <GeminiAIComponent
                          prediction={predictionResult.prediction}
                          probYes={parseFloat(predictionResult.probability[0][1]) * 100}
                      />
                    </>
                )}
              </div>
          )}
          {/* Navigation Arrows */}
          <div className="mt-8">
            <NavigationArrows
                prevPage="/eda"
                nextPage="/"
                prevLabel="Exploratory Analysis"
                nextLabel="Home"
            />
          </div>
        </div>
      </div>

  );
}
