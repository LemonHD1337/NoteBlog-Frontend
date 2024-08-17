import PopularPosted from "./PopularPosted.tsx";
import TopAuthors from "./TopAuthors.tsx";

const AsideComponent = () => {
	return (
		<aside className="w-[20%] flex flex-col ">
			<PopularPosted />
			<TopAuthors />
		</aside>
	);
};

export default AsideComponent;
