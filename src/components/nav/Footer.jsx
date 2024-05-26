import {
    FaArrowRight,
    FaCcVisa,
    FaApplePay,
    FaPaypal,
    FaCcAmex,
    FaCcMastercard,
  } from "react-icons/fa";
  import { HiOutlineMail } from "react-icons/hi";
  import { GrLocation } from "react-icons/gr";
  import { MdPhone } from "react-icons/md";
  import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
  
  const Footer = () => {
    return (
      <div className="px-6 md:px-36 border-t mt-10 text-gray-700">
        <div className="flex justify-between py-10">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex gap-2 items-center text-sm">
              <MdPhone size={20} />
              (+47)875-462-0127
            </div>
            <div className="flex gap-2 items-center text-sm">
              <HiOutlineMail size={20} />
              contact@example.com
            </div>
            <div className="flex gap-2 max-w-[150px] text-sm">
              <GrLocation size={30} />
              Mølleparken 4, 0459 Oslo
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-3 items-center md:items-start">
            <h2 className="font-semibold text-lg mb-2">Support</h2>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              <p className="hover:underline cursor-pointer">Help Center</p>
              <p className="hover:underline cursor-pointer">Accessibility</p>
              <p className="hover:underline cursor-pointer">
                Cancellation Policy
              </p>
              <p className="hover:underline cursor-pointer">
                Safety Guidelines
              </p>
              <p className="hover:underline cursor-pointer">
                Report Neighborhood Issues
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-3 items-center md:items-start">
            <h2 className="font-semibold text-lg mb-2">Hosting</h2>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              <p className="hover:underline cursor-pointer">Responsible Hosting</p>
              <p className="hover:underline cursor-pointer">Contact Us</p>
              <p className="hover:underline cursor-pointer">
                Frequently Asked Questions
              </p>
              <p className="hover:underline cursor-pointer">
                Security and Privacy
              </p>
              <p className="hover:underline cursor-pointer">Transparency</p>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-3 items-center md:items-start">
            <h2 className="font-semibold text-lg mb-2">Airbnb</h2>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              <p className="hover:underline cursor-pointer">Customer Service</p>
              <p className="hover:underline cursor-pointer">Contact Us</p>
              <p className="hover:underline cursor-pointer">
                Careers
              </p>
              <p className="hover:underline cursor-pointer">
                Investors
              </p>
              <p className="hover:underline cursor-pointer">new features</p>
            </div>
          </div>
        </div>
  
        <div className="flex items-center justify-between py-10 border-t">
          <h1 className="font-bold text-2xl mb-2">YourStay</h1>
          <h2 className=" text-2xl mb-2">Subscribe to Our Newsletter!</h2>
          <div className="flex gap-4 justify-between items-center mt-2">
            <input
              type="email"
              placeholder="Email"
              className="border py-2 px-4 rounded-3xl"
            />
            <div className="flex gap-4 items-center text-white bg-gradient-to-b from-rose-400 to-rose-500 py-2 px-4 rounded-3xl">
              <HiOutlineMail size={20} />
              Email Address
              <FaArrowRight size={12} />
            </div>
          </div>
        </div>
  
        <div className="flex flex-col md:flex-row justify-between mt-4 py-6 border-t items-center">
          <div className="flex gap-4 items-center justify-center md:justify-start">
            <FaCcVisa size={27} />
            <FaCcMastercard size={27} />
            <FaApplePay size={40} />
            <FaCcAmex size={27} />
            <FaPaypal size={22} />
          </div>
          <div className="lg:me-20 text-gray-700 text-sm">© 2024 YourStay</div>
          <div className="flex gap-3 items-center justify-center md:justify-end">
            <FaFacebookF
              size={20}
              className="hover:text-neutral-500 cursor-pointer"
            />
            <FaInstagram
              size={23}
              className="hover:text-neutral-500 cursor-pointer"
            />
            <FaTwitter
              size={21}
              className="hover:text-neutral-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;
  