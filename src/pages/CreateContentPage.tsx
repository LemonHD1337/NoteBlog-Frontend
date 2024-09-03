import { useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const CreateContentPage = () => {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [file, setFile] = useState<File>();
	const [layout, setLayout] = useState<string>("");
	const [error, setError] = useState("");
	const [isCreating, setIsCreating] = useState(false);

	const handleChange = (e: React.ChangeEvent) => {
		if (e.target instanceof HTMLInputElement) {
			const { value, name, files } = e.target;
			if (name === "title") setTitle(value);
			if (name === "file") {
				if (!files) return null;
				setFile(files[0]);
			}
		}

		if (e.target instanceof HTMLSelectElement) {
			const { value } = e.target;
			setLayout(value);
		}

		if (e.target instanceof HTMLTextAreaElement) {
			setContent(e.target.value);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsCreating(true);
			const formData = new FormData();
			formData.append("Title", title);
			formData.append("Content", content);
			formData.append("Layout", layout);
			formData.append("BlogId", id!);

			const type = file?.type.split("/")[0];

			if (type === "image") {
				formData.append("PictureFile", file!);
			}
			if (type === "video") {
				formData.append("VideoFile", file!);
			}

			await axios.post("/api/BlogContent", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
		} catch (e) {
			console.log(e);
			setError("Ops! Something went wrong!");
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<main className={"w-full min-h-full flex justify-center items-center"}>
			<form onSubmit={handleSubmit} className={"w-1/4 grid grid-cols-1"}>
				<select value={layout} onChange={handleChange} className={"input"}>
					<option value="0">Choose a layout</option>
					<option value="1">title and content</option>
					<option value="2">only content</option>
					<option value="3">title, image and then content</option>
					<option value="4">title, content and then image</option>
					<option value="5">title, video and then content</option>
					<option value="6">title, content and then video</option>
				</select>
				<input type="text" placeholder={"title"} name={"title"} value={title} onChange={handleChange} className={"input"} maxLength={150} />
				<textarea placeholder={"content"} name={"content"} value={content} onChange={handleChange} className={"input"} />
				<input type="file" placeholder={"image or video file"} name={"file"} onChange={handleChange} className={"input"} />
				<div className={"grid grid-cols-2 grid-rows-1 gap-2"}>
					<button className={"button"} type={"submit"}>
						{isCreating ? "Creating..." : "Create content"}
					</button>
					<button className={"button"} type={"reset"}>
						reset form
					</button>
				</div>
				<p className={"my-2 text-red"}>{error}</p>
			</form>
		</main>
	);
};

export default CreateContentPage;
