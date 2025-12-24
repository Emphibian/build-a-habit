import { useEffect, useRef } from "react";
import TodayIcon from "../../assets/svgs/white-balance-sunny.svg?react";
import TrackIcon from "../../assets/svgs/star-four-points.svg?react";

function Tab({ name, handleClick }) {
	return <button onClick={handleClick}>{name}</button>;
}

export function Sidebar({ tab, setTab, sidebarOpen, setSidebarOpen }) {
	const fill = "#e3e3e3";
	const tabs = [
		{ name: "Today", icon: <TodayIcon fill={fill} /> },
		{ name: "Tracks", icon: <TrackIcon fill={fill} /> },
	];

	const sidebarRef = useRef(null);

	useEffect(() => {
		if (sidebarRef.current) {
			if (sidebarOpen) {
				if (window.innerWidth <= 500) {
					document.addEventListener("click", handleClick);
					document.addEventListener("touch", handleClick);
				}

				sidebarRef.current.classList.add("opened");
				sidebarRef.current.classList.remove("closed");
			} else {
				sidebarRef.current.classList.add("closed");
				sidebarRef.current.classList.remove("opened");
			}
		}

		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("touch", handleClick);
		};
	}, [sidebarOpen]);

	const handleClick = (e) => {
		e.stopPropagation();
		if (!sidebarRef.current.contains(e.target)) {
			setSidebarOpen(false);
		}
	};

	return (
		<div className="navbar" ref={sidebarRef}>
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
