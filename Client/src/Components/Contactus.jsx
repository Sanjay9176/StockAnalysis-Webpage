import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
export default function Contactus() {
    let contactusdetail = ([
        {
            name: 'Sanjay Kumar Purohit',
            email: 'sanjayrajgurupurohit@gmail.com',
            Linkedin: 'linkedin.com/in/sanjaypurohit9',
            linkedinhref: 'https://www.linkedin.com/in/sanjaypurohit9',
            github: 'github.com/Sanjay9176',
            githubhref: 'https://github.com/Sanjay9176',
            leetcode: 'leetcode.com/u/sanjay9176',
            leetcodehref: 'https://leetcode.com/u/sanjay9176/',
            para: '(MERN STACK DEVELOPER)'
        },
        {
            name: 'Priyank Davve',
            email: 'priyankdave169@gmail.com',
            Linkedin: 'linkedin.com/in/priyankdave169',
            linkedinhref: 'https://www.linkedin.com/in/priyankdave169/',
            github: 'github.com/PriyankDave16',
            githubhref: 'https://github.com/PriyankDave16',
            leetcode: 'leetcode.com/u/Priyank169',
            leetcodehref: 'https://leetcode.com/u/Priyank169/',
            para: '(DATA ANALYTICS)'
        },
        {
            name: 'Shrishti',
            email: 'srishtijain506@gmail.com',
            Linkedin: 'linkedin.com/in/shrishti-nandawat',
            linkedinhref: 'https://www.linkedin.com/in/shrishti-nandawat ',
            github: 'github.com/Shrishti044',
            githubhref: 'https://github.com/23f1000173',
            leetcode: 'leetcode.com/u/Shrishti_44',
            leetcodehref: 'https://leetcode.com/u/Shrishti_44/',
            para: '(DATA SCIENCE)'
        }
    ])
    return (
        <section className="bg-[#0b0b0b] py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-auto gap-10 md:gap-4 px-4 ">
                {contactusdetail.map((items, i) => (
                    <div className="text-white flex flex-col justify-start items-center md:items-start mt-0 md:mt-[50px] gap-4 text-base lg:ml-[100px] " key={i}>
                        <h1 className="flex flex-col items-center text-center text-[20px] font-semibold hover:text-[#89e74e] transition-colors duration-200">
                            <FaUserGraduate />
                            {items.name}
                            <p className="text-[16px] hover:text-[#89e74e] transition-colors duration-200">
                                {items.para}
                            </p>
                        </h1>
                        <div className="flex flex-col items-center md:items-start gap-3 mt-2">
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${items.email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 hover:text-[#89e74e] transition-colors duration-200"
                            >
                                <MdEmail />
                                {items.email}
                            </a>
                            <a
                                href={items.linkedinhref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 hover:text-[#89e74e] transition-colors duration-200"
                            >
                                <FaLinkedin />
                                {items.Linkedin}
                            </a>
                            <a
                                href={items.githubhref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 hover:text-[#89e74e] transition-colors duration-200"
                            >
                                <FaGithubSquare />
                                {items.github}
                            </a>
                            <a
                                href={items.leetcodehref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 hover:text-[#89e74e] transition-colors duration-200"
                            >
                                <SiLeetcode />
                                {items.leetcode}
                            </a>
                        </div>



                    </div>
                ))}
            </div>
        </section>
    )
}
