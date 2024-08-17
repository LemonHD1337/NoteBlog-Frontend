import { BlogLayout } from "../interfaces.ts";

const BlogLayout2 = (props: BlogLayout) => {
	return (
		<section className={"blogSection " + props.className}>
			<p>{props.content.content}</p>
		</section>
	);
};

export default BlogLayout2;
