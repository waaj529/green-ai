"use client";

import React from "react";
import Link from "next/link";
import { useInteractiveZIndex } from "@/hooks/useInteractiveZIndex";

export interface KeyItem {
  icon: React.ReactNode | string;
  description: string;
}

export interface SlideProps {
  id?: number;
  slug?: string;
  headline?: string;
  subheadline?: string;
  highlighted?: string;
  title?: React.ReactNode;
  description: string;
  backgroundImage: string;
  tag?: string;
  keys: KeyItem[];
  cta: {
    button1: React.ReactNode | string;
    link1: string;
    button2: React.ReactNode | string;
    link2: string;
  };
  logo?: string;
  carouselLeft?: React.ReactNode;
  carouselRight?: React.ReactNode;
}

interface HeaderProps {
  slides: SlideProps[];
}

const Header: React.FC<HeaderProps> = ({ slides }) => {
  const [current, setCurrent] = React.useState(0);
  const slide = slides && slides.length > 0 ? slides[current] : null;
  const prevButtonProps = useInteractiveZIndex();
  const nextButtonProps = useInteractiveZIndex();
  const cta1Props = useInteractiveZIndex();
  const cta2Props = useInteractiveZIndex();
  const [paused, setPaused] = React.useState(false);

  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goNext = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  // Auto-advance the carousel; pause on hover.
  React.useEffect(() => {
    if (paused || !slides || slides.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [paused, slides]);

  if (!slide) return null;

  const categoryTag = slide.tag || `# Mining Insight 0${slide.id || current + 1}`;
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full h-screen max-h-screen flex flex-col justify-between text-white transition-[background-image] duration-1000 font-sans overflow-hidden select-none"
      style={{
        backgroundImage: `url("${slide.backgroundImage}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background dark overlay matching Figma linear gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-0"></div>

      <div key={current} className="relative w-full h-full flex flex-col justify-between z-10 animate-fadeIn pt-4 pb-6 px-4 md:px-8 lg:px-12 overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex flex-col w-full max-w-[1820px] mx-auto my-auto py-1">
          
          {/* Main Title (Headline) */}
          {slide.headline ? (
            <div className="text-left uppercase font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[76px] text-white tracking-tight leading-[1.05] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] mb-2 lg:mb-3">
              {slide.headline}
            </div>
          ) : slide.slug ? (
            <Link href={`/insights/${slide.slug}`} className="cursor-pointer hover:opacity-90 transition-opacity">
              <div className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{slide.title}</div>
            </Link>
          ) : (
            <div className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{slide.title}</div>
          )}

          {/* Subheadline with Highlighted Term */}
          {slide.subheadline && (
            <div className="text-left font-extrabold italic uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[45px] text-white leading-tight mb-3 lg:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {(() => {
                if (!slide.highlighted || slide.subheadline.trim().toLowerCase() === slide.highlighted.trim().toLowerCase()) {
                  return <span className="text-[#23B14D] not-italic font-black uppercase">{slide.subheadline}</span>;
                }
                const parts = slide.subheadline.split(new RegExp(`(${slide.highlighted})`, "gi"));
                return parts.map((part, idx) =>
                  part.toLowerCase() === slide.highlighted?.toLowerCase() ? (
                    <span key={idx} className="text-[#23B14D] not-italic font-black uppercase mx-1">
                      {part}
                    </span>
                  ) : (
                    <React.Fragment key={idx}>{part}</React.Fragment>
                  )
                );
              })()}
            </div>
          )}

          {/* Description */}
          <p className="font-normal text-sm sm:text-base md:text-xl lg:text-2xl 2xl:text-[25px] text-white leading-relaxed lg:leading-[30px] max-w-7xl my-1 lg:my-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {slide.description}
          </p>

          {/* Key Stats / Column Icons */}
          <div className={`w-full grid gap-4 lg:gap-8 justify-items-center items-start mt-4 lg:mt-6 mb-2 ${
            slide.keys.length >= 4
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 md:grid-cols-3"
          }`}>
            {slide.keys.map((key, idx) => (
              <div key={idx} className="flex flex-col items-center text-center max-w-sm">
                <div className="h-16 lg:h-24 2xl:h-28 w-16 lg:w-24 2xl:w-28 flex items-center justify-center mb-2">
                  {typeof key.icon === "string" ? (
                    <img
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                      src={key.icon}
                      alt="icon"
                    />
                  ) : (
                    key.icon
                  )}
                </div>
                <span className={`font-black text-center text-white leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${
                  slide.keys.length >= 4
                    ? "text-xs sm:text-sm lg:text-base 2xl:text-[22px] max-w-[340px]"
                    : "text-sm md:text-lg lg:text-xl 2xl:text-[25px]"
                }`}>
                  {key.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Tag on Left, CTA Buttons on Right */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 z-20 shrink-0">
          
          {/* Bottom Left Parallelogram Skewed Tag */}
          <div
            style={{
              width: "371px",
              height: "41px",
              background: "rgba(169, 163, 163, 0.3)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(7.5px)",
              WebkitBackdropFilter: "blur(7.5px)",
            }}
            className="self-start md:self-auto transform -skew-x-[45deg] flex items-center justify-center border-0 border-none shrink-0"
          >
            <div className="transform skew-x-[45deg] font-semibold italic text-base md:text-lg lg:text-[25px] text-black tracking-wide whitespace-nowrap">
              {categoryTag}
            </div>
          </div>

          {/* Bottom Right CTA Buttons (Parallelogram Skewed Glassmorphism Buttons) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 lg:gap-6 self-end md:self-auto">
            {/* Button 1 */}
            <div {...cta1Props.getContainerProps()}>
              <Link
                href={slide.cta.link1}
                style={{
                  background: "linear-gradient(26.97deg, rgba(35, 209, 75, 0.228) 17.38%, rgba(255, 229, 0, 0.21) 75.79%), rgba(255, 255, 255, 0.5)",
                  boxShadow: "4px 4px 20px rgba(93, 223, 60, 0.25)",
                  backdropFilter: "blur(7.5px)",
                }}
                className="group relative inline-flex items-center justify-center transform -skew-x-[20deg] border border-white/60 px-8 lg:px-12 py-3 lg:py-3.5 hover:scale-[1.02] hover:brightness-110 transition-all cursor-pointer"
              >
                <div className="transform skew-x-[20deg] flex items-center gap-3 font-semibold italic text-lg lg:text-2xl 2xl:text-[28px] text-black capitalize whitespace-nowrap">
                  <span>{typeof slide.cta.button1 === "string" ? slide.cta.button1 : slide.cta.button1}</span>
                  <svg className="w-5 h-5 lg:w-7 lg:h-7 stroke-black stroke-[3.5] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Button 2 */}
            <div {...cta2Props.getContainerProps()}>
              <Link
                href={slide.cta.link2}
                style={{
                  background: "linear-gradient(26.97deg, rgba(35, 209, 75, 0.228) 17.38%, rgba(255, 229, 0, 0.21) 75.79%), rgba(255, 255, 255, 0.5)",
                  boxShadow: "4px 4px 20px rgba(93, 223, 60, 0.25)",
                  backdropFilter: "blur(7.5px)",
                }}
                className="group relative inline-flex items-center justify-center transform -skew-x-[20deg] border border-white/60 px-8 lg:px-12 py-3 lg:py-3.5 hover:scale-[1.02] hover:brightness-110 transition-all cursor-pointer"
              >
                <div className="transform skew-x-[20deg] flex items-center gap-3 font-semibold italic text-lg lg:text-2xl 2xl:text-[28px] text-black capitalize whitespace-nowrap">
                  <span>{typeof slide.cta.button2 === "string" ? slide.cta.button2 : slide.cta.button2}</span>
                  <svg className="w-5 h-5 lg:w-7 lg:h-7 stroke-black stroke-[3.5] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Carousel Navigation Chevron Arrows (Left & Right) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex h-screen items-center justify-between px-3 md:px-8">
        <div {...prevButtonProps.getContainerProps()} className="pointer-events-auto">
          <button
            onClick={goPrev}
            className="p-1 md:p-2 cursor-pointer hover:scale-125 transition-transform border-0 bg-transparent filter drop-shadow-[0_0_8px_rgba(35,209,75,0.6)]"
            aria-label="Previous Slide"
          >
            <svg className="w-8 h-10 md:w-10 md:h-12 text-[#23B14D] stroke-[4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>
        <div {...nextButtonProps.getContainerProps()} className="pointer-events-auto">
          <button
            onClick={goNext}
            className="p-1 md:p-2 cursor-pointer hover:scale-125 transition-transform border-0 bg-transparent filter drop-shadow-[0_0_8px_rgba(35,209,75,0.6)]"
            aria-label="Next Slide"
          >
            <svg className="w-8 h-8 md:w-10 md:h-12 text-[#23B14D] stroke-[4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
