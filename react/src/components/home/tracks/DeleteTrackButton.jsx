import { useDispatch } from "react-redux";
import { deleteTrack } from "../../../features/tracks/tracksThunks";
import DeleteIcon from "../../../assets/svgs/delete.svg?react";

export function DeleteTrackButton({ id, closeSidebar }) {
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
