import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const RegisterPage = () =>{
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();



    const validation = async () =>{
        if(name.length === 0 ){
            setError("Name cannot be empty");
            return false
        }

        if(surname.length === 0 ){
            setError("Surname cannot be empty");
            return false
        }

        if (email.length === 0 ){
            setError("Email cannot be empty");
            return false
        }

        if(password.length === 0 ){
            setError("Password cannot be empty");
        }

        if(username.length === 0 ){
            setError("Username cannot be empty");
            return false
        }

        if(passwordConfirm.length === 0 ){
            setError("Passwords cannot be empty");
            return false
        }

        if(password != passwordConfirm){
            setError("Passwords aren't the same")
            return false
        }

        return true
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;

        if(name === "email") setEmail(value)
        if(name === "password") setPassword(value)
        if(name === "passwordConfirm") setPasswordConfirm(value)
        if(name === "name") setName(value)
        if(name === "surname") setSurname(value)
        if(name === "username") setUsername(value)
    }

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        if(!(await validation())) return null;

        try{
            await axios.post('/api/Account/register', {
                name: name,
                surname: surname,
                email: email,
                password: password,
                username: username,
            })

            navigate("/login")
        }catch (e){
            console.log(e)
            setError("Ops! Something went wrong.")
        }
    }


    return (
        <main className={"w-full min-h-full flex flex-col items-center"}>
            <section className={"w-11/12 h-full flex flex-col items-center m-6"}>
                <h1 className={"mt-6 mb-4"}><span>Register</span> now</h1>
                <form onSubmit={handleSubmit} className={"grid grid-cols-1 gap-2"}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} value={name} className={"input"}/>
                    <input type="text" name="surname" placeholder="Surname" onChange={handleChange} value={surname}  className={"input"}/>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} value={username} className={"input"}/>
                    <input type="text" name="email" placeholder="Email" onChange={handleChange} value={email} className={"input"}/>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} value={password} className={"input"}/>
                    <input type="password" name="passwordConfirm" placeholder="Reapet your Password" onChange={handleChange} value={passwordConfirm} className={"input"}/>
                    <button className={"bg-input-border-color rounded p-4"}>Register!</button>
                    <p className={"text-red mt-2"}>{error}</p>
                </form> 
            </section>
        </main>
    )
}

export default RegisterPage;