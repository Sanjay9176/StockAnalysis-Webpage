import { CgProfile } from "react-icons/cg"
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
export default function Profilepanel({ setShowProfile, showProfile, setislogin, showuserinfo, setshowuserinfo }) {
    let pimagehandling = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profileimage', file);

        try {
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:5000/lexpo/register/profilephoto", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json()
            if (data.status === 1) {
                localStorage.setItem("token", data.token);
                const decoded = jwtDecode(data.token);
                setshowuserinfo(decoded);
                toast.success("Image uploaded successfully!");
            } else {
                toast.error(data.msg);
            }
        } catch {
            toast.error("Upload error")
        }
    }
    const removeProfilePhoto = async () => {
        const token = localStorage.getItem("token")
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to remove your profile photo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#45732a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch("http://localhost:5000/lexpo/register/removephoto", {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (data.status === 1) {
                    localStorage.setItem("token", data.token);
                    toast.success("Profile photo removed successfully!");
                    setshowuserinfo(prev => ({
                        ...prev,
                        profileimage: ""
                    }));
                } else {
                    toast.error("Failed to remove profile photo!");
                }
            } catch{
                toast.error("An error occurred.")
            }
        }
    };
    let Profilefield = [
        {
            label: "Username",
            value: showuserinfo?.username || ""
        },
        {
            label: "Email",
            value: showuserinfo?.email || ""
        },
        {
            label: "Phone No",
            value: showuserinfo?.phone || ""
        }
    ]
    return (
        <>
            <div
                className={`fixed top-0 right-0 h-full w-[100%] sm:w-80  lg:w-[25%] bg-[#111827] text-white shadow-lg z-50 transform transition-transform duration-500 ${showProfile ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-4 flex justify-between items-center border-b border-[#45732a]">
                    <h2 className="text-xl font-bold text-[#89e74e]">Profile</h2>
                    <button
                        onClick={() => setShowProfile(false)}
                        className="text-[#89e74e] hover:underline"
                    >
                        Close
                    </button>
                </div>

                <div className="p-4 flex flex-col items-center gap-4">

                    {showuserinfo?.profileimage ? (
                        <img src={`http://localhost:5000${showuserinfo.profileimage}`} alt="Profile" className="w-[200px] h-[200px] rounded-full object-cover border border-[#45732a]" />


                    ) : (
                        <span><CgProfile size={200} className="text-white transition-colors duration-300 hover:text-[oklch(89.7%_0.196_126.665)]" /></span>
                    )}
                    <div className="flex justify-between w-full px-4">
                        <button className="bg-[#1e1e2d] hover:bg-[linear-gradient(135deg,_#89e74e,_#45732a,_#b02e0c,_#7b1e10)] text-[#89e74e] border border-[#45732a] px-4 py-2 rounded-xl transition duration-300">
                            <label className="text-sm text-[#89e74e] hover:opacity-80 cursor-pointer relative overflow-hidden">
                                Change Profile
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={pimagehandling}
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                        </button>
                        <button
                            className="bg-[#1e1e2d] hover:bg-[linear-gradient(135deg,_#89e74e,_#45732a,_#b02e0c,_#7b1e10)] border border-[#45732a] px-4 py-2 rounded-xl transition duration-300 text-sm font-semibold"
                            onClick={removeProfilePhoto}
                        >
                            Remove Profile
                        </button>
                    </div>

                    <div className="w-full mt-4 space-y-3 text-sm">
                        {Profilefield.map((field, i) => (
                            <div className="flex flex-col " key={i}>
                                <label className="text-[#89e74e] font-semibold">{field.label}</label>
                                <input
                                    type="text"
                                    value={field.value || "Loading..."}
                                    readOnly
                                    className="bg-[#1e1e2d] border border-[#45732a] rounded px-3 py-2 text-white"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 w-full flex justify-center">
                    <button
                        onClick={async () => {
                            const result = await Swal.fire({
                                title: 'Logout?',
                                text: "Are you sure you want to logout?",
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#45732a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, logout'
                            });

                            if (result.isConfirmed) {
                                localStorage.removeItem("token");
                                setislogin(false);
                                setShowProfile(false);
                                await Swal.fire({
                                    icon: 'success',
                                    title: 'Logged out!',
                                    text: 'You have been logged out successfully.',
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                                setTimeout(() => {
                                    window.location.href = "/";
                                }, 1500);
                            }
                        }}
                        className="bg-[#1e1e2d] hover:bg-[linear-gradient(135deg,_#89e74e,_#45732a,_#b02e0c,_#7b1e10)] text-[#89e74e] border border-[#45732a] px-4 py-2 rounded-xl transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
