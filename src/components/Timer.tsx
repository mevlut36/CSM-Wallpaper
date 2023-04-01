import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p className="timer">{time.toLocaleTimeString()}</p>
    </div>
  );
};

export default Timer;
