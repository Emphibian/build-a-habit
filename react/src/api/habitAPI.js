async function createTask(taskName, date) {
	const requestURL = import.meta.env.VITE_SERVER + "/api/createTask";
	const response = await fetch(requestURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			taskName,
			scheduledOnString: date,
		}),
		credentials: "include",
	});

	const data = await response.json();
	console.log(data);
}

async function createHabit(
	habitName,
	habitFreq,
	habitFreqInfo,
	goalType,
	target,
) {
	const requestURL = import.meta.env.VITE_SERVER + "/api/createHabit";
	const response = await fetch(requestURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			habitName,
			habitFreq,
			habitFreqInfo,
			goalType,
			target,
		}),
		credentials: "include",
	});

	const data = await response.json();
	console.log(data);
}

async function getHabits() {
	const requestURL = import.meta.env.VITE_SERVER + "/api/habitsInstances";
	const response = await fetch(requestURL, { credentials: "include" });

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return data.habits;
}

async function getTasks() {
	const requestURL = import.meta.env.VITE_SERVER + "/api/tasks";
	const response = await fetch(requestURL, { credentials: "include" });

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return data.tasks;
}

async function markComplete(id, value) {
	const requestURL = import.meta.env.VITE_SERVER + "/api/habit/completed/" + id;
	const response = await fetch(requestURL, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			value,
		}),
		credentials: "include",
	});

	return await response.json();
}

async function updateTask(id) {
	const requestURL = import.meta.env.VITE_SERVER + "/api/task/completed/" + id;
	const response = await fetch(requestURL, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});

	return await response.json();
}

async function updateHabitDuration(id, value, isHabit) {
	const requestURL =
		import.meta.env.VITE_SERVER +
		`/api/${isHabit ? "habit" : "task"}/addDuration/` +
		id;

	const response = await fetch(requestURL, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			value,
		}),
		credentials: "include",
	});

	return await response.json();
}

async function deleteInstance(id, isHabit) {
	const type = isHabit ? "habitInstances" : "task";
	const requestURL = import.meta.env.VITE_SERVER + `/api/${type}/delete/${id}`;
	
	const response = await fetch(requestURL, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});

	console.log(await response.json());

	return await response.json();
}


export default {
	getHabits,
	getTasks,
	markComplete,
	updateTask,
	updateHabitDuration,
	createTask,
	createHabit,
	deleteInstance,
};
