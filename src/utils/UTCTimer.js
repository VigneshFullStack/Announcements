import React, { useState, useEffect } from "react";

const UTCTimer = () => {
  const [utcTime, setUtcTime] = useState(
    new Date().toUTCString().slice(-12, -4)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setUtcTime(new Date().toUTCString().slice(-12, -4));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <label>Current UTC Time : </label>
      <span className="ms-2">{utcTime}</span>
    </>
  );
};

export default UTCTimer;
