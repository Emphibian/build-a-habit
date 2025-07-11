import { useState } from "react";

function CreateHabitModal({ isOpen, setOpen }) {
	const [habitName, setHabitName] = useState("");
	const [habitFreq, setHabitFreq] = useState("");

	if (!isOpen) return null;

	const handleCreation = async function (event) {
		event.preventDefault();

		closeModal();
		const requestURL = import.meta.env.VITE_SERVER + "/api/createHabit";
		const response = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ habitName, habitFreq }),
			credentials: "include",
		});

		const data = await response.json();
		console.log(data);
	};

	const closeModal = function () {
		setOpen(false);
	};

	return (
		<div className="habit-overlay" onClick={closeModal}>
			<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
				<form onSubmit={handleCreation}>
					<label>
						Habit Name:
						<input
							type="text"
							value={habitName}
							onChange={(event) => setHabitName(event.target.value)}
							placeholder="Habit Name"
							required
						/>
					</label>
					<label>
						Habit Frequency:
						<input
							type="text"
							value={habitFreq}
							onChange={(event) => setHabitFreq(event.target.value)}
							placeholder="Habit Frequency"
							required
						/>
					</label>
					<button type="submit">Create</button>
				</form>
			</div>
		</div>
	);
}

export function CreateHabitButton() {
	const [modalOpen, setModalOpen] = useState(false);

	function handleClick() {
		setModalOpen(true);
	}

	return (
		<>
			<button className="create-habit" onClick={handleClick}>
				Add
			</button>
			<CreateHabitModal isOpen={modalOpen} setOpen={setModalOpen} />
		</>
	);
}
