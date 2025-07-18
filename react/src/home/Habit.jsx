import { useState, useEffect } from "react";
import Checkmark from "../assets/svgs/checkmark.svg?react";

import { Timer } from "./Timer";

function DoneModal({ isOpen, setOpen, handleHabitUpdate }) {
	const [inputValue, setInputValue] = useState("");
	if (!isOpen) return null;

	const closeModal = function () {
		setOpen(false);
	};

	const handleUpdate = async function (event) {
		event.preventDefault();

		closeModal();
		handleHabitUpdate(inputValue);
	};

	return (
		<div className="habit-overlay" onClick={closeModal}>
			<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
				<form onSubmit={handleUpdate}>
					<label>
						Value:
						<input
							type="text"
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							placeholder="Value"
							required
						/>
					</label>
					<button type="submit">Update</button>
				</form>
			</div>
		</div>
	);
}

function Habit({ name, handleUpdate, handleTimer }) {
	const fill = "#3B4554";
	return (
		<div className="habit">
			<p className="habit-name">{name}</p>
			<button onClick={handleUpdate}>
				<Checkmark fill={fill} />
			</button>
			<button onClick={handleTimer}>Timer</button>
		</div>
	);
}

export function Habits() {
	const [habits, setHabits] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [doneModalOpen, setDoneModalOpen] = useState(false);
	const [doneModalUpdate, setDoneModalUpdate] = useState(() => () => {});
	const [timerOn, setTimerOn] = useState(false);
	const [timerHabit, setTimerHabit] = useState("");
	const [addDuration, setAddDuration] = useState(() => () => {});

	useEffect(() => {
		async function getHabits() {
			const requestURL = import.meta.env.VITE_SERVER + "/api/habitsInstances";
			const response = await fetch(requestURL, { credentials: "include" });

			if (!response.ok) {
				setHabits(null);
				return;
			}

			const data = await response.json();
			setHabits(data.habits);
		}

		async function getTasks() {
			const requestURL = import.meta.env.VITE_SERVER + "/api/tasks";
			const response = await fetch(requestURL, { credentials: "include" });

			if (!response.ok) {
				setTasks(null);
				return;
			}

			const data = await response.json();
			setTasks(data.tasks);
		}

		getHabits();
		getTasks();
	}, []);

	const checkIfComplete = async function (value, target, type) {
		if (type === "duration") {
			return parseInt(value) > parseInt(target);
		} else if (type === "number") {
			return parseInt(value) > parseInt(target);
		} else if (type === "yes/no") {
			return true;
		}
	};

	const handleComplete = async function (id, value, target, type) {
		if (!checkIfComplete(value, target, type)) return;

		const requestURL =
			import.meta.env.VITE_SERVER + "/api/habit/completed/" + id;
		const response = await fetch(requestURL, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				value,
			}),
			credentials: "include",
		});
		const updatedHabit = await response.json();
		setHabits(habits.map((habit) => (id === habit._id ? updatedHabit : habit)));
		console.log(habits);
	};

	const updateValue = function (id, value, target, type) {
		if (type === "yes/no") {
			handleComplete(id, value, target, type);
			return;
		}

		setDoneModalUpdate(() => (value) => {
			handleComplete(id, value, target, type);
		});
		setDoneModalOpen(true);
	};

	const habitTimerStart = function (id, name, isHabit) {
		setTimerHabit(name);
		setTimerOn(true);
		setAddDuration(() => (value) => {
			updateHabitDuration(id, value, isHabit);
		});
	};

	const updateTask = async function (id) {
		const requestURL =
			import.meta.env.VITE_SERVER + "/api/task/completed/" + id;
		const response = await fetch(requestURL, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		const updatedTask = await response.json();
		setTasks(tasks.map((task) => (id === task._id ? updatedTask : task)));
	};

	const updateHabitDuration = async function (id, value, isHabit) {
		const requestURL =
			import.meta.env.VITE_SERVER +
			`/api/${isHabit ? "habit" : "task"}/addDuration/` +
			id;

		const response = await fetch(requestURL, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				value,
			}),
			credentials: "include",
		});

		const updatedHabit = await response.json();
		if (isHabit) {
			setHabits(
				habits.map((habit) => (id === habit._id ? updatedHabit : habit)),
			);
		} else {
			setTasks(tasks.map((task) => (id === task._id ? updatedHabit : task)));
		}
	};

	return (
		<div className="habits-container">
			<div className="todo-habits">
				<h2>To do</h2>
				{habits.map((habit) => {
					if (habit.status === "Not Completed") {
						return (
							<Habit
								key={habit._id}
								name={habit.name}
								handleUpdate={() =>
									updateValue(
										habit._id,
										habit.goalValue,
										habit.goalTarget,
										habit.goalType,
									)
								}
								handleTimer={() => {
									habitTimerStart(habit._id, habit.name, true);
								}}
							/>
						);
					}
				})}
				{tasks.map((task) => {
					if (!task.completed) {
						return (
							<Habit
								key={task._id}
								name={task.name}
								handleUpdate={() => {
									updateTask(task._id);
								}}
								handleTimer={() => {
									habitTimerStart(task._id, task.name, false);
								}}
							/>
						);
					}
				})}
			</div>
			<div className="done-habits">
				<h2>Completed</h2>
				{habits.map((habit) => {
					if (habit.status === "Completed") {
						return (
							<Habit
								key={habit._id}
								name={habit.name}
								handleUpdate={() =>
									updateValue(
										habit._id,
										habit.goalValue,
										habit.goalTarget,
										habit.goalType,
									)
								}
							/>
						);
					}
				})}
			</div>
			<DoneModal
				isOpen={doneModalOpen}
				setOpen={setDoneModalOpen}
				handleHabitUpdate={doneModalUpdate}
			/>
			<Timer
				timerOn={timerOn}
				setTimerOn={setTimerOn}
				habitName={timerHabit}
				addDuration={addDuration}
			/>
		</div>
	);
}
