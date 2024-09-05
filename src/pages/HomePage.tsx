import FeaturedComponent from "../components/FeaturedComponent.tsx";
import RecentlyPostedComponent from "../components/RecentlyPostedComponent.tsx";
import PopularPosted from "../components/PopularPosted.tsx";
import TopAuthors from "../components/TopAuthors.tsx";
import { useState } from "react";
import { FaArrowAltCircleLeft } from "@react-icons/all-files/fa/FaArrowAltCircleLeft";
import { MdClose } from "@react-icons/all-files/md/MdClose";

const HomePage = () => {
	const [showAside, setShowAside] = useState(false);

	return (
		<div className={"flex w-full md:flex-col relative"}>
			<main className="w-[75%] flex flex-col md:w-full">
				<div
					className={"absolute top-5 right-5 hidden md:flex md:justify-center md:items-center md:gap-2"}
					onClick={() => setShowAside(!showAside)}
				>
					<FaArrowAltCircleLeft />
					<p>Show aside</p>
				</div>
				<FeaturedComponent />
				<RecentlyPostedComponent />
			</main>
			<aside
				className={`w-[25%] flex flex-col md:right-0 md:w-full md:p-5 md:h-full md:absolute md:${showAside ? "block" : "hidden"}  md:bg-header-color  `}
			>
				<MdClose onClick={() => setShowAside(!showAside)} className={"absolute right-5 top-5 md:block hidden"} />
				<PopularPosted className={"md:bg-transparent p-2"} />
				<TopAuthors />
			</aside>
		</div>
	);
};

export default HomePage;
