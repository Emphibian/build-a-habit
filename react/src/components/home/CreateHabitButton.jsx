import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import {
	createHabit,
	fetchHabits,
} from "../../features/habits/habitsThunks.js";
import SaveIcon from "./../../assets/svgs/content-save.svg?react";

function WeeklyList({ addCurrentDay, removeCurrentDay }) {
	const daysInWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return (
		<div className="weekly-list">
			{daysInWeek.map((day, index) => {
				return (
					<label key={day}>
						<input
							type="checkbox"
							names="option"
							onChange={(e) => {
								if (e.target.checked) addCurrentDay(index);
								else removeCurrentDay(index);
							}}
						/>
						<span>{day}</span>
					</label>
				);
			})}
		</div>
	);
}

function GoalSelect({ goalType, setGoalType }) {
	return (
		<label>
			<select
				name="goal-type"
				id="goal-type"
				value={goalType}
				onInput={(event) => setGoalType(event.target.value)}
				required
			>
				<option value="" disabled hidden>
					Please choose a type
				</option>
				<option value="duration">Duration</option>
				<option value="yes/no">Yes or No</option>
				<option value="times">Times Completed</option>
			</select>
			<span>Goal Type:</span>
		</label>
	);
}

function TargetTextBox({ goalType, target, setTarget }) {
	if (goalType !== "yes/no" && goalType !== "") {
		return (
			<label>
				<input
					type="text"
					value={target}
					onChange={(event) => setTarget(event.target.value)}
					required
				/>
				<span>Target</span>
			</label>
		);
	}
}

function CreateHabitModal({ isOpen, setOpen, setButtonDisplay }) {
	const [habitName, setHabitName] = useState("");
	const [habitFreq, setHabitFreq] = useState("");
	const [habitFreqInfo, setHabitFreqInfo] = useState([]);
	const [goalType, setGoalType] = useState("");
	const [target, setTarget] = useState("");
	const [frequencyInfoHTML, setFrequencyInfoHTML] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		if (habitFreq !== "weekly") {
			setHabitFreqInfo(new Set());
			setFrequencyInfoHTML("");
		} else {
			setHabitFreqInfo(new Set());
			setFrequencyInfoHTML(
				<WeeklyList
					addCurrentDay={addCurrentDay}
					removeCurrentDay={removeCurrentDay}
				/>,
			);
		}
	}, [habitFreq]);

	if (!isOpen) return null;

	const handleCreation = async function (event) {
		event.preventDefault();
		let frequencyString = "";
		for (const v of habitFreqInfo) frequencyString += v + ",";
		frequencyString = frequencyString.slice(0, -1);

		dispatch(
			createHabit({
				habitName: habitName.trim(),
				habitFreq,
				habitFreqInfo: frequencyString,
				goalType,
				target,
			}),
		);

		closeModal();
	};

	const closeModal = function () {
		setOpen(false);
		setButtonDisplay(false);
	};

	const addCurrentDay = function (day) {
		habitFreqInfo.add(day);
		setHabitFreqInfo(new Set(habitFreqInfo));
	};

	const removeCurrentDay = function (day) {
		if (habitFreqInfo.has(day)) {
			habitFreqInfo.delete(day);
			setHabitFreqInfo(new Set(habitFreqInfo));
		}
	};

	return (
		<div className="habit-overlay" onClick={closeModal}>
			<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
				<h3>Create a new Habit</h3>
				<form onSubmit={handleCreation}>
					<label>
						<input
							type="text"
							value={habitName}
							onChange={(event) => setHabitName(event.target.value)}
							required
						/>
						<span>Habit Name</span>
					</label>
					<label>
						<select
							name="habit-frequency"
							id="habit-frequency"
							value={habitFreq}
							onInput={(event) => setHabitFreq(event.target.value)}
							required
						>
							<option value="" disabled hidden>
								Please select a frequency type
							</option>
							<option value="daily">Daily</option>
							<option value="weekly">Weekly</option>
						</select>
						<span>Habit Frequency:</span>
					</label>
					{frequencyInfoHTML}
					<GoalSelect goalType={goalType} setGoalType={setGoalType} />
					<TargetTextBox
						goalType={goalType}
						target={target}
						setTarget={setTarget}
					/>
					<div className="btn-grp">
						<button type="submit">
							<SaveIcon fill="#04a9f5" />
							Save
						</button>
						<button onClick={closeModal}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export function CreateHabitButton({ setButtonDisplay }) {
	const [modalOpen, setModalOpen] = useState(false);

	function handleClick() {
		setModalOpen(true);
	}

	return (
		<>
			<button className="create-habit spawned" onClick={handleClick}>
				Habit
			</button>
			<CreateHabitModal
				isOpen={modalOpen}
				setOpen={setModalOpen}
				setButtonDisplay={setButtonDisplay}
			/>
		</>
	);
}
