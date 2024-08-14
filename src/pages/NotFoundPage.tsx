import {Link} from "react-router-dom";
import { HiOutlineArrowLeft } from "@react-icons/all-files/hi/HiOutlineArrowLeft";


const NotFoundPage = ()=>{
    return(
        <main className={"w-full text-center h-full "}>
            <p className={"text-[180px] text-green "}>404</p>
            <h5 className={"mb-5"}>The page are you looking for does not exist!</h5>
            <Link to={"/"} className={"flex justify-center items-center mt-2 text-green"}> <HiOutlineArrowLeft size={"27px"} fill={"#00AAA1"} className={"mr-2"}/>Back to homepage</Link>
        </main>
    )
}

export default NotFoundPage;