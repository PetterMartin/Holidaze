import { useEffect } from "react";
import Calendar from "../calendar/Calendar";

const DateModal = ({ onClose, handleDateChange }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#searchModal")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      id="searchModal"
      className="absolute w-[400px] md:w-[800px] md:h-[500px] bg-white border-2 rounded-3xl mt-3 ms-6 p-6 cursor-pointer z-50"
    >
      <div className="flex justify-center items-center">
        <Calendar handleDateChange={handleDateChange} />
      </div>
    </div>
  );
};

export default DateModal;
