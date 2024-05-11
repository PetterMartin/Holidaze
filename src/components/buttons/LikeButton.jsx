import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikeButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event propagation
    setIsClicked(!isClicked);
  };

  return (
    <div 
      className="relative cursor-pointer transition hover:opacity-80 p-2 rounded-full bg-opacity-70 backdrop-filter backdrop-blur-xl flex items-center justify-center"
      onClick={handleClick}
    >
      <AiOutlineHeart size={18} className="fill-white absolute" />
      <AiFillHeart size={20} className={isClicked ? "fill-rose-500" : "fill-transparent"} />
    </div>
  );
};

export default LikeButton;