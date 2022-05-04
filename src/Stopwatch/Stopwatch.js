import React, { createElement, startTransition } from "react";
import { useEffect, useState } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const start = () => {
    setRunning(true);
  };
  const stop = () => {
    setRunning(false);
  };
  const reset = () => {
    setTime(0);
  };

  const lap = () => {
    console.log(time);
    const timestr =
      `${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:` +
      `${("0" + Math.floor((time / 1000) % 60)).slice(-2)}:` +
      `${("0" + ((time / 10) % 100)).slice(-2)}`;

    const parent = document.getElementById("laptime");
    const child = document.createElement("span");

    child.textContent = `${timestr}\r\n`;
    child.setAttribute("style", "white-space : pre;");
    parent.append(child);
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="buttons">
        <button onClick={start} className="btn">
          Start
        </button>
        <button onClick={stop} className="btn">
          Stop
        </button>
        <button onClick={reset} className="btn">
          Reset
        </button>
        <button onClick={lap} className="btn">
          Lap
        </button>
      </div>
      <div className="numbers" id="laptime">
        <br></br>
      </div>
    </div>
  );
};

export default Stopwatch;
