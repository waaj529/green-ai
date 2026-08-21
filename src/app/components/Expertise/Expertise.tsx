"use client";

import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useExpertise } from "../../../hooks/useExpertise";
import D6Chatbot from "../D6Chatbot";
import TopNavigation from "../TopNavigation/TopNavigation";
import styles from "./Expertise.module.css";
import SolutionDetail from "./SolutionDetail";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 970;
const ASSET_ROOT = "/images/expertise/figma-d2";

const GALLERY = [
  {
    src: `${ASSET_ROOT}/healthcare.png`,
    alt: "Solar installation powering a healthcare complex",
    label: "Powering Healthcare",
  },
  {
    src: `${ASSET_ROOT}/community-solar.png`,
    alt: "Community solar installation",
    label: "Powering Communities",
  },
  {
    src: `${ASSET_ROOT}/solar-pump.png`,
    alt: "Solar array beside a water source",
    label: "Powering Agriculture",
  },
  {
    src: `${ASSET_ROOT}/commercial-solar.png`,
    alt: "Commercial building with rooftop solar",
    label: "Powering Industry",
  },
  {
    src: `${ASSET_ROOT}/telecom-solar.png`,
    alt: "Remote solar and telecommunications installation",
    label: "Powering Telecom",
  },
  {
    src: `${ASSET_ROOT}/home-solar.png`,
    alt: "Home powered by rooftop solar",
    label: "Powering Homes",
  },
] as const;

const GRID_CARDS = [
  { nodeId: "7077:3725", item: 0, left: 1031.6, top: 140 },
  { nodeId: "7077:3726", item: 1, left: 1308.5, top: 140 },
  { nodeId: "7077:3727", item: 2, left: 1585.4, top: 140 },
  { nodeId: "7077:3728", item: 3, left: 1031.6, top: 337.13 },
  { nodeId: "7077:3729", item: 4, left: 1308.5, top: 337.13 },
  { nodeId: "7077:3730", item: 5, left: 1585.4, top: 337.13 },
  { nodeId: "7077:3732", item: 1, left: 1308.5, top: 534.26 },
  { nodeId: "7077:3733", item: 2, left: 1585.4, top: 534.26 },
  { nodeId: "7077:3734", item: 4, left: 1031.6, top: 731.39 },
  { nodeId: "7077:3735", item: 1, left: 1308.5, top: 731.39 },
] as const;

const SLIDER_ITEMS = [
  {
    nodeId: "7077:3787",
    item: 0,
    src: "/images/expertise/figma-slider/rectangle-428.png",
    assetClass: "sliderAssetHealthcare",
    label: "",
    labelClass: "",
  },
  {
    nodeId: "7077:3790",
    item: 5,
    src: "/images/expertise/figma-slider/edu-1.png",
    assetClass: "sliderAssetHome",
    label: "Powering Home",
    labelClass: "",
  },
  {
    nodeId: "7077:3796",
    item: 3,
    src: "/images/expertise/figma-slider/rectangle-372.png",
    assetClass: "sliderAssetCorporate",
    label: "Powering Corporate",
    labelClass: "sliderPanelCorporate",
  },
  {
    nodeId: "7077:3802",
    item: 2,
    src: "/images/expertise/figma-slider/rectangle-366.png",
    assetClass: "sliderAssetRural",
    label: "Powering Rural",
    labelClass: "sliderPanelRural",
  },
  {
    nodeId: "7077:3807",
    item: 4,
    src: "/images/expertise/figma-slider/rectangle-370.png",
    assetClass: "sliderAssetTelecom",
    label: "",
    labelClass: "",
  },
  {
    nodeId: "7077:3810",
    item: 5,
    src: "/images/expertise/figma-slider/rectangle-365.png",
    assetClass: "sliderAssetResidence",
    label: "",
    labelClass: "",
  },
  {
    nodeId: "7077:3813",
    item: 3,
    src: "/images/expertise/figma-slider/rectangle-372.png",
    assetClass: "sliderAssetCorporateRepeat",
    label: "",
    labelClass: "",
  },
  {
    nodeId: "7077:3816",
    item: 2,
    src: "/images/expertise/figma-slider/rectangle-366.png",
    assetClass: "sliderAssetRuralRepeat",
    label: "",
    labelClass: "",
  },
] as const;

const SLIDER_CARD_STEP = 470.361;

const HEALTHCARE_IMAGES = [
  {
    src: "/images/expertise/powerhealthcare1.png",
    alt: "Solar panels installed on a healthcare facility roof",
  },
  {
    src: "/images/expertise/powerhealthcare2.png",
    alt: "Aerial view of the healthcare facility and water tank",
  },
  {
    src: "/images/expertise/powerhealthcare3.png",
    alt: "Solar powered healthcare facility surrounded by forest",
  },
] as const;

const HEALTHCARE_FEATURES = [
  {
    icon: "/images/expertise/medicalservices.svg",
    title: "Medical Services & Lighting",
    description:
      "Enable effective delivery of health services with energy efficient lifesaving medical devices and lighting etc.",
  },
  {
    icon: "/images/expertise/diseasetreatement.svg",
    title: "Disease Treatment & Prevention",
    description:
      "Enables Healthcare sectors to broaden services for prevention and treatment of non-communicable diseases and other diseases.",
  },
  {
    icon: "/images/expertise/medicalservices.svg",
    title: "Maternal Care",
    description:
      "Reduce maternal infant mortality rate with effective obstetric procedures and surgery with reliable lighting and advanced medical equipment etc.",
  },
  {
    icon: "/images/expertise/diseasetreatement.svg",
    title: "Disease Diagnosis & Emergency Procedures",
    description:
      "Broaden services for prevention and treatment of non-communicable diseases and other diseases.",
  },
] as const;

type ViewMode = "grid" | "slider";
type SliderScreen = "overview" | "healthcare";

export default function Expertise() {
  const { data: expertiseItems } = useExpertise();
  const [view, setView] = useState<ViewMode>("grid");
  const [sliderScreen, setSliderScreen] = useState<SliderScreen>("overview");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const [desktopScale, setDesktopScale] = useState(1);
  const sliderViewportRef = useRef<HTMLElement>(null);
  const sliderDragStart = useRef<{
    pointerId: number;
    x: number;
    scrollLeft: number;
    lastX: number;
    lastTime: number;
    velocity: number;
  } | null>(null);
  const sliderDidDrag = useRef(false);
  const sliderMomentumFrame = useRef<number | null>(null);

  useEffect(() => {
    const updateScale = () => {
      setDesktopScale(
        Math.min(
          window.innerWidth / DESIGN_WIDTH,
          window.innerHeight / DESIGN_HEIGHT,
        ),
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const activeExpertise =
    expertiseItems?.[selectedIndex] ?? expertiseItems?.[0];
  const exploreHref = activeExpertise?.slug || "/expertise/powering-healthcare";
  const activeGalleryItem = GALLERY[selectedIndex % GALLERY.length];

  const scrollSlider = (direction: 1 | -1) => {
    sliderViewportRef.current?.scrollBy({
      left: direction * SLIDER_CARD_STEP,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const finishSliderDrag = () => {
    const dragStart = sliderDragStart.current;
    if (dragStart === null) return;

    sliderDragStart.current = null;
    setIsSliderDragging(false);

    const viewport = sliderViewportRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (viewport && !reduceMotion && Math.abs(dragStart.velocity) > 0.04) {
      let velocity = Math.max(-2.2, Math.min(2.2, dragStart.velocity));
      let previousTime = performance.now();

      const applyMomentum = (time: number) => {
        const elapsed = Math.min(time - previousTime, 32);
        previousTime = time;
        viewport.scrollLeft += velocity * elapsed;
        velocity *= 0.88 ** (elapsed / 16.67);

        const atStart = viewport.scrollLeft <= 0 && velocity < 0;
        const atEnd =
          viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth &&
          velocity > 0;
        if (Math.abs(velocity) > 0.02 && !atStart && !atEnd) {
          sliderMomentumFrame.current = requestAnimationFrame(applyMomentum);
        } else {
          sliderMomentumFrame.current = null;
        }
      };

      sliderMomentumFrame.current = requestAnimationFrame(applyMomentum);
    }

    window.setTimeout(() => {
      sliderDidDrag.current = false;
    }, 80);
  };

  const openHealthcareDetail = () => {
    setSliderScreen("healthcare");
  };

  return (
    <main className={styles.page}>
      <TopNavigation />

      <section className={styles.desktopStage} aria-label="GREEN solutions">
        <div
          className={styles.canvas}
          data-node-id="7077:3678"
          data-name="Solutions page -D2"
          style={{
            transform: `translateX(-50%) scale(${desktopScale})`,
          }}
        >
          <AnimatePresence initial={false}>
            {sliderScreen === "healthcare" ? (
              <SolutionDetail
                nodeId="7077:3843"
                title="POWERING"
                highlightedTitle="HEALTHCARE"
                subtitle="Renewable Energy and Medical Technology Augmentation for Sustainable Healthcare System"
                description="Powering the Healthcare initiative, GREEN Limited equips healthcare facilities with renewable energy-based power production augmented with medical technology to impart enabling and empowering capabilities for Sustainable Healthcare Facilities. The Sustainable Healthcare System provides vital, modern, and life-saving medical equipment that meets the standards and requirements of the healthcare industry. This solution promotes health and well-being for all those who employ it. Enhance Healthcare Facilities Using the Powering Healthcare Program"
                images={HEALTHCARE_IMAGES}
                features={HEALTHCARE_FEATURES}
                categories={[
                  { id: "education", label: "Powering Education" },
                  { id: "agriculture", label: "Powering Agriculture" },
                  { id: "home", label: "Powering Home" },
                  { id: "education-secondary", label: "Powering Education" },
                ]}
                activeCategoryImage={GALLERY[0].src}
                activeCategoryLabel="Powering Healthcare"
                startHref={exploreHref}
                onBack={() => setSliderScreen("overview")}
              />
            ) : null}
          </AnimatePresence>

          <div
            className={
              sliderScreen === "healthcare" ? styles.overviewHidden : undefined
            }
          >
            <div className={styles.leftBackdrop} aria-hidden="true">
              <img
                src={`${ASSET_ROOT}/background.png`}
                alt=""
                data-node-id="7077:3687"
              />
            </div>
            <h1
              className={`${styles.heroHeading} ${
                view === "slider" ? styles.sliderHeroHeading : ""
              }`}
              data-node-id="7077:3711"
            >
              POWERING <span>HEALTHCARE</span>
            </h1>

            <img
              className={`${styles.verticalLabel} ${
                view === "slider" ? styles.sliderWatermark : ""
              }`}
              src="/images/expertise/figma-d2/expertise_vert.png"
              alt=""
              data-node-id="7077:3713"
            />

            {view === "grid" ? (
              <>
                <section
                  className={styles.introduction}
                  data-node-id="7077:3712"
                >
                  <h2>
                    A <span>GREENER</span> FUTURE,
                    <br />
                    An Ultimate Target
                  </h2>
                  <p data-node-id="7077:3710">
                    In an era where sustainability and environmental
                    consciousness are paramount, the quest for a greener future
                    is more important than ever
                  </p>
                </section>

                <button
                  type="button"
                  className={styles.exploreButton}
                  data-node-id="7077:3746"
                  onClick={openHealthcareDetail}
                  aria-label="Explore Powering Healthcare"
                >
                  <img
                    className={styles.exploreShape}
                    src={`${ASSET_ROOT}/explore-button.svg`}
                    alt=""
                  />
                  <span>Explore</span>
                  <img
                    className={styles.exploreArrow}
                    src={`${ASSET_ROOT}/explore-arrow.svg`}
                    alt=""
                  />
                </button>
              </>
            ) : (
              <p className={styles.sliderDescription} data-node-id="7077:3769">
                In an era where sustainability and environmental consciousness
                are paramount, the quest for a greener future is more important
                than ever
              </p>
            )}

            <section
              className={styles.gallery}
              aria-label="Renewable energy solutions"
              data-node-id="7077:3724"
            >
              {view === "grid" ? (
                <>
                  {GRID_CARDS.map((card) => {
                    const item = GALLERY[card.item];
                    return (
                      <button
                        key={card.nodeId}
                        type="button"
                        className={styles.galleryCard}
                        data-node-id={card.nodeId}
                        style={{ left: card.left, top: card.top }}
                        onClick={() => setSelectedIndex(card.item)}
                        aria-label={`Select ${item.label}`}
                      >
                        <img src={item.src} alt={item.alt} />
                        <span aria-hidden="true" />
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    className={styles.selectedCard}
                    data-node-id="7077:3738"
                    onClick={() =>
                      setSelectedIndex((selectedIndex + 1) % GALLERY.length)
                    }
                    aria-label={`Selected solution: ${activeGalleryItem.label}. Show next solution.`}
                  >
                    <img
                      src={activeGalleryItem.src}
                      alt={activeGalleryItem.alt}
                    />
                    <span className={styles.selectedLabel}>
                      <img src={`${ASSET_ROOT}/selected-label.svg`} alt="" />
                      <b>{activeGalleryItem.label}</b>
                    </span>
                  </button>
                </>
              ) : (
                <div className={styles.sliderGallery} data-node-id="7077:3768">
                  <section
                    ref={sliderViewportRef}
                    className={`${styles.sliderScroller} ${
                      isSliderDragging ? styles.sliderDragging : ""
                    }`}
                    data-node-id="7077:3786"
                    data-name="CROLLING"
                    aria-label="Solutions carousel. Scroll or drag horizontally, or use the left and right arrow keys."
                    onPointerDown={(event) => {
                      if (sliderMomentumFrame.current !== null) {
                        cancelAnimationFrame(sliderMomentumFrame.current);
                        sliderMomentumFrame.current = null;
                      }
                      sliderDragStart.current = {
                        pointerId: event.pointerId,
                        x: event.clientX,
                        scrollLeft: event.currentTarget.scrollLeft,
                        lastX: event.clientX,
                        lastTime: performance.now(),
                        velocity: 0,
                      };
                      sliderDidDrag.current = false;
                      setIsSliderDragging(true);
                      event.currentTarget.setPointerCapture(event.pointerId);
                    }}
                    onPointerMove={(event) => {
                      const dragStart = sliderDragStart.current;
                      if (
                        dragStart === null ||
                        dragStart.pointerId !== event.pointerId
                      )
                        return;

                      const dragDistance =
                        (event.clientX - dragStart.x) / desktopScale;
                      const now = performance.now();
                      const elapsed = Math.max(now - dragStart.lastTime, 1);
                      dragStart.velocity =
                        (dragStart.lastX - event.clientX) /
                        desktopScale /
                        elapsed;
                      dragStart.lastX = event.clientX;
                      dragStart.lastTime = now;
                      if (Math.abs(dragDistance) > 4)
                        sliderDidDrag.current = true;
                      event.currentTarget.scrollLeft =
                        dragStart.scrollLeft - dragDistance;
                    }}
                    onPointerUp={finishSliderDrag}
                    onPointerCancel={finishSliderDrag}
                    onWheel={(event) => {
                      const delta =
                        Math.abs(event.deltaX) > Math.abs(event.deltaY)
                          ? event.deltaX
                          : event.deltaY;
                      const viewport = event.currentTarget;
                      const maxScroll =
                        viewport.scrollWidth - viewport.clientWidth;
                      const canScroll =
                        (delta < 0 && viewport.scrollLeft > 0) ||
                        (delta > 0 && viewport.scrollLeft < maxScroll);

                      if (!canScroll) return;
                      event.preventDefault();
                      viewport.scrollLeft += delta / desktopScale;
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        scrollSlider(-1);
                      }
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        scrollSlider(1);
                      }
                    }}
                  >
                    <div className={styles.sliderTrack}>
                      {SLIDER_ITEMS.map((panel) => {
                        const item = GALLERY[panel.item];
                        return (
                          <button
                            type="button"
                            key={panel.nodeId}
                            data-node-id={panel.nodeId}
                            onClick={() => {
                              if (!sliderDidDrag.current) {
                                setSelectedIndex(panel.item);
                                if (panel.item === 0) {
                                  openHealthcareDetail();
                                }
                              }
                            }}
                            className={styles.sliderPanel}
                            aria-label={`Select ${item.label}`}
                          >
                            <span
                              className={`${styles.sliderAsset} ${styles[panel.assetClass]}`}
                            >
                              <img src={panel.src} alt={item.alt} />
                            </span>
                            {panel.label ? (
                              <span
                                className={`${styles.sliderLabel} ${styles[panel.labelClass]}`}
                              >
                                <b>{panel.label}</b>
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              )}
            </section>

            {view === "grid" ? (
              <div className={styles.pagination} aria-hidden="true">
                <img src={`${ASSET_ROOT}/dot-active.svg`} alt="" />
                <img src={`${ASSET_ROOT}/dot.svg`} alt="" />
                <img src={`${ASSET_ROOT}/dot.svg`} alt="" />
              </div>
            ) : (
              <div className={styles.sliderPagination} aria-hidden="true" />
            )}

            <fieldset className={styles.viewSwitch}>
              <legend className={styles.srOnly}>Choose gallery view</legend>
              <button
                type="button"
                className={view === "grid" ? styles.activeView : undefined}
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                data-node-id="7077:3718"
              >
                Grid
              </button>
              <button
                type="button"
                className={view === "slider" ? styles.activeView : undefined}
                onClick={() => {
                  setSliderScreen("overview");
                  setView("slider");
                }}
                aria-pressed={view === "slider"}
                data-node-id="7077:3722"
              >
                Slider
              </button>
            </fieldset>
          </div>

          <D6Chatbot canvasAnchored figmaPlaceholder="Let\'s Talk Energy" triggerClassName={styles.chatbot} />
        </div>
      </section>

      <section className={styles.mobileLayout}>
        <div className={styles.mobileHero}>
          <p>Solutions</p>
          <h1>
            POWERING <span>HEALTHCARE</span>
          </h1>
          <h2>
            A <span>GREENER</span> FUTURE,
            <br />
            An Ultimate Target
          </h2>
          <p>
            In an era where sustainability and environmental consciousness are
            paramount, the quest for a greener future is more important than
            ever.
          </p>
          <Link href={exploreHref}>Explore →</Link>
        </div>

        <div className={styles.mobileGallery}>
          {GALLERY.map((item, index) => (
            <button
              type="button"
              key={item.src}
              onClick={() => setSelectedIndex(index)}
              className={
                selectedIndex === index ? styles.mobileSelected : undefined
              }
            >
              <img src={item.src} alt={item.alt} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <D6Chatbot />
      </section>
    </main>
  );
}
