import React from 'react';
import { Pomodoro } from '../models';

interface Props {
  timer: Pomodoro;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
}

const Timer: React.FC<Props> = ({ timer, setStart, reset }) => {
  function showActive() {
    if (timer.current === 'Break') {
      return (
        <h2 id="time-left">
          {timer.break.minutes < 10 && '0'}{timer.break.minutes}:{timer.break.seconds < 10 && timer.break.seconds > 0 && '0'}{timer.break.seconds + (timer.break.seconds === 0 ? '0' : '')}
        </h2>
      );
    }

    return (
      <h2 id="time-left">
        {timer.session.minutes < 10 && '0'}{timer.session.minutes}:{timer.session.seconds < 10 && timer.session.seconds > 0 && '0'}{timer.session.seconds + (timer.session.seconds === 0 ? '0' : '')}
      </h2>
    );
  }

  return (
    <div className="timer-wrapper">
      <h2 id="timer-label">{timer.current}</h2>
      {showActive()}
      <button id="start_stop" type="button" onClick={() => setStart(prevState => !prevState)}>Start / Stop</button>
      <button id="reset" type="button" onClick={reset}>Reset</button>
    </div>
  );
}

export default Timer;