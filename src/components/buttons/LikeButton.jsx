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
      className="relative cursor-pointer transition hover:opacity-80 "
      onClick={handleClick}
    >
      <AiOutlineHeart size={24} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={20} className={isClicked ? "fill-rose-500" : "fill-neutral-500/70"} />
    </div>
  );
};

export default LikeButton;