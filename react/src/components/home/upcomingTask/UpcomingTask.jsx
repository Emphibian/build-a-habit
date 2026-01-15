import CalendarMonth from "../../../assets/svgs/calendar-month.svg?react";

function prettyPrintDate(date) {
	const dateObj = new Date(date);

	const dayOfMonth = dateObj.getDate();
	const month = dateObj.getMonth() + 1;

	return `${dayOfMonth}/${month}`;
}

export function UpcomingTask({ name, scheduledOn }) {
	return (
		<div className="entry">
			<p className="entry-name">{name}</p>
			<button>
				<CalendarMonth />
				<div class="time-badge">{prettyPrintDate(scheduledOn)}</div>
			</button>
		</div>
	);
}
