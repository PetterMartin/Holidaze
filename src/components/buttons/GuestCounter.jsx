import { useState, useRef } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const GuestCounter = ({ onGuestChange }) => {
  const [guests, setGuests] = useState(1);
  const timerRef = useRef(null);
  const delay = 400;

  const decreaseGuests = () => {
    setGuests((prevGuests) => Math.max(prevGuests - 1, 1)); 
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
    onGuestChange(guests); // Call onGuestChange when the state changes
  };

  const handleMouseDownIncrease = () => {
    increaseGuests();
    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(increaseGuests, 100);
    }, delay);
  };

  const handleMouseUpIncrease = () => {
    clearInterval(timerRef.current);
    onGuestChange(guests); // Call onGuestChange when the state changes
  };
  
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col">
        <div className="flex items-center">
          <button
            type="button" // Set type="button" to prevent form submission
            className="bg-white px-3 py-2.5 rounded-lg border-2 text-rose-500 cursor-pointer hover:border-gray-500 transition duration-300 ease-in-out"
            onMouseDown={handleMouseDownDecrease}
            onMouseUp={handleMouseUpDecrease}
            onMouseLeave={handleMouseUpDecrease}
          >
            <FaMinus size={8} />
          </button>
          <p className="px-3 text-gray-600 font-semibold">{guests}</p>
          <button
            type="button" // Set type="button" to prevent form submission
            className="bg-white px-3 py-2.5 rounded-lg border-2 text-rose-500 cursor-pointer hover:border-gray-500 transition duration-300 ease-in-out"
            onMouseDown={handleMouseDownIncrease}
            onMouseUp={handleMouseUpIncrease}
            onMouseLeave={handleMouseUpIncrease}
          >
            <FaPlus size={8} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestCounter;
