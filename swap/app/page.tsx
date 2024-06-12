"use client"

import DarkMode from "@/components/DarkMode";
import SwapCard from "@/components/swapCard";

export default function Home() {
  return (
    <>
    <div className="flex items-center justify-center mt-4">
      <DarkMode/>
    </div>
    <div className="flex items-center justify-center h-screen">
      
      <SwapCard/>
    </div>
    </>
  );
}
