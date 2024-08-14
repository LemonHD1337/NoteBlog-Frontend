import errorIcon from "../../assets/errorIcon.png"

const ErrorComponent = () =>{
    return(
        <div className="w-12 h-10 absolute left-5 bottom-5">
            <img src={errorIcon} alt="error icon"/>
        </div>
    )
}

export default ErrorComponent;