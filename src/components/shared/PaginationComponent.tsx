import {Pagination, PaginationItem, PaginationRenderItemParams} from "@mui/material";
import {DefaultProps} from "../../interfaces.ts";
import {Dispatch, SetStateAction} from "react";

interface PaginationComponentProps extends DefaultProps{
    count: number | undefined;
    currentPage: number;
    setPage: Dispatch<SetStateAction<number>>
}

const PaginationComponent = (props: PaginationComponentProps) =>{
    const renderItem = (item: PaginationRenderItemParams ) => {
        if(item.type === "next"){
            return(
                <PaginationItem
                    {...item}
                    onClick={()=> props.setPage(prevState => prevState + 1)}
                />
            )
        }else if(item.type === "previous"){
            return(
                <PaginationItem
                    {...item}
                    onClick={()=> props.setPage(prevState => prevState - 1)}
                ></PaginationItem>
            )
        }else{
            return(
                <PaginationItem
                    {...item}
                    //@ts-expect-error sss
                    onClick={()=> props.setPage(item.page)}
                />
            )
        }
    }

    if(!props.count) return null

    return (
        <Pagination
            page={props.currentPage}
            siblingCount={2}
            count={props.count}
            className={"Pagination1"}
            renderItem={renderItem}
        />
    )
}

export default PaginationComponent