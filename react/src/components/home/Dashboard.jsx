import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import userAPI from "../../api/userAPI.js";
import Logout from "../../assets/svgs/logout.svg?react";
import AccountSvg from "../../assets/svgs/account.svg?react";
import { Timer } from "./Timer";
import { TimerContext } from "../../contexts/TimerContext";

import { updateEstimate } from "../../features/habits/habitsThunks";
import { setTaskEstimate } from "../../features/tasks/tasksThunks";
import { useDispatch } from "react-redux";

function HomeNav({ user, logout }) {
	const {
		timerHabit,
		timerOn,
		setTimerOn,
		timerRunning,
		setTimerRunning,
		timerDuration,
		setTimerDuration,
		updateEntryDuration,
		timerEstimate,
		setTimerEstimate,
	} = useContext(TimerContext);

	const dispatch = useDispatch();
	return (
		<div className="dashboard">
			<div className="dashboard-right">
				<Timer
					timerOn={timerOn}
					setTimerOn={setTimerOn}
					timerRunning={timerRunning}
					setTimerRunning={setTimerRunning}
					habitName={timerHabit.name}
					timerEstimate={timerEstimate}
					setTimerEstimate={setTimerEstimate}
					duration={timerDuration}
					incrementDuration={() => setTimerDuration((prev) => prev + 1)}
					addDuration={(value) => {
						updateEntryDuration(timerHabit.id, value, timerHabit.isHabit);
					}}
					addEstimate={(value) => {
						if (timerHabit.isHabit)
							dispatch(
								updateEstimate({
									id: timerHabit.id,
									estimate: value + timerEstimate,
								}),
							);
						else
							dispatch(
								setTaskEstimate({
									id: timerHabit.id,
									estimate: value + timerEstimate,
								}),
							);
					}}
				/>
				<nav>
					<div className="account">
						<AccountModalButton username={user} logout={logout} />
					</div>
				</nav>
			</div>
		</div>
	);
}

function LoginNav() {
	return (
		<div className="dashboard sign-in">
			<nav>
				<Link to="/register">Register</Link>
				<Link to="/login">Login</Link>
			</nav>
		</div>
	);
}

function AccountModal({ username, modalOpen, logout }) {
	if (modalOpen) {
		return (
			<div class="account-modal">
				<div class="user-div">
					<span>{username}</span>
				</div>
				<div class="user-options">
					<button onClick={() => logout()}>
						<Logout /> Logout
					</button>
				</div>
			</div>
		);
	}
}

function AccountModalButton({ username, logout }) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<button onClick={() => setModalOpen((prev) => !prev)}>
				<AccountSvg />
			</button>
			<AccountModal username={username} modalOpen={modalOpen} logout={logout} />
		</>
	);
}

export function Dashboard() {
	const [user, setUser] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async function () {
			const response = await userAPI.getUser();
			if (response.ok) {
				const data = await response.json();
				const userData = data.user;
				setUser(userData);
			} else {
				setUser(null);
			}
		};

		fetchUser();
	}, []);

	const logout = async function () {
		const response = await userAPI.logOut();
		if (!response.ok) {
			const message = await response.text();
			console.log(message);
		} else {
			navigate("/login");
		}
	};

	if (user) {
		return <HomeNav user={user} logout={logout} />;
	}

	// if not logged in
	return <LoginNav />;
}
