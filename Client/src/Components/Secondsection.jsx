import { IoNavigateCircleSharp } from "react-icons/io5";
import { RiScrollToBottomFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
export default function Secondsection() {
    const navigate = useNavigate()
    return (
        <>
            <section className="w-full min-h-screen bg-[linear-gradient(135deg,_#1e211d_20%,_#273036_45%,_#111827_95%)] text-[#89e74e] bg-no-repeat bg-cover bg-center pt-[80px] pb-[16px] flex flex-col justify-center items-center gap-8 px-4 lg:gap-[5vh] ">
                <div className="text-center ">
                    <h1 className="text-[30px] md:text-[40px] lg:text-[50px] font-normal lg:mt-[5px]">
                        <span className="font-bold hover:text-white transition-colors duration-100">
                            VENTURECAP STOCKS ANALYSIS
                        </span>
                    </h1>
                </div>
                <div className="relative w-full max-w-2xl flex flex-col justify-center items-center">
                    <div className="relative w-full flex justify-center items-center">
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-black transition-colors duration-300">
                            <IoNavigateCircleSharp size={30} />
                        </button>
                        <input
                            type="text"
                            placeholder="CLICK HERE TO EXPLORE!!!"
                            readOnly
                            onClick={() => navigate("/discovery/")}
                            className="w-full h-[70px] lg:h-[80px] pl-14 pr-6 text-white text-base lg:text-[18px] border-2 rounded-[40px] 
                        border-[#45732a] hover:placeholder:text-[#89e74e]  transition-colors duration-300
                        bg-[#1e211d] placeholder:font-bold placeholder:text-center placeholder:text-white 
                         placeholder:text-base lg:placeholder:text-[18px] focus:outline-none "
                        />
                    </div>
                    <p className="mt-[10px] text-white font-bold text-[12px] lg:text-sm flex items-center ">
                        SCROLL DOWN
                        <span className="text-[#89e74e] hover:text-black transition-colors duration-300 ml-1">
                            <RiScrollToBottomFill size={16} />
                        </span>
                    </p>
                </div>
            </section>
        </>
    )
}
