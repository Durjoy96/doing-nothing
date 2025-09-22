import useDelayedVisibility from "@/lib/hooks/delayedVisibility";
import React from "react";
import Timer from "../timer";
import { motion, AnimatePresence } from "motion/react";

export default function NoInternetConnection({ showTime, stayTime }) {
  const visible = useDelayedVisibility(showTime, stayTime);
  return (
    <>
      <AnimatePresence>
        {visible && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-base-200 flex items-center justify-center text-base-content">
            <Timer freezedSeconds={showTime} />
            <motion.div
              key={visible}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { duration: 1 } }}
              exit={{ y: 10, opacity: 0, transition: { duration: 1 } }}
              className="absolute bottom-0 w-full py-3 bg-base-300 text-center shadow-md"
            >
              <span className="text-base-content text-base font-inter">
                No Internet connection
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
