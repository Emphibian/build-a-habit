import DeleteIcon from "../../../assets/svgs/delete.svg?react";

export const TaskName = ({ name }) => {
	const deleteTask = () => {};

	return (
		<div className="entry">
			<p className="entry-name">{name}</p>
			<button className="danger" onClick={deleteTask}>
				<DeleteIcon />
			</button>
		</div>
	);
};
