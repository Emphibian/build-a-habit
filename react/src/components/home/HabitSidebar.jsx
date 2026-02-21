import { DeleteButton } from "./DeleteButton.jsx";
import { UpdateEstimateButton } from "./UpdateEstimateButton.jsx";
import CloseIcon from "../../assets/svgs/close.svg?react";
import { RippleButton } from "./general/RippleButton.jsx";

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
					<RippleButton>
						<li>
							<UpdateEstimateButton
								id={instance.id}
								isHabit={instance.isHabit}
							/>
						</li>
					</RippleButton>
					<RippleButton>
						<li>
							<DeleteButton
								id={instance.id}
								isHabit={instance.isHabit}
								closeSidebar={close}
							/>
						</li>
					</RippleButton>
					<RippleButton>
						<li>
							<CloseButton close={close} />
						</li>
					</RippleButton>
				</ul>
			</div>
		);

	return;
}
