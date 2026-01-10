import { useState, useEffect, useContext, useRef } from "react";

import { TimerContext } from "../../contexts/TimerContext.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, markComplete } from "../../features/habits/habitsThunks";
import { fetchTasks, taskComplete } from "../../features/tasks/tasksThunks";
import { selectDueHabits } from "../../features/habits/habitsSelectors";
import { selectDueTasks } from "../../features/tasks/tasksSelectors";

import { Habit } from "./Habit";
import { HabitSidebar } from "./HabitSidebar.jsx";
import { DoneContainer } from "./DoneContainer.jsx";
import { TodayMetrics } from "./TodayMetrics.jsx";
import { OperationModal } from "./OperationModal.jsx";
import { DoneModal } from "./DoneModal.jsx";
import habitAPI from "../../api/habitAPI.js";

export function Habits() {
	const [doneModalOpen, setDoneModalOpen] = useState(false);
	const [doneModalUpdate, setDoneModalUpdate] = useState(() => () => {});
	const [sidebarHabit, setSidebarHabit] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [focusedId, setFocusedId] = useState(null);
	const [operationModalOpen, setOperationModalOpen] = useState(false);
	const [operationModalPos, setOperationModalPos] = useState(null);

	const habitContainerRef = useRef(null);

	const allHabits = useSelector(selectDueHabits);
	const allTasks = useSelector(selectDueTasks);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchHabits());
		dispatch(fetchTasks());
		async function loadDuration() {
			const response = await habitAPI.getTodayDuration();
			setTodayDuration(response.duration);
		}

		loadDuration();
	}, [dispatch]);

	useEffect(() => {
		if (sidebarOpen) {
			habitContainerRef.current.classList.add("shrink");
		} else {
			habitContainerRef.current.classList.remove("shrink");
		}
	}, [sidebarOpen]);

	const {
		habitTimerStart,
		habitTimerStop,
		timerHabit,
		timerRunning,
		todayDuration,
		setTodayDuration,
	} = useContext(TimerContext);

	const checkIfComplete = async function (value, target, type) {
		if (type === "duration") {
			return parseInt(value) >= parseInt(target);
		} else if (type === "number") {
			return parseInt(value) >= parseInt(target);
		} else if (type === "yes/no") {
			return true;
		}
	};

	const handleComplete = async function (id, value, target, type) {
		if (!checkIfComplete(value, target, type)) return;
		dispatch(markComplete({ id, value }));
	};

	const updateValue = function (id, value, target, type) {
		// skip done modal if type is yes/no
		if (type === "yes/no") {
			handleComplete(id, value, target, type);
			return;
		}

		setDoneModalUpdate(() => (value) => {
			handleComplete(id, value, target, type);
		});
		setDoneModalOpen(true);
	};

	const updateTask = async function (id) {
		dispatch(taskComplete(id));
	};

	return (
		<div className="habits-container" ref={habitContainerRef}>
			<TodayMetrics todayDuration={todayDuration} />
			<div className="todo-habits">
				{allHabits.map((habit, index) => {
					return (
						<Habit
							key={habit._id}
							id={habit._id}
							isHabit={true}
							name={habit.name}
							workDuration={habit.workDuration}
							timeEstimate={habit.timeEstimate}
							setFocus={() => setFocusedId("h" + index)}
							focused={focusedId === "h" + index}
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
									habitTimerStart(
										habit._id,
										habit.name,
										true,
										habit.timeEstimate,
									);
								}
							}}
							openSidebar={() => {
								setSidebarHabit({ id: habit._id, isHabit: true });
								setSidebarOpen(true);
							}}
							openOperationModal={(position) => {
								setSidebarHabit({ id: habit._id, isHabit: true });
								setOperationModalOpen(true);
								setOperationModalPos(position);
							}}
							isSidebarOpen={sidebarOpen && habit._id === sidebarHabit?.id}
							isTimerRunning={timerRunning && habit._id === timerHabit?.id}
						/>
					);
				})}
				{allTasks.map((task, index) => {
					return (
						<Habit
							key={task._id}
							id={task._id}
							isHabit={false}
							name={task.name}
							workDuration={task.workDuration}
							timeEstimate={task.timeEstimate}
							setFocus={() => setFocusedId("t" + index)}
							focused={focusedId === "t" + index}
							handleUpdate={() => {
								updateTask(task._id);
							}}
							handleTimer={() => {
								// update the previous running instance
								habitTimerStop();
								if (!timerRunning || timerHabit.id !== task._id) {
									habitTimerStart(
										task._id,
										task.name,
										false,
										task.timeEstimate,
									);
								}
							}}
							openSidebar={() => {
								setSidebarHabit({ id: task._id, isHabit: false });
								setSidebarOpen(true);
							}}
							openOperationModal={(position) => {
								setSidebarHabit({ id: task._id, isHabit: false });
								setOperationModalOpen(true);
								setOperationModalPos(position);
							}}
							isSidebarOpen={sidebarOpen && task._id === sidebarHabit?.id}
							isTimerRunning={timerRunning && task._id === timerHabit?.id}
						/>
					);
				})}
			</div>
			<div className="done-habits"></div>
			<DoneContainer
				updateValue={updateValue}
				setSidebarHabit={setSidebarHabit}
				setSidebarOpen={setSidebarOpen}
				sidebarOpen={sidebarOpen}
				sidebarHabit={sidebarHabit}
				updateTask={updateTask}
				setOperationModalOpen={setOperationModalOpen}
				setOperationModalPos={setOperationModalPos}
			/>
			<DoneModal
				isOpen={doneModalOpen}
				setOpen={setDoneModalOpen}
				handleHabitUpdate={doneModalUpdate}
			/>
			<HabitSidebar
				instance={sidebarHabit}
				open={sidebarOpen}
				close={() => {
					setSidebarOpen(false);
				}}
			/>
			<OperationModal
				instance={sidebarHabit}
				open={operationModalOpen}
				position={operationModalPos}
				close={() => setOperationModalOpen(false)}
			/>
		</div>
	);
}
