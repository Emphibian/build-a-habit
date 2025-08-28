import HabitAPI from "../../api/habitAPI.js";

export function DeleteButton({ id, updateUI, isHabit, closeSidebar }) {
	function handleClick() {
		HabitAPI.deleteInstance(id, isHabit);
		updateUI(id);
		closeSidebar();
	}

	return (
		<button className="danger" onClick={handleClick}>
			Delete
		</button>
	);
}
