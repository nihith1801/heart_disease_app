"use client";
import { useEffect, useState } from "react";
import * as dfd from "danfojs"; // Import Danfo.js for CSV handling
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";  // Import shadcn UI table components

export function DataTable() {
  const [data, setData] = useState([]);

  // Load and process the CSV data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load the CSV file
        const df = await dfd.readCSV("/heart.csv");  // Path to the CSV file in public folder
        const jsonData = df.toJSON();  // Convert the data to JSON format
        setData(jsonData);  // Set the data in state
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Heart Disease Dataset</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Age</TableHead>
            <TableHead>Sex</TableHead>
            <TableHead>Chest Pain Type</TableHead>
            <TableHead>Resting BP</TableHead>
            <TableHead>Cholesterol</TableHead>
            <TableHead>Fasting BS</TableHead>
            <TableHead>Resting ECG</TableHead>
            <TableHead>Max HR</TableHead>
            <TableHead>Exercise Angina</TableHead>
            <TableHead>Oldpeak</TableHead>
            <TableHead>ST Slope</TableHead>
            <TableHead>Heart Disease</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.Age}</TableCell>
              <TableCell>{row.Sex}</TableCell>
              <TableCell>{row.ChestPainType}</TableCell>
              <TableCell>{row.RestingBP}</TableCell>
              <TableCell>{row.Cholesterol}</TableCell>
              <TableCell>{row.FastingBS}</TableCell>
              <TableCell>{row.RestingECG}</TableCell>
              <TableCell>{row.MaxHR}</TableCell>
              <TableCell>{row.ExerciseAngina}</TableCell>
              <TableCell>{row.Oldpeak}</TableCell>
              <TableCell>{row.ST_Slope}</TableCell>
              <TableCell>{row.HeartDisease === 1 ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
