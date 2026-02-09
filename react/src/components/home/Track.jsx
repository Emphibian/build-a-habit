import SidebarOpen from "../../assets/svgs/menu-open.svg?react";
import SidebarClose from "../../assets/svgs/menu-close.svg?react";

function descriptiveName(frequency, frequencyInfo) {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let returnString = "";
	switch (frequency) {
		case "daily":
			return "Every Day";
		case "weekly":
			for (let i of frequencyInfo.split(",")) {
				returnString += days[i] + ", ";
			}
			return returnString.slice(0, -2);
	}
}

export function Track({
	name,
	frequency,
	frequencyInfo,
	openSidebar,
	isSidebarOpen,
	openOperationModal,
}) {
	let sidebarIcon;
	if (isSidebarOpen) {
		sidebarIcon = <SidebarOpen />;
	} else {
		sidebarIcon = <SidebarClose />;
	}

	const handleRightClick = (e) => {
		e.preventDefault();
		const position = { x: e.clientX, y: e.clientY };

		openOperationModal(position);
	};

	return (
		<div className="entry" onContextMenu={handleRightClick}>
			<p className="entry-name">{name}</p>
			<p className="entry-frequency">
				{descriptiveName(frequency, frequencyInfo)}
			</p>
			<button onClick={openSidebar}>{sidebarIcon}</button>
		</div>
	);
}
