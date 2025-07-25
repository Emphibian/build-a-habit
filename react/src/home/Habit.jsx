import Checkmark from "../assets/svgs/checkmark.svg?react";

export function Habit({ name, workDuration, handleUpdate, handleTimer }) {
	const prettyPrintDuration = function (workDuration) {
		if (workDuration < 60) return `${workDuration}m`;
		const hours = Math.floor(workDuration / 60);
		const minutes = workDuration % 60;

		return `${hours}h ${minutes}m`;
	};

	const fill = "#3B4554";
	return (
		<div className="habit">
			<p className="habit-name">{name}</p>
			<span>{prettyPrintDuration(workDuration)}</span>
			<button onClick={handleUpdate}>
				<Checkmark fill={fill} />
			</button>
			<button onClick={handleTimer}>Timer</button>
		</div>
	);
}
