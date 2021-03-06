import React, { useState } from "react";
import { useRef } from "react";
import BreakControl from "./components/BreakControl";
import SessionControl from "./components/SessionControl";
import Timer from "./components/Timer";
import { Pomodoro } from "./models";

const App: React.FC = () => {
  const [timer, setTimer] = useState<Pomodoro>({
    break: {
      control: 5,
      minutes: 5,
      seconds: 0,
    },
    session: {
      control: 25,
      minutes: 25,
      seconds: 0,
    },
    current: "Session",
    timerID: 0,
  });
  const [start, setStart] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const reset = () => {
    audioRef.current?.pause();
    //Had to use the document object, beacause typescript didn't want to play nice
    // with .currentTime
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.currentTime = 0;

    setStart(false);

    setTimer((prevState) => ({
      ...prevState,
      break: {
        control: 5,
        minutes: 5,
        seconds: 0,
      },
      session: {
        control: 25,
        minutes: 25,
        seconds: 0,
      },
      current: "Session",
    }));
  };

  const decrementBreak = () => {
    if (timer.break.minutes === 1) return;

    setTimer((prevState) => ({
      ...prevState,
      break: {
        control: prevState.break.control - 1,
        minutes: prevState.break.minutes - 1,
        seconds: 0,
      },
    }));
  };

  const incrementBreak = () => {
    if (timer.break.minutes >= 60) return;
    setTimer((prevState) => ({
      ...prevState,
      break: {
        control: prevState.break.control + 1,
        minutes: prevState.break.minutes + 1,
        seconds: 0,
      },
    }));
  };

  const decrementSession = () => {
    if (timer.session.minutes === 1) return;

    setTimer((prevState) => ({
      ...prevState,
      session: {
        control: prevState.session.control - 1,
        minutes: prevState.session.minutes - 1,
        seconds: 0,
      },
    }));
  };

  const incrementSession = () => {
    if (timer.session.minutes >= 60) return;
    setTimer((prevState) => ({
      ...prevState,
      session: {
        control: prevState.session.control + 1,
        minutes: prevState.session.minutes + 1,
        seconds: 0,
      },
    }));
  };

  const tickForward = () => {
    setTimer((prevState) => {
      if (
        prevState.session.minutes === 0 &&
        prevState.session.seconds === 0 &&
        prevState.break.minutes === 0 &&
        prevState.break.seconds === 0
      ) {
        return {
          ...prevState,
          break: {
            control: prevState.break.control,
            minutes: prevState.break.control,
            seconds: 0,
          },
          session: {
            control: prevState.session.control,
            minutes: prevState.session.control,
            seconds: 0,
          },
          current: "Session",
        };
      }

      if (prevState.session.minutes === 0 && prevState.session.seconds === 0) {
        if (prevState.current === "Session") {
          return {
            ...prevState,
            current: "Break",
          };
        }

        if (prevState.break.seconds === 0) {
          return {
            ...prevState,
            break: {
              control: prevState.break.control,
              minutes: prevState.break.minutes - 1,
              seconds: 59,
            },
            session: {
              control: prevState.session.control,
              minutes: 0,
              seconds: 0,
            },
          };
        }
        return {
          ...prevState,
          break: {
            control: prevState.break.control,
            minutes: prevState.break.minutes,
            seconds: prevState.break.seconds - 1,
          },
        };
      }

      if (prevState.session.seconds === 0) {
        return {
          ...prevState,
          session: {
            control: prevState.session.control,
            minutes: prevState.session.minutes - 1,
            seconds: 59,
          },
        };
      }
      return {
        ...prevState,
        session: {
          control: prevState.session.control,
          minutes: prevState.session.minutes,
          seconds: prevState.session.seconds - 1,
        },
      };
    });
  };

  React.useEffect(() => {
    if (!start) {
      clearInterval(timer.timerID);
      return;
    }

    const id = setInterval(tickForward, 1000) as unknown as number;

    setTimer((prevState) => ({
      break: {
        ...prevState.break,
      },
      session: {
        ...prevState.session,
      },
      current: prevState.current,
      timerID: id,
    }));
  }, [start]);

  React.useEffect(() => {
    if (start) {
      audioRef.current?.play();
    }
  }, [timer.current]);

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <div className="pomodoro-wrapper">
        <Timer reset={reset} timer={timer} setStart={setStart} />
        <div className="controls-wrapper">
          <BreakControl
            incrementBreak={incrementBreak}
            decrementBreak={decrementBreak}
            control={timer.break.control}
          />
          <SessionControl
            incrementSession={incrementSession}
            decrementSession={decrementSession}
            control={timer.session.control}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
};

export default App;
