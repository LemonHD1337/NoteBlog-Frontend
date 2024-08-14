import useFetch from "../hooks/useFetch.ts";
import { BlogsFetch} from "../interfaces.ts";
import LoadingComponent from "./shared/LoadingComponent.tsx";
import ErrorComponent from "./shared/ErrorComponent.tsx";
import BlogCardComponent from "./shared/BlogCardComponent.tsx";


const PopularPosted = () =>{
    const {data: PopularBlogs , isLoading, error} = useFetch<BlogsFetch>("/api/Blog?PageSize=4&IsDescending=true&SortBy=Views");

    if(isLoading) return <LoadingComponent />
    if(error) return <ErrorComponent/>

    return(
        <div className={"w-full h-[720px] bg-light-green flex flex-col items-center justify-center"}>
            <section className="w-full h-[550px]">
                <h3 className={"mb-6"}>
                    <span>Popular</span> Posted
                </h3>
                <div className={"h-full overflow-y-auto customScrollBar"}>
                    {
                        PopularBlogs?.blogs?.map(blog=>{
                                return(
                                    <BlogCardComponent blog={blog} key={blog.id}>
                                        <BlogCardComponent.Tag/>
                                        <BlogCardComponent.Title/>
                                        <BlogCardComponent.User/>
                                        <BlogCardComponent.SubTitles/>
                                    </BlogCardComponent>
                                )
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default PopularPosted;