import { Dashboard } from "./home/Dashboard";
import { CreateHabitButton } from "./home/CreateHabitButton";
import { CreateTaskButton } from "./home/CreateTaskButton";
import { Habits } from "./home/Habit";

export function Home() {
	return (
		<div className="home">
			<Dashboard />
			<Habits />
			<CreateHabitButton />
			<CreateTaskButton />
		</div>
	);
}
