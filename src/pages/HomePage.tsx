import FeaturedComponent from "../components/FeaturedComponent.tsx";
import RecentlyPostedComponent from "../components/RecentlyPostedComponent.tsx";
import PopularPosted from "../components/PopularPosted.tsx";
import TopAuthors from "../components/TopAuthors.tsx";

const HomePage = () => {
	return (
		<div className={"flex w-full"}>
			<main className="w-[80%] flex flex-col ">
				<FeaturedComponent />
				<RecentlyPostedComponent />
			</main>
			<aside className="w-[20%] flex flex-col ">
				<PopularPosted />
				<TopAuthors />
			</aside>
		</div>
	);
};

export default HomePage;
