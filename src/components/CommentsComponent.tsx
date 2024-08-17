import useFetch from "../hooks/useFetch.ts";
import { Comment } from "../interfaces.ts";
import LoadingComponent from "./shared/LoadingComponent.tsx";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

const CommentsComponent = () => {
	const { id } = useParams() as { id: string | undefined };
	const { data: comments, isLoading } = useFetch<Comment[]>("/api/Comment/blog/" + id);
	const path = import.meta.env.VITE_URL_UPLOADS;

	if (isLoading) return <LoadingComponent />;

	return (
		<section className={"w-4/5"}>
			<h1>Comments</h1>
			<div>
				{comments?.length === 0
					? "this post doesn't have a comments"
					: comments?.map(comment => {
							return (
								<div className={"w-full h-20 m-6 flex"} key={comment.id}>
									<div className={"h-full flex justify-center items-center mr-3"}>
										<Avatar src={comment.profileImage ? path + comment.profileImage : undefined} sx={{ width: 56, height: 56 }} />
									</div>
									<div className={"h-full"}>
										<p className={"my-2"}>{comment.name + " " + comment.surname}</p>
										<p>{comment.content}</p>
									</div>
								</div>
							);
						})}
			</div>
		</section>
	);
};

export default CommentsComponent;
