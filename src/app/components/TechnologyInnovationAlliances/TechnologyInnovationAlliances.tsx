"use client";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./TechnologyInnovationAlliances.module.css";
import WhyWePartner from "./Modals/WhyWePartner";
import CurrentTechnologyCollaborators from "./Modals/CurrentTechnologyCollaborators";
import ResearchCoDevelopment from "./Modals/ResearchCoDevelopment";
import InnovativePartner from "./Modals/InnovativePartner";
import BecomeTechnologyPartner from "./Modals/BecomeTechnologyPartner";

// Figma-locked design content (node 7077:22719). Keep the API hook import
// available for future CMS wiring without changing the pixel geometry.
const FALLBACK = {
  title: "TECHNOLOGY & INNOVATION ALLIANCES",
  subHeadline: "Built on Collaboration. Powered by Innovation.",
  description: {
    text: "At GREEN, we don\u2019t just adopt new technologies \u2014 we co-create them. Our alliances with world-class innovators, research labs, startups, and system integrators accelerate our ability to deliver smarter, faster, and more resilient energy systems across PNG and the South Pacific.",
    highlighted: "GREEN",
  },
  quote1: {
    text: "Join GREEN in building the technologies that will power the next frontier of energy access.",
    highlighted: "GREEN",
  },
  goal: {
    text: "Our Goal: Build A Future-Proof Ecosystem That Outperforms Today\u2019s Limitations.",
    highlighted: "Our Goal:",
  },
  cards: [
    {
      key: "whyWePartner",
      title: "Why We Partner",
      subtitle: "We believe that no single player has all the answers. That\u2019s why GREEN seeks out:",
      image: "/images/technology-innovation-alliances/whywepartner.png",
      x: 198,
      y: 347,
      titleX: 531,
      titleY: 338,
      subY: 384,
      ctaX: 655,
      ctaY: 448,
    },
    {
      key: "currentTechnologyCollaborators",
      title: "Current Technology Collaborators",
      subtitle: "We believe that no single player has all the answers. That\u2019s why GREEN seeks out:",
      image: "/images/technology-innovation-alliances/currenttechnologycollaborators.png",
      x: 883,
      y: 347,
      titleX: 1218,
      titleY: 344,
      subY: 396,
      ctaX: 1340,
      ctaY: 448,
    },
    {
      key: "researchCoDevelopment",
      title: "Research & Co-Development",
      subtitle: "We believe that no single player has all the answers. That\u2019s why GREEN seeks out:",
      image: "/images/technology-innovation-alliances/researchdevelopment.png",
      x: 202,
      y: 549,
      titleX: 531,
      titleY: 535,
      subY: 581,
      ctaX: 666,
      ctaY: 645,
    },
    {
      key: "becomeInnovationPartner",
      title: "Become an Innovation Partner",
      subtitle: "We believe that no single player has all the answers. That\u2019s why GREEN seeks out:",
      image: "/images/technology-innovation-alliances/innovationpartner.png",
      x: 875,
      y: 541,
      titleX: 1218,
      titleY: 538,
      subY: 588,
      ctaX: 1351,
      ctaY: 645,
    },
  ],
};

interface TechnologyInnovationAlliancesProps {
  canvas?: boolean;
}

export default function TechnologyInnovationAlliances({
  canvas = false,
}: TechnologyInnovationAlliancesProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const [isBecomeTechnologyPartnerOpen, setIsBecomeTechnologyPartnerOpen] =
    useState(false);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const highlightTerms = highlight.trim().split(/\s+/);
    const pattern = highlightTerms
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const parts = text.split(new RegExp(`(${pattern})`, "gi"));
    return parts.map((part, index) => {
      const shouldHighlight = highlightTerms.some(
        (term) => part.toLowerCase() === term.toLowerCase()
      );
      return shouldHighlight ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const d = FALLBACK;
  const ctaLinks = {
    innovationFramework: "/green-innovation-partnership-framework.pdf",
  };

  return (
    <main className={styles.page} data-node-id="7077:22719">
      <SiteHeader
        layout={canvas ? "figmaCanvas" : "viewport"}
        figmaPanelVariant={canvas ? "flagship" : "default"}
      />

      {/* Vertical outlined side title */}
      <h2 className={styles.verticalTitle}>
        TECHNOLOGY &amp; INNOVATION
        <br />
        ALLIANCES
      </h2>

      {/* Faint right-side photo collage (Mask group at 1023,444) */}
      <div className={styles.rightCollage} aria-hidden="true">
        <img src="/images/technology-innovation-alliances/collage_bg.png" alt="" />
      </div>

      {/* Header section */}
      <div className={styles.headerBlock}>
        <h1 className={styles.mainTitle}>
          TECHNOLOGY &amp; <span className={styles.greenText}>INNOVATION</span>{" "}
          ALLIANCES
        </h1>
        <p className={styles.subHeadline}>{d.subHeadline}</p>
        <p className={styles.description}>
          {highlightText(d.description.text, d.description.highlighted)}
        </p>
      </div>

      {/* Partnership pillars (exact Figma coordinates) */}
      {d.cards.map((card, index) => (
        <motion.div
          key={card.key}
          className={styles.card}
          style={{ top: card.y, left: 0 }}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            delay: reduceMotion ? 0 : index * 0.08,
            ease: "easeOut",
          }}
        >
          <button
            type="button"
            className={styles.cardImage}
            style={{ position: "absolute", left: card.x, top: 0 }}
            onClick={() => setOpenModal(card.key)}
            aria-label={`Open ${card.title}`}
          >
            <img src={card.image} alt={card.title} />
            <span className={styles.cardImageAccent} aria-hidden="true" />
          </button>

          <div
            className={styles.cardText}
            style={{
              position: "absolute",
              left: card.titleX,
              top: card.titleY - card.y,
            }}
          >
            <h3
              className={styles.cardTitle}
              onClick={() => setOpenModal(card.key)}
              style={{ cursor: "pointer" }}
            >
              {card.title}
            </h3>
            <p
              className={styles.cardSubtitle}
              style={{
                position: "absolute",
                left: 0,
                top: card.subY - card.titleY,
              }}
            >
              {card.subtitle}
            </p>
          </div>

          <FigmaAngledCta
            className={styles.cardCta}
            style={{
              position: "absolute",
              left: card.ctaX,
              top: card.ctaY - card.y,
            }}
            onClick={() => setOpenModal(card.key)}
          >
            Explore
          </FigmaAngledCta>
        </motion.div>
      ))}

      {/* Goal note over the collage */}
      <p className={styles.goalNote}>
        {highlightText(d.goal.text, d.goal.highlighted)}
      </p>

      {/* Bottom-left quote with angled brackets (Vectors 7374 / 7375) */}
      <motion.div
        className={styles.bottomQuote}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
      >
        <img
          src="/images/technology-innovation-alliances/quote_left.png"
          alt=""
          className={styles.quoteBracketLeft}
          aria-hidden="true"
        />
        <h2>
          {highlightText(d.quote1.text, d.quote1.highlighted)}
        </h2>
        <img
          src="/images/technology-innovation-alliances/quote_right.png"
          alt=""
          className={styles.quoteBracketRight}
          aria-hidden="true"
        />
      </motion.div>

      {/* Bottom-right CTAs */}
      <FigmaAngledCta
        className={styles.partnerCta}
        style={{ position: "absolute", left: 1501, top: 746 }}
        onClick={() => setIsBecomeTechnologyPartnerOpen(true)}
      >
        Become a Technology Partner
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.frameworkCta}
        style={{ position: "absolute", left: 1428, top: 824 }}
        icon="download"
        href={ctaLinks.innovationFramework}
      >
        GREEN Innovation Partnership Framework (PDF)
      </FigmaAngledCta>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored figmaPlaceholder="Let\'s Talk Energy"
          triggerVariant="figmaCanvas"
          triggerStyle={{
            top: 904,
            right: "auto",
            bottom: "auto",
            left: 207,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}

      {/* Modals */}
      <WhyWePartner
        isOpen={openModal === "whyWePartner"}
        onClose={() => setOpenModal(null)}
        title={""}
        subHeadline={""}
        description={""}
        img={{ alt: "Why We Partner", src: "" }}
        keys={[]}
        quote={{ text: "", highlighted: "" }}
      />
      <CurrentTechnologyCollaborators
        isOpen={openModal === "currentTechnologyCollaborators"}
        onClose={() => setOpenModal(null)}
        title={""}
        subHeadline={""}
        description={""}
        img={{ alt: "Current Technology Collaborators", src: "" }}
        keys={[]}
        quote={{ text: "", highlighted: "" }}
      />
      <ResearchCoDevelopment
        isOpen={openModal === "researchCoDevelopment"}
        onClose={() => setOpenModal(null)}
        title={""}
        subHeadline={""}
        description={""}
        img={{ alt: "Research & Co-Development", src: "" }}
        keys={[]}
        quote={{ text: "", highlighted: "" }}
      />
      <InnovativePartner
        isOpen={openModal === "becomeInnovationPartner"}
        onClose={() => setOpenModal(null)}
        title={""}
        subHeadline={""}
        description={""}
        img={{ alt: "Become an Innovation Partner", src: "" }}
        keys={[]}
        quote={{ text: "", highlighted: "" }}
      />
      <BecomeTechnologyPartner
        isOpen={isBecomeTechnologyPartnerOpen}
        onClose={() => setIsBecomeTechnologyPartnerOpen(false)}
      />
    </main>
  );
}
