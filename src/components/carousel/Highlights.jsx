import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VideoCarousel from "./VideoCarousel";
import CitySlides from "./CitySlides"

const Highlights = ({ onSearch }) => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full px-12 pt-28"
    >
      <div className="screen-max-w">
        <div className="mb-7 w-full">
          <h1 id="title" className="text-3xl font-semibold text-gray-700">
            Go around the world
          </h1>
        </div>

        <VideoCarousel onSearch={onSearch}/>
        <CitySlides onSearch={onSearch}/>
      </div>
    </section>
  );
};

export default Highlights;