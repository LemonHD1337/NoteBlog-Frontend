import useFetch from "../hooks/useFetch.ts";
import {BlogsFetch} from "../interfaces.ts";
import {useSearchParams} from "react-router-dom";
import BlogCardComponent from "../components/shared/BlogCardComponent.tsx";
import LoadingComponent from "../components/shared/LoadingComponent.tsx";
import ErrorComponent from "../components/shared/ErrorComponent.tsx";
import {useState} from "react";
import PaginationComponent from "../components/shared/PaginationComponent.tsx";

const SearchPage = () =>{
    const [searchParams] = useSearchParams()
    const tag = searchParams.get("tag")
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const url = `/api/Blog?Tag=${tag}&PageSize=${pageSize.toString()}&PageNumber=${page.toString()}`
    const {data: blogs, isLoading, error} = useFetch<BlogsFetch>(url);

    if(isLoading) return <LoadingComponent/>
    if(error) return <ErrorComponent/>

    return(
        <main className={"w-full h-full flex flex-col items-center"}>
            <div className={"w-11/12 mt-6"}>
                <h5>Search result for {tag}</h5>
                <hr/>
            </div>
            <div className={"w-11/12 flex flex-col justify-center mt-6"}>
                {
                    blogs?.blogs?.map(blog=>{
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
            <PaginationComponent count={blogs?.totalPages} currentPage={page} setPage={setPage}/>
        </main>
    )
}

export default SearchPage;