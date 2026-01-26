import { useContext, useRef } from "react";
import { TimerContext } from "../../../contexts/TimerContext";
import { useDispatch } from "react-redux";
import { updateEstimate } from "../../../features/habits/habitsThunks";
import { setTaskEstimate } from "../../../features/tasks/tasksThunks";
import { CSSTransition } from "react-transition-group";

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

	const nodeRef = useRef(null);
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

	return (
		<CSSTransition
			nodeRef={nodeRef}
			in={exceededModalOpen && !dismissed}
			timeout={500}
			classNames="exceed"
			unmountOnExit
		>
			<div ref={nodeRef} className="exceeded-area-outer">
				<div className="exceeded-area-inner">
					<span>
						<StopwatchIcon />
						Time exceeded for "{timerHabit.name}"
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
		</CSSTransition>
	);
};
