import { useRef } from "react";

const prettyPrintTime = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60 > 9 ? time % 60 : `0${time % 60}`;

	return `${minutes}:${seconds}`;
};

export const TimerGauge = ({ time, totalTime }) => {
	const ticksRef = useRef(null);

	(function drawTicks() {
		if (!ticksRef.current) return;
		const g = ticksRef.current;
		const ticks = 12,
			cx = 100,
			cy = 100;
		const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		// a single tick placed at top (x1,x2 use same x = cx)
		line.setAttribute("x1", cx);
		line.setAttribute("y1", cy - 72);
		line.setAttribute("x2", cx);
		line.setAttribute("y2", cy - 80);
		line.setAttribute("stroke", "#000");
		line.setAttribute("stroke-width", "1");
		line.setAttribute("stroke-linecap", "round");

		for (let i = 0; i < ticks; i++) {
			const t = line.cloneNode();
			const angle = (360 / ticks) * i;
			t.setAttribute("transform", `rotate(${angle} ${cx} ${cy})`);
			g.appendChild(t);
		}
	})();

	const r = 80;
	const circumference = 2 * Math.PI * r;
	const progress = (totalTime - time) / totalTime;
	let draw = Math.max(0, Math.min(1, progress)) * circumference;

	return (
		<div className="gauge" id="gauge">
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
					strokeDasharray={`${draw} ${circumference - draw}`}
				></circle>

				<g
					ref={ticksRef}
					id="ticks"
					opacity="0.12"
					transform="translate(0,0)"
				></g>
			</svg>
			<div className="time">
				<div className="main">{prettyPrintTime(time)}</div>
				<div className="sub">Remaining</div>
			</div>
		</div>
	);
};
