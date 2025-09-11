"use client";

import { useValue } from "@/lib/provider";
import React from "react";

export default function RulesModal({ setShowTimer }) {
  const { setIsRulesModalClose } = useValue();

  const fullScreenHandler = () => {
    document.getElementById("root").requestFullscreen();
  };

  const btnHandler = () => {
    fullScreenHandler();
    document.getElementById("rules_modal").close();
    setShowTimer(true); // Start the timer when the modal is closed
    setTimeout(() => {
      setIsRulesModalClose(true);
    }, 1000); // Delay for the game end logics to be set up
  };
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
            onClick={btnHandler}
            className="btn btn-lg btn-primary btn-wide rounded-full"
          >
            I'm Ready!
          </button>
        </div>
      </div>
    </dialog>
  );
}
