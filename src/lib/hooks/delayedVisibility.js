import { useState, useEffect } from "react";

function useDelayedVisibility(showTime, stayTime) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after startTime seconds
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, showTime * 1000);

    // Hide after endTime seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, (showTime + stayTime) * 1000);

    // Cleanup timers on unmount
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [showTime, stayTime]);

  return visible;
}

export default useDelayedVisibility;
