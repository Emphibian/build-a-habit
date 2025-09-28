import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import userAPI from "../../api/userAPI.js";
import Logout from "../../assets/svgs/logout.svg?react";
import AccountSvg from "../../assets/svgs/account.svg?react";

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
		return (
			<div className="dashboard">
				<div className="header-name">
					<Link to="/home">buildAhabit</Link>
				</div>
				<nav>
					<div className="account">
						<AccountModalButton username={user} logout={logout} />
					</div>
				</nav>
			</div>
		);
	}

	return (
		<div className="dashboard sign-in">
			<div className="header-name">
				<Link to="/">buildAhabit</Link>
			</div>
			<nav>
				<Link to="/register">Register</Link>
				<Link to="/login">Login</Link>
			</nav>
		</div>
	);
}
