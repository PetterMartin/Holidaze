import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCamera } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";

const MediaUrlInput = ({ mediaUrl, handleChange, handleAddImageUrl, media, handleRemoveImage }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex-auto">
      <div>
        <div className="flex gap-2 text-2xl font-semibold text-gray-800">
          Take a picture of your listing{" "}
          <BsCamera size={25} className="m-0.5 ms-2" />
        </div>
        <div className="font-light text-gray-500 mt-2 mb-6">
          You can add more than one!
        </div>
      </div>
      <div className="flex">
        <div className="w-full relative">
          <input
            type="url"
            id="imageUrl"
            name="mediaUrl"
            value={mediaUrl}
            onChange={handleChange}
            placeholder={isFocused ? "Image URL goes here" : ""}
            className={`peer w-full p-4 pt-6 font-light border-2 rounded-md outline-none transition hover:border-gray-500 focus:border-gray-500 cursor-pointer`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <div className="flex flex-wrap mt-2">
            {media.map((mediaItem, index) => (
              <div key={index} className="relative flex items-center w-1/2 mb-4">
                <img
                  src={mediaItem.url}
                  alt={`Image Preview ${index + 1}`}
                  className="max-w-full h-auto rounded-xl border-4 cursor-pointer"
                  style={{ maxWidth: "220px", maxHeight: "220px" }}
                />
                <button
                  className="ml-2 bg-white text-gray-400 hover:text-black p-1 rounded-full"
                  onClick={() => handleRemoveImage(index)}
                >
                  <AiOutlineClose size={18} />
                </button>
              </div>
            ))}
          </div>

          <label
            htmlFor="imageUrl"
            className="
              absolute 
              text-md
              duration-150 
              transform 
              -translate-y-3 
              top-5 
              z-10 
              origin-[0] 
              left-4
              peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75
              peer-focus:-translate-y-4
            "
          >
            Upload Image (optional)
          </label>
        </div>
        <IoAddCircle
          size={50}
          className="mx-2 mt-2 text-rose-400 transition duration-200 ease-in-out hover:opacity-80 cursor-pointer"
          onClick={handleAddImageUrl}
        />
      </div>
    </div>
  );
};

export default MediaUrlInput;
