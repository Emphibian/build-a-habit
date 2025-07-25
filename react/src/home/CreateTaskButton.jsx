import { useState } from "react";

function CreateTaskModal({ isOpen, setOpen }) {
	const [taskName, setTaskName] = useState("");
	const [date, setDate] = useState("");

	if (!isOpen) return null;

	const handleCreation = async function (event) {
		event.preventDefault();
		closeModal();

		const requestURL = import.meta.env.VITE_SERVER + "/api/createTask";
		const response = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				taskName,
				scheduledOnString: date,
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
						Task Name:
						<input
							type="text"
							value={taskName}
							onChange={(event) => setTaskName(event.target.value)}
							placeholder="Task Name"
							required
						/>
					</label>
					<label>
						Schedule on:
						<input
							type="date"
							value={date}
							onChange={(event) => {
								setDate(event.target.value);
							}}
						/>
					</label>
					<button type="submit">Create</button>
				</form>
			</div>
		</div>
	);
}

export function CreateTaskButton() {
	const [modalOpen, setModalOpen] = useState(false);

	function handleClick() {
		setModalOpen(true);
	}

	return (
		<>
			<button className="create-habit" onClick={handleClick}>
				Add Task
			</button>
			<CreateTaskModal isOpen={modalOpen} setOpen={setModalOpen} />
		</>
	);
}
