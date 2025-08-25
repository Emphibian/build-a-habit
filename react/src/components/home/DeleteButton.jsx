import HabitAPI from "../../api/habitAPI.js";

export function DeleteButton({ id, updateUI, isHabit }) {
	function handleClick() {
		HabitAPI.deleteInstance(id, isHabit);
		updateUI(id);
	}

	return (
		<button className="danger" onClick={handleClick}>
			Delete
		</button>
	);
}
