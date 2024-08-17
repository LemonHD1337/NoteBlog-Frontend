import { BlogLayout } from "../interfaces.ts";

const BlogLayout4 = (props: BlogLayout) => {
	const path = import.meta.env.VITE_URL_UPLOADS;

	return (
		<section className={"blogSection " + props.className}>
			<h1>{props.content.title}</h1>
			<p>{props.content.content}</p>
			<img src={path + props.content.picture} alt="picture" />
		</section>
	);
};

export default BlogLayout4;
