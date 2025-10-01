import { useState, useEffect } from "react";
import Play from "../../assets/svgs/play.svg?react";
import Pause from "../../assets/svgs/pause.svg?react";

function NotificationModal({
	message,
	handleButton,
	buttonMessage,
	closeModal,
}) {
	function handleClick() {
		handleButton();
		closeModal();
	}
	return (
		<div className="notification-modal">
			{message}
			<button onClick={handleClick}>{buttonMessage}</button>
		</div>
	);
}

export function Timer({
	duration,
	incrementDuration,
	habitName,
	timeEstimate,
	addDuration,
	addEstimate,
	timerRunning,
	setTimerRunning,
}) {
	const [counter, setCounter] = useState();
	const [notificationModalOpen, setNotificationModalOpen] = useState(false);

	const ONE_MINUTE = 10000;
	const durationUpdate = function () {
		addDuration(1);
		incrementDuration();
	};

	useEffect(() => {
		// clear previously running interval (if any)
		clearInterval(counter);
		if (timerRunning) {
			setCounter(setInterval(durationUpdate, ONE_MINUTE));
		}

		return () => {
			clearInterval(counter);
		};
	}, [timerRunning]);

	useEffect(() => {
		if (timeEstimate > 0 && timeEstimate < duration) {
			setNotificationModalOpen(true);
		}
	}, [duration, timeEstimate]);

	let notificationModal = "";
	if (notificationModalOpen) {
		notificationModal = (
			<NotificationModal
				message={"You have exceeded the estimate!"}
				handleButton={() => addEstimate(30)}
				buttonMessage={"Add 30 min"}
				closeModal={() => setNotificationModalOpen(false)}
			/>
		);
	}

	const PauseButton = function () {
		return (
			<button
				className="running"
				onClick={() => {
					setTimerRunning(false);
				}}
			>
				<Pause />
			</button>
		);
	};

	const PlayButton = function () {
		return (
			<button
				onClick={() => {
					setTimerRunning(true);
				}}
			>
				<Play />
			</button>
		);
	};

	return (
		<>
			<div className="timer">
				<p>{duration}m</p>
				{timerRunning ? <PauseButton /> : <PlayButton />}
				<p>{habitName}</p>
			</div>
			{notificationModal}
		</>
	);
}
