export function Track({ name, openSidebar }) {
	return (
		<div className="entry">
			<p className="entry-name">{name}</p>
			<button onClick={openSidebar}>Sidebar</button>
		</div>
	);
}
