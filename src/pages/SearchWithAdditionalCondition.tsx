import React, {useState} from "react";
import useFetch from "../hooks/useFetch.ts";
import {Tag} from "../interfaces.ts";
import LoadingComponent from "../components/shared/LoadingComponent.tsx";
import ErrorComponent from "../components/shared/ErrorComponent.tsx";
import {useNavigate} from "react-router-dom";

const SearchWithAdditionalCondition = () =>{
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [isDescending, setIsDescending] = useState("false");
    const [sortBy, setSortBy] = useState('');
    const navigate = useNavigate();


    const {data: Tags, isLoading, error} = useFetch<Tag[]>("/api/Tag");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        navigate(`/blogs?IsDescending=${isDescending}&Name=${name}&Surname=${surname}&Title=${title}&Tag=${tag}&SortBy=${sortBy}`);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {value, name} = e.target
        if(name === "name") setName(value)
        if(name === "surname") setSurname(value)
        if(name === "tag") setTag(value)
        if(name === "title") setTitle(value)
        if(name === "isDescending") setIsDescending(value)
        if(name === "sortBy") setSortBy(value)
    }


    if(isLoading) return <LoadingComponent/>
    if(error) return <ErrorComponent/>

    return(
        <main className={"w-full min-h-full flex justify-center items-center"}>
            <section className={"w-11/12 flex flex-col items-center mt-6"}>
                <h1 className={"mb-6"}><span>Search</span> with more options</h1>
                <form onSubmit={handleSubmit} className={"grid grid-cols-3 gird-rows-3 gap-2"}>
                    <input type="text" placeholder={"search by title"} value={title} onChange={handleChange}
                           name={"title"} className={"input"}/>
                    <select onChange={handleChange} value={tag} name={"tag"} className={"input "}>
                        <option value="">Choose tag</option>
                        {
                            Tags?.map(tag => {
                                return <option value={tag.tagName} key={tag.id}> {tag.tagName}</option>
                            })
                        }
                    </select>

                    <input
                        type="text"
                        placeholder={"search by name"}
                        value={name}
                        onChange={handleChange}
                        name={"name"}
                        className={"input"}
                    />

                    <input
                        type="text"
                        placeholder={"search by surname"}
                        value={surname}
                        onChange={handleChange}
                        name={"surname"}
                        className={"input "}
                    />

                    <select name="isDescending" value={isDescending} onChange={handleChange} className={"input"}>
                        <option value="false">Ascending</option>
                        <option value={"true"}>Descending</option>
                    </select>

                    <select name="sortBy" value={sortBy} onChange={handleChange} className={"input"}>
                        <option value={""}>sort by</option>
                        <option value="views">Views</option>
                        <option value={"createdOn"}>Creation date</option>
                    </select>
                    <button className={"w-[150px] h-[45px] p-2 bg-input-border-color rounded row-span-4 col-end-1"}>Search</button>
                </form>
            </section>
        </main>
    )
}

export default SearchWithAdditionalCondition;