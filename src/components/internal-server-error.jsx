"use client";

import React, { useEffect, useState } from "react";

export default function InternalServerError() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(() => true);
    }, 5000);
    const hideTimer = setTimeout(() => {
      setVisible(() => false);
    }, 10000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);
  return (
    <>
      {visible && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-base-200 flex items-center justify-center text-base-content">
          <span className="flex gap-6 items-center">
            <span className="text-2xl font-semibold">500</span>{" "}
            <span className="inline-block py-4 border-l px-6 text-base">
              Internal Server Error.
            </span>
          </span>
        </div>
      )}
    </>
  );
}
