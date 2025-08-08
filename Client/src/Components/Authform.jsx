import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
export default function Authform({ setShowLogin, isRegister, setIsRegister, setislogin,setshowuserinfo }) {
    let data = {
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        profileimage:"",
        id_: ""
    }
    let [formdata, setformdata] = useState(data)
    let saveform = (e) => {
        e.preventDefault();

        if (!formdata.username || !formdata.password) {
            toast.error("Username and Password are required!")
            return
        }
        if (isRegister) {
            if (!formdata.email || !formdata.phone || !formdata.confirmPassword) {
                toast.error("All fields are required for registration !")
                return
            }
            if (formdata.password !== formdata.confirmPassword) {
                toast.error("Passwords do not match !")
                return
            }
            let UserRegister = () => {
                axios.post(`http://localhost:5000/lexpo/register/register`, formdata)
                    .then((res) => {
                        return res.data
                    })
                    .then((finaldata) => {
                        if (finaldata.status === 1) {
                            toast.success("registration succesfully !")
                            setIsRegister(false)
                            setShowLogin(true)
                            setformdata(data)
                        }
                        else {
                            toast.error(finaldata.msg || "registration Unsuccesfully !")
                        }
                    }).catch((err) => {
                        toast.error("Server Error: " + err.message)
                    })
            }
            UserRegister()
            return
        }
        if (!isRegister) {
            let UserLogin = () => {
                axios.post(`http://localhost:5000/lexpo/register/login`, {
                    username: formdata.username,
                    password: formdata.password
                })
                    .then((res) => res.data)
                    .then((finaldata) => {
                        if (finaldata.status === 1) {
                            toast.success("Login Successfully!", { autoClose: 2000 })
                            localStorage.setItem("token", finaldata.token)
                            const decoded = jwtDecode(finaldata.token);
                            setshowuserinfo(decoded);
                            setShowLogin(false);
                            setislogin(true);
                            setformdata(data);
                        } else {
                            toast.error(finaldata.msg || "Login Failed!")
                        }
                    })
                    .catch((err) => {
                        toast.error("Server Error: " + err.message)
                    });
            };
            UserLogin()
            return;
        }
    }
    let getvalue = (e) => {
        let name = e.target.name
        let value = e.target.value
        let olddata = { ...formdata }
        olddata[name] = value
        setformdata(olddata)
    }
    return (
        <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40">
            </div>
            <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-[#1e211d] text-white p-6 rounded-lg shadow-2xl w-[90%] max-w-md">
                <div className="flex justify-between items-center border-b border-[#45732a] pb-2 mb-4">
                    <h2 className="text-xl font-bold text-[#89e74e]">
                        {isRegister ? "Register" : "Login"}
                    </h2>
                    <button
                        onClick={() => setShowLogin(false)}
                        className="text-sm text-[#89e74e] hover:underline"
                    >
                        Close
                    </button>
                </div>
                <form className="flex flex-col gap-4" onSubmit={saveform} autoComplete="off">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        autoComplete="off"
                        onChange={getvalue}
                        value={formdata.username}
                        className="px-3 py-2 rounded bg-[#111827] text-white border border-[#45732a]"
                    />
                    {isRegister && (
                        <>
                            <input
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                name="email"
                                onChange={getvalue}
                                value={formdata.email}
                                className="px-3 py-2 rounded bg-[#111827] text-white border border-[#45732a]"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                name="phone"
                                onChange={getvalue}
                                autoComplete="off"
                                value={formdata.phone}
                                className="px-3 py-2 rounded bg-[#111827] text-white border border-[#45732a]"
                            />
                        </>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={getvalue}
                        autoComplete="off"
                        value={formdata.password}
                        className="px-3 py-2 rounded bg-[#111827] text-white border border-[#45732a]"
                    />
                    {isRegister && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={getvalue}
                            autoComplete="off"
                            value={formdata.confirmPassword}
                            className="px-3 py-2 rounded bg-[#111827] text-white border border-[#45732a]"
                        />
                    )}
                    <button
                        type="submit"
                        className="bg-[#89e74e] text-[#020203] font-semibold px-4 py-2 rounded hover:bg-[#75cc3f] transition duration-300"
                    >
                        {isRegister ? "Register" : "Sign In"}
                    </button>

                    <p className="text-sm text-center">
                        {isRegister ? "Already have an account?" : "Not registered?"}{" "}
                        <span
                            className="text-[#89e74e] underline cursor-pointer"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? "Login" : "Register"}
                        </span>
                    </p>
                </form>
            </div>
        </>
    )
}
