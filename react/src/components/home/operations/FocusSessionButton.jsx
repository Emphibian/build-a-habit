import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { Dial } from "../Dial";
import { markComplete } from "../../../features/habits/habitsThunks";
import { taskComplete } from "../../../features/tasks/tasksThunks";
import StopwatchIcon from "../../../assets/svgs/timer.svg?react";
import CloseIcon from "../../../assets/svgs/close.svg?react";

const InitialScreen = ({ duration, setDuration, start }) => {
	return (
		<>
			<h3>Set Focus Session Duration</h3>
			<Dial initial={duration} onChange={(duration) => setDuration(duration)} />
			<div>
				<button className="button-blue" onClick={() => start()}>
					Start Session
				</button>
			</div>
		</>
	);
};

const prettyPrintTime = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60 > 9 ? time % 60 : `0${time % 60}`;

	return `${minutes}:${seconds}`;
};

const TimerScreen = ({ duration, closeModal, timerHabit }) => {
	const [timeLeft, setTimeLeft] = useState(duration * 60);
	const intervalRef = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!intervalRef.current) {
			intervalRef.current = setInterval(
				() => setTimeLeft((prev) => prev - 1),
				1000,
			);
		}

		return () => {
			if (timeLeft <= 1) clearInterval(intervalRef.current);
		};
	}, [timeLeft]);

	const { id, isHabit, value } = timerHabit;
	const handleFinish = () => {
		closeModal();
		handleComplete();
	};

	const handleComplete = () => {
		if (isHabit) {
			dispatch(markComplete(id, value));
		} else {
			dispatch(taskComplete(id));
		}
	};

	return (
		<>
			<div className="focus-time">
				<p>Time Left</p>
				<span>{prettyPrintTime(timeLeft)}</span>
			</div>
			<button className="button-blue" onClick={handleFinish}>
				Finish Task
			</button>
		</>
	);
};

const FocusModal = ({ closeModal, timerHabit }) => {
	const [duration, setDuration] = useState(1);
	const [currentScreen, setCurrentScreen] = useState("initial");

	let modal = "";
	if (currentScreen == "initial") {
		modal = (
			<InitialScreen
				duration={duration}
				setDuration={setDuration}
				start={() => setCurrentScreen("timer")}
			/>
		);
	} else if (currentScreen == "timer") {
		modal = (
			<TimerScreen
				duration={duration}
				closeModal={() => closeModal()}
				timerHabit={timerHabit}
			/>
		);
	}

	return (
		<div className="focus-modal">
			<div className="focus-div">{modal}</div>
			<button onClick={() => closeModal()} className="focus-close">
				<CloseIcon />
			</button>
		</div>
	);
};

export const FocusSessionButton = ({ timerHabit }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	let modal = "";
	if (modalOpen) {
		let domElement = (
			<FocusModal closeModal={closeModal} timerHabit={timerHabit} />
		);
		modal = createPortal(domElement, document.getElementById("modal-root"));
	}

	return (
		<>
			{modal}
			<button onClick={openModal}>
				{/* TODO: change this icon */}
				<StopwatchIcon />
				<span>Start Focus Session</span>
			</button>
		</>
	);
};
