import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Brand from "../../Components/Brand";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Label from "../../Components/Label";
import Hosts from "../../Config/Hosts";

export default function Register(props) {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: e.target.querySelector('#name').value,
            username: e.target.querySelector('#username').value,
            email: e.target.querySelector('#email').value,
            password: e.target.querySelector('#new-password').value,
            password_confirmation: e.target.querySelector('#password_confirmation').value,
        }

        axios.post(Hosts.main + '/register', data)
            .then(res => {
                if (res.data.status === 'success') {
                    swal('Success', res.data.message, res.data.status)
                        .then(() => navigate('/login'))
                }
                console.log(res.data)
            })
    }

    return (
        <div className="bg-base w-full h-full fixed flex justify-center items-center">
            <div id="card" className="w-4/5 bg-primary p-3 rounded">
                <div id="header">
                    <Link to={"/"}>
                        <h1 className="text-center text-xl">
                            <Brand>Bululanjang</Brand>
                        </h1>
                    </Link>
                    <h2 className="text-center">Register</h2>
                </div>
                <form className="" onSubmit={handleSubmit}>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name..." required />
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Username..." required />
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email..." required />
                    <Label htmlFor="new-password">Password</Label>
                    <Input
                        id="new-password"
                        type="password"
                        placeholder="Password..."
                        autoComplete='true'
                        required
                    />
                    <Label htmlFor="password_confirmation">Password Confirm</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        placeholder="Password..."
                        autoComplete='false'
                        required
                    />
                    <div className="text-right">
                        <Button level="secondary" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
                <div
                    id="footer"
                    className="mt-5 text-center text-black text-opacity-50 hover:text-secondary"
                >
                    <Link to={"/login"}>Already have any account? Login</Link>
                </div>
            </div>
        </div>
    );
}
