import {Link, useLoaderData} from "react-router-dom";
import {ISignInCookie, Tag} from "../interfaces.ts";
import {useState} from "react";
import {IoIosArrowRoundDown} from "@react-icons/all-files/io/IoIosArrowRoundDown";
import {IoIosSearch} from "@react-icons/all-files/io/IoIosSearch";
import useCookie from "../hooks/useCookie.ts";
import {Avatar} from "@mui/material";




const Header = () =>{
    const tags = useLoaderData() as Tag[] | [];
    const [dropdownActive, setDropdownActive] = useState<boolean>(false);
    const {value: signInCookieValue} = useCookie<ISignInCookie>("SignIn");

    const conditionalView = () =>{
        if(!signInCookieValue){
            return <Link to={"/login"}>Login</Link>
        }else{
            return <Avatar />
        }
    }

    return(
        <header className="h-[70px] w-full bg-header-color flex justify-center">
            <nav className="h-full flex items-center w-11/12">
                <ul className={"flex justify-evenly w-2/4 "}>
                    <li className={"h-full"}>
                        <Link to={"/"}>Homepage</Link>
                    </li>
                    <li className={"h-full"}>
                        <Link to={"/about"}>About</Link>
                    </li>
                    <li
                        className={"h-full "}
                        onMouseEnter={()=>setDropdownActive(!dropdownActive)}
                        onMouseLeave={()=>setDropdownActive(!dropdownActive)}
                    >
                        <span className={"font-normal text-black bg-transparent flex justify-center items-center"}>
                            Categories <IoIosArrowRoundDown size={"20px"}/>
                        </span>
                        <ul className={"absolute bg-header-color border border-scrollbar-track-color rounded p-2"} hidden={!dropdownActive}>
                            {tags.map(tag=> {
                                return (
                                    <li className={"border-dotted border-b-2 border-green my-2 pb-1"} key={tag.id}>
                                        <Link to={`/blogs?Tag=${tag.tagName}`} >
                                            {tag.tagName}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                </ul>

                <p className={"w-1/4"}>
                    <span className={"text-[27px]"}>
                        Note
                    </span>
                        blog
                    <span className={"text-[27px] bg-transparent text-green"}>
                        .
                    </span>
                </p>

                <ul className={"w-1/4 flex items-center justify-evenly"}>
                    <li className={"flex"}>
                        <Link to={"/search"}>
                            <IoIosSearch size={"20px"}/>
                        </Link>
                    </li>
                    <li>
                    <Link to={"/contact"}>Contact</Link>
                    </li>
                    <li>
                        {conditionalView()}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;