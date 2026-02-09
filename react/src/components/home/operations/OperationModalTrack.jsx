import { useRef } from "react";
import { DeleteTrackButton } from "../tracks/DeleteTrackButton";

export function OperationModalTrack({ position, instance, open, close }) {
	const menuRef = useRef(null);

	if (!open) return null;

	const { innerWidth, innerHeight } = window;
	const menu = menuRef.current;
	const menuRect = menu?.getBoundingClientRect() || { width: 150, height: 200 };

	let left = position.x + 10;
	let top = position.y;

	if (position.x + menuRect.width > innerWidth)
		left = innerWidth - menuRect.width - 4;
	if (position.y + menuRect.height > innerHeight)
		top = innerHeight - menuRect.height - 4;

	return (
		<div className="operation-modal-overlay" onClick={close}>
			<div
				className="operation-modal"
				onClick={(e) => e.stopPropagation()}
				style={{ left: `${left}px`, top: `${top}px` }}
			>
				<DeleteTrackButton id={instance.id} closeSidebar={close} />
			</div>
		</div>
	);
}
