import useFetch from "../hooks/useFetch.ts";
import { BlogsFetch} from "../interfaces.ts";
import LoadingComponent from "./shared/LoadingComponent.tsx";
import ErrorComponent from "./shared/ErrorComponent.tsx";
import BlogCardComponent from "./shared/BlogCardComponent.tsx";

const FeaturedComponent = () =>{

    const {data: featuredBlogs, isLoading, error} = useFetch<BlogsFetch>("/api/Blog?PageSize=4&IsDescending=true&SortBy=Featured");

    if(isLoading) return <LoadingComponent/>
    if(error) return <ErrorComponent/>


    return(
        <div className={"w-full h-[720px] bg-light-green flex flex-col items-center justify-center "}>
            <section className={"w-4/5 h-[550px] "}>
                <h3 className={"mb-6"}>
                    <span>Featured</span> This Month
                </h3>
                <div className={"w-full h-full grid grid-cols-2 gap-[30px] pr-3 overflow-y-auto customScrollBar"}>
                    {featuredBlogs?.blogs?.map((blog) => {
                        return(
                            <BlogCardComponent blog={blog} key={blog.id} className={"h-[550px]"}>
                                <BlogCardComponent.Tag/>
                                <BlogCardComponent.Title/>
                                <BlogCardComponent.Img/>
                                <BlogCardComponent.User/>
                                <BlogCardComponent.SubTitles/>
                            </BlogCardComponent>
                        );
                    })}
                </div>
            </section>
        </div>
    )
}

export default FeaturedComponent