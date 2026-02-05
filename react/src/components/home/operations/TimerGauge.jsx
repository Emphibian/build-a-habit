const prettyPrintTime = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60 > 9 ? time % 60 : `0${time % 60}`;

	return `${minutes}:${seconds}`;
};

export const TimerGauge = ({ time, totalTime }) => {
	const r = 80;
	const circumference = 2 * Math.PI * r;
	const progress = (totalTime - time) / totalTime;
	let draw = Math.max(0, Math.min(1, progress)) * circumference;

	return (
		<div class="gauge" id="gauge">
			<svg
				id="svg"
				viewBox="0 0 200 200"
				preserveAspectRatio="xMidYMid meet"
				style={{ width: "100%", height: "100%" }}
			>
				<defs>
					<linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#00d2ff" />
						<stop offset="100%" stopColor="#3a7bd5" />
					</linearGradient>
				</defs>

				<circle
					cx="100"
					cy="100"
					r="80"
					fill="none"
					stroke="white"
					strokeWidth="5"
				/>

				<circle
					id="arc"
					cx="100"
					cy="100"
					r="80"
					fill="none"
					stroke="url(#g1)"
					strokeWidth="5"
					strokeLinecap="round"
					transform="rotate(-90 100 100)"
					strokeDasharray={`${draw} ${circumference - draw}`}
				></circle>
			</svg>
			<div className="time">
				<div className="main">{prettyPrintTime(time)}</div>
				<div className="sub">Remaining</div>
			</div>
		</div>
	);
};
