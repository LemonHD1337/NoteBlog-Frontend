import { BlogLayout } from "../interfaces.ts";

const BlogLayout6 = (props: BlogLayout) => {
	const path = import.meta.env.VITE_URL_UPLOADS;

	return (
		<section className={"blogSection " + props.className}>
			<h1>{props.content.title}</h1>
			<p>{props.content.content}</p>
			<div>
				<iframe src={path + props.content.video} allowFullScreen={true} height={"100%"} width={"100%"}></iframe>
			</div>
		</section>
	);
};

export default BlogLayout6;
