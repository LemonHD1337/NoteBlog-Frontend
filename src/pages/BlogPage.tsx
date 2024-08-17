import { useLoaderData } from "react-router-dom";
import { Blog } from "../interfaces.ts";
import TopAuthors from "../components/TopAuthors.tsx";
import BlogLayout1 from "../layout/BlogLayout1.tsx";
import BlogLayout2 from "../layout/BlogLayout2.tsx";
import BlogLayout3 from "../layout/BlogLayout3.tsx";
import BlogLayout4 from "../layout/BlogLayout4.tsx";
import BlogLayout5 from "../layout/BlogLayout5.tsx";
import BlogLayout6 from "../layout/BlogLayout6.tsx";
import CommentsComponent from "../components/CommentsComponent.tsx";
import ConvertNumberToMonthName from "../helpers/ConvertNumberToMonthName.ts";

const BlogPage = () => {
	const data = useLoaderData() as Blog;
	const date = new Date(data.createOn);
	const path = import.meta.env.VITE_URL_UPLOADS;

	const content = data.contents.map(content => {
		switch (content.layout) {
			case 1:
				return <BlogLayout1 content={content} key={content.id} />;
			case 2:
				return <BlogLayout2 content={content} key={content.id} />;
			case 3:
				return <BlogLayout3 content={content} key={content.id} />;
			case 4:
				return <BlogLayout4 content={content} key={content.id} />;
			case 5:
				return <BlogLayout5 content={content} key={content.id} />;
			case 6:
				return <BlogLayout6 content={content} key={content.id} />;
		}
	});

	return (
		<main className={"w-full min-h-full flex "}>
			<article className={"w-4/5 h-full flex flex-col items-center my-6"}>
				<section className={"w-4/5"}>
					<p className={"w-fit h-[35px] bg-green p-1 text-white mb-2 "}>{data.tag.tagName}</p>
					<h1 className={"my-6"}>{data.title}</h1>
					<div className={"mb-4"}>
						<p>
							{data.appUser.name} {data.appUser.surname} |
							{date.getDay() + " " + ConvertNumberToMonthName(date.getMonth()) + " " + date.getFullYear()}
						</p>
					</div>
					<img src={path + data.image} alt="main blog image" className={"w-full h-[430px] object-fill"} />
					<p className={"my-4"}>{data.subtitles}</p>
				</section>
				{content}
				<hr />
				<CommentsComponent />
			</article>
			<aside className={"w-1/5 h-full"}>
				<TopAuthors />
			</aside>
		</main>
	);
};

export default BlogPage;
