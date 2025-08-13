async function register(username, password) {
	const requestURL = import.meta.env.VITE_SERVER + "/api/register";
	const response = await fetch(requestURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, passwordHash: password }),
	});

	return response;
}

async function logIn(username, password) {
	const requestURL = import.meta.env.VITE_SERVER + "/api/login";
	const response = await fetch(requestURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, passwordHash: password }),
		credentials: "include",
	});

	return response;
}

async function logOut() {
	const requestURL = import.meta.env.VITE_SERVER + "/api/logout";
	const response = await fetch(requestURL, { credentials: "include" });
	return response;
}

async function getUser() {
	const requestURL = import.meta.env.VITE_SERVER + "/api/user";
	const response = await fetch(requestURL, {
		credentials: "include",
	});

	return response;
}

export default {
	register,
	logIn,
	logOut,
	getUser,
};
