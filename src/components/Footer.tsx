import FooterColumn from "./FooterColumn.tsx";
import React, {useState} from "react";


const Footer = () =>{
    const [email, setEmail] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
    }


    return(
        <footer className="w-full h-[435px] flex pt-[100px] justify-around gap-20 bg-header-color">
            <FooterColumn>
                <FooterColumn.Title>
                    <span className={"text-[27px]"}>Note</span>
                    blog
                    <span className={"bg-transparent text-green text-[27px]"}>.</span>
                </FooterColumn.Title>
                <FooterColumn.Text>
                    Did you come here for <br/>
                    something in particular or just <br/>
                    general reader
                </FooterColumn.Text>
            </FooterColumn>
            <FooterColumn className={"flex flex-col"}>
                <FooterColumn.Title>
                    Blogs
                </FooterColumn.Title>

                <FooterColumn.Link to="/blogs" search={"Tag=Travel"} >
                    Travel
                </FooterColumn.Link>

                <FooterColumn.Link to="/blogs" search={"Tag=Technology"}>
                    Technology
                </FooterColumn.Link>

                <FooterColumn.Link to="/blogs" search={"Tag=LifeStyle"}>
                    LifeStyle
                </FooterColumn.Link>

                <FooterColumn.Link to="/blogs" search={"Tag=Fashion"}>
                    Fashion
                </FooterColumn.Link>

                <FooterColumn.Link to="/blogs" search={"Tag=Business"}>
                    Business
                </FooterColumn.Link>
            </FooterColumn>

            <FooterColumn className={"flex flex-col"}>
                <FooterColumn.Title>
                    Quick Links
                </FooterColumn.Title>

                <FooterColumn.Link to={"/faq"}>
                    FAQ
                </FooterColumn.Link>

                <FooterColumn.Link to={"/terms & conditions"}>
                    Terms & Conditions
                </FooterColumn.Link>

                <FooterColumn.Link to={"/support"}>
                    Support
                </FooterColumn.Link>

                <FooterColumn.Link to={"/privacy policy"}>
                    Privacy Policy
                </FooterColumn.Link>
            </FooterColumn>

            <FooterColumn>
                <FooterColumn.Title>
                    Subscribe For Newsletter
                </FooterColumn.Title>

                <FooterColumn.Form onSubmit={handleSubmit}>
                    <FooterColumn.Input value={email} onChange={handleChange} placeholder={"   Your Email"} />
                    <FooterColumn.Button type={"submit"}>
                        Subscribe
                    </FooterColumn.Button>
                </FooterColumn.Form>

                <FooterColumn.Title className={"mt-[42px]"}>
                    Follow on:
                </FooterColumn.Title>

                <FooterColumn.SocialMedia/>
            </FooterColumn>
        </footer>
    )
}

export default Footer;