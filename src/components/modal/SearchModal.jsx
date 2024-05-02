import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const SearchModal = ({ onSearchTextChange, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const newText = e.target.value;
    setSearchText(newText);
    onSearchTextChange(newText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchText);
      onClose();
    }
  };

  const clearSearch = () => {
    setSearchText("");
    onSearchTextChange("");
  };

  // Add event listener to handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.getElementById("searchModal");
      if (modal && !modal.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    inputRef.current.focus(); // Focus on input field when component mounts
  }, []);

  return (
    <div
      id="searchModal"
      className="absolute flex justify-center items-center w-[270px] bg-white border-2 rounded-full mt-28 ms-6 p-4 cursor-pointer z-50"
    >
      <div className="mr-2">
        <FiSearch size={20} />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Add key down event handler
        className="flex-1 outline-none cursor-pointer bg-transparent"
      />
      {searchText && (
        <div className="ml-2 cursor-pointer" onClick={clearSearch}>
          <FaTimes />
        </div>
      )}
    </div>
  );
};

export default SearchModal;
