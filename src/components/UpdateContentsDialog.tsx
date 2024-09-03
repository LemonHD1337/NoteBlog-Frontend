import { Content, DefaultProps } from "../interfaces.ts";
import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import axios from "axios";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";

interface Props extends DefaultProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	contents: Content[] | undefined;
	blogId: number | undefined;
}

const UpdateContentsDialog = (props: Props) => {
	const [title, setTitle] = useState<string>();
	const [content, setContent] = useState("");
	const [file, setFile] = useState<File>();
	const [layout, setLayout] = useState<string>("");
	const [blogId, setBlogId] = useState<number>();

	const [message, setMessage] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [selectedContent, setSelectedContent] = useState<string>();
	const [createContent, setCreateContent] = useState<boolean>(true);
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const path = import.meta.env.VITE_URL_API;

	const handleChange = (e: React.ChangeEvent) => {
		if (e.target instanceof HTMLSelectElement) {
			const { name, value } = e.target;
			if (name === "content") {
				if (value === "undefined") {
					setCreateContent(true);
					setTitle("");
					setContent("");
					setSelectedContent(undefined);
					setFile(undefined);
					setLayout("");
					setBlogId(undefined);
				} else {
					setCreateContent(false);
					setSelectedContent(value.toString());
				}
			}
			if (name === "layout") setLayout(value.toString());
		}

		if (e.target instanceof HTMLInputElement) {
			const { value, name, files } = e.target;
			if (name === "title") setTitle(value);
			if (name === "file") {
				if (!files) return null;
				setFile(files[0]);
			}
		}

		if (e.target instanceof HTMLTextAreaElement) {
			setContent(e.target.value);
		}
	};

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setMessage("");

		if (!selectedContent) {
			setMessage("Id of the content is undefined!");
			return;
		}

		try {
			setIsDeleting(true);
			await axios.delete(path + "/BlogContent/" + selectedContent);
		} catch (e) {
			console.error(e);
			setMessage("Ops! something went wrong!");
		} finally {
			setIsDeleting(false);
		}
	};

	const handleClose = () => {
		props.setOpen(false);
		setTitle("");
		setContent("");
		setSelectedContent(undefined);
		setFile(undefined);
		setLayout("");
		setBlogId(undefined);
	};

	useEffect(() => {
		setBlogId(props.blogId);

		const content = props.contents?.find(content => content.id === Number(selectedContent));
		if (content) {
			setTitle(content.title);
			setContent(content.content);
			setLayout(content.layout.toString());
		}
	}, [selectedContent, props.contents, props.blogId]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!blogId) {
			setMessage("Blog id is undefined!");
			return;
		}

		setMessage("");

		try {
			createContent ? setIsCreating(true) : setIsUpdating(true);
			const formData = new FormData();

			console.log(content);
			formData.append("Content", content);
			formData.append("Layout", layout);
			formData.append("BlogId", blogId!.toString());

			if (title !== undefined) {
				formData.append("Title", title);
			}

			const type = file?.type.split("/")[0];

			if (type === "image") {
				formData.append("PictureFile", file!);
			}
			if (type === "video") {
				formData.append("VideoFile", file!);
			}

			if (createContent) {
				await axios.post(path + "/BlogContent", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
			} else {
				await axios.put(path + "/BlogContent/" + selectedContent, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
			}

			createContent ? setMessage("Your content has been created!") : setMessage("Your content has been updated!");
		} catch (e) {
			console.error(e);
			setMessage("Ops! something went wrong!");
		} finally {
			setIsUpdating(false);
			setIsCreating(false);
		}
	};

	return (
		<Dialog open={props.open}>
			<div className={"grid grid-cols-1 p-20"}>
				<IoMdClose className={"absolute top-5 right-5 cursor-pointer"} onClick={handleClose} />
				{createContent ? (
					<h1 className={"mb-6"}>
						<span>Create</span> post content
					</h1>
				) : (
					<h1 className={"mb-6"}>
						<span>Change</span> post content
					</h1>
				)}
				<p>If you want to change a content, please select: </p>
				<select onChange={handleChange} className={"input "} name={"content"}>
					<option value="undefined">Choose a content to change</option>
					{props.contents?.map((content, index) => {
						return (
							<option value={content.id.toString()} key={content.id}>
								{++index}
							</option>
						);
					})}
				</select>
				<form onSubmit={handleSubmit} className={"grid grid-cols-1"}>
					<label htmlFor="layout">Layout: </label>
					<select value={layout} id={"layout"} onChange={handleChange} className={"input"} name={"layout"}>
						<option value="0">Choose a layout</option>
						<option value="1">title and content</option>
						<option value="2">only content</option>
						<option value="3">title, image and then content</option>
						<option value="4">title, content and then image</option>
						<option value="5">title, video and then content</option>
						<option value="6">title, content and then video</option>
					</select>
					<label htmlFor="title">Title: </label>
					<input
						id="title"
						type="text"
						placeholder={"title"}
						name={"title"}
						value={title}
						onChange={handleChange}
						className={"input"}
						maxLength={150}
					/>
					<label htmlFor="content">Content: </label>
					<textarea
						placeholder={"content"}
						id={"content"}
						name={"content"}
						value={content}
						onChange={handleChange}
						className={"input"}
						rows={30}
					/>
					<label htmlFor="file">File: </label>
					<input type="file" id={"file"} placeholder={"image or video file"} name={"file"} onChange={handleChange} className={"input"} />
					<div className={"grid grid-cols-2 grid-rows-1 gap-2"}>
						<button type={"submit"} className={"button"}>
							{createContent ? (isCreating ? "Creating..." : "Create content") : isUpdating ? "Updating..." : "Update content"}
						</button>
						<button className={"button"} onClick={handleClick}>
							{isDeleting ? "Deleting..." : "Delete content"}
						</button>
					</div>
					<p className={"my-2"}>{message}</p>
				</form>
			</div>
		</Dialog>
	);
};

export default UpdateContentsDialog;
