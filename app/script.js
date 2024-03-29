import React from "react";
import { render } from "react-dom";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [status, setStatus] = useState("off");
  const [time, setTime] = useState(0);
  const [counter, setCounter] = useState("");

  const restTime = 20;
  const workTime = 1200;

  const playBell = () => {
    const bell = new Audio("./sounds/bell.wav");
    bell.play();
  };

  function secondsToTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }

  function padTo2Digits(num, lenght = 2) {
    return num.toString().padStart(lenght, "0");
  }

  const startTimer = () => {
    setTime(workTime);
    setStatus("work");
    console.log("work");
    setCounter(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    );
  };

  const stopTime = () => {
    setCounter(clearInterval(counter));
    setTime(0);
    setStatus("off");
  };

  const closeApp = () => window.close();

  useEffect(() => {
    if (time === 0) {
      if (status === "work") {
        setStatus("rest");
        playBell();
        setTime(restTime);
        console.log("rest");
      } else if (status === "rest") {
        setStatus("work");
        setTime(workTime);
        console.log("work");
      }
    }
  }, [time]);

  useEffect(() => {
    return () => {
      if (counter) clearInterval(counter);
    };
  }, []);

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === "off" && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === "work" && <img src="./images/work.png" />}
      {status === "rest" && <img src="./images/rest.png" />}
      {status !== "off" && <div className="timer">{secondsToTime(time)}</div>}
      {status === "off" && (
        <button className="btn" onClick={startTimer}>
          Start
        </button>
      )}
      {status !== "off" && (
        <button className="btn" onClick={stopTime}>
          Stop
        </button>
      )}
      <button className="btn btn-close" onClick={closeApp}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector("#app"));
