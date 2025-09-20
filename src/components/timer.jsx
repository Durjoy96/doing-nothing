"use client";

import { useValue } from "@/lib/provider";
import React, { useEffect, useState } from "react";

export default function Timer() {
  const { totalSeconds, setTotalSeconds, isGameOver } = useValue();
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  useEffect(() => {
    const formateTime = () => {
      if (!isGameOver) {
        setTotalSeconds((prev) => prev + 1); // Increment total seconds by 1
        setHour(Math.floor(totalSeconds / 3600)); // Calculate hours
        setMinute(Math.floor((totalSeconds % 3600) / 60)); // Calculate minutes
        setSecond(totalSeconds % 60); // Calculate seconds
      }
    };

    const interval = setInterval(formateTime, 1000);
    return () => clearInterval(interval);
  }, [totalSeconds]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-inter">
      <span className="text-xl font-normal text-base-content">
        You've done nothing for{" "}
        <span className="font-semibold">
          {hour.toString().padStart(2, "0")}:
          {minute.toString().padStart(2, "0")}:
          {second.toString().padStart(2, "0")}
        </span>
      </span>
    </div>
  );
}
