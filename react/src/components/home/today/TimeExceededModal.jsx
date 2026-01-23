import { useContext } from "react";
import { TimerContext } from "../../../contexts/TimerContext";
import StopwatchIcon from "../../../assets/svgs/timer.svg?react";

export const TimeExceededModal = () => {
	const { exceededModalOpen } = useContext(TimerContext);

	if (!exceededModalOpen) return null;

	return (
		<div className="exceeded-area-outer">
			<div className="exceeded-area-inner">
				<span>
					<StopwatchIcon />
					Time exceeded for habit ""
				</span>
				<div>
					<button>Dismiss</button>
					<button>Add 1/2 hour</button>
				</div>
			</div>
		</div>
	);
};
