import { useState } from "react";
import { CreateHabitButton } from "./CreateHabitButton";
import { CreateTaskButton } from "./CreateTaskButton";

export function CreateButton() {
	const [buttonDisplay, setButtonDisplay] = useState(false);
	const handleClick = function () {
		setButtonDisplay(true);
	};

	let buttonDiv = null;
	if (buttonDisplay) {
		buttonDiv = (
			<>
				<CreateHabitButton setButtonDisplay={setButtonDisplay} />
				<CreateTaskButton setButtonDisplay={setButtonDisplay} />
			</>
		);
	}

	return (
		<>
			<div className="create-habit-div">
				{buttonDiv}
				<button className="create-habit" onClick={handleClick}>
					Add
				</button>
			</div>
		</>
	);
}
