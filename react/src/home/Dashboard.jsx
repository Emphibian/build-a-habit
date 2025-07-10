import { useState, useEffect } from "react";

export function Dashboard() {
	const [user, setUser] = useState("");
	useEffect(() => {
		async function getUser() {
			const requestURL = import.meta.env.VITE_SERVER + "/api/user";
			const response = await fetch(requestURL, { credentials: "include" });
			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
			} else {
				setUser(null);
			}
		}

		getUser();
	}, []);

	return <div className="dashboard">{user}</div>;
}
