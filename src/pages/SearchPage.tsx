import useFetch from "../hooks/useFetch.ts";
import { BlogsFetch } from "../interfaces.ts";
import { useSearchParams } from "react-router-dom";
import BlogCardComponent from "../components/shared/BlogCardComponent.tsx";
import LoadingComponent from "../components/shared/LoadingComponent.tsx";
import ErrorComponent from "../components/shared/ErrorComponent.tsx";
import { useState } from "react";
import PaginationComponent from "../components/shared/PaginationComponent.tsx";

const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const tag = searchParams.get("Tag");
	const isDescending = searchParams.get("IsDescending");
	const name = searchParams.get("Name");
	const surname = searchParams.get("Surname");
	const title = searchParams.get("Title");
	const sortBy = searchParams.get("SortBy");
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const url = new URL("/api/Blog", "http://localhost:5184");

	url.searchParams.set("PageSize", pageSize.toString());
	url.searchParams.set("PageNumber", page.toString());

	if (tag != null) url.searchParams.set("Tag", tag);
	if (name != null) url.searchParams.set("Name", name);
	if (surname != null) url.searchParams.set("Surname", surname);
	if (title != null) url.searchParams.set("Title", title);
	if (sortBy != null) url.searchParams.set("SortBy", sortBy);
	if (isDescending != null) url.searchParams.set("IsDescending", isDescending);

	const { data: blogs, isLoading, error } = useFetch<BlogsFetch>(url.toString());

	if (isLoading) return <LoadingComponent />;
	if (error) return <ErrorComponent />;
	if (blogs?.blogs.length == 0)
		return (
			<h1 className={"mt-6 text-center"}>
				<span>Ops!</span> no record was found
			</h1>
		);

	return (
		<main className={"w-full h-full flex flex-col items-center"}>
			<div className={"w-11/12 mt-6"}>
				<h5>Search result for {tag}</h5>
				<hr />
			</div>
			<div className={"w-11/12 flex flex-col justify-center mt-6"}>
				{blogs?.blogs?.map(blog => {
					return (
						<BlogCardComponent blog={blog} key={blog.id} className={" w-full mb-12 flex"}>
							<BlogCardComponent.Img className={"h-full w-1/3"} />
							<div className={"ml-8 w-full"}>
								<BlogCardComponent.Tag />
								<BlogCardComponent.Title className={"!mb-4"} />
								<BlogCardComponent.User className={"w-full"} />
								<BlogCardComponent.SubTitles className={"w-full"} />
							</div>
						</BlogCardComponent>
					);
				})}
			</div>
			<PaginationComponent count={blogs?.totalPages} currentPage={page} setPage={setPage} />
		</main>
	);
};

export default SearchPage;
