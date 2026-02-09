import { useState, useEffect, useRef } from "react";
import { Track } from "./Track.jsx";
import { TrackSidebar } from "./TrackSidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracks } from "../../features/tracks/tracksThunks";
import { OperationModalTrack } from "./operations/OperationModalTrack.jsx";

export function TrackContainer() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState();
	const [operationModalOpen, setOperationModalOpen] = useState(false);
	const [operationModalPos, setOperationModalPos] = useState(null);

	const trackContainerRef = useRef(null);

	// OPTIMIZE: memoize this selector
	const allTracks = useSelector((state) =>
		state.tracks.allIds.map((id) => state.tracks.byId[id]),
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTracks());
	}, [dispatch]);

	useEffect(() => {
		if (sidebarOpen) {
			trackContainerRef.current.classList.add("shrink");
		} else {
			trackContainerRef.current.classList.remove("shrink");
		}
	}, [sidebarOpen]);

	return (
		<div className="entries-container" ref={trackContainerRef}>
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
						openOperationModal={(position) => {
							setSelectedTrack({ id: track._id });
							setOperationModalOpen(true);
							setOperationModalPos(position);
						}}
					/>
				);
			})}
			<TrackSidebar
				track={selectedTrack}
				isOpen={sidebarOpen}
				close={() => setSidebarOpen(false)}
			/>
			<OperationModalTrack
				instance={selectedTrack}
				open={operationModalOpen}
				position={operationModalPos}
				close={() => setOperationModalOpen(false)}
			/>
		</div>
	);
}
