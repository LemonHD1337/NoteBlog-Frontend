import useFetch from "../hooks/useFetch.ts";
import {TopAuthor} from "../interfaces.ts";
import LoadingComponent from "./shared/LoadingComponent.tsx";
import ErrorComponent from "./shared/ErrorComponent.tsx";
import UserCardComponent from "./shared/UserCardComponent.tsx";
import {useRef} from "react";

const TopAuthors = () =>{
    const {data: topAuthors, isLoading, error} = useFetch<TopAuthor[]>("/api/Account/users?PageSize=3&IsDescending=true&SortBy=CreatedBlogs");
    const nextId = useRef(0);

    if(isLoading) return <LoadingComponent/>
    if(error) return <ErrorComponent/>


    return(
        <div className={"w-full flex flex-col justify-center mt-[56px]"}>
            <section>
                <h3 className={"mb-[43px]"}>
                    <span>Top</span> Authors
                </h3>
                <div>
                    {
                        topAuthors?.map(author=>{
                            return(
                                <UserCardComponent topAuthor={author} key={nextId.current++}>
                                    <UserCardComponent.Img />
                                    <div className={"flex flex-col"}>
                                        <UserCardComponent.Name />
                                        <UserCardComponent.Bio />
                                        <UserCardComponent.Links />
                                    </div>
                                </UserCardComponent>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default TopAuthors