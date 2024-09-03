import useFetch from "../hooks/useFetch.ts";
import { Comment } from "../interfaces.ts";
import LoadingComponent from "./shared/LoadingComponent.tsx";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import React, { useContext, useState } from "react";
import { CookieContext } from "../context/CookieContext.ts";
import axios from "axios";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";

const CommentsComponent = () => {
	const { id } = useParams() as { id: string | undefined };
	const cookie = useContext(CookieContext);
	const { data: comments, isLoading } = useFetch<Comment[]>("/api/Comment/blog/" + id);
	const [content, setContent] = useState("");
	const path = import.meta.env.VITE_URL_UPLOADS;
	const [creatingMessage, setCreatingMessage] = useState("");
	const [deletingMessage, setDeletingMessage] = useState("");

	const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter") return;
		e.preventDefault();
		setCreatingMessage("");

		if (!id || !cookie?.signInCookie?.Id) {
			setCreatingMessage("id of blog or user is undefined!");
			return;
		}

		try {
			const data = {
				appUserId: cookie.signInCookie.Id,
				content: content,
				blogId: id,
			};

			await axios.post("/api/Comment", data);
		} catch (e) {
			console.error(e);
			setCreatingMessage("Ops! something went wrong!");
		} finally {
			setCreatingMessage("Your comment has been created!");
		}
	};

	const handleDelete = async (e: React.MouseEvent) => {
		const { id } = e.currentTarget;
		setDeletingMessage("");

		try {
			await axios.delete(`/api/Comment/${id}`);
			setDeletingMessage("Your comment has been deleted!");
		} catch (e) {
			console.error(e);
			setDeletingMessage("Ops! something went wrong!");
		}
	};

	const conditionalView = () => {
		return (
			<form>
				<input
					type="text"
					placeholder={"write a comment"}
					onChange={e => setContent(e.target.value)}
					onKeyDown={handleSubmit}
					value={content}
					className={"input w-1/2"}
				/>
				<p>{creatingMessage}</p>
			</form>
		);
	};

	if (isLoading) return <LoadingComponent />;

	return (
		<section className={"w-full"}>
			<h1>Comments</h1>
			<form action="">{!cookie?.signInCookie?.Id ? <p>log in to add a comment</p> : conditionalView()}</form>
			<div>
				{comments?.length === 0
					? "this post doesn't have a comments"
					: comments?.map(comment => {
							return (
								<div className={"w-full h-20 m-6 flex relative"} key={comment.id}>
									{comment.appUserId === cookie?.signInCookie?.Id ? (
										<MdDeleteForever onClick={handleDelete} id={comment.id.toString()} size={18} className={"absolute top-5 right-5"} />
									) : null}
									<div className={"h-full flex justify-center items-center mr-3"}>
										<Avatar src={comment.profileImage ? path + comment.profileImage : undefined} sx={{ width: 56, height: 56 }} />
									</div>
									<div className={"h-full"}>
										<p className={"my-2"}>{comment.name + " " + comment.surname}</p>
										<p>{comment.content}</p>
										<p>{deletingMessage}</p>
									</div>
								</div>
							);
						})}
			</div>
		</section>
	);
};

export default CommentsComponent;
