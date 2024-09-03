import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Outlet } from "react-router-dom";
import useCookie from "../hooks/useCookie.ts";
import { CookieContext } from "../context/CookieContext.ts";
import { ISignInCookie } from "../interfaces.ts";

function Layout() {
	const { value: signInCookie, setValue: setSignInCookie } = useCookie<ISignInCookie>("SignIn");

	return (
		<div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
			<CookieContext.Provider value={{ signInCookie, setSignInCookie }}>
				<Header />
				<Outlet />
				<Footer />
			</CookieContext.Provider>
		</div>
	);
}

export default Layout;
