import Checkmark from "../../assets/svgs/checkmark.svg?react";
import Play from "../../assets/svgs/play.svg?react";
import Pause from "../../assets/svgs/pause.svg?react";
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
	isTimerRunning,
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

	let outerDivClasses = "habit";
	if (isTimerRunning) {
		outerDivClasses = "habit timer-on";
	}

	const fill = "#3B4554";
	return (
		<div className={outerDivClasses}>
			<div class="svg-icon">{isTimerRunning && <Play fill="#ff4081" />}</div>
			<p className="habit-name">{name}</p>
			<span>
				{prettyPrintDuration(workDuration)}/{prettyPrintDuration(timeEstimate)}
			</span>
			<button onClick={handleTimer}>
				{isTimerRunning ? <Pause fill={fill} /> : <Play fill={fill} />}
			</button>
			<button onClick={handleUpdate}>
				<Checkmark fill={fill} />
			</button>
			<button onClick={openSidebar}>{sidebarIcon}</button>
		</div>
	);
}
