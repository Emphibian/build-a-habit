import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { Dial } from "../Dial";
import { markComplete } from "../../../features/habits/habitsThunks";
import { taskComplete } from "../../../features/tasks/tasksThunks";
import { TimerContext } from "../../../contexts/TimerContext";
import FocusIcon from "../../../assets/svgs/focus.svg?react";
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

const TimerScreen = ({ duration, closeModal, timerHabit, timerRef }) => {
	const [timeLeft, setTimeLeft] = useState(duration * 60);

	const dispatch = useDispatch();
	const ONE_MINUTE = 60000;

	const { updateEntryDuration } = useContext(TimerContext);

	useEffect(() => {
		if (!timerRef.current) {
			timerRef.current = {};
			timerRef.current.timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);

			timerRef.current.minute = setInterval(
				() => updateEntryDuration(timerHabit.id, 1, timerHabit.isHabit),
				ONE_MINUTE,
			);
		}

		return () => {
			if (timeLeft <= 1) {
				closeModal();
			}
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

const FocusModal = ({ closeModal, timerHabit, timerRef }) => {
	const [duration, setDuration] = useState(25);
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
				timerRef={timerRef}
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
	const timerRef = useRef(null);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current.timer);
			clearInterval(timerRef.current.minute);
		}
		setModalOpen(false);
	};

	let modal = "";
	if (modalOpen) {
		let domElement = (
			<FocusModal
				closeModal={() => {
					closeModal();
				}}
				timerHabit={timerHabit}
				timerRef={timerRef}
			/>
		);
		modal = createPortal(domElement, document.getElementById("modal-root"));
	}

	return (
		<>
			{modal}
			<button onClick={openModal}>
				<FocusIcon />
				<span>Start Focus Session</span>
			</button>
		</>
	);
};
