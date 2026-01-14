import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Dashboard } from "../components/home/Dashboard";
import { CreateButton } from "../components/home/CreateButton.jsx";
import { Habits } from "../components/home/HabitsContainer";
import { Sidebar } from "../components/home/Sidebar.jsx";
import userAPI from "../api/userAPI.js";
import { TimerProvider } from "../contexts/TimerContext.jsx";
import { TrackContainer } from "../components/home/TrackContainer.jsx";
import { UpcomingTasksContainer } from "../components/home/upcomingTask/UpcomingTasksContainer.jsx";

import DehazeIcon from "../assets/svgs/dehaze.svg?react";

export function Home() {
	const navigate = useNavigate();
	const [tab, setTab] = useState("Today");
	const [navbarOpen, setNavbarOpen] = useState(false);

	const mainContainerRef = useRef(null);

	useEffect(() => {
		if (window.innerWidth > 500) {
			setNavbarOpen(true);
		}
	}, []);

	useEffect(() => {
		if (mainContainerRef.current) {
			if (navbarOpen) {
				mainContainerRef.current.classList.add("shrink");
				mainContainerRef.current.classList.remove("expand");
			} else {
				mainContainerRef.current.classList.add("expand");
				mainContainerRef.current.classList.remove("shrink");
			}
		}
	}, [navbarOpen]);

	const handleResize = () => {
		if (window.innerWidth > 500) {
			setNavbarOpen(true);
		} else {
			setNavbarOpen(false);
		}
	};

	window.addEventListener("resize", handleResize);

	useEffect(() => {
		try {
			const redirectIfNotLoggedIn = async function() {
				const response = await userAPI.getUser();
				const data = await response.json();
				if (data.message === "Not Logged In")
					navigate("/login", { replace: true });
			};

			redirectIfNotLoggedIn();
		} catch (error) {
			console.error("Error checking login status");
		}
	}, [navigate]);

	// TODO: refactor this functionality into a function
	let innerComponent = "";

	if (tab == "Today") {
		innerComponent = (
			<>
				<Habits />
				<CreateButton />
			</>
		);
	} else if (tab == "Tracks") {
		innerComponent = <TrackContainer />;
	} else if (tab == "Upcoming Tasks") {
		innerComponent = <UpcomingTasksContainer />;
	}

	return (
		<div className="home">
			<Sidebar
				tab={tab}
				setTab={setTab}
				sidebarOpen={navbarOpen}
				setSidebarOpen={setNavbarOpen}
			/>
			<TimerProvider>
				<div className="main-container" ref={mainContainerRef}>
					<button
						onClick={(e) => {
							e.stopPropagation();
							setNavbarOpen((prev) => !prev);
						}}
						className="svg-icon"
					>
						<DehazeIcon />
					</button>
					<Dashboard />
					{innerComponent}
				</div>
			</TimerProvider>
		</div>
	);
}
