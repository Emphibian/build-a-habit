import { useDispatch } from "react-redux";
import DeleteIcon from "../../assets/svgs/delete.svg?react";
import { deleteHabit } from "../../features/habits/habitsThunks.js";
import { deleteTask } from "../../features/tasks/tasksThunks.js";

export function DeleteButton({ id, isHabit, closeSidebar }) {
	const dispatch = useDispatch();

	function handleClick() {
		if (isHabit) dispatch(deleteHabit(id));
		else dispatch(deleteTask(id));
		closeSidebar();
	}

	return (
		<button className="danger" onClick={handleClick}>
			<DeleteIcon />
			<span>Delete</span>
		</button>
	);
}
