import { createContext, ReactNode, useContext } from "react";
import { DefaultProps, TopAuthor } from "../../interfaces.ts";
import { FaFacebookSquare } from "@react-icons/all-files/fa/FaFacebookSquare";
import { FaTwitterSquare } from "@react-icons/all-files/fa/FaTwitterSquare";
import { FaInstagramSquare } from "@react-icons/all-files/fa/FaInstagramSquare";
import { Avatar } from "@mui/material";

type UserCardProps = {
	topAuthor: TopAuthor;
	children?: ReactNode;
	className?: string;
};

const UserCardContext = createContext<TopAuthor | undefined>(undefined);

const useUserCardContext = () => {
	const context = useContext(UserCardContext);

	if (!context) {
		throw new Error("useUserCardContext must be used within the context!");
	}

	return context;
};

const UserCardComponent = (props: UserCardProps) => {
	return (
		<article className={"h-20 w-full flex mb-[45px] " + props.className}>
			<UserCardContext.Provider value={props.topAuthor}>{props.children}</UserCardContext.Provider>
		</article>
	);
};

UserCardComponent.Name = function NameComponent(props: DefaultProps) {
	const topAuthors = useUserCardContext();
	return (
		<h5 className={" " + props.className}>
			{topAuthors?.name} {topAuthors?.surname}
			{props.children}
		</h5>
	);
};

UserCardComponent.Bio = function BioComponent(props: DefaultProps) {
	const topAuthors = useUserCardContext();

	return (
		<p className={"block h-1/4 overflow-hidden text-ellipsis mb-2 " + props.className}>
			{topAuthors.bio}
			{props.children}
		</p>
	);
};

UserCardComponent.Img = function ImgComponent(props: DefaultProps) {
	const context = useUserCardContext();
	const path = import.meta.env.VITE_URL_UPLOADS;

	return (
		<Avatar
			src={context.profileImage ? path + context.profileImage : undefined}
			alt={"User profile picture"}
			className={"mr-4 " + props.className}
			sx={{
				width: 50,
				height: 50,
			}}
		/>
	);
};

UserCardComponent.Links = function LinksComponent(props: DefaultProps) {
	const topAuthors = useUserCardContext();

	return (
		<div className={"flex w-20 h-5 gap-1 " + props.className}>
			{topAuthors?.links.map(link => {
				if (link.socialMediaName === "Facebook")
					return (
						<a href={link.link} key={link.id}>
							<FaFacebookSquare fill={"#00AAA1"} href={link.link} size={"20"} />
						</a>
					);
				if (link.socialMediaName === "Twitter")
					return (
						<a href={link.link} key={link.id}>
							<FaTwitterSquare fill={"#00AAA1"} href={link.link} size={"20"} />
						</a>
					);
				if (link.socialMediaName === "Instagram")
					return (
						<a href={link.link} key={link.id}>
							<FaInstagramSquare fill={"#00AAA1"} size={"20"} />
						</a>
					);
			})}
		</div>
	);
};

export default UserCardComponent;
