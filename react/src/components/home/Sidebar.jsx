function Tab({ name, handleClick }) {
	return <button onClick={handleClick}>{name}</button>;
}

export function Sidebar({ tab, setTab }) {
	const tabs = ["Today", "Tracks"];

	return (
		<div className="sidebar">
			<ul>
				{tabs.map((curTab) => {
					if (tab === curTab) {
						return (
							<li key={curTab}>
								<Tab name={curTab} handleClick={() => {}} />
							</li>
						);
					} else {
						return (
							<li key={curTab}>
								<Tab
									key={curTab}
									name={curTab}
									handleClick={() => setTab(curTab)}
								/>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
}
