/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

function App() {
  const [timer, setTimer] = React.useState({
    break: {
      minutes: 5,
      seconds: 0,
    },
    session: {
      minutes: 25,
      seconds: 0,
    },
    current: 'Session',
    timerID: 0,
  });

  function reset() {
    setTimer({
      break: {
        minutes: 5,
        seconds: 0,
      },
      session: {
        minutes: 25,
        seconds: 0,
      },
      current: 'Session',
      timerID: 0,
    });
  }

  function decrementBreak() {
    if (timer.break <= 0) return;

    setTimer((prevState) => ({
      ...prevState,
      break: {
        minutes: prevState.break.minutes - 1,
        seconds: 0,
      },
    }));
  }

  function incrementBreak() {
    if (timer.break >= 60) return;
    setTimer((prevState) => ({
      ...prevState,
      break: {
        minutes: prevState.break.minutes + 1,
        seconds: 0,
      },
    }));
  }

  function decrementSession() {
    if (timer.session <= 0) return;

    setTimer((prevState) => ({
      ...prevState,
      session: {
        minutes: prevState.session.minutes - 1,
        seconds: 0,
      },
    }));
  }

  function incrementSession() {
    if (timer.session >= 60) return;
    setTimer((prevState) => ({
      ...prevState,
      session: {
        minutes: prevState.session.minutes + 1,
        seconds: 0,
      },
    }));
  }

  function tickForward() {
    setTimer((prevState) => {
      if (prevState.session.seconds === 0) {
        return ({
          ...prevState,
          session: {
            minutes: prevState.session.minutes - 1,
            seconds: 59,
          },
        });
      }
      return ({
        ...prevState,
        session: {
          minutes: prevState.session.minutes,
          seconds: prevState.session.seconds - 1,
        },
      });
    });
  }

  function startTimer() {
    setTimer((prevState) => ({
      ...prevState,
      timerID: setInterval(tickForward, 1000),
    }));
  }

  return (
    <div className="App">
      <h1>This is App</h1>
      <div className="pomodoro-wrapper">
        <div className="break-wrapper">
          <h2 id="break-label">Break Length</h2>
          <div className="controls-wrappers">
            <button id="break-increment" type="button" onClick={incrementBreak}>+1</button>
            <div id="break-length">{timer.break.minutes}</div>
            <button id="break-decrement" type="button" onClick={decrementBreak}>-1</button>
          </div>
        </div>
        <div className="session-wrapper">
          <h2 id="session-label">Session Length</h2>
          <div className="controls-wrappers">
            <button id="session-increment" type="button" onClick={incrementSession}>+1</button>
            <div id="session-length">{timer.session.minutes}</div>
            <button id="session-decrement" type="button" onClick={decrementSession}>-1</button>
          </div>
        </div>
        <div className="timer-wrapper">
          <h2 id="timer-label">{timer.current}</h2>
          <h2 id="time-left">{timer.session.minutes}:{timer.session.seconds + (timer.session.seconds === 0 && '0')}</h2>
          <button id="start_stop" type="button" onClick={startTimer}>Start/Stop</button>
          <button id="reset" type="button" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
