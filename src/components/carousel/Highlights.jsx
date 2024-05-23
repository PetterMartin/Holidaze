import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full px-12 py-28 bg-zinc"
    >
      <div className="screen-max-w">
        <div className="mb-8 w-full md:flex items-end justify-between">
          <h1 id="title" className="text-3xl font-semibold text-gray-700">
            Go around the world
          </h1>

            <p className="flex hover:underline">
              View all
            </p>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;