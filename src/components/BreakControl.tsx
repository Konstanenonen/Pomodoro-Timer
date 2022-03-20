import React from "react";

interface Props {
  incrementBreak: () => void;
  decrementBreak: () => void;
  control: number;
}

const BreakControl: React.FC<Props> = ({
  incrementBreak,
  decrementBreak,
  control,
}) => {
  return (
    <div className="break-wrapper">
      <h2 id="break-label">Break Length</h2>
      <div className="controls-wrappers">
        <button id="break-increment" type="button" onClick={incrementBreak}>
          +
        </button>
        <div id="break-length">{control}</div>
        <button id="break-decrement" type="button" onClick={decrementBreak}>
          -
        </button>
      </div>
    </div>
  );
};

export default BreakControl;
