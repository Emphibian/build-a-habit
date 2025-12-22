import Checkmark from "../../assets/svgs/checkmark.svg?react";
import Play from "../../assets/svgs/play.svg?react";
import Pause from "../../assets/svgs/pause.svg?react";
import SidebarOpen from "../../assets/svgs/menu-open.svg?react";
import SidebarClose from "../../assets/svgs/menu-close.svg?react";
import prettyPrintDuration from "../../utils/prettyPrintDuration";

import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateHabitName } from "../../features/habits/habitsThunks";
import { updateTaskName } from "../../features/tasks/tasksThunks";

export function Habit({
	name,
	workDuration,
	handleTimer,
	openSidebar,
	timeEstimate,
	isSidebarOpen,
	isTimerRunning,
	setFocus,
	focused,
	handleUpdate,
	id,
	isHabit,
}) {
	const [value, setValue] = useState(name);
	const [editing, setEditing] = useState(false);
	const textRef = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		if (editing && textRef.current) {
			textRef.current.focus();
			const len = textRef.current.value.length;
			textRef.current.setSelectionRange(len, len);
		}
	}, [editing]);

	const startEdit = () => setEditing(true);
	const finishEdit = async () => {
		setEditing(false);
		await updateName(value);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			finishEdit();
		}
	};

	const updateName = async (value) => {
		if (isHabit) {
			await dispatch(updateHabitName({ id, name: value }));
		} else {
			await dispatch(updateTaskName({ id, name: value }));
		}
	};

	let sidebarIcon;
	if (isSidebarOpen) {
		sidebarIcon = <SidebarOpen />;
	} else {
		sidebarIcon = <SidebarClose />;
	}

	let outerDivClasses = "habit";
	if (isTimerRunning) {
		outerDivClasses = "habit timer-on";
	}

	if (focused) {
		outerDivClasses += " focused";
	}

	const fill = "#3B4554";
	return (
		<div onClick={setFocus} className={outerDivClasses}>
			<div className="svg-icon">
				{isTimerRunning && <Play fill="#ff4081" />}
			</div>
			<textarea
				ref={textRef}
				tabIndex={0}
				readOnly={!editing}
				className={`
					habit-name
					${editing ? "edit-mode" : "display-mode"}
				`}
				suppressContentEditableWarning
				onClick={!editing ? startEdit : undefined}
				onBlur={finishEdit}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				value={value}
				rows={1}
			/>
			<span>
				{prettyPrintDuration(workDuration)} /{" "}
				{prettyPrintDuration(timeEstimate)}
			</span>
			<div className="button-hover">
				<button onClick={handleTimer}>
					{isTimerRunning ? <Pause fill={fill} /> : <Play fill={fill} />}
				</button>
				<button onClick={handleUpdate}>
					<Checkmark fill={fill} />
				</button>
				<button onClick={openSidebar}>{sidebarIcon}</button>
			</div>
		</div>
	);
}
