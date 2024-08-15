import FaqComponent from "../components/shared/FaqComponent.tsx";

const FaqPage = () =>{
    return(
        <main className={"w-full min-h-full flex flex-col items-center justify-center "}>
            <h1 className={"mt-20"}><span>Frequently</span> asked question</h1>
            <p className={"my-4"}>Did you come here for something in particular or just general Riker-bashing? And blowing</p>
            <FaqComponent title={"is there have any option for write blog?"}/>
            <FaqComponent title={"can i change my plan later?"}/>
            <FaqComponent title={"Did you come here for something in particular?"}/>
            <FaqComponent title={"is there have any option for write blog?"}/>
            <FaqComponent title={"something in particular or just general River-bashing?"}/>
        </main>
    )
}

export default FaqPage;