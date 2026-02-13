import { useDispatch } from "react-redux";
import { deleteTask } from "../../../features/tasks/tasksThunks";
import DeleteIcon from "../../../assets/svgs/delete.svg?react";

export const TaskName = ({ name, id }) => {
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(deleteTask(id));
	};

	return (
		<div className="entry">
			<p className="entry-name">{name}</p>
			<button className="danger" onClick={handleDelete}>
				<DeleteIcon />
			</button>
		</div>
	);
};
