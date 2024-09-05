import useFetch from "../hooks/useFetch.ts";
import { Blog, BlogsFetch, Content } from "../interfaces.ts";
import { CircularProgress } from "@mui/material";
import ErrorComponent from "../components/shared/ErrorComponent.tsx";
import React, { useContext, useState } from "react";
import { CookieContext } from "../context/CookieContext.ts";
import BlogCardComponent from "../components/shared/BlogCardComponent.tsx";
import PaginationComponent from "../components/shared/PaginationComponent.tsx";
import axios from "axios";
import UpdatePostDialog from "../components/UpdatePostDialog.tsx";
import UpdateContentsDialog from "../components/UpdateContentsDialog.tsx";

const UserBlogsPage = () => {
	const context = useContext(CookieContext);
	const [page, setPage] = useState(1);
	const [pageSize] = useState(12);
	const path = import.meta.env.VITE_URL_API;
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState("");
	const [open, setOpen] = useState(false);
	const [openContent, setOpenContent] = useState(false);
	const [selectedContents, setSelectedContents] = useState<Content[]>();
	const [selectedId, setSelectedId] = useState<number>();
	const [selectedPost, setSelectedPost] = useState<Blog>();

	const url = new URL("/api/Blog", path);
	url.searchParams.append("PageSize", pageSize.toString());
	url.searchParams.append("PageNumber", page.toString());
	url.searchParams.append("UserId", context?.signInCookie?.Id || "");

	const { data: blogs, isLoading, error: fetchError } = useFetch<BlogsFetch>(url.toString());

	const handleClick = async (e: React.MouseEvent) => {
		if (e.target instanceof HTMLButtonElement) {
			const { value, name } = e.target;
			if (name === "edit") {
				setOpen(true);
				const blog: Blog | undefined = blogs?.blogs.find(blog => blog.id === Number(value));

				if (!blog) {
					setError("blog is undefined");
					return null;
				}

				setSelectedPost(blog);
			} else if (name === "edit content") {
				setOpenContent(true);
				const blog: Blog | undefined = blogs?.blogs.find(blog => blog.id === Number(value));
				if (!blog) {
					setError("blog is undefined");
					return null;
				}

				setSelectedContents(blog.contents);
				setSelectedId(blog.id);
			} else if (name === "delete") {
				try {
					setIsDeleting(true);
					await axios.delete("/api/Blog/" + value);
				} catch (e) {
					console.log(e);
					setError("Ops! something gone wrong!");
				} finally {
					setIsDeleting(false);
				}
			}
		}
	};

	if (isLoading) return <CircularProgress />;

	return (
		<main className={"w-full min-h-full flex flex-col items-center"}>
			<h1 className={"mt-6"}>
				<span>Your</span> posts
			</h1>
			<div className={"m-4 mt-6 grid grid-cols-4 gap-3 md:grid-cols-2 sm:grid-cols-1 "}>
				{blogs?.blogs.map((blog: Blog) => {
					return (
						<BlogCardComponent blog={blog} key={blog.id} className={"w-240[px]"}>
							<BlogCardComponent.Tag />
							<BlogCardComponent.Title className={"break-all"} />
							<BlogCardComponent.Img className={"h-[250px]"} />
							<BlogCardComponent.User />
							<BlogCardComponent.SubTitles />
							<button name={"edit"} onClick={handleClick} value={blog.id} className={"button mr-2"}>
								Edit
							</button>
							<button name={"edit content"} onClick={handleClick} value={blog.id} className={"button mr-2"}>
								Edit contents
							</button>
							<button name={"delete"} onClick={handleClick} value={blog.id} className={"button mr-2"}>
								{isDeleting ? "Deleting... " : "Delete"}
							</button>
						</BlogCardComponent>
					);
				})}
			</div>
			<UpdatePostDialog open={open} setOpen={setOpen} blog={selectedPost} />
			<UpdateContentsDialog open={openContent} setOpen={setOpenContent} contents={selectedContents} blogId={selectedId} />
			<PaginationComponent count={blogs?.totalPages} currentPage={page} setPage={setPage} />
			{fetchError && <ErrorComponent />}
			{error && <ErrorComponent />}
		</main>
	);
};

export default UserBlogsPage;
