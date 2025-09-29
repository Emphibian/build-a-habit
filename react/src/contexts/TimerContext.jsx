import { createContext, useState } from "react";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
	const [timerHabit, setTimerHabit] = useState({ id: null, name: "" });
	const [timerOn, setTimerOn] = useState(false);
	const [timerRunning, setTimerRunning] = useState(false);
	const [timerDuration, setTimerDuration] = useState(0);

	const habitTimerStart = function (id, name, isHabit) {
		if (timerHabit.id !== id) setTimerDuration(0);
		setTimerHabit({ id, name, isHabit });
		setTimerRunning(true);
	};

	const habitTimerStop = function () {
		setTimerRunning(false);
	};

	return (
		<TimerContext
			value={{
				habitTimerStart,
				habitTimerStop,
				timerHabit,
				setTimerHabit,
				timerOn,
				setTimerOn,
				timerRunning,
				setTimerRunning,
				timerDuration,
				setTimerDuration,
			}}
		>
			{children}
		</TimerContext>
	);
}
