async function getTracks() {
	const requestURL = import.meta.env.VITE_SERVER + "/api/tracks";
	const response = await fetch(requestURL, { credentials: "include" });

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return data.tracks;
}

export default {
	getTracks,
};
