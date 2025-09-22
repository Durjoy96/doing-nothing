"use client";

import React from "react";
import useDelayedVisibility from "@/lib/hooks/delayedVisibility";
import { motion, AnimatePresence } from "motion/react";

export default function Cookie({ showTime, stayTime }) {
  const visible = useDelayedVisibility(showTime, stayTime);
  return (
    <>
      <AnimatePresence>
        {visible && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-transparent flex items-center justify-center text-base-content">
            <motion.div
              key={visible}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { duration: 1 } }}
              exit={{ y: 100, opacity: 0, transition: { duration: 1 } }}
              className="max-w-sm p-6 rounded-lg bg-base-300 absolute bottom-6 right-6 shadow-xl"
            >
              <h3 className="text-base-content text-lg font-semibold">
                🍪 Cookie Notice
              </h3>
              <p className="text-base-content/80 py-4">
                We use cookies to ensure that we give you the best experience on
                our website.{" "}
                <span className="link text-base-content">
                  Read cookies policies
                </span>
                .
              </p>
              <div className="flex items-center justify-end gap-4">
                <button className="btn btn-error btn-soft rounded-lg">
                  Decline
                </button>
                <button className="btn btn-primary rounded-lg">Accept</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
