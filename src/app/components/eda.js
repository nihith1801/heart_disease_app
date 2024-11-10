// pages/eda.js

"use client";
import { useEffect, useState } from "react";
import * as dfd from "danfojs"; // Import Danfo.js for CSV handling
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";  // Import NextUI table components

export default function EDA() {
  const [data, setData] = useState([]);

  // Load and process the CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const df = await dfd.readCSV("/heart.csv");  // Path to the CSV file in the public folder
        const jsonData = df.toJSON();  // Convert the data to JSON format
        setData(jsonData);  // Set the data in state
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Heart Disease Dataset</h1>
      <p className="text-gray-600 mb-6">
        The heart disease dataset is used to predict heart disease based on several factors like age, gender, cholesterol, and more.
      </p>
      <div className="overflow-x-auto">
        <Table aria-label="Heart Disease Data Table" isStriped>
          <TableHeader>
            <TableColumn>Age</TableColumn>
            <TableColumn>Sex</TableColumn>
            <TableColumn>Chest Pain Type</TableColumn>
            <TableColumn>Resting BP</TableColumn>
            <TableColumn>Cholesterol</TableColumn>
            <TableColumn>Fasting BS</TableColumn>
            <TableColumn>Resting ECG</TableColumn>
            <TableColumn>Max HR</TableColumn>
            <TableColumn>Exercise Angina</TableColumn>
            <TableColumn>Oldpeak</TableColumn>
            <TableColumn>ST Slope</TableColumn>
            <TableColumn>Heart Disease</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Age}</TableCell>
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
    </div>
  );
}

