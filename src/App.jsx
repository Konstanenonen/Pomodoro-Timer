import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>This is App</h1>
      <div className="pomodoro-wrapper">
        <div className="break-wrapper">
          <h2 id="break-label">Break Length</h2>
          <div className="controls-wrappers">
            <button id="break-decrement" type="button">-1</button>
            <div id="break-length">5</div>
            <button id="break-increment" type="button">+1</button>
          </div>
        </div>
        <div className="session-wrapper">
          <h2 id="session-label">Session Length</h2>
          <div className="controls-wrappers">
            <button id="session-decrement" type="button">-1</button>
            <div id="session-length">25</div>
            <button id="session-increment" type="button">+1</button>
          </div>
        </div>
        <div className="timer-wrapper">
          <h2 id="timer-label">Session</h2>
          <h2 id="time-left">25:00</h2>
          <button id="start_stop" type="button">Start/Stop</button>
          <button id="reset" type="button">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
