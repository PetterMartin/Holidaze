import { useState } from "react";

import { LiaCitySolid, LiaMountainSolid, LiaSkiingSolid } from "react-icons/lia";
import { MdOutlineForest, MdOutlinePool } from "react-icons/md";
import { TbBeach } from "react-icons/tb";

const categories = [
    "Beach",
    "Forest",
    "Pool",
    "Mountains",
    "City",
    "Skiing",
  ];
  
  const categoryIcons = {
    Beach: <TbBeach  size={26} />,
    Forest: <MdOutlineForest  size={26} />,
    Pool: <MdOutlinePool  size={26} />,
    Mountains: <LiaMountainSolid  size={26} />,
    City: <LiaCitySolid  size={26} />,
    Skiing: <LiaSkiingSolid  size={26} />,
  };

const Category = () => {
    const [userTags, setUserTags] = useState("");

    const handleCategoryClick = (clickedCategory) => {
        setUserTags(
          (prevUserTags) =>
            prevUserTags + (prevUserTags ? `, ${clickedCategory}` : clickedCategory)
        );
      };

  return (
    <div>
        <div className="text-start">
          <div className="text-xl md:text-2xl font-semibold">
            Which of these best describe your home?
          </div>
          <div className="text-sm md:text-base text-neutral-500 mt-2 mb-6">
            Pick a category (Optional)
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`rounded-xl border-2 p-2 flex flex-col items-start text-gray-500 hover:text-gray-600 hover:border-gray-600 focus:border-gray-600 transition cursor-pointer ${
                index >= categories.length ? "hidden sm:flex" : ""
              }`}
            >
              <div className="flex items-center justify-center ms-5">
                {categoryIcons[category]}
              </div>
              <div className="text-sm md:text-base px-5 rounded-full mt-2">
                <p>{category}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <label
            htmlFor="userTags"
            className="block text-md font-light mb-2 text-neutral-500"
          >
            Or add your own
          </label>
          <input
            type="text"
            id="userTags"
            name="userTags"
            placeholder="Enter category separated by commas"
            value={userTags}
            onChange={(e) => setUserTags(e.target.value)}
            className="w-full p-4 border-2 rounded-md outline-none transition hover:border-gray-600 focus:border-gray-600 cursor-pointer"
          />
        </div>
    </div>
  );
};

export default Category;
