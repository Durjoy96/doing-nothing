"use client";

import RulesModal from "@/components/rules-modal";
import Timer from "@/components/timer";
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
        className="h-screen flex flex-col items-center justify-center text-inter"
      >
        <span className="text-xl font-normal text-base-content">
          You've done nothing for{" "}
          <span className="font-semibold">
            <Timer />
          </span>
        </span>
      </div>
      <RulesModal />
    </>
  );
}
