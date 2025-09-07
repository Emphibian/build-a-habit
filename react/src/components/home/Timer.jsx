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
	timerOn,
	habitName,
	timeEstimate,
	addDuration,
	addEstimate,
}) {
	const [duration, setDuration] = useState(0);
	const [pause, setPause] = useState(false);
	const [counter, setCounter] = useState();
	const [notificationModalOpen, setNotificationModalOpen] = useState(false);

	const oneMinute = 1000;
	const durationUpdate = function () {
		setDuration((prevDuration) => prevDuration + 1);
	};

	useEffect(() => {
		if (timerOn) setCounter(setInterval(durationUpdate, oneMinute));

		return () => {
			clearInterval(counter);
		};
	}, [timerOn]);

	useEffect(() => {
		if (timeEstimate >= 0 && timeEstimate < duration) {
			setNotificationModalOpen(true);
		}
	}, [duration, timeEstimate]);

	if (!timerOn) return;

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
				onClick={() => {
					clearInterval(counter);
					setPause(true);
					addDuration(duration);
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
					setDuration(0);
					setCounter(setInterval(durationUpdate, oneMinute));
					setPause(false);
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
				{pause ? <PlayButton /> : <PauseButton />}
				<p>{habitName}</p>
			</div>
			{notificationModal}
		</>
	);
}
