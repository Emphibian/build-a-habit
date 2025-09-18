import { useState, useEffect, useContext } from "react";
import { Timer } from "./Timer";
import { Habit } from "./Habit";
import { HabitSidebar } from "./HabitSidebar.jsx";
import habitAPI from "../../api/habitAPI.js";
import { HabitsContext } from "../../contexts/HabitContext.jsx";
import { TodayMetrics } from "./TodayMetrics.jsx";

function DoneModal({ isOpen, setOpen, handleHabitUpdate }) {
	const [inputValue, setInputValue] = useState("");
	if (!isOpen) return null;
	const closeModal = function() {
		setOpen(false);
	};

	const handleUpdate = async function(event) {
		event.preventDefault();

		closeModal();
		handleHabitUpdate(inputValue);
	};

	return (
		<div className="habit-overlay" onClick={closeModal}>
			<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
				<form onSubmit={handleUpdate}>
					<label>
						<input
							type="text"
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							required
						/>
						<span>Value</span>
					</label>
					<button type="submit">Update</button>
				</form>
			</div>
		</div>
	);
}

export function Habits() {
	const [doneModalOpen, setDoneModalOpen] = useState(false);
	const [doneModalUpdate, setDoneModalUpdate] = useState(() => () => { });
	const [sidebarHabit, setSidebarHabit] = useState(null);
	const [timerHabit, setTimerHabit] = useState({ id: null, name: "" });
	const [timerOn, setTimerOn] = useState(false);
	const [timerRunning, setTimerRunning] = useState(false);
	const [timerDuration, setTimerDuration] = useState(0);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [todayDuration, setTodayDuration] = useState(0);

	useEffect(() => {
		async function loadDuration() {
			const response = await habitAPI.getTodayDuration();
			setTodayDuration(response.duration);
		}

		loadDuration();
	}, []);

	const { habits, setHabits, tasks, setTasks } = useContext(HabitsContext);

	const checkIfComplete = async function(value, target, type) {
		if (type === "duration") {
			return parseInt(value) >= parseInt(target);
		} else if (type === "number") {
			return parseInt(value) >= parseInt(target);
		} else if (type === "yes/no") {
			return true;
		}
	};

	const handleComplete = async function(id, value, target, type) {
		if (!checkIfComplete(value, target, type)) return;

		const updatedHabit = await habitAPI.markComplete(id, value);
		setHabits(habits.map((habit) => (id === habit._id ? updatedHabit : habit)));
	};

	const updateValue = function(id, value, target, type) {
		if (type === "yes/no") {
			handleComplete(id, value, target, type);
			return;
		}

		setDoneModalUpdate(() => (value) => {
			handleComplete(id, value, target, type);
		});
		setDoneModalOpen(true);
	};

	const habitTimerStart = function(id, name, isHabit) {
		if (timerHabit.id !== id) setTimerDuration(0);
		setTimerHabit({ id, name, isHabit });
		setTimerRunning(true);
	};

	const habitTimerStop = function() {
		setTimerRunning(false);
	};

	const updateTask = async function(id) {
		const updatedTask = await habitAPI.updateTask(id);
		setTasks(tasks.map((task) => (id === task._id ? updatedTask : task)));
	};

	const updateHabitDuration = async function(id, value, isHabit) {
		setTodayDuration((prev) => prev + value);
		const updatedHabit = await habitAPI.updateHabitDuration(id, value, isHabit);
		if (isHabit) {
			setHabits(
				habits.map((habit) => (id === habit._id ? updatedHabit : habit)),
			);
		} else {
			setTasks(tasks.map((task) => (id === task._id ? updatedHabit : task)));
		}
	};

	const handleDelete = async function(id) {
		setHabits(habits.filter((habit) => id !== habit._id));
		setTasks(tasks.filter((task) => id !== task._id));
	};

	const updateEstimate = async function(id, newEstimate, isHabit) {
		const updatedHabit = await habitAPI.updateEstimate(
			id,
			newEstimate,
			isHabit,
		);
		if (isHabit) {
			setHabits(
				habits.map((habit) => (id === habit._id ? updatedHabit : habit)),
			);
		} else {
			setTasks(tasks.map((task) => (id === task._id ? updatedHabit : task)));
		}
	};

	const updateTimeSpent = async function(id, timeSpent, isHabit) {
		const updatedHabit = await habitAPI.updateTimeSpent(id, timeSpent, isHabit);
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
			<TodayMetrics todayDuration={todayDuration} />
			<div className="todo-habits">
				{habits.map((habit) => {
					if (habit.status === "Not Completed") {
						return (
							<Habit
								key={habit._id}
								name={habit.name}
								workDuration={habit.workDuration}
								timeEstimate={habit.timeEstimate}
								handleUpdate={() =>
									updateValue(
										habit._id,
										habit.goalValue,
										habit.goalTarget,
										habit.goalType,
									)
								}
								handleTimer={() => {
									// update the previous running instance
									habitTimerStop();
									if (!timerRunning || timerHabit.id !== habit._id) {
										setTimerHabit({
											id: habit._id,
											name: habit.name,
											isHabit: true,
											estimate:
												habit.timeEstimate === undefined
													? 0
													: habit.timeEstimate,
										});
										habitTimerStart(habit._id, habit.name, true);
									}
								}}
								openSidebar={() => {
									setSidebarHabit({ id: habit._id, isHabit: true });
									setSidebarOpen(true);
								}}
								isSidebarOpen={sidebarOpen && habit._id === sidebarHabit?.id}
								isTimerRunning={timerRunning && habit._id === timerHabit?.id}
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
								workDuration={task.workDuration}
								handleUpdate={() => {
									updateTask(task._id);
								}}
								handleTimer={() => {
									// update the previous running instance
									habitTimerStop();
									if (!timerRunning || timerHabit.id !== task._id) {
										setTimerHabit({
											id: task._id,
											name: task.name,
											isHabit: false,
											estimate:
												task.timeEstimate === undefined ? 0 : task.timeEstimate,
										});
										habitTimerStart(task._id, task.name, true);
									}
								}}
								openSidebar={() => {
									setSidebarHabit({ id: task._id, isHabit: false });
									setSidebarOpen(true);
								}}
								isSidebarOpen={sidebarOpen && task._id === sidebarHabit?.id}
								isTimerRunning={timerRunning && task._id === timerHabit?.id}
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
								workDuration={habit.workDuration}
								handleUpdate={() =>
									updateValue(
										habit._id,
										habit.goalValue,
										habit.goalTarget,
										habit.goalType,
									)
								}
								openSidebar={() => {
									setSidebarHabit({ id: habit._id, isHabit: true });
									setSidebarOpen(true);
								}}
								isSidebarOpen={sidebarOpen && habit._id === sidebarHabit?.id}
							/>
						);
					}
				})}
				{tasks.map((task) => {
					if (task.completed) {
						return (
							<Habit
								key={task._id}
								name={task.name}
								workDuration={task.workDuration}
								handleUpdate={() => {
									updateTask(task._id);
								}}
								openSidebar={() => {
									setSidebarHabit({ id: task._id, isHabit: false });
									setSidebarOpen(true);
								}}
								isSidebarOpen={sidebarOpen && task._id === sidebarHabit?.id}
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
				timerRunning={timerRunning}
				setTimerRunning={setTimerRunning}
				habitName={timerHabit.name}
				timeEstimate={timerHabit.estimate}
				addDuration={(value) => {
					updateHabitDuration(timerHabit.id, value, timerHabit.isHabit);
				}}
				addEstimate={(value) => {
					updateEstimate(
						timerHabit.id,
						value + timerHabit.estimate,
						timerHabit.isHabit,
					);
				}}
				duration={timerDuration}
				incrementDuration={() => setTimerDuration((prev) => prev + 1)}
			/>
			<HabitSidebar
				instance={sidebarHabit}
				open={sidebarOpen}
				close={() => {
					setSidebarOpen(false);
				}}
				updateEstimate={updateEstimate}
				updateTimeSpent={updateTimeSpent}
				handleDelete={(id) => handleDelete(id)}
			/>
		</div>
	);
}
