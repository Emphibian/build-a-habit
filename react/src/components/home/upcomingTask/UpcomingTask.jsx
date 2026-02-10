import CalendarMonth from "../../../assets/svgs/calendar-month.svg?react";

function prettyPrintDate(date) {
	const dateObj = new Date(date);

	const dayOfMonth = dateObj.getDate();
	const month = dateObj.getMonth() + 1;

	return `${dayOfMonth}/${month}`;
}

export function UpcomingTask({
	name,
	scheduledOn,
	openModal,
	openOperationModal,
}) {
	const handleRightClick = (e) => {
		e.preventDefault();
		const position = { x: e.clientX, y: e.clientY };

		openOperationModal(position);
	};

	return (
		<div className="entry" onContextMenu={handleRightClick}>
			<p className="entry-name">{name}</p>
			<button onClick={openModal}>
				<CalendarMonth />
				<div className="time-badge">{prettyPrintDate(scheduledOn)}</div>
			</button>
		</div>
	);
}
