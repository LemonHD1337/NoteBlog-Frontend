import React, { useState } from "react";

//TODO handle dialog with email input and send token to user

const UserResetPasswordForm = () => {
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [token, setToken] = useState("");
	const [error, setError] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);

	const validate = async () => {
		if (password.length === 0) {
			setError("Password cannot be empty");
			return false;
		}

		if (passwordConfirm.length === 0) {
			setError("Password confirm cannot be empty");
			return false;
		}

		if (password !== passwordConfirm) {
			setError("Password aren't the same");
			return false;
		}

		if (token.length === 0) {
			setError("Token cannot be empty");
			return false;
		}

		return true;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "password") setPassword(value);
		if (name === "passwordConfirm") setPasswordConfirm(value);
		if (name === "token") setToken(value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!(await validate())) return null;

		try {
			setIsUpdating(true);
		} catch (e) {
			console.error(e);
			setError("Ops! something gone wrong");
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={"grid grid-cols-1 my-6"}>
			<h1 className={"my-6 text-center"}>
				<span>Change</span> password
			</h1>
			<input type="password" placeholder={"password"} value={password} onChange={handleChange} className={"input"} />
			<input
				type="password"
				placeholder={"confirm your new password"}
				value={passwordConfirm}
				onChange={handleChange}
				className={"input"}
			/>
			<input type="text" placeholder={"token"} value={token} onChange={handleChange} className={"input"} />
			<button className={"button"}>{isUpdating ? "Updating..." : "Change your password!"}</button>
			<p className={"text-red my-2"}>{error}</p>
		</form>
	);
};

export default UserResetPasswordForm;
