import { useState, useEffect } from "react";
import { Track } from "./Track.jsx";
import { TrackSidebar } from "./TrackSidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracks } from "../../features/tracks/tracksThunks";

export function TrackContainer() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState();

	const allTracks = useSelector((state) =>
		state.tracks.allIds.map((id) => state.tracks.byId[id]),
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTracks());
	}, [dispatch]);

	return (
		<div className="entries-container">
			{allTracks.map((track) => {
				return (
					<Track
						key={track._id}
						name={track.name}
						frequency={track.frequency}
						frequencyInfo={track.frequencyInfo}
						openSidebar={() => {
							setSelectedTrack({ id: track._id });
							setSidebarOpen(true);
						}}
						isSidebarOpen={sidebarOpen && track._id === selectedTrack?.id}
					/>
				);
			})}
			<TrackSidebar
				track={selectedTrack}
				isOpen={sidebarOpen}
				close={() => setSidebarOpen(false)}
			/>
		</div>
	);
}
