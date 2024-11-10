import { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";

export const ProgressSpinner = ({ progress }) => {
  // Determine the color based on progress (red to yellow to green)
  const getColor = () => {
    if (progress < 33) return "danger"; // Red
    if (progress < 66) return "warning"; // Yellow
    return "success"; // Green
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <Spinner color={getColor()} size="lg" />
    </div>
  );
};
