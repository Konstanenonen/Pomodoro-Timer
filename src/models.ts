interface Timer {
  control: number;
  minutes: number;
  seconds: number;
}

interface Pomodoro {
  break: Timer;
  session: Timer;
  current: 'Session' | 'Break';
  timerID: number;
}

export { Timer, Pomodoro };
