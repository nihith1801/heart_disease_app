// components/DesktopNavbar.js

"use client";
import Link from "next/link";

const DesktopNavbar = () => (
  <nav className="hidden md:flex justify-center items-center bg-neutral-950/50 border border-gray-600 rounded-md py-2 px-4 backdrop-blur-md mt-6">
    <ul className="flex space-x-6">
      <li>
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
      </li>
      <li>
        <Link href="/eda" className="text-white hover:underline">
          Exploratory Data Analysis
        </Link>
      </li>
      <li>
        <Link href="/predictive" className="text-white hover:underline">
          Predictive Analysis
        </Link>
      </li>
    </ul>
  </nav>
);

export default DesktopNavbar;
