import { DeleteButton } from "./DeleteButton.jsx";
function CloseButton({ close }) {
	return <button onClick={close}>Close</button>;
}

export function HabitSidebar({ instance, open, close, handleDelete }) {
	if (open)
		return (
			<div className="sidebar">
				<ul>
					<li>
						<DeleteButton
							id={instance.id}
							updateUI={handleDelete}
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
