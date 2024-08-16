import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserListAfterLogin = () => {
	const [dropdownUserOptions, setDropdownUserOptions] = useState<boolean>(true);

	return (
		<ul className={"relative"} onMouseEnter={() => setDropdownUserOptions(false)} onMouseLeave={() => setDropdownUserOptions(true)}>
			<li className={"relative w-full flex justify-center items-center"}>
				<Avatar />
			</li>
			<div className={"absolute border border-border-color rounded p-2 bg-header-color w-full"} hidden={dropdownUserOptions}>
				<ul>
					<li className={"py-1 border-b-2 border-dotted border-green"}>
						<Link to={"/user/options"}>Options</Link>
					</li>
					<li className={"py-1 border-b-2 border-dotted border-green"}>
						<Link to={"user/write blog"}>Write a blog</Link>
					</li>
					<li className={"py-1 border-b-2 border-dotted border-green"}>
						<Link to={"user/logout"}>Logout</Link>
					</li>
				</ul>
			</div>
		</ul>
	);
};

export default UserListAfterLogin;
