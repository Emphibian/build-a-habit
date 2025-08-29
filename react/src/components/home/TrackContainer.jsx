import { useState, useEffect } from "react";
import trackAPI from "../../api/trackAPI.js";
import { Track } from "./Track.jsx";
import { TrackSidebar } from "./TrackSidebar.jsx";

export function TrackContainer() {
	const [tracks, setTracks] = useState([]);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState();

	useEffect(() => {
		const loadTracks = async function () {
			const tracks = await trackAPI.getTracks();
			setTracks(tracks);
		};

		loadTracks();
	}, []);

	const handleDelete = async function (id) {
		setTracks(tracks.filter((track) => id !== track._id));
	};

	return (
		<div className="entries-container">
			{tracks.map((track) => {
				return (
					<Track
						key={track._id}
						name={track.name}
						openSidebar={() => {
							setSelectedTrack({ id: track._id });
							setSidebarOpen(true);
						}}
					/>
				);
			})}
			<TrackSidebar
				track={selectedTrack}
				isOpen={sidebarOpen}
				close={() => setSidebarOpen(false)}
				handleDelete={(id) => handleDelete(id)}
			/>
		</div>
	);
}
