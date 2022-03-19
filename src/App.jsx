/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/self-closing-comp */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Timer from './components/Timer';

function App() {
  const [timer, setTimer] = React.useState({
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
    current: 'Session',
    timerID: 0,
  });
  const [start, setStart] = React.useState(false);

  function reset() {
    const audio = document.getElementById('beep');
    audio.pause();
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
      current: 'Session',
    }));
  }

  function decrementBreak() {
    if (timer.break.minutes === 1) return;

    setTimer((prevState) => ({
      ...prevState,
      break: {
        control: prevState.break.control - 1,
        minutes: prevState.break.minutes - 1,
        seconds: 0,
      },
    }));
  }

  function incrementBreak() {
    if (timer.break.minutes >= 60) return;
    setTimer((prevState) => ({
      ...prevState,
      break: {
        control: prevState.break.control + 1,
        minutes: prevState.break.minutes + 1,
        seconds: 0,
      },
    }));
  }

  function decrementSession() {
    if (timer.session.minutes === 1) return;

    setTimer((prevState) => ({
      ...prevState,
      session: {
        control: prevState.session.control - 1,
        minutes: prevState.session.minutes - 1,
        seconds: 0,
      },
    }));
  }

  function incrementSession() {
    if (timer.session.minutes >= 60) return;
    setTimer((prevState) => ({
      ...prevState,
      session: {
        control: prevState.session.control + 1,
        minutes: prevState.session.minutes + 1,
        seconds: 0,
      },
    }));
  }

  function tickForward() {
    setTimer((prevState) => {
      if (prevState.session.minutes === 0
         && prevState.session.seconds === 0
         && prevState.break.minutes === 0
         && prevState.break.seconds === 0) {
        return ({
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
          current: 'Session',
        });
      }

      if (prevState.session.minutes === 0 && (prevState.session.seconds === 0)) {
        if (prevState.current === 'Session') {
          return ({
            ...prevState,
            current: 'Break',
          });
        }

        if (prevState.break.seconds === 0) {
          return ({
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
          });
        }
        return ({
          ...prevState,
          break: {
            control: prevState.break.control,
            minutes: prevState.break.minutes,
            seconds: prevState.break.seconds - 1,
          },
        });
      }

      if (prevState.session.seconds === 0) {
        return ({
          ...prevState,
          session: {
            control: prevState.session.control,
            minutes: prevState.session.minutes - 1,
            seconds: 59,
          },
        });
      }
      return ({
        ...prevState,
        session: {
          control: prevState.session.control,
          minutes: prevState.session.minutes,
          seconds: prevState.session.seconds - 1,
        },
      });
    });
  }

  React.useEffect(() => {
    if (!start) {
      clearInterval(timer.timerID);
      return;
    }

    const id = setInterval(tickForward, 1000);

    setTimer((prevState) => ({
      ...prevState,
      timerID: id,
    }));
  }, [start]);

  React.useEffect(() => {
    const audio = document.getElementById('beep');
    if (start) {
      audio.play();
    }
  }, [timer.current]);

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <div className="pomodoro-wrapper">
        <Timer
          reset={() => reset()}
          timer={timer}
          toggleStart={() => setStart((prevState) => !prevState)}
        />
        <div className="controls-wrapper">
          <div className="break-wrapper">
            <h2 id="break-label">Break Length</h2>
            <div className="controls-wrappers">
              <button id="break-increment" type="button" onClick={incrementBreak}>+</button>
              <div id="break-length">{timer.break.control}</div>
              <button id="break-decrement" type="button" onClick={decrementBreak}>-</button>
            </div>
          </div>
          <div className="session-wrapper">
            <h2 id="session-label">Session Length</h2>
            <div className="controls-wrappers">
              <button id="session-increment" type="button" onClick={incrementSession}>+</button>
              <div id="session-length">{timer.session.control}</div>
              <button id="session-decrement" type="button" onClick={decrementSession}>-</button>
            </div>
          </div>
        </div>
      </div>
      <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default App;
