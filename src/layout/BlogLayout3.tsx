import { BlogLayout } from "../interfaces.ts";

const BlogLayout3 = (props: BlogLayout) => {
	const path = import.meta.env.VITE_URL_UPLOADS;

	return (
		<section className={"blogSection " + props.className}>
			<h1>{props.content.title}</h1>
			<img src={path + props.content.picture} alt="picture" />
			<p>{props.content.content}</p>
		</section>
	);
};

export default BlogLayout3;
