// components/MobileNavbar.js

"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex justify-between items-center p-4 bg-neutral-950/50">
      <button
        className="relative z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full"
          whileHover={{ rotate: 90 }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.div>
      </button>

      {isOpen && (
        <motion.div
          className="absolute top-16 left-0 w-full bg-neutral-950/80 p-4 flex flex-col items-center z-40 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="text-white py-2" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/eda" className="text-white py-2" onClick={() => setIsOpen(false)}>
            Exploratory Data Analysis
          </Link>
          <Link href="/predictive" className="text-white py-2" onClick={() => setIsOpen(false)}>
            Predictive Analysis
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default MobileNavbar;
