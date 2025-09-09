"use client";
import React, { useEffect } from "react";

export default function page() {
  const fullScreenHandler = () => {
    document.getElementById("root").requestFullscreen();
  };
  return (
    <div
      id="root"
      data-theme="forest"
      className="h-screen flex flex-col items-center justify-center"
    >
      <h1>hello world</h1>
      <button onClick={fullScreenHandler}>Full Screen</button>
    </div>
  );
}
