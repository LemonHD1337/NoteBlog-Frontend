import React, {FormEvent, useContext, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {CookieContext} from "../context/CookieContext.ts";
import Cookies from "js-cookie";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState<boolean>(false);
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const context = useContext(CookieContext);


    const validation = async () =>{
        return email.length > 0 && password.length > 0;
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if(!await validation()){
            setError("value cannot be empty");
            return null;
        }

        try{
            await axios.post("/api/Account/login", {
                email: email,
                password: password,
                isRemember: isRemember
            })

            const stringCookie = Cookies.get("SignIn")
            if(!stringCookie) return;

            const data = JSON.parse(stringCookie);

            context?.setSignInCookie(data);

            navigate("/")
        }catch (e){
            console.log(e);
            setError("Ops! something gone wrong!")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value, checked} = e.target;

        if(name == "email") setEmail(value)
        if(name == "password") setPassword(value)
        if(name === "remember") setIsRemember(checked)
    }


    return(
        <main className={"w-full min-h-full flex justify-center"}>
            <section className={"mt-6 mb-6 w-11/12 h-full flex flex-col items-center"}>
                <h1><span>Sign</span> in</h1>
                <form onSubmit={handleSubmit} className={"grid grid-cols-1 gap-2 mt-6"}>
                    <input type="email" name={"email"} placeholder={"email"} value={email} onChange={handleChange} className={"input"}/>
                    <input type="password" placeholder={"password"} name={"password"} value={password} onChange={handleChange} className={"input"}/>
                    <div>
                        <input type="checkbox" id={"remember"} name={"remember"} checked={isRemember} onChange={handleChange} className={"mx-4"}/>
                        <label htmlFor="remember" className={"row-span-3"}>Remember me</label>
                    </div>
                    <button className={"bg-input-border-color p-4 rounded text-white"}>Sign in</button>
                    <Link to={"/register"} className={"underline text-green"}>You don't have an account? Register.</Link>
                    <p className={"text-red mt-2"}>{error}</p>
                </form>
            </section>
        </main>
    )
}

export default LoginPage;