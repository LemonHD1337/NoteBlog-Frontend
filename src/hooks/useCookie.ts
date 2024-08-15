import {useEffect, useState} from "react";
import Cookies from "js-cookie";

const useCookie = <T>(name: string) => {
    const [value, setValue] = useState<T>();

    useEffect(()=> {
        const cookieValue = Cookies.get(name);

        if(cookieValue){
            setValue(JSON.parse(cookieValue));
        }
    }, [name])

    return {value}
}

export default useCookie;