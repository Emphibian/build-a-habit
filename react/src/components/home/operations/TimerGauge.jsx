export const TimerGauge = ({ time }) => {
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
					strokeWidth="18"
				/>

				<circle
					id="arc"
					cx="100"
					cy="100"
					r="80"
					fill="none"
					stroke="url(#g1)"
					strokeWidth="18"
					strokeLinecap="round"
					transform="rotate(-90 100 100)"
					strokeDasharray="0 9999"
				></circle>
			</svg>
			<div className="time">
				<div className="main">{time}</div>
				<div className="sub">Remaining</div>
			</div>
		</div>
	);
};
