import { useContext } from "react";
import { TimerContext } from "../../../contexts/TimerContext";
import { useDispatch } from "react-redux";
import { updateEstimate } from "../../../features/habits/habitsThunks";
import { setTaskEstimate } from "../../../features/tasks/tasksThunks";

import StopwatchIcon from "../../../assets/svgs/timer.svg?react";

export const TimeExceededModal = () => {
	const {
		exceededModalOpen,
		dismissed,
		setDismissed,
		timerHabit,
		timerDuration,
		setTimerEstimate,
	} = useContext(TimerContext);

	const dispatch = useDispatch();

	const addEstimate = (estimate) => {
		if (timerHabit.isHabit) {
			dispatch(
				updateEstimate({
					id: timerHabit.id,
					estimate,
				}),
			);
		} else {
			dispatch(
				setTaskEstimate({
					id: timerHabit.id,
					estimate,
				}),
			);
		}
	};

	if (!exceededModalOpen || dismissed) return null;

	return (
		<div className="exceeded-area-outer">
			<div className="exceeded-area-inner">
				<span>
					<StopwatchIcon />
					Time exceeded for habit ""
				</span>
				<div>
					<button onClick={() => setDismissed(true)}>Dismiss</button>
					<button
						onClick={() => {
							addEstimate(timerDuration + 30);
							setTimerEstimate(timerDuration + 30);
						}}
					>
						Add 1/2 hour
					</button>
				</div>
			</div>
		</div>
	);
};
