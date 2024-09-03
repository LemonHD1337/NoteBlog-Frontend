import { CircularProgress, Dialog } from "@mui/material";
import { Blog, DefaultProps, Tag } from "../interfaces.ts";
import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import useFetch from "../hooks/useFetch.ts";

interface Props extends DefaultProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	blog: Blog | undefined;
}

const UpdatePostDialog = ({ setOpen, open, blog }: Props) => {
	const { data: tags, isLoading } = useFetch<Tag[]>("/api/Tag");
	const [title, setTitle] = useState<string>();
	const [subtitles, setSubtitles] = useState<string>();
	const [file, setFile] = useState<File>();
	const [tag, setTag] = useState<string>();
	const [isUpdating, setIsUpdating] = useState(false);
	const [message, setMessage] = useState<string>("");
	const path = import.meta.env.VITE_URL_API;

	useEffect(() => {
		setTitle(blog?.title);
		setSubtitles(blog?.subtitles);
		setTag(blog?.tag.id.toString());
	}, [blog]);

	const handleChange = (e: React.ChangeEvent) => {
		if (e.target instanceof HTMLInputElement) {
			const { value, name, files } = e.target;
			if (name === "title") setTitle(value);
			if (name === "file") {
				if (!files) return null;
				setFile(files[0]);
			}
		}
		if (e.target instanceof HTMLTextAreaElement) {
			const { value } = e.target;
			setSubtitles(value);
		}
		if (e.target instanceof HTMLSelectElement) {
			setTag(e.target.value);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setMessage("");

		if (title!.length === 0 || subtitles!.length === 0 || tag!.length === 0) {
			setMessage(path + "title or subtitle cannot be empty");
			return;
		}

		try {
			setIsUpdating(true);
			const formData = new FormData();
			formData.append("Title", title!);
			formData.append("Subtitles", subtitles!);
			formData.append("TagId", tag!);
			if (file) formData.append("ImageFile", file);

			await axios.put(path + "/Blog/" + blog!.id, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setMessage("Your post has been updated");
		} catch (e) {
			console.log(e);
			setMessage("Ops! something gone wrong!");
		} finally {
			setIsUpdating(false);
		}
	};

	if (!blog) return null;

	if (isLoading) return <CircularProgress />;

	return (
		<Dialog open={open}>
			<form onSubmit={handleSubmit} className={"grid grid-cols-1 relative p-5"}>
				<IoMdClose className={"absolute top-5 right-5 cursor-pointer"} onClick={handleClose} />
				<label htmlFor="title">Title:</label>
				<input type="text" id="title" name={"title"} value={title} onChange={handleChange} className={"input"} />
				<label htmlFor="Subtitles">Subtitles:</label>
				<textarea value={subtitles} id={"Subtitles"} name={"subtitles"} onChange={handleChange} className={"input"} />
				<label htmlFor="tag">Choose a tag: </label>
				<select value={tag} id={"tag"} onChange={handleChange} className={"input"} name={"tag"}>
					{tags?.map(tag => {
						return (
							<option value={tag.id} key={tag.id}>
								{tag.tagName}
							</option>
						);
					})}
				</select>
				<label htmlFor="file">Change file: </label>
				<input type="file" id="file" name={"file"} className="input" onChange={handleChange} accept="image/*" />
				<button className={"button"}>{isUpdating ? "Updating..." : "Update your post"}</button>
				<p>{message}</p>
			</form>
		</Dialog>
	);
};

export default UpdatePostDialog;
