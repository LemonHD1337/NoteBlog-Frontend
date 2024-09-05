import React, { useContext, useState } from "react";
import axios from "axios";
import { CookieContext } from "../context/CookieContext.ts";

const UserCreateProfilePictureForm = () => {
	const context = useContext(CookieContext);
	const [file, setFile] = useState<File>();
	const [error, seterror] = useState<string>();
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;

		if (files == null) return;
		if (name === "file") setFile(files[0]);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file || !context?.signInCookie?.Id) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
			setIsUpdating(true);
			await axios.put("/api/Account/createProfileImage/" + context?.signInCookie?.Id, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setFile(undefined);
			seterror("Your profile has been updated");
		} catch (e) {
			console.log(e);
			seterror("Ops! something gone wrong");
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={"grid grid-cols-1 my-6 w-[360px]"}>
			<h1 className={"my-6"}>
				<span>Update</span> your profile picture
			</h1>
			<input type="file" onChange={handleChange} name="file" className={"input"} />
			<button className={"button"}>{isUpdating ? "Updating..." : "Update your profile image"}</button>
			<p className={"text-red my-2"}>{error}</p>
		</form>
	);
};

export default UserCreateProfilePictureForm;
