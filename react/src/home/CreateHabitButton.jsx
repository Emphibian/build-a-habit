import { useState } from "react";

function CreateHabitModal({ isOpen, setOpen }) {
	const [habitName, setHabitName] = useState("");
	const [habitFreq, setHabitFreq] = useState("");
	const [habitFreqInfo, setHabitFreqInfo] = useState("");
	const [goalType, setGoalType] = useState("");
	const [target, setTarget] = useState("");

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
			body: JSON.stringify({
				habitName,
				habitFreq,
				habitFreqInfo,
				goalType,
				target,
			}),
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
					<label>
						Habit Frequency Info:
						<input
							type="text"
							value={habitFreqInfo}
							onChange={(event) => setHabitFreqInfo(event.target.value)}
							placeholder="Habit Frequency Info"
							required
						/>
					</label>
					<label>
						Goal Type:
						<input
							type="text"
							value={goalType}
							onChange={(event) => setGoalType(event.target.value)}
							placeholder="Goal Type"
							required
						/>
					</label>
					<label>
						Target:
						<input
							type="text"
							value={target}
							onChange={(event) => setTarget(event.target.value)}
							placeholder="Target"
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
