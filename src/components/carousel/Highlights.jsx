import { useEffect, useRef } from "react";
import gsap from "gsap";
import VideoCarousel from "./VideoCarousel";
import CitySlides from "./CitySlides";

const Highlights = ({ onSearch }) => {
  const titleRef = useRef(null);
  const linkRefs = useRef([]);

  useEffect(() => {
    gsap.to(titleRef.current, { opacity: 1, y: 0 });

    if (linkRefs.current.length) {
      gsap.to(linkRefs.current, { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
    }
  }, []);

  const addLinkRef = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full px-12 pt-28"
    >
      <div className="screen-max-w">
        <div className="mb-7 w-full">
          <h1 id="title" ref={titleRef} className="text-3xl font-semibold text-gray-700 opacity-0 transform translate-y-5">
            Go around the world
          </h1>
        </div>

        <VideoCarousel onSearch={onSearch} addLinkRef={addLinkRef} />
        <CitySlides onSearch={onSearch} addLinkRef={addLinkRef} />
      </div>
    </section>
  );
};

export default Highlights;
