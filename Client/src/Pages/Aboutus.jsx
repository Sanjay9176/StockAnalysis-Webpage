import Contactus from "../Components/Contactus";
import Header from "../Components/Header";
import { easeInOut, easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Secondsection from "../Components/Secondsection";
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1, y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const childvariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.5
    },
  },
}

const imageReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

export default function Aboutus() {
  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })
  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })
  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })
  return (
    <>
      <Header />
      <Secondsection/>
      <section className="w-full bg-[linear-gradient(135deg,_#2a2b3d_5%,_#6d6d91_50%,_#fefefc_100%)] text-white flex flex-col items-center justify-center px-4 py-16 gap-16 md:px-10 md:py-24 md:gap-24">

        <div className="grid grid-cols-1 md:grid-cols-[50%_auto] w-full max-w-7xl items-center gap-8 md:gap-12"
          ref={ref1}>
          <motion.div className="text-lg md:text-[22px] text-center md:text-left"
            variants={textVariants} initial="hidden" animate={inView1 ? "show" : "hidden"} >
            <motion.h1 className="font-bold text-black text-[30px] md:text-[36px] mb-6 
            " variants={childvariants} >
              Why VENTURECAP STOCKS ANALYSIS?</motion.h1>
            <motion.p className="text-white leading-relaxed max-w-5xl mx-auto" variants={childvariants}>
              At VentureCap, we put powerful stock analysis at your fingertips. 
              Whether you're analyzing real-time market data with our unique live comparison tool or exploring multi-year historical trends, 
              we provide the essential insights you need. Our secure, user-friendly platform is designed to give you a clear and interactive advantage, 
              making complex market analysis simple and effective.
            </motion.p>
          </motion.div>
          <motion.div className="w-full mx-auto max-w-[500px] h-[400px] rounded-xl shadow-lg overflow-hidden"
            variants={imageReveal} initial="hidden" animate={inView1 ? "show" : "hidden"}>
            <img src="/public/lexpologo.jpg" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="w-full max-w-7xl flex flex-col items-center gap-8 md:gap-12 sm:mt-[35px] md:mt-[80px]" ref={ref2}>
          <motion.div className="text-lg md:text-[22px] text-center text-black" variants={textVariants} initial="hidden" animate={inView2 ? "show" : "hidden"}>
            <motion.h1 className="font-bold text-black text-3xl md:text-[36px] mb-6" variants={childvariants} >Why Analysis Matters?</motion.h1>
            <motion.p className="text-white leading-relaxed max-w-5xl mx-auto" variants={childvariants}>
              In the fast-paced world of financial markets, making informed decisions is paramount. 
              Stock analysis empowers you to navigate the complexities of the market with confidence. By examining financial data, 
              market trends, and economic indicators, you can uncover valuable insights, 
              identify potential opportunities, and manage risks effectively. 
              Our mission is to provide you with the tools and knowledge necessary to make smarter investment choices
            </motion.p>
          </motion.div>
          <motion.div className="w-full h-auto m-w-[1030px] md:h-[400px] rounded-xl shadow-lg overflow-hidden"
            variants={imageReveal} initial="hidden" animate={inView2 ? "show" : "hidden"}>
            <img src="/public/Aboutusimage.png" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[50%_auto] w-full max-w-7xl items-center gap-8 md:gap-12 sm:mt-[35px] md:mt-[80px]" ref={ref3}>
          <motion.div className="w-full mx-auto m-w-[500px] h-[400px] rounded-xl shadow-lg overflow-hidden order-last md:order-first"
            variants={imageReveal} initial="hidden" animate={inView3 ? "show" : "hidden"}>
            <img src="/public/stockimage.jpg" className="w-full h-full object-fill" />
          </motion.div>
          <motion.div className="text-lg md:text-[22px] text-center md:text-left" variants={textVariants} initial="hidden" animate={inView3 ? "show" : "hidden"}>
            <motion.h1 className="font-bold text-black text-3xl md:text-[36px] mb-6" variants={childvariants}>Why the Stock Market?</motion.h1>
            <motion.p className="text-white leading-relaxed max-w-5xl mx-auto" variants={childvariants}>
              The stock market is the engine of the economy, offering a unique opportunity for individuals to invest in the growth of leading companies.
               It's more than just numbers on a screen; it's a dynamic marketplace where you can build long-term wealth and 
               participate in the success of businesses that are shaping our world. 
              Understanding the market is the first step towards turning your financial goals into reality.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <div>
        <Contactus />
      </div>
    </>
  )
}
