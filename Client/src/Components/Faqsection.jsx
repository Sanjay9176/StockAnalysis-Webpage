import { motion, AnimatePresence } from "framer-motion";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useState } from "react";
export default function Faqsection() {
    const [openId, setOpenId] = useState(null);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const Faq_Query = [
        {
            id: 1,
            question: "1. Who are we?",
            answer: "We are a financial data platform that provides historical and current stock market data for Indian companies. Our goal is to help investors, traders, and enthusiasts analyze market trends without the complexity of buying or selling stocks.",
        },
        {
            id: 2,
            question: "2. Is this website free to use?",
            answer: "Yes, our basic features are free. However, we may offer premium subscriptions for advanced analytics and exclusive datasets in the future.",
        },
        {
            id: 3,
            question: "3. Is my personal and financial data secure?",
            answer: "Absolutely. We do not store any sensitive financial information (like bank details) since we do not support trading. All user data is encrypted and protected under strict privacy policies and also after 1hr automatic signout is present for better security.",
        },
        {
            id: 4,
            question: "4. Can I use this data for trading decisions?",
            answer: "Our platform is for educational and informational purposes only. We do not provide investment advice. Always consult a certified financial advisor before making trading decisions.",
        },
        {
            id: 5,
            question: "5. How can I contact customer support?",
            answer: "You can reach us via email at the Contact Us page",
        },
        {
            id: 6,
            question: "6. What kind of stock market data do you provide?",
            answer: "We provide historical and current data for Indian stocks, including: MarketCap,Dividend Yield, Debt/Equity ,P/E ratio, ROE,and Many More!!!",
        },
    ]
    return (
        <div className="mt-20 md:mt-24 lg:mt-[150px]">
            <h1 className="text-black font-bold text-3xl md:text-4xl text-center mb-12">
                FREQUENTLY ASKED QUESTIONS
            </h1>

            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
                {Faq_Query.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[linear-gradient(135deg,_#1e211d_20%,_#273036_45%,_#111827_95%)] rounded-2xl p-4 md:p-6 shadow-md"
                    >
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleFaq(item.id)}
                        >
                            <h2 className="text-lg md:text-xl font-semibold text-white">{item.question}</h2>
                            <button className="cursor-pointer hover:scale-120 transition duration-200">
                                <span className="text-xl md:text-2xl text-white">
                                    {openId === item.id ? <FaMinusCircle /> : <FaPlusCircle />}
                                </span>
                            </button>
                        </div>

                        <AnimatePresence>
                            {openId === item.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    <p className="mt-4 text-gray-300 text-base">{item.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    )
}
