import { useState } from "react";
import { CreateHabitButton } from "./CreateHabitButton";
import { CreateTaskButton } from "./CreateTaskButton";

import PlusIcon from "../../assets/svgs/plus.svg?react";

export function CreateButton() {
	const [buttonDisplay, setButtonDisplay] = useState(false);
	const handleClick = function() {
		let buttons = document.querySelectorAll(".spawned");
		buttons.forEach((button) => {
			button.classList.remove("spawned");
		});

		setTimeout(() => setButtonDisplay((value) => !value), 100);
	};

	let addButton = document.querySelector("button.create-habit:last-child");
	addButton?.classList.remove("pressed");

	let buttonDiv = null;
	if (buttonDisplay) {
		addButton.classList.add("pressed");
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
					<PlusIcon />
				</button>
			</div>
		</>
	);
}
