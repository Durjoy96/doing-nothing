"use client";

import RulesModal from "@/components/rules-modal";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    document.getElementById("rules_modal").showModal();
  }, []);
  return (
    <>
      <div
        id="root"
        data-theme="forest"
        className="h-screen flex flex-col items-center justify-center"
      >
        <h1>hello world</h1>
      </div>
      <RulesModal />
    </>
  );
}
