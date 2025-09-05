import Checkmark from "../../assets/svgs/checkmark.svg?react";
import Play from "../../assets/svgs/play.svg?react";

export function Habit({
	name,
	workDuration,
	handleUpdate,
	handleTimer,
	openSidebar,
	timeEstimate,
}) {
	const prettyPrintDuration = function (workDuration) {
		if (isNaN(workDuration)) return "-";
		if (workDuration < 60) return `${workDuration}m`;
		const hours = Math.floor(workDuration / 60);
		const minutes = workDuration % 60;

		return `${hours}h ${minutes}m`;
	};

	const fill = "#3B4554";
	return (
		<div className="habit">
			<p className="habit-name">{name}</p>
			<button onClick={handleTimer}>
				<Play fill={fill} />
			</button>
			<span>
				{prettyPrintDuration(workDuration)}/{prettyPrintDuration(timeEstimate)}
			</span>
			<button onClick={handleUpdate}>
				<Checkmark fill={fill} />
			</button>
			<button onClick={openSidebar}>Sidebar</button>
		</div>
	);
}
