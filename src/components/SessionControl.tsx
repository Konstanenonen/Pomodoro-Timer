import React from "react";

interface Props {
  incrementSession: () => void;
  decrementSession: () => void;
  control: number;
}

const SessionControl: React.FC<Props> = ({
  incrementSession,
  decrementSession,
  control,
}) => {
  return (
    <div className="session-wrapper">
      <h2 id="session-label">Session Length</h2>
      <div className="controls-wrappers">
        <button id="session-increment" type="button" onClick={incrementSession}>
          +
        </button>
        <div id="session-length">{control}</div>
        <button id="session-decrement" type="button" onClick={decrementSession}>
          -
        </button>
      </div>
    </div>
  );
};

export default SessionControl;
