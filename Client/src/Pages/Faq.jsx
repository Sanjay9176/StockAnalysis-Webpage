import Header from "../Components/Header";
import Contactus from "../Components/Contactus";
import Secondsection from "../Components/Secondsection";
import Faqsection from "../Components/Faqsection";
import { easeInOut, easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
export default function Faq() {
  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  return (
    <>
      <Header />
      <Secondsection />
      <>
        <section className="w-full min-h-screen bg-[linear-gradient(135deg,_#2a2b3d_5%,_#6d6d91_50%,_#fefefc_100%)] text-white px-4 md:px-6 py-16">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12" ref={ref1}>
            <motion.div className="text-lg md:text-[22px] text-center md:text-left text-black"
             variants={textVariants} initial="hidden" animate={inView1 ? "show" : "hidden"}>
              <motion.h1 className="font-bold text-black text-3xl md:text-[36px] mb-6" variants={childvariants} >📘 Frequently Asked Questions</motion.h1>
              <motion.p className="text-white leading-relaxed max-w-5xl text-base md:text-lg mx-auto" variants={childvariants}>
                Explore answers to the most common questions investors have while using our platform.
                      From stock data sources to analysis features, we’ve covered the essentials.
                      Whether you're a beginner or an expert, this section will help you navigate with ease.
              </motion.p>
            </motion.div>
            <motion.div className="w-full max-w-[1030px] md:h-[400px] rounded-xl shadow-lg overflow-hidden"
              variants={imageReveal} initial="hidden" animate={inView1 ? "show" : "hidden"}>
              <img src="/public/faq.png" className="w-full h-full object-fill" />
            </motion.div>
          </div>
          <Faqsection />
        </section>
      </>
      <Contactus />
    </>
  );
}
