import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const contactDetails = {
    email: 'sanjayrajgurupurohit@gmail.com',
    phone: '6382608836',
    location: 'Chennai, Tamil Nadu, India'
  };

  return (
    <section className="bg-[#1e211d] py-12 flex justify-center">
      <div className="bg-[#1e211d] rounded-lg w-full max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Contact Us</h1>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto text-sm md:text-base">
            Any questions or remarks? Just write us a message!
          </p>
          <div className="flex justify-center">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactDetails.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#89e74e] text-black px-6 py-3 rounded-md font-semibold text-base hover:bg-opacity-80 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="bg-[#e0f7e0] py-10 px-6 rounded-lg shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center">

            <div className="flex flex-col items-center">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactDetails.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 text-sm hover:text-[#89e74e] transition-colors duration-200 flex flex-col items-center"
              >
                <div className="bg-[#89e74e] text-black rounded-full p-5 mb-3">
                  <MdEmail className="text-2xl" />
                </div>
                <h2 className="text-lg font-bold mb-1 text-black">EMAIL US</h2>
                {contactDetails.email}
              </a>
            </div>

            <div className="flex flex-col items-center">
              <a 
                href={`tel:${contactDetails.phone}`}
                className="text-gray-600 text-sm hover:text-[#89e74e] transition-colors duration-200 flex flex-col items-center"
              >
                <div className="bg-[#89e74e] text-black rounded-full p-5 mb-3">
                  <FaPhoneAlt className="text-2xl" />
                </div>
                <h2 className="text-lg font-bold mb-1 text-black">CALL US</h2>
                {contactDetails.phone}
              </a>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-[#89e74e] text-black rounded-full p-5 mb-3">
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <h2 className="text-lg font-bold mb-1 text-black">OUR LOCATION</h2>
              <p className="text-gray-600 text-sm">
                {contactDetails.location}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
