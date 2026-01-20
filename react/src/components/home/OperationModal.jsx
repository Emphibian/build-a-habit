import { useRef } from "react";

import { DeleteButton } from "./DeleteButton";
import { UpdateEstimateButton } from "./UpdateEstimateButton";
import { RescheduleButton } from "./today/RescheduleButton";

export function OperationModal({ position, instance, open, close }) {
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

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return (
		<div className="operation-modal-overlay" onClick={close}>
			<div
				className="operation-modal"
				onClick={(e) => e.stopPropagation()}
				style={{ left: `${left}px`, top: `${top}px` }}
			>
				<UpdateEstimateButton id={instance.id} isHabit={instance.isHabit} />
				<RescheduleButton
					id={instance.id}
					isHabit={instance.isHabit}
					currentDate={today.toString()}
				/>
				<DeleteButton
					id={instance.id}
					isHabit={instance.isHabit}
					closeSidebar={close}
				/>
			</div>
		</div>
	);
}
