import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { Dial } from "../Dial";
import { TimerGauge } from "./TimerGauge";
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

const TimerScreen = ({ duration, closeModal, timerHabit, timerRef }) => {
	const [timeLeft, setTimeLeft] = useState(duration * 60);
	const [timeSinceLastMinute, setTimeSinceLastMinute] = useState(0);
	const [running, setRunning] = useState(true);

	const dispatch = useDispatch();

	const { updateEntryDuration } = useContext(TimerContext);

	useEffect(() => {
		if (!timerRef.current) {
			timerRef.current = {};
			timerRef.current.timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
				if (timeSinceLastMinute == 59) {
					setTimeSinceLastMinute(0);
					updateEntryDuration(timerHabit.id, 1, timerHabit.isHabit);
				} else {
					setTimeSinceLastMinute((prev) => prev + 1);
				}
			}, 1000);
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

	const handlePause = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current.timer);
			setRunning(false);
		}
	};

	const handleStart = () => {
		setRunning(true);
		timerRef.current = {};
		timerRef.current.timer = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
			if (timeSinceLastMinute == 59) {
				setTimeSinceLastMinute(0);
				updateEntryDuration(timerHabit.id, 1, timerHabit.isHabit);
			} else {
				setTimeSinceLastMinute((prev) => prev + 1);
			}
		}, 1000);
	};

	return (
		<>
			<div className="focus-time">
				<TimerGauge time={timeLeft} totalTime={duration * 60} />
			</div>
			<div className="buttons">
				{running ? (
					<button className="button-blue" onClick={handlePause}>
						Pause
					</button>
				) : (
					<button className="button-blue" onClick={handleStart}>
						Start
					</button>
				)}
				<button className="button-blue" onClick={handleFinish}>
					Finish Task
				</button>
			</div>
		</>
	);
};

const FocusModal = ({ closeModal, timerHabit }) => {
	const [duration, setDuration] = useState(25);
	const [currentScreen, setCurrentScreen] = useState("initial");
	const timerRef = useRef(null);

	const closeTimer = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current.timer);
			timerRef.current = null;
		}
	};

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
				closeModal={() => {
					closeTimer();
					closeModal();
				}}
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

	if (!timerHabit?.isHabit) return null;

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
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
