import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../../constants";

const VideoCarousel = ({ onSearch }) => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  useEffect(() => {
    defineElement(lottie.loadAnimation);
  }, []);

  gsap.config({
    nullTargetWarn: false,
  });

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "#afafaf",
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "8px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      const animUpdate = () => {
        const videoElement = videoRef.current[videoId];
        if (videoElement) {
          anim.progress(
            videoElement.currentTime / hightlightsSlides[videoId].videoDuration
          );
        }
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  const handleTextClick = (clickedText) => {
    const searchText = clickedText.split(",")[1].trim().toLowerCase();

    onSearch({ searchText, guests: 1 });
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="">
            <div className="video-carousel_container relative">
              <div className="w-[800px] h-full flex-center rounded-3xl overflow-hidden bg-black relative">
                <video
                  id="video"
                  playsInline={true}
                  className={`${
                    list.id === 2 && "translate-x-30"
                  } pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gray-700 opacity-20 pointer-events-none"></div>
              </div>

              <div className="absolute bottom-10 left-[5%] z-10 text-white">
                {list.textLists.map((text, j) => (
                  <p
                    key={j}
                    className="md:text-2xl text-xl with-shadow cursor-pointer"
                    onClick={() => handleTextClick(text)}
                  >
                    {text}
                  </p>
                ))}
                <p className=" mt-1 with-shadow">{list.smallText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-4">
        <div className="flex-center py-2 px-3 border-2 rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-1 w-2 h-2 bg-gray-200 rounded-full relative"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button
          className="video ml-4 p-1 rounded-full border-2 flex items-center hover:border-gray-400 transition duration-300 ease-in-out"
          onClick={() =>
            handleProcess(
              isLastVideo ? "video-reset" : isPlaying ? "pause" : "play"
            )
          }
        >
          {isLastVideo ? (
            <lord-icon
              src="https://cdn.lordicon.com/rsbokaso.json"
              trigger="hover"
              target=".video"
              style={{ width: 18, height: 18 }} 
            ></lord-icon>
          ) : !isPlaying ? (
            <lord-icon
              src="https://cdn.lordicon.com/aklfruoc.json"
              trigger="hover"
              target=".video"
              style={{ width: 18, height: 18 }} 
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/ptvmrrcc.json"
              trigger="hover"
              target=".video"
              style={{ width: 18, height: 18 }} 
            ></lord-icon>
          )}
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
