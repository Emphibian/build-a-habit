import { DeleteTrackButton } from "../../components/home/tracks/DeleteTrackButton";
import CloseIcon from "../../assets/svgs/close.svg?react";

export function TrackSidebar({ track, isOpen, close }) {
	if (isOpen) {
		return (
			<div className="sidebar sidebar-right">
				<ul>
					<li>
						<DeleteTrackButton id={track.id} closeSidebar={close} />
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
