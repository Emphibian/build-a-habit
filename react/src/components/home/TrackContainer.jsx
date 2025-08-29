import { useState, useEffect } from "react";
import trackAPI from "../../api/trackAPI.js";
import { Track } from "./Track.jsx";

export function TrackContainer() {
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		const loadTracks = async function () {
			const tracks = await trackAPI.getTracks();
			setTracks(tracks);
		};

		loadTracks();
	}, []);

	return (
		<div className="entries-container">
			{tracks.map((track) => {
				return <Track key={track._id} name={track.name} />;
			})}
		</div>
	);
}
