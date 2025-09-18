import TodayIcon from "../../assets/svgs/white-balance-sunny.svg?react";
import TrackIcon from "../../assets/svgs/star-four-points.svg?react";

function Tab({ name, handleClick }) {
	return <button onClick={handleClick}>{name}</button>;
}

export function Sidebar({ tab, setTab }) {
	const fill = "#e3e3e3";
	const tabs = [
		{ name: "Today", icon: <TodayIcon fill={fill} /> },
		{ name: "Tracks", icon: <TrackIcon fill={fill} /> },
	];

	return (
		<div className="sidebar sidebar-left">
			<ul>
				{tabs.map((curTab) => {
					if (tab === curTab.name) {
						return (
							<li key={curTab.name} className="selected">
								<span className="icon">{curTab.icon}</span>
								<Tab name={curTab.name} handleClick={() => { }} />
							</li>
						);
					} else {
						return (
							<li key={curTab.name} onClick={() => setTab(curTab.name)}>
								<span className="icon">{curTab.icon}</span>
								<Tab
									key={curTab.name}
									name={curTab.name}
									handleClick={() => setTab(curTab.name)}
								/>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
}
