"use client";

import { useValue } from "@/lib/provider";
import React from "react";

export default function RulesModal() {
  const { gameStartHandler } = useValue();

  return (
    <dialog
      data-theme="forest"
      id="rules_modal"
      className="modal modal-bottom sm:modal-middle font-inter"
    >
      <div className="modal-box lg:max-w-xs flex flex-col items-center">
        <h3 className="font-bold text-lg uppercase text-base-content flex items-center">
          <span className="text-xl">⚠️</span> Warning
        </h3>
        <p className="text-warning text-sm mt-4 leading-relaxed max-w-md text-center py-4">
          Any mouse movement, click, or key press ends the run.
        </p>
        <div className="modal-action w-full justify-center">
          <button
            onClick={() => {
              gameStartHandler();
              document.getElementById("rules_modal").close();
            }}
            className="btn btn-lg btn-primary btn-wide rounded-full"
          >
            I'm Ready!
          </button>
        </div>
      </div>
    </dialog>
  );
}
