import { useSelector } from "react-redux";
import { selectHabitsRemainingTime } from "../../features/habits/habitsSelectors";
import { selectTasksRemainingTime } from "../../features/tasks/tasksSelectors";

import prettyPrintDuration from "../../utils/prettyPrintDuration";
import WorkingTodayIcon from "../../assets/svgs/clock-check-outline.svg?react";
import EstimateRemainingIcon from "../../assets/svgs/progress-clock.svg?react";

function WorkingToday({ todayDuration }) {
	return (
		<div className="today-metric justify-center align-center">
			<span>Working today:</span>
			<span className="align-center">
				<strong>{prettyPrintDuration(todayDuration)}</strong>
				<WorkingTodayIcon />
			</span>
		</div>
	);
}

function EstimateRemaining({ estimate }) {
	const habitTime = useSelector(selectHabitsRemainingTime);
	const taskTime = useSelector(selectTasksRemainingTime);

	return (
		<div className="today-metric justify-center align-center">
			<span>Estimate remaining:</span>
			<span className="align-center">
				<strong>~{prettyPrintDuration(habitTime + taskTime)}</strong>
				<EstimateRemainingIcon />
			</span>
		</div>
	);
}

export function TodayMetrics({ todayDuration, estimate }) {
	return (
		<div className="today-metrics justify-center">
			<EstimateRemaining estimate={estimate} />
			<WorkingToday todayDuration={todayDuration} />
		</div>
	);
}
