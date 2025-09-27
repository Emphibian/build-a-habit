import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Dashboard } from "../components/home/Dashboard";
import { CreateButton } from "../components/home/CreateButton.jsx";
import { Habits } from "../components/home/HabitsContainer";
import { Sidebar } from "../components/home/Sidebar.jsx";
import userAPI from "../api/userAPI.js";
import { HabitsProvider } from "../contexts/HabitContext.jsx";
import { TrackContainer } from "../components/home/TrackContainer.jsx";

export function Home() {
	const navigate = useNavigate();
	const [tab, setTab] = useState("Today");

	useEffect(() => {
		try {
			const redirectIfNotLoggedIn = async function () {
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

	let mainDiv;

	if (tab === "Today") {
		mainDiv = (
			<HabitsProvider>
				<Habits />
				<CreateButton />
			</HabitsProvider>
		);
	} else if (tab == "Tracks") {
		mainDiv = <TrackContainer />;
	}

	return (
		<div className="home">
			<Sidebar tab={tab} setTab={setTab} />
			<div className="main-container">
				<Dashboard />
				{mainDiv}
			</div>
		</div>
	);
}
