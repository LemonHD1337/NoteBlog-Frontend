import {DefaultProps} from "../interfaces.ts";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "@react-icons/all-files/fa/FaFacebookSquare";
import { FaTwitterSquare } from "@react-icons/all-files/fa/FaTwitterSquare";
import { FaInstagramSquare } from "@react-icons/all-files/fa/FaInstagramSquare";

interface FormProps extends DefaultProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

interface InputProps extends DefaultProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface ButtonProps extends DefaultProps {
    type: "submit" | "reset";
}



interface LinkProps extends DefaultProps {
    to: string;
    search?: string | undefined;
}

const FooterColumn = (props: DefaultProps) =>{
    return(
        <div className={"w-auto h-full " + props.className}>
            {props.children}
        </div>
    )
}

FooterColumn.Title = function FooterColumnTitle(props: DefaultProps){
    return(
        <p className={"text-[17px] font-semibold mb-6 " + props.className}>
            {props.children}
        </p>
    )
}

FooterColumn.Text = function FooterColumnText(props: DefaultProps){
    return(
        <p className={" " + props.className}>
            {props.children}
        </p>
    )
}

FooterColumn.Form = function FooterColumnFrom(props: FormProps){

    return(
        <form onSubmit={props.onSubmit} className={"w-[400px] h-[45px] " + props.className}>
            {props.children}
        </form>
    )
}

FooterColumn.Input = function FooterColumnInput(props: InputProps){
    return(
        <input
            type="text"
            className={"w-2/3 h-full rounded-r bg-light-green " + props.className}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    )
}

FooterColumn.Button = function FooterColumnButton(props: ButtonProps){
    return(
        <button className={"w-1/3 h-full bg-green rounded text-white " + props.className} type={props.type}>
            {props.children}
        </button>
    )
}

FooterColumn.SocialMedia = function FooterSocialMedia(props: DefaultProps){
    return (
        <div className={"w-full flex gap-2 mt-6 " + props.className}>
            <FaFacebookSquare size={"24px"} fill={"#00AAA1"} />
            <FaInstagramSquare size={"24px"} fill={"#00AAA1"} />
            <FaTwitterSquare size={"24px"} fill={"#00AAA1"} />
            {props.children}
        </div>
    )
}

FooterColumn.Link = function FooterColumnLink(props: LinkProps) {
    return(
        <Link to={{
            pathname: props.to,
            search: props.search
        }} className={"mb-4 " + props.className}>
            {props.children}
        </Link>
    )
}

export default FooterColumn