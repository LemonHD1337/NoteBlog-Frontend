import { createContext, ReactNode, useContext } from "react";
import { Blog, DefaultProps } from "../../interfaces.ts";
import ConvertNumberToMonthName from "../../helpers/ConvertNumberToMonthName.ts";
import { Link } from "react-router-dom";

type BlogComponentProps = {
	blog: Blog;
	children?: ReactNode;
	className?: string;
};

const BlogCardContext = createContext<Blog | undefined>(undefined);

function useBlogCardContext(): Blog {
	const context = useContext(BlogCardContext);

	if (!context) {
		throw new Error("useBlogCardContext must be used within the context!");
	}

	return context;
}

function BlogCardComponent(props: BlogComponentProps) {
	return (
		<article className={"" + props.className}>
			<BlogCardContext.Provider value={props.blog}>{props.children}</BlogCardContext.Provider>
		</article>
	);
}

BlogCardComponent.Tag = function TagComponent(props: DefaultProps) {
	const blog = useBlogCardContext();

	return (
		<p className={"w-fit h-[35px] bg-green p-1 text-white mb-2 " + props.className} key={blog.tag.id}>
			{blog.tag.tagName}
			{props.children}
		</p>
	);
};

BlogCardComponent.Title = function TitleComponent(props: DefaultProps) {
	const blog = useBlogCardContext();

	return (
		<Link to={"blog/" + blog.id}>
			<h1 className={"mb-6 " + props.className}>
				{blog.title} {props.children}
			</h1>
		</Link>
	);
};

BlogCardComponent.Img = function ImgComponent(props: DefaultProps) {
	const blog = useBlogCardContext();

	return (
		<img
			src={import.meta.env.VITE_URL_UPLOADS + blog.image}
			alt={"blog main picture"}
			className={" h-[230px] object-contain mb-6 " + props.className}
		/>
	);
};

BlogCardComponent.User = function UserComponent(props: DefaultProps) {
	const blog = useBlogCardContext();
	const date = new Date(blog.createOn);

	return (
		<div className={"mb-4 " + props.className}>
			<p>
				{blog.appUser.name} {blog.appUser.surname} |
				{date.getDay() + " " + ConvertNumberToMonthName(date.getMonth()) + " " + date.getFullYear()}
			</p>
		</div>
	);
};

BlogCardComponent.SubTitles = function SubTitlesComponent(props: DefaultProps) {
	const blog = useBlogCardContext();

	return (
		<div className={"min-h-[46px] " + props.children}>
			<p>
				{blog.subtitles}
				{props.children}
			</p>
		</div>
	);
};

export default BlogCardComponent;
