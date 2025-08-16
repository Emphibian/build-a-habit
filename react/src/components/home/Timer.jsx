import { useState, useEffect } from "react";
import Play from "../../assets/svgs/play.svg?react";
import Pause from "../../assets/svgs/pause.svg?react";

export function Timer({ timerOn, habitName, addDuration }) {
	const [duration, setDuration] = useState(0);
	const [pause, setPause] = useState(false);
	const [counter, setCounter] = useState();

	const oneMinute = 60000;
	const durationUpdate = function () {
		setDuration((prevDuration) => prevDuration + 1);
	};

	useEffect(() => {
		if (timerOn) setCounter(setInterval(durationUpdate, oneMinute));

		return () => {
			clearInterval(counter);
		};
	}, [timerOn]);

	if (!timerOn) return;

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
		<div className="timer">
			<p>{duration}m</p>
			{pause ? <PlayButton /> : <PauseButton />}
			<p>{habitName}</p>
		</div>
	);
}
