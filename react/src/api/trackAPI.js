async function getTracks() {
	const requestURL = import.meta.env.VITE_SERVER + "/api/tracks";
	const response = await fetch(requestURL, { credentials: "include" });

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return data.tracks;
}

async function deleteTrack(id) {
	const requestURL = import.meta.env.VITE_SERVER + "/api/track/delete/" + id;
	const response = await fetch(requestURL, {
		method: "DELETE",
		credentials: "include",
	});

	if (!response.ok) {
		return null;
	}

	return await response.json();
}

export default {
	getTracks,
	deleteTrack,
};
