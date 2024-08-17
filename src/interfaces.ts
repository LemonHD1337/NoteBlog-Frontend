import React from "react";

export interface AppUser {
	id: string;
	name: string;
	surname: string;
}

export interface ISignInCookie {
	Id: string;
	Name: string;
	Surname: string;
	Nickname: string;
	Role: string[];
}

export interface Comment {
	id: number;
	content: string;
	createOn: string | Date;
	userName: string;
	name: string;
	surname: string;
	profileImage?: string;
}

export interface Tag {
	id: number;
	tagName: string;
}

export interface BlogsFetch {
	totalPages: number;
	blogs: Blog[];
}

export interface Content {
	id: number;
	title?: string;
	content: string;
	picture?: string;
	video?: string;
	blogId: number;
	layout: number;
}

export interface Blog {
	id: number;
	title: string;
	subtitles: string;
	contents: Content[];
	createOn: string | Date; // Consider using Date type for better handling
	numberOfViews: number;
	appUser: AppUser;
	tag: Tag;
	image: string;
}

export type DefaultProps = {
	children?: React.ReactNode;
	className?: string;
};

export interface Link {
	id: number;
	socialMediaName: string;
	link: string;
}

export interface TopAuthor {
	name: string;
	surname: string;
	profileImage: string;
	bio?: string;
	links: Link[];
}

export interface IUserDetails {
	name: string;
	surname: string;
	bio?: string;
	email: string;
	userName: string;
}

export interface BlogLayout extends DefaultProps {
	content: Content;
}
