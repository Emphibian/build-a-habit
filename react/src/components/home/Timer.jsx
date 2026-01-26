import { useState, useEffect, useContext } from "react";
import { TimerContext } from "../../contexts/TimerContext";

import Play from "../../assets/svgs/play.svg?react";
import Pause from "../../assets/svgs/pause.svg?react";

export function Timer({ habitName }) {
	const [counter, setCounter] = useState();

	const {
		timerDuration,
		setTimerDuration,
		timerEstimate,
		exceededModalOpen,
		setExceededModalOpen,
		timerRunning,
		setTimerRunning,
		updateEntryDuration,
		timerHabit,
	} = useContext(TimerContext);

	const ONE_MINUTE = 3000;
	const durationUpdate = function() {
		incrementDuration();
	};

	const incrementDuration = () => {
		setTimerDuration((prev) => prev + 1);
		updateEntryDuration(timerHabit.id, 1, timerHabit.isHabit);
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
		if (timerEstimate > 0 && timerEstimate < timerDuration) {
			setExceededModalOpen(true);
		} else if (exceededModalOpen) {
			setExceededModalOpen(false);
		}
	}, [timerDuration, timerEstimate]);

	const PauseButton = function() {
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

	const PlayButton = function() {
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

	// TODO: add duration below the timer
	return (
		<>
			<div className="timer">
				<p>{habitName}</p>
				{timerRunning ? <PauseButton /> : <PlayButton />}
			</div>
		</>
	);
}
