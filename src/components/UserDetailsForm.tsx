import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { IUserDetails } from "../interfaces.ts";
import { CookieContext } from "../context/CookieContext.ts";
import LoadingComponent from "./shared/LoadingComponent.tsx";
import axios from "axios";

const UserDetailsForm = () => {
	const context = useContext(CookieContext);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [surname, setSurname] = useState("");
	const [bio, setBio] = useState<string | undefined>();
	const [username, setUsername] = useState("");

	useEffect(() => {
		if (!context?.signInCookie?.Id) return;

		(async () => {
			try {
				setIsLoading(true);
				const res = await axios.get<IUserDetails>("/api/Account/" + context?.signInCookie?.Id);
				setName(res.data.name);
				setSurname(res.data.surname);
				setUsername(res.data.userName);
				setBio(res.data?.bio);
				setEmail(res.data.email);
			} catch (e) {
				console.log(e);
				setError("Ops! something gone wrong");
			} finally {
				setIsLoading(false);
			}
		})();
	}, [context?.signInCookie?.Id]);

	const validation = async () => {
		setError("");

		if (name.length === 0) {
			setError("name cannot be empty");
			return false;
		}
		if (surname.length === 0) {
			setError("surname cannot be empty");
			return false;
		}
		if (email.length === 0) {
			setError("email cannot be empty");
			return false;
		}
		if (username.length === 0) {
			setError("username cannot be empty");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const validationStatus = await validation();

		if (!validationStatus) return null;

		try {
			setIsUpdating(true);
			await axios.put<IUserDetails>("/api/Account/" + context?.signInCookie?.Id, {
				name: name,
				surname: surname,
				email: email,
				bio: bio,
				userName: username,
			});
		} catch (e) {
			console.log(e);
			setError("Ops! Something went wrong.");
		} finally {
			setIsUpdating(false);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		if (name === "name") setName(value);
		if (name === "surname") setSurname(value);
		if (name === "username") setUsername(value);
		if (name === "email") setEmail(value);
		if (name === "bio") setBio(value);
	};

	if (isLoading) return <LoadingComponent />;

	return (
		<form onSubmit={handleSubmit} className={"grid grid-cols-1 my-6 w-[360px]"}>
			<h1 className={"my-6 text-center"}>
				<span>Your</span> details
			</h1>
			<label htmlFor="">Name: </label>
			<input type="text" name={"name"} value={name} onChange={handleChange} maxLength={35} className={"input"} />
			<label htmlFor="">Surname: </label>
			<input type="text" name={"surname"} value={surname} onChange={handleChange} maxLength={70} className={"input"} />
			<label htmlFor="">Username:</label>
			<input type="text" name={"username"} value={username} onChange={handleChange} maxLength={50} className={"input"} />
			<label htmlFor="">Email</label>
			<input type="text" name={"email"} value={email} onChange={handleChange} className={"input"} />
			<label htmlFor="">Bio: </label>
			<textarea cols={4} rows={5} name={"bio"} value={bio} onChange={handleChange} maxLength={70} className={"input"} />
			<button className={"button"}>{isUpdating ? "Updating..." : "Update your details"}</button>
			<p className={"text-red my-2"}>{error}</p>
		</form>
	);
};

export default UserDetailsForm;
