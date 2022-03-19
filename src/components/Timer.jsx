/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function Timer(props) {
  function showActive() {
    if (props.timer.current === 'Break') {
      return (
        <h2 id="time-left">
          {props.timer.break.minutes < 10 && '0'}{props.timer.break.minutes}:{props.timer.break.seconds < 10 && props.timer.break.seconds > 0 && '0'}{props.timer.break.seconds + (props.timer.break.seconds === 0 && '0')}
        </h2>
      );
    }

    return (
      <h2 id="time-left">
        {props.timer.session.minutes < 10 && '0'}{props.timer.session.minutes}:{props.timer.session.seconds < 10 && props.timer.session.seconds > 0 && '0'}{props.timer.session.seconds + (props.timer.session.seconds === 0 && '0')}
      </h2>
    );
  }

  return (
    <div className="timer-wrapper">
      <h2 id="timer-label">{props.timer.current}</h2>
      {showActive()}
      <button id="start_stop" type="button" onClick={props.toggleStart}>Start/Stop</button>
      <button id="reset" type="button" onClick={props.reset}>Reset</button>
    </div>
  );
}
