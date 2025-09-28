import HabitAPI from "../../api/habitAPI.js";
import DeleteIcon from "../../assets/svgs/delete.svg?react";

export function DeleteButton({ id, updateUI, isHabit, closeSidebar }) {
	function handleClick() {
		HabitAPI.deleteInstance(id, isHabit);
		updateUI(id);
		closeSidebar();
	}

	return (
		<button className="danger" onClick={handleClick}>
			<DeleteIcon />
			Delete
		</button>
	);
}
