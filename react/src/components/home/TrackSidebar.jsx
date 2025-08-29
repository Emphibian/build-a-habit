import trackAPI from "../../api/trackAPI.js";

function DeleteButton({ id, updateUI, closeSidebar }) {
	async function handleClick() {
		trackAPI.deleteTrack(id);
		updateUI(id);
		closeSidebar();
	}

	return (
		<button className="danger" onClick={handleClick}>
			Delete
		</button>
	);
}

export function TrackSidebar({ track, isOpen, close, handleDelete }) {
	if (isOpen) {
		return (
			<div className="sidebar sidebar-right">
				<ul>
					<li>
						<DeleteButton
							id={track.id}
							updateUI={handleDelete}
							closeSidebar={close}
						/>
					</li>
					<li>
						<button onClick={close}>Close</button>
					</li>
				</ul>
			</div>
		);
	}
}
