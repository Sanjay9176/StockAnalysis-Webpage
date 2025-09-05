import { IoNavigateCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Scene from "./scene";
export default function FirstSection() {
    const navigate = useNavigate()
    return (
        <>
            <section className="bg-[linear-gradient(135deg,_#1e211d_20%,_#273036_45%,_#111827_95%)] text-[#89e74e] bg-no-repeat bg-cover bg-center min-h-screen pt-[80px] pb-[16px]">
                <div className="grid grid-cols-1 lg:grid-cols-[50%_auto] items-start">
                    <div className="flex flex-col items-start justify-start pt-[25px] px-4 space-y-8 lg:px-8 lg:space-y-10">
                        <div className="leading-tight w-full text-[30px] lg:text-[40px]">
                            <h1 className="font-normal mt-[30px]">

                                WELCOME TO THE {" "}
                                <span className="font-bold hover:text-white transition-colors duration-100">
                                    VENTURECAP
                                </span>
                            </h1>

                            <p className="font-bold hover:text-white transition-colors duration-100 mt-[10px]">
                                STOCKS ANALYSIS
                            </p>
                        </div>
                        <div className="relative w-full max-w-[550px] ml-0 lg:ml-[15px] mt-[40px] lg:mt-[90px]">
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-black transition-colors duration-300">
                                <IoNavigateCircleSharp size={30} />
                            </button>
                            <input
                                type="text"
                                placeholder="CLICK HERE TO EXPLORE!!!"
                                readOnly
                                onClick={()=>navigate("/discovery/")}
                                className="w-full h-[80px] pl-14 pr-6 text-white text-[16px] lg:text-[18px] border-2 rounded-[40px] 
                               border-[#45732a] hover:placeholder:text-[#89e74e]  transition-colors duration-300
                               bg-[#1e211d] placeholder:font-bold placeholder:text-center placeholder:text-white 
                                 placeholder:text-[16px] lg:placeholder:text-[18px] focus:outline-none "
                            />
                        </div>
                    </div>

                    <div className="w-full h-[400] lg:h-[628px] flex justify-center items-center">
                        <div className="w-full h-full max-w-[500px] max-h-[500px]">
                            <Scene />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
} 