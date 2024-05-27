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
      className="w-screen overflow-hidden h-full px-4 md:px-12 pt-8 md:pt-28"
    >
      <div className="screen-max-w">
          <h1 id="title" ref={titleRef} className="mb-5 md:mb-7 text-2xl md:text-3xl font-semibold text-gray-700">
            Go around the world
          </h1>

        <VideoCarousel onSearch={onSearch} addLinkRef={addLinkRef} />
        <CitySlides onSearch={onSearch} addLinkRef={addLinkRef} />
      </div>
    </section>
  );
};

export default Highlights;
