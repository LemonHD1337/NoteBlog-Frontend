import { BlogLayout } from "../interfaces.ts";

const BlogLayout1 = (props: BlogLayout) => {
	return (
		<section className={"blogSection " + props.className}>
			<h1>{props.content.title}</h1>
			<p>{props.content.content}</p>
		</section>
	);
};

export default BlogLayout1;
