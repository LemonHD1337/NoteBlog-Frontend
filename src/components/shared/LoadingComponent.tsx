import loadingSvg from "../../assets/spinning-dots.svg"

const LoadingComponent = () =>{
    return(
        <div className="absolute left-50 top-50">
            {loadingSvg}
        </div>
    )
}

export default LoadingComponent