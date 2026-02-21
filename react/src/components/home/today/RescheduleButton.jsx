import { useState } from "react";
import { createPortal } from "react-dom";
import { RescheduleModal } from "../upcomingTask/RescheduleModal.jsx";

import CalendarIcon from "../../../assets/svgs/calendar-month.svg?react";

export function RescheduleButton({ id, isHabit = true, currentDate }) {
	const [modalOpen, setModalOpen] = useState(false);

	if (isHabit) return null;

	const handleClick = () => {
		const RIPPLE_EFFECT_LENGTH = 150;
		setTimeout(() => {
			setModalOpen(true);
		}, RIPPLE_EFFECT_LENGTH);
	};

	let modal = "";
	if (modalOpen) {
		const modalDiv = (
			<RescheduleModal
				id={id}
				isOpen={modalOpen}
				setOpen={setModalOpen}
				curDate={currentDate}
			/>
		);

		modal = createPortal(modalDiv, document.getElementById("modal-root"));
	}

	return (
		<>
			{modal}
			<button onClick={handleClick}>
				<CalendarIcon />
				Reschedule
			</button>
		</>
	);
}
