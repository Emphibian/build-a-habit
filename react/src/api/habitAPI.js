import { generateURL } from "./generateURL.js";

async function createTask(taskName, date) {
	const path = "/api/createTask";
	const response = await fetch(generateURL(path), {
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
	return data.task;
}

async function createHabit(
	habitName,
	habitFreq,
	habitFreqInfo,
	goalType,
	target,
) {
	const path = "/api/createHabit";
	const response = await fetch(generateURL(path), {
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
	return data.instance;
}

async function getHabits() {
	const path = "/api/habitsInstances";
	const response = await fetch(generateURL(path), { credentials: "include" });

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return data.habits;
}

async function getTasks() {
	const path = "/api/tasks";
	const response = await fetch(generateURL(path), { credentials: "include" });

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return data.tasks;
}

async function markComplete(id, value) {
	const path = "/api/habit/completed/" + id;
	const response = await fetch(generateURL(path), {
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
	const path = "/api/task/completed/" + id;
	const response = await fetch(generateURL(path), {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});

	return await response.json();
}

async function updateHabitDuration(id, value, isHabit) {
	const path = `/api/${isHabit ? "habit" : "task"}/addDuration/` + id;

	const response = await fetch(generateURL(path), {
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
	const path = `/api/${type}/delete/${id}`;

	const response = await fetch(generateURL(path), {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});

	return await response.json();
}

async function updateEstimate(id, newEstimate, isHabit) {
	const path = `/api/${isHabit ? "habit" : "task"}/updateEstimate/` + id;
	const response = await fetch(generateURL(path), {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			value: newEstimate,
		}),
		credentials: "include",
	});

	return await response.json();
}

async function updateTimeSpent(id, timeSpent, isHabit) {
	const path = `/api/${isHabit ? "habit" : "task"}/updateTimeSpent/` + id;
	const response = await fetch(generateURL(path), {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			value: timeSpent,
		}),
		credentials: "include",
	});

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
	updateEstimate,
	updateTimeSpent,
};
