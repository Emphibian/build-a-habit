import { useContext } from "react";
import { TimerContext } from "../../../contexts/TimerContext";
import StopwatchIcon from "../../../assets/svgs/timer.svg?react";

export const TimeExceededModal = () => {
	const { exceededModalOpen, dismissed, setDismissed } =
		useContext(TimerContext);

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
					<button>Add 1/2 hour</button>
				</div>
			</div>
		</div>
	);
};
