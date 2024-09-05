import React, { useContext, useState } from "react";
import { CookieContext } from "../context/CookieContext.ts";
import useFetch from "../hooks/useFetch.ts";
import { Blog, Tag } from "../interfaces.ts";
import { CircularProgress } from "@mui/material";
import ErrorComponent from "../components/shared/ErrorComponent.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WriteBlogPage = () => {
	const context = useContext(CookieContext);
	const { data: tags, isLoading, error: fetchError } = useFetch<Tag[]>("/api/Tag");
	const [title, setTitle] = useState<string>("");
	const [imageFile, setImageFile] = useState<File>();
	const [subtitle, setSubtitle] = useState<string>("");
	const [tag, setTag] = useState<string>("");
	const [error, setError] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent) => {
		if (e.target instanceof HTMLInputElement) {
			const { name, value, files } = e.target;
			if (name === "title") setTitle(value);
			if (name === "file") {
				if (!files) return null;
				setImageFile(files[0]);
			}
		} else if (e.target instanceof HTMLTextAreaElement) {
			const { value } = e.target;
			setSubtitle(value);
		} else if (e.target instanceof HTMLSelectElement) {
			const { value } = e.target;
			setTag(value);
		}
	};

	const validation = async () => {
		if (title.length === 0) {
			setError("Title is required");
			return false;
		}

		if (!imageFile) {
			setError("Image is required");
			return false;
		}

		if (subtitle.length === 0) {
			setError("Subtitle is required");
			return false;
		}

		if (context?.signInCookie === undefined) {
			setError("Your id is undefined");
			return false;
		}

		if (!tag || tag === "null") {
			setError("tag is required");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!(await validation())) return null;

		try {
			setIsCreating(true);
			const formData = new FormData();

			formData.append("Title", title);
			formData.append("Subtitles", subtitle);
			formData.append("AppUserId", context!.signInCookie!.Id);
			formData.append("ImageFile", imageFile!);
			formData.append("TagId", tag);

			const res = await axios.post<Blog>("/api/Blog", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			navigate("/user/create a content/" + res.data.id);
		} catch (e) {
			console.log(e);
			setError("Ops! something gone wrong!");
		} finally {
			setIsCreating(false);
		}
	};

	if (isLoading) return <CircularProgress />;
	if (fetchError) return <ErrorComponent />;

	return (
		<main className={"w-full h-full flex justify-center items-center"}>
			<form onSubmit={handleSubmit} className={"grid grid-cols-1 w-1/5 md:w-3/5"}>
				<h1 className={"my-4"}>
					<span>Create</span> a post!
				</h1>
				<input type="text" placeholder={"title"} name={"title"} onChange={handleChange} value={title} className={"input"} maxLength={150} />
				<textarea placeholder={"subtitle"} onChange={handleChange} value={subtitle} className={"input"} maxLength={250} />
				<input type="file" onChange={handleChange} name="file" className={"input"} accept={""} />
				<select value={tag} onChange={handleChange} className={"input"}>
					<option value={"null"}>Choose a tag</option>
					{tags?.map(tag => {
						return (
							<option value={tag.id} key={tag.id}>
								{tag.tagName}
							</option>
						);
					})}
				</select>
				<button className={"button"}>{isCreating ? "Creating..." : "Create post and go to next step"}</button>
				<p className={"text-center text-red mb-6"}>{error}</p>
			</form>
		</main>
	);
};

export default WriteBlogPage;
