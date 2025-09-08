import Checkmark from "../../assets/svgs/checkmark.svg?react";
import Play from "../../assets/svgs/play.svg?react";
import SidebarOpen from "../../assets/svgs/menu-open.svg?react";
import SidebarClose from "../../assets/svgs/menu-close.svg?react";

export function Habit({
	name,
	workDuration,
	handleUpdate,
	handleTimer,
	openSidebar,
	timeEstimate,
	isSidebarOpen,
}) {
	const prettyPrintDuration = function (workDuration) {
		if (isNaN(workDuration)) return "-";
		if (workDuration < 60) return `${workDuration}m`;
		const hours = Math.floor(workDuration / 60);
		const minutes = workDuration % 60;

		return `${hours}h ${minutes}m`;
	};

	let sidebarIcon;
	if (isSidebarOpen) {
		sidebarIcon = <SidebarOpen />;
	} else {
		sidebarIcon = <SidebarClose />;
	}

	const fill = "#3B4554";
	return (
		<div className="habit">
			<p className="habit-name">{name}</p>
			<span>
				{prettyPrintDuration(workDuration)}/{prettyPrintDuration(timeEstimate)}
			</span>
			<button onClick={handleTimer}>
				<Play fill={fill} />
			</button>
			<button onClick={handleUpdate}>
				<Checkmark fill={fill} />
			</button>
			<button onClick={openSidebar}>{sidebarIcon}</button>
		</div>
	);
}
