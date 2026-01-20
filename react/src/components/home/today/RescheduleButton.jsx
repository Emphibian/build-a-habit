import { useState } from "react";
import { createPortal } from "react-dom";
import { RescheduleModal } from "../upcomingTask/RescheduleModal.jsx";

import CalendarIcon from "../../../assets/svgs/calendar-month.svg?react";

export function RescheduleButton({ id, isHabit, currentDate }) {
	const [modalOpen, setModalOpen] = useState(false);

	if (isHabit) return null;
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
			<button onClick={() => setModalOpen(true)}>
				<CalendarIcon />
				Reschedule
			</button>
		</>
	);
}
