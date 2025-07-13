import { Dashboard } from "./home/Dashboard";
import { CreateHabitButton } from "./home/CreateHabitButton";
import { Habits } from "./home/Habit";

export function Home() {
	return (
		<div className="home">
			<Dashboard />
			<Habits />
			<CreateHabitButton />
		</div>
	);
}
