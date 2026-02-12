import { TaskName } from "./TaskName.jsx";

const extractDate = (dateString) => {
	const date = new Date(dateString);
	const dayOfMonth = String(date.getDate()).padStart(2, "0");
	const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
		date,
	);
	const year = date.getFullYear();

	return `${dayOfMonth} ${month}, ${year}`;
};

export const DateContainer = ({ tasks, date }) => {
	const dateString = extractDate(date);

	return (
		<div className="date-container">
			<span>{dateString}</span>
			{tasks.map((task) => {
				return <TaskName name={task.name} />;
			})}
		</div>
	);
};
