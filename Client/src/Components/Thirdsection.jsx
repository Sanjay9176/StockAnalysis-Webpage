import { useNavigate } from "react-router-dom";
export default function Thirdsection() {
    const navigate = useNavigate()
    return (
        <>
            <section className="w-full min-h-screen bg-[linear-gradient(135deg,_#1e211d_20%,_#273036_45%,_#111827_95%)] text-[#89e74e] bg-no-repeat bg-cover bg-center pt-[80px] pb-[16px] flex flex-col justify-center items-center gap-16 px-4">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal">
                            WELCOME TO THE {" "}
                            <span className="font-bold hover:text-white transition-colors duration-100">
                                VENTURECAP
                            </span>
                        </h1>

                        <p className="font-bold hover:text-white transition-colors duration-100 text-3xl md:text-4xl lg:text-5xl mt-2 ">
                            STOCKS ANALYSIS
                        </p>
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-[100px] ">
                        <button className="w-[150px] h-[75px] bg-[#1e1e2d] hover:bg-[linear-gradient(135deg,_#89e74e,_#45732a,_#b02e0c,_#7b1e10)] border-2
                         border-[#45732a] px-4 py-2 rounded-xl transition duration-300 text-sm font-semibold" onClick={()=>navigate("/discovery/liveanalysis")}>
                            LIVE ANALYSIS
                        </button>
                        <button className="w-[150px] h-[75px] bg-[#1e1e2d] hover:bg-[linear-gradient(135deg,_#89e74e,_#45732a,_#b02e0c,_#7b1e10)] border-2
                         border-[#45732a] px-4 py-2 rounded-xl transition duration-300 text-sm font-semibold" onClick={()=>navigate("/discovery/offlineanalysis")}>
                             OFFLINE  ANALYSIS
                        </button>
                    </div>
            </section>
        </>
    )
}
