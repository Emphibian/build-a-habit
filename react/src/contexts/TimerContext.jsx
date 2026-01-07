import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { updateHabitDuration } from "../features/habits/habitsThunks";
import { updateTaskDuration } from "../features/tasks/tasksThunks";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
	const [timerHabit, setTimerHabit] = useState({ id: null, name: "" });
	const [timerOn, setTimerOn] = useState(false);
	const [timerRunning, setTimerRunning] = useState(false);
	const [timerDuration, setTimerDuration] = useState(0);
	const [todayDuration, setTodayDuration] = useState(0);

	const dispatch = useDispatch();

	const habitTimerStart = function (id, name, isHabit) {
		if (timerHabit.id !== id) setTimerDuration(0);
		setTimerHabit({ id, name, isHabit });
		setTimerRunning(true);
	};

	const habitTimerStop = function () {
		setTimerRunning(false);
	};

	const updateEntryDuration = async function (id, value, isHabit) {
		setTodayDuration((prev) => prev + value);

		if (isHabit) {
			dispatch(updateHabitDuration({ id, value }));
		} else {
			dispatch(updateTaskDuration({ id, value }));
		}
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
				todayDuration,
				setTodayDuration,
				updateEntryDuration,
			}}
		>
			{children}
		</TimerContext>
	);
}
