import {useEffect, useState} from "react";
import axios from "axios";

interface IUseFetch<T>{
    data: T | undefined;
    isLoading: boolean;
    error: string | undefined;
}

function useFetch<T>(url:string): IUseFetch<T>
{
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async ()=>{
            try{
                setIsLoading(true);
                const res = await axios.get<T>(url);
                setData(res.data);
            }catch (e){
               console.log(e);
               setError((e as Error).message)
            }finally {
                setIsLoading(false);
            }
        })()
    }, [url]);

    return {data , error, isLoading};
}

export default useFetch;

