import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { CookieContext } from "../context/CookieContext.ts";

const LogoutPage = () => {
	const navigate = useNavigate();
	const context = useContext(CookieContext);

	useEffect(() => {
		Cookies.remove("SignIn");
		context?.setSignInCookie(undefined);
		navigate("/");
	}, [navigate, context]);

	return <main></main>;
};

export default LogoutPage;
