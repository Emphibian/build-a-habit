import { useDispatch } from "react-redux";
import { deleteTrack } from "../../features/tracks/tracksThunks";
import CloseIcon from "../../assets/svgs/close.svg?react";
import DeleteIcon from "../../assets/svgs/delete.svg?react";

function DeleteButton({ id, closeSidebar }) {
	const dispatch = useDispatch();
	async function handleClick() {
		dispatch(deleteTrack(id));
		closeSidebar();
	}

	return (
		<button className="danger" onClick={handleClick}>
			<DeleteIcon />
			<span>Delete</span>
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
						<button onClick={close}>
							<CloseIcon />
							<span>Close</span>
						</button>
					</li>
				</ul>
			</div>
		);
	}
}
