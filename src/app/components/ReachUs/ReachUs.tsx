"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import D6Chatbot from "../D6Chatbot";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import TopNavigation from "../TopNavigation/TopNavigation";
import styles from "./ReachUs.module.css";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 970;
const OFFICES = [
  {
    id: "papuaNewGuinea",
    name: "PAPUA NEW GUINEA",
    flag: "/images/reach-us/flag-png.png",
    address: [
      "PO Box 1243, Port Moresby",
      "Section 405, Allotment 4, Waigani Drive,",
      "North Hohola, National Capital District.",
      "11.043442, 77.892613",
    ],
  },
  {
    id: "india",
    name: "INDIA",
    flag: "/images/reach-us/flag-india.png",
    address: [
      "194E-404, Gurusamy Nagar,",
      "Thanneer Panthal, Peelamedu Post,",
      "Coimbatore, Tamilnadu - 641 004",
      "11.043442, 77.892613",
    ],
  },
  {
    id: "australia",
    name: "AUSTRALIA",
    flag: "/images/reach-us/flag-australia.png",
    address: [
      "Level 36 Riparian Plaza",
      "71 Eagle street Brisbane",
      "Qld 4000",
    ],
  },
  {
    id: "singapore",
    name: "SINGAPORE",
    flag: "/images/reach-us/flag-singapore.png",
    address: ["8 Burn Road", "# 07-07 Trivex", "Singapore (369977)"],
  },
] as const;

const MAP_EASE = [0, 0, 0.58, 1] as const;

export default function ReachUs() {
  const [currentOfficeIndex, setCurrentOfficeIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [canvasScale, setCanvasScale] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateScale = () => {
      setCanvasScale(
        Math.min(
          window.innerWidth / DESIGN_WIDTH,
          window.innerHeight / DESIGN_HEIGHT,
        ),
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale, { passive: true });
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const interval = window.setInterval(() => {
      setCurrentOfficeIndex((index) => (index + 1) % OFFICES.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <main className={styles.page}>
      <TopNavigation />

      <section className={styles.desktopStage} aria-label="Reach GREEN">
        <div
          className={styles.canvas}
          style={{ transform: `translateX(-50%) scale(${canvasScale})` }}
          data-node-id="7077:13486"
        >
          <img
            className={styles.background}
            src="/images/reach-us/bg.jpg"
            alt=""
            aria-hidden="true"
          />

          <p className={styles.intro} data-node-id="7077:13496">
            Are you prepared to get started on your Energy Requirement right
            away? Let&apos;s connect!
          </p>

          <img
            className={styles.verticalLabel}
            src="/images/reach-us/reach-us.png"
            alt="Reach us"
          />

          <div className={styles.mapViewport} data-node-id="7077:13498">
            <img
              className={styles.map}
              src="/images/reach-us/world-map.png"
              alt="World map showing GREEN global offices"
            />

            <div className={styles.pins} aria-hidden="true">
              <img
                className={styles.indiaPin}
                src="/images/reach-us/pin-india.svg"
                alt=""
              />
              <img
                className={styles.pngPin}
                src="/images/reach-us/pin-png.svg"
                alt=""
              />
              <img
                className={styles.singaporePin}
                src="/images/reach-us/pin-singapore.svg"
                alt=""
              />
              <img
                className={styles.australiaPin}
                src="/images/reach-us/pin-australia.svg"
                alt=""
              />
            </div>

            <motion.div
              key={currentOfficeIndex}
              className={styles.officeLabels}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: MAP_EASE }}
              aria-live="polite"
            >
              {OFFICES.map((office, index) => {
                const isActive = index === currentOfficeIndex;

                return (
                  <article
                    key={office.id}
                    className={`${styles.officeCard} ${styles[office.id]} ${
                      isActive ? styles.officeCardActive : ""
                    }`}
                  >
                    {isActive && (
                      <img
                        className={styles.officeFlag}
                        src={office.flag}
                        alt=""
                      />
                    )}
                    <h2>{office.name}</h2>
                    {isActive && (
                      <p>
                        {office.address.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </p>
                    )}
                  </article>
                );
              })}
            </motion.div>
          </div>

          <button
            type="button"
            className={styles.enquiry}
            onClick={() => setIsFormOpen(true)}
            aria-label="Open enquiry form"
            data-node-id="7077:13531"
          >
            <img src="/images/reach-us/enquiry.png" alt="Enquiry" />
          </button>

          <div className={styles.sideCards}>
            <img
              src="/images/reach-us/transformation.png"
              alt="Transformation"
              data-node-id="7077:13537"
            />
            <img
              src="/images/reach-us/join-us.png"
              alt="Join us"
              data-node-id="7077:13542"
            />
          </div>

          <D6Chatbot canvasAnchored figmaPlaceholder="Let\'s Talk Energy" triggerClassName={styles.chatbot} />
        </div>
      </section>

      <section className={styles.mobileLayout}>
        <p className={styles.mobileIntro}>
          Are you prepared to get started on your Energy Requirement right away?
          Let&apos;s connect!
        </p>
        <button
          type="button"
          className={styles.mobileEnquiry}
          onClick={() => setIsFormOpen(true)}
        >
          <img src="/images/reach-us/enquiry.png" alt="Enquiry" />
        </button>
        <div className={styles.mobileMapFrame}>
          <img
            className={styles.mobileMap}
            src="/images/reach-us/world-map.png"
            alt="World map showing GREEN global offices"
          />
          <motion.div
            key={currentOfficeIndex}
            className={styles.mobileOfficeLabel}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: MAP_EASE }}
          >
            <strong>{OFFICES[currentOfficeIndex].name}</strong>
            {OFFICES[currentOfficeIndex].address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </motion.div>
        </div>
        <div className={styles.mobileCards}>
          <img src="/images/reach-us/transformation.png" alt="Transformation" />
          <img src="/images/reach-us/join-us.png" alt="Join us" />
        </div>
        <D6Chatbot />
      </section>

      <ProductEnquiry
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        productName="Energy Requirement"
      />
    </main>
  );
}
