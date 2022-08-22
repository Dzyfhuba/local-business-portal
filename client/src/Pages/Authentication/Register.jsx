import axios from "axios";
import React from "react";
import { HeadProvider, Title } from "react-head";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Brand from "../../Components/Brand";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Label from "../../Components/Label";
import { RequiredStar } from "../../Components/RequiredStar";
import Hosts from "../../Config/Hosts";
import Navbar from "../../Containers/Navbar";

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

        try {
            axios.post(Hosts.main + '/register', data)
                .then(res => {
                    if (res.data.status === 'success') {
                        swal('Success', res.data.message, res.data.status)
                            .then(() => navigate('/login'))
                    } else {
                        swal('Warning', res.data.message, res.data.status)
                    }
                    console.log(res.data)
                }).catch(err => {
                    swal('Error', err.message, 'error')
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-base w-full h-full fixed flex justify-center items-center ">
            {/* <HeadProvider>
                <Title>Register</Title>
            </HeadProvider> */}
            <Navbar />
            <div id="card" className="w-4/5 bg-primary p-3 rounded">
                <div id="header">
                    <Link to={"/"}>
                        <h1 className="text-center text-xl">
                            <Brand>Bululanjang</Brand>
                        </h1>
                    </Link>
                    <h2 className="text-center">Buat Akun Baru</h2>
                </div>
                <form className="" onSubmit={handleSubmit}>
                    <Label htmlFor="name">Name<RequiredStar /></Label>
                    <Input id="name" placeholder="Name..." autoFocus required />
                    <small className="opacity-50 block -mt-3">Mininal 4 karakter</small>
                    <Label htmlFor="username">Username<RequiredStar /></Label>
                    <Input id="username" placeholder="Username..." required />
                    <small className="opacity-50 block -mt-3">Mininal 4 karakter</small>
                    <Label htmlFor="email">Email<RequiredStar /></Label>
                    <Input id="email" placeholder="Email..." required />
                    <Label htmlFor="new-password">Password<RequiredStar /></Label>
                    <Input
                        id="new-password"
                        type="password"
                        placeholder="Password..."
                        autoComplete='true'
                        required
                    />
                    <Label htmlFor="password_confirmation">Password Confirm<RequiredStar /></Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        placeholder="Password..."
                        autoComplete='false'
                        required
                    />
                    <div className="text-right">
                        <Button className='bg-secondary text-white rounded py-2.5 px-5' type="submit">
                            Daftar
                        </Button>
                    </div>
                </form>
                <div
                    id="footer"
                    className="mt-5 text-center  text-opacity-70 underline hover:text-secondary"
                >
                    <Link to={"/login"}>Already have any account? Login</Link>
                </div>
            </div>
        </div>
    );
}
