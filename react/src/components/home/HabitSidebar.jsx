import { DeleteButton } from "./DeleteButton.jsx";
import { UpdateEstimateButton } from "./UpdateEstimateButton.jsx";
import CloseIcon from "../../assets/svgs/close.svg?react";

function CloseButton({ close }) {
	return (
		<button onClick={close}>
			<CloseIcon />
			Close
		</button>
	);
}

export function HabitSidebar({ instance, open, close }) {
	if (open)
		return (
			<div className="sidebar sidebar-right">
				<ul>
					<li>
						<UpdateEstimateButton id={instance.id} isHabit={instance.isHabit} />
					</li>
					<li>
						<DeleteButton
							id={instance.id}
							isHabit={instance.isHabit}
							closeSidebar={close}
						/>
					</li>
					<li>
						<CloseButton close={close} />
					</li>
				</ul>
			</div>
		);

	return;
}
