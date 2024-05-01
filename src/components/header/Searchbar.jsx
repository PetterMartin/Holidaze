import { useState, useRef } from "react";
import { FaArrowRight, FaMinus, FaPlus, FaUsers } from "react-icons/fa";
import { BsFillCalendarMinusFill } from "react-icons/bs";
import { MdLocationOn, MdKeyboardArrowDown } from "react-icons/md";

const SearchBar = ({ onSearch }) => {
    const [guests, setGuests] = useState(0);
    const timerRef = useRef(null); 
    const delay = 400;
  
    const decreaseGuests = () => {
        setGuests((prevGuests) => Math.max(prevGuests - 1, 1)); // Ensure guests never go below 1
      };
    
      const increaseGuests = () => {
        setGuests((prevGuests) => prevGuests + 1);
      };
  
      const handleMouseDownDecrease = () => {
        decreaseGuests();
        timerRef.current = setTimeout(() => {
          timerRef.current = setInterval(decreaseGuests, 100);
        }, delay);
      };

      
        const handleMouseUpDecrease = () => {
          clearInterval(timerRef.current);
        };
      
        const handleMouseDownIncrease = () => {
            increaseGuests();
            timerRef.current = setTimeout(() => {
              timerRef.current = setInterval(increaseGuests, 100);
            }, delay);
          };
      
        const handleMouseUpIncrease = () => {
          clearInterval(timerRef.current);
        };

  
    const handleSearch = () => {
      // Implement search functionality here
      // Pass both location and guests to the search function
      onSearch({ guests });
    };


  return (
    <div className="flex justify-between items-center w-3/4 bg-white border-2 py-2 px-2 ps-8 rounded-full mt-6 mb-20">
      <div className="flex justify-between w-full">
        {/* Location section */}
        <div className="flex items-center gap-8">
          <MdLocationOn size={25} />
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">Where do you want to go?</p>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search Destinations"
                className="w-full bg-transparent focus:outline-none focus:border-blue-500 placeholder-gray-600 placeholder:font-semibold cursor-pointer"
              />
              <MdKeyboardArrowDown size={25} />
            </div>
          </div>
        </div>

        <div className="border border-gray-300 rounded-full"></div>

        {/* Guests section */}
        <div className="flex items-center gap-8">
          <BsFillCalendarMinusFill size={20} />
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">Date</p>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Add Dates"
                className="w-full bg-transparent focus:outline-none focus:border-blue-500 placeholder-gray-600 placeholder:font-semibold cursor-pointer"
              />
              <MdKeyboardArrowDown size={25} />
            </div>
          </div>
        </div>

        <div className="border border-gray-300 rounded-full"></div>

        {/* Guest section */}
        <div className="flex items-center gap-6">
          <FaUsers size={25} />
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">Number of guests</p>
            <div className="flex items-center">
            <div
                className="px-3 py-2.5 rounded-lg border-2 text-rose-500 cursor-pointer hover:bg-gray-200"
                onMouseDown={handleMouseDownDecrease}
                onMouseUp={handleMouseUpDecrease}
                onMouseLeave={handleMouseUpDecrease}
              >
                <FaMinus size={8} />
              </div>
              <p className="px-3 text-gray-600 font-semibold">{guests} guests</p>
              <div
                className="px-3 py-2.5 rounded-lg border-2 text-rose-500 cursor-pointer hover:bg-gray-200"
                onMouseDown={handleMouseDownIncrease}
                onMouseUp={handleMouseUpIncrease}
                onMouseLeave={handleMouseUpIncrease}
              >
                <FaPlus size={8} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search button */}
      <button
        className="flex justify-center items-center gap-6 ms-16 font-semibold bg-gradient-to-b from-rose-600 to-rose-500 text-white ps-8 pe-4 py-4 rounded-full transition duration-200 ease-in-out hover:opacity-80"
        onClick={handleSearch}
      >
        Search
        <FaArrowRight />
      </button>
    </div>
  );
};

export default SearchBar;
