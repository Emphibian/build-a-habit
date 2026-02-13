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
			<div className="date-area">
				<div className="date">{dateString}</div>
				<div className="date-line"></div>
			</div>
			{tasks.map((task) => {
				return <TaskName name={task.name} id={task._id} />;
			})}
		</div>
	);
};
