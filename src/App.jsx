import React from 'react';

function App() {
  const [timer, setTimer] = React.useState({
    break: 5,
    session: 25,
    current: 'Session',
  });

  function reset() {
    setTimer({
      break: 5,
      session: 25,
      current: 'Session',
    });
  }

  function decrementBreak() {
    if (timer.break <= 0) return;

    setTimer((prevState) => ({
      ...prevState,
      break: prevState.break - 1,
    }));
  }

  function incrementBreak() {
    if (timer.break >= 60) return;
    setTimer((prevState) => ({
      ...prevState,
      break: prevState.break + 1,
    }));
  }

  function decrementSession() {
    if (timer.session <= 0) return;

    setTimer((prevState) => ({
      ...prevState,
      session: prevState.session - 1,
    }));
  }

  function incrementSession() {
    if (timer.session >= 60) return;
    setTimer((prevState) => ({
      ...prevState,
      session: prevState.session + 1,
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
            <div id="break-length">{timer.break}</div>
            <button id="break-decrement" type="button" onClick={decrementBreak}>-1</button>
          </div>
        </div>
        <div className="session-wrapper">
          <h2 id="session-label">Session Length</h2>
          <div className="controls-wrappers">
            <button id="session-increment" type="button" onClick={incrementSession}>+1</button>
            <div id="session-length">{timer.session}</div>
            <button id="session-decrement" type="button" onClick={decrementSession}>-1</button>
          </div>
        </div>
        <div className="timer-wrapper">
          <h2 id="timer-label">{timer.current}</h2>
          <h2 id="time-left">{timer.session}</h2>
          <button id="start_stop" type="button">Start/Stop</button>
          <button id="reset" type="button" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
