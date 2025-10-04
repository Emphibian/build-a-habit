import { useDispatch } from "react-redux";
import { deleteTrack } from "../../features/tracks/tracksThunks";

function DeleteButton({ id, closeSidebar }) {
	const dispatch = useDispatch();
	async function handleClick() {
		dispatch(deleteTrack(id));
		closeSidebar();
	}

	return (
		<button className="danger" onClick={handleClick}>
			Delete
		</button>
	);
}

export function TrackSidebar({ track, isOpen, close }) {
	if (isOpen) {
		return (
			<div className="sidebar sidebar-right">
				<ul>
					<li>
						<DeleteButton id={track.id} closeSidebar={close} />
					</li>
					<li>
						<button onClick={close}>Close</button>
					</li>
				</ul>
			</div>
		);
	}
}
