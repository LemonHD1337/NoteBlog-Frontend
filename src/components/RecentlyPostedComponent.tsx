import useFetch from "../hooks/useFetch.ts";
import {BlogsFetch} from "../interfaces.ts";
import LoadingComponent from "./shared/LoadingComponent.tsx";
import ErrorComponent from "./shared/ErrorComponent.tsx";
import BlogCardComponent from "./shared/BlogCardComponent.tsx";
import {useState} from "react";
import PaginationComponent from "./shared/PaginationComponent.tsx";

const RecentlyPostedComponent = () =>{
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const url = `/api/Blog?PageSize=${pageSize.toString()}&PageNumber=${page.toString()}&IsDescending=true&SortBy=CreatedOn`;

    const {data: recentlyBlogs, isLoading, error} = useFetch<BlogsFetch>(url);

    if(isLoading) return <LoadingComponent/>
    if(error) return <ErrorComponent/>

    return(
        <div className={"w-full mt-20 flex flex-col items-center"}>
            <section className={"w-4/5"}>
                <h3 className={"mb-[56px] "}>
                    <span>Recently</span> Posted
                </h3>
                <div>
                    {
                        recentlyBlogs?.blogs?.map(blog => {
                            return (
                                <BlogCardComponent blog={blog} key={blog.id} className={"h-[180px] w-full mb-12 flex"}>
                                    <BlogCardComponent.Img className={"h-full"}/>
                                    <div className={"ml-8 w-full"}>
                                        <BlogCardComponent.Tag/>
                                        <BlogCardComponent.Title className={"!mb-4"}/>
                                        <BlogCardComponent.User className={"w-full"}/>
                                        <BlogCardComponent.SubTitles className={"w-full"}/>
                                    </div>
                                </BlogCardComponent>
                            )
                        })
                    }
                </div>
            </section>
            <PaginationComponent count={recentlyBlogs?.totalPages} currentPage={page} setPage={setPage}/>
        </div>
    )
}

export default RecentlyPostedComponent;