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

async function markComplete(id, value, isHabit) {
	const path = `/api/${isHabit ? "habit" : "task"}/completed/` + id;
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

	return response;
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

async function getTodayDuration() {
	const path = "/api/user/todayDuration";
	const response = await fetch(generateURL(path), { credentials: "include" });
	return await response.json();
}

async function updateName(id, name, isHabit) {
	const path = `/api/${isHabit ? "habit" : "task"}/updateName/` + id;
	const response = await fetch(generateURL(path), {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			value: name,
		}),
		credentials: "include",
	});

	return await response.json();
}

async function getUpcomingTasks() {
	const path = "/api/tasks/upcoming";
	const response = await fetch(generateURL(path), {
		credentials: "include",
	});

	const data = await response.json();
	return data.tasks;
}

async function rescheduleTask(id, date) {
	const path = `/api/tasks/reschedule/${id}`;
	const response = await fetch(generateURL(path), {
		credentials: "include",
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			date,
		}),
	});

	const data = await response.json();
	return data.task;
}

const getCompletedTasks = async () => {
	const path = `/api/tasks/completed`;
	const response = await fetch(generateURL(path), {
		credentials: "include",
	});

	const data = await response.json();
	return data.tasks;
};

export default {
	getHabits,
	getTasks,
	getUpcomingTasks,
	markComplete,
	updateTask,
	updateHabitDuration,
	createTask,
	createHabit,
	deleteInstance,
	updateEstimate,
	updateTimeSpent,
	getTodayDuration,
	updateName,
	rescheduleTask,
	getCompletedTasks,
};
