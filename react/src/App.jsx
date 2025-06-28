import "./App.css";

let server = "";
// only run this if development server is being used
if (import.meta.env.DEV) {
	server = "http://localhost:5000";
	console.log("dev running");
}

function TestAPI() {
	fetch(server + "/api/test")
		.then((res) => res.json())
		.then((res) => console.log(res));
	return <h1>Running</h1>;
}

function App() {
	return <TestAPI />;
}

export default App;
