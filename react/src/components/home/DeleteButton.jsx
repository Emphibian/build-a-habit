import { useDispatch } from "react-redux";
import DeleteIcon from "../../assets/svgs/delete.svg?react";
import { deleteHabit } from "../../features/habits/habitsThunks.js";
import { deleteTask } from "../../features/tasks/tasksThunks.js";

export function DeleteButton({ id, updateUI, isHabit, closeSidebar }) {
	const dispatch = useDispatch();

	function handleClick() {
		// HabitAPI.deleteInstance(id, isHabit);
		if (isHabit) dispatch(deleteHabit(id));
		else dispatch(deleteTask(id));
		// updateUI(id);
		closeSidebar();
	}

	return (
		<button className="danger" onClick={handleClick}>
			<DeleteIcon />
			Delete
		</button>
	);
}
