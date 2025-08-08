import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { IoLogIn } from "react-icons/io5"
import Profilepanel from "./Profilepanel"
import Authform from "./Authform"
import { Link } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { LuSquareMenu } from "react-icons/lu"
export default function Header() {
    let [ismenuopen, setismenuopen] = useState(false)
    let [showProfile, setShowProfile] = useState(false)
    let [showLogin, setShowLogin] = useState(false)
    let [isRegister, setIsRegister] = useState(false)
    let [lastScrollY, setLastScrollY] = useState(0)
    let [showHeader, setShowHeader] = useState(true)
    let [islogin, setislogin] = useState(false)
    let [showuserinfo, setshowuserinfo] = useState(null)
    let navItems = [
        {
            name: 'HOME',
            path: '/'
        },
        {
            name: 'DISCOVERY',
            path: '/discovery'
        },
        {
            name: 'ABOUT-US',
            path: '/aboutus'
        },
        {
            name: 'FAQ',
            path: '/faq'
        }
    ];
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 80) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY])
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp < currentTime) {
                    localStorage.removeItem('token');
                    setislogin(false)
                    setshowuserinfo(null)
                    window.location.href = "/";
                } else {
                    setislogin(true);
                    setshowuserinfo(decoded)
                    const timeout = (decoded.exp - currentTime) * 1000;
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        setislogin(false);
                        setshowuserinfo(null)
                        window.location.href = "/";
                    }, timeout);
                }
            } catch {
                localStorage.removeItem('token');
                setislogin(false);
                window.location.href = "/";
            }
        } else {
            setislogin(false);
            setshowuserinfo(null)
        }
    }, [])
    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 bg-[#1e211d] shadow-2xl transition-transform duration-600 
                ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="flex justify-between items-center w-full h-[80px] lg:px-0 px-4 lg:grid lg:grid-cols-[10%_auto_25%] lg:gap-5">

                    <div className="lg:ml-5 hover:scale-110 transition duration-200 cursor-pointer">
                        <img
                            src="/public/logo.png"
                            className="w-[70px] h-[70px] object-contain rounded-2xl "
                            alt="Logo"
                        />
                    </div>
                    <nav className="hidden lg:flex text-[#89e74e] text-[18px] gap-[50px] font-semibold">
                        {navItems.map((item, idx) => (
                            <li key={idx} className="list-none">
                                <Link to={item.path}
                                    className=" text-white hover:text-[oklch(89.7%_0.196_126.665)] transition-colors duration-300 hover:underline cursor-pointer"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </nav>

                    <div className="flex justify-end items-center gap-4">
                        <div className="flex justify-end">
                            {islogin ? (
                                <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowProfile(true)}>
                                    <button className="w-[50px] h-[50px] rounded-full hover:scale-110 transition duration-300 pt-[15px]">
                                        {showuserinfo?.profileimage ? (
                                            <img src={`http://localhost:5000${showuserinfo.profileimage}`} alt="Profile" className="w-[40px] h-[40px] rounded-full object-cover border border-[#89e74e]" />
                                        ) : (
                                            <CgProfile size={35} className="text-white transition-colors duration-300 hover:text-[oklch(89.7%_0.196_126.665)]" />
                                        )}
                                    </button>
                                    <span className="text-[12px] text-white mt-1 hover:text-[oklch(89.7%_0.196_126.665)] transition-colors duration-400 cursor-pointer mr-[10.75px] pb-[15px]">Profile</span>
                                </div>
                            ) : (
                                <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 font-semibold px-4 py-1 rounded hover:scale-110 text-white hover:text-[oklch(89.7%_0.196_126.665)] transition-colors duration-400 cursor-pointer">
                                    <IoLogIn size={25} /> Login
                                </button>
                            )}
                        </div>
                        <button className="lg:hidden text-white" onClick={() => setismenuopen(!ismenuopen)}>
                            <LuSquareMenu size={28} />
                        </button>
                    </div>
                </div>
                {ismenuopen && (
                    <div className="lg:hidden bg-[#1e211d] text-white py-4">
                        <nav className="flex flex-col items-center gap-4">
                            {navItems.map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.path}
                                    className="w-full text-center py-2 hover:bg-gray-700"
                                    onClick={() => setismenuopen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
            {showLogin && (
                <Authform setIsRegister={setIsRegister} isRegister={isRegister} setShowLogin={setShowLogin} setislogin={setislogin} setshowuserinfo={setshowuserinfo} />
            )}
            <Profilepanel setShowProfile={setShowProfile} showProfile={showProfile} setislogin={setislogin} showuserinfo={showuserinfo} setshowuserinfo={setshowuserinfo} />
        </>
    );
}