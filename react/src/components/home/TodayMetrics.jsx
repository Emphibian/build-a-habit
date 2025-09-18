import prettyPrintDuration from "../../utils/prettyPrintDuration";
import WorkingTodayIcon from "../../assets/svgs/clock-check-outline.svg?react";

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

export function TodayMetrics({ todayDuration }) {
	return (
		<div className="today-metrics">
			<WorkingToday todayDuration={todayDuration} />
		</div>
	);
}
