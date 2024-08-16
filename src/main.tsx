import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { Tag } from "./interfaces.ts";
import axios from "axios";
import SearchPage from "./pages/SearchPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import FaqPage from "./pages/FaqPage.tsx";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import SupportPage from "./pages/SupportPage.tsx";
import SearchWithAdditionalCondition from "./pages/SearchWithAdditionalCondition.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import UserOptionsPage from "./pages/UserOptionsPage.tsx";
import WriteBlogPage from "./pages/WriteBlogPage.tsx";
import LogoutPage from "./pages/LogoutPage.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		loader: async (): Promise<[] | Tag[]> => {
			try {
				const res = await axios.get<Tag[]>("/api/Tag");
				return res.data;
			} catch (e) {
				return [];
			}
		},
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/blogs",
				element: <SearchPage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/contact",
				element: <ContactPage />,
			},
			{
				path: "/faq",
				element: <FaqPage />,
			},
			{
				path: "/terms & conditions",
				element: <TermsAndConditionsPage />,
			},
			{
				path: "/support",
				element: <SupportPage />,
			},
			{
				path: "/privacy policy",
				element: <PrivacyPolicyPage />,
			},
			{
				path: "/search",
				element: <SearchWithAdditionalCondition />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/register",
				element: <RegisterPage />,
			},
			{
				path: "/user/options",
				element: <UserOptionsPage />,
			},
			{
				path: "/user/write blog",
				element: <WriteBlogPage />,
			},
			{
				path: "/user/logout",
				element: <LogoutPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
