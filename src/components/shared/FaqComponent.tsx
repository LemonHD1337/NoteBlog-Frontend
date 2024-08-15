import {useState} from "react";
import {DefaultProps} from "../../interfaces.ts";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";
import {FiMinus} from "@react-icons/all-files/fi/FiMinus";

interface FaqComponentProps extends DefaultProps{
    title: string;
    description?: string | undefined;
}

const FaqComponent = ({title, description = "Default value"}: FaqComponentProps) =>{
    const [show, setShow] = useState(false);

    return(
        <section className={"w-[750px] h-auto mb-4 "}>
            <div className={"w-full h-63 bg-input-border-color flex justify-between items-center p-3 rounded"}>
                <h5>{title}</h5>
                {show? <FiMinus onClick={()=>{setShow(!show)}} size={"30px"}/> : <FiPlus onClick={()=>{setShow(!show)}} size={"30px"}/>}
            </div>
            <p hidden={!show} className={"text-wrap"}>
                {description }
            </p>
        </section>
    )
}

export default FaqComponent