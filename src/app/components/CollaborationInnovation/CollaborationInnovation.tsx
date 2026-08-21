"use client";
import React from "react";


import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./CollaborationInnovation.module.css";
import OurPhilosophy from "./Dialog/OurPhilosophy";
import WhoWeCollaborateWith from "./Dialog/WhoWeCollaborateWith";
import InnovationSpotlight from "./Dialog/InnovationSpotlight";

// Figma-locked design content (node 7077:18721). Keep the API hook import
// available for future CMS wiring without changing the pixel geometry.
const FALLBACK = {
  title: "COLLABORATION & INNOVATION",
  subHeadline: "Innovation Begins with Collaboration.",
  description: {
    text: "At GREEN, we believe the future of energy isn't invented in isolation.\nIt's co-engineered with the bold — researchers, technologists, funders, startups, and institutions who are building tomorrow today.",
    highlighted: "GREEN",
  },
  cards: [
    {
      key: "philosophy",
      title: "Our Philosophy",
      subtitle: "We don't chase trends.\nWe co-create breakthroughs",
      image: "/images/collaboration-innovation/card1_img.png",
    },
    {
      key: "collaborate",
      title: "Who We Collaborate With",
      subtitle: "Precision design.\nTerrain-smart. Load-aware.",
      image: "/images/collaboration-innovation/card2_img.png",
    },
    {
      key: "spotlight",
      title: "Innovation Spotlight",
      subtitle: "Executed in-house.\nBuilt to endure.",
      image: "/images/collaboration-innovation/card3_img.png",
    },
  ],
  quote1: {
    text: "\u201cOPEN CALL: Tech Startups for Tropicalized BESS 2025\u201d",
    highlighted: "BESS 2025",
  },
  quote2: {
    text: " Every phase has one owner. GREEN.\n Every project is more than delivered \u2014 it\u2019s engineered for legacy.\n",
    highlighted: "GREEN.",
  },
};

interface CollaborationInnovationProps {
  canvas?: boolean;
}

export default function CollaborationInnovation({
  canvas = false,
}: CollaborationInnovationProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const d = FALLBACK;

  const highlightText = (text: string, highlight: string): React.ReactNode | string => {
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
        <span key={index} className={styles.greenHighlight}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const splitLines = (text: string) =>
    text.split("\n").map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 ? <br /> : null}
      </React.Fragment>
    ));

  return (
    <main className={styles.page} data-node-id="7077:18721">
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Left green/yellow angled panel (Group 1171277870, 326×662 at -15,-1) */}
      <div className={styles.leftPanel} aria-hidden="true" />
      <img
        src="/images/collaboration-innovation/logo_green.png"
        alt="GREEN Future: Envisioned"
        className={styles.panelLogo}
      />

      {/* Vertical outlined side title (Raleway 900, 50px, stroke #989898) */}
      <h2 className={styles.verticalTitle}>COLLABORATION &amp; INNOVATION</h2>

      {/* Faint left collage (Mask group at -472,408, 1152×1888) */}
      <div className={styles.leftCollage} aria-hidden="true">
        <img src="/images/collaboration-innovation/collage_main.png" alt="" />
      </div>

      {/* Header section */}
      <div className={styles.headerBlock}>
        <h1 className={styles.mainTitle}>
          COLLABORATION &amp; <span className={styles.greenText}>INNOVATION</span>
        </h1>
        <p className={styles.subHeadline}>{d.subHeadline}</p>
        <p className={styles.description}>
          {highlightText(
            d.description.text.replace(/\r?\n/g, " "),
            d.description.highlighted
          )}
        </p>
      </div>

      {/* Three slanted feature cards (Vectors 7362 / 7363 / 7364, 527×351) */}
      {d.cards.map((card, idx) => {
        const cardLeft = [588, 972, 1359][idx];
        const imgLeft = [682, 1063, 1451][idx];
        const imgTop = [421, 424, 421][idx];
        const titleX = [774, 1154, 1551][idx];
        const titleY = [356, 354, 354][idx];
        const subX = [653, 1053, 1448][idx];
        const subY = [590, 586, 583][idx];
        const pillX = [832, 1216, 1603][idx];
        const pillY = [654, 650, 652][idx];
        return (
          <div
            key={card.key}
            className={styles.card}
            style={{ top: [341, 338, 339][idx], left: cardLeft }}
          >
            <h3
              className={styles.cardTitle}
              style={{
                position: "absolute",
                left: titleX - cardLeft,
                top: titleY - [341, 338, 339][idx],
              }}
            >
              {card.title}
            </h3>
            <button
              type="button"
              className={styles.cardImage}
              style={{ position: "absolute", left: imgLeft - cardLeft, top: imgTop - [341, 338, 339][idx] }}
              onClick={() => setOpenModal(card.key)}
              aria-label={`Open ${card.title}`}
            >
              <img src={card.image} alt={card.title} />
              <span className={styles.cardImageAccent} aria-hidden="true" />
            </button>
            <p
              className={styles.cardSubtitle}
              style={{
                position: "absolute",
                left: subX - cardLeft,
                top: subY - [341, 338, 339][idx],
              }}
            >
              {splitLines(card.subtitle)}
            </p>
            <FigmaAngledCta
              className={styles.cardCta}
              style={{
                position: "absolute",
                left: pillX - cardLeft,
                top: pillY - [341, 338, 339][idx],
              }}
              onClick={() => setOpenModal(card.key)}
            >
              Explore
            </FigmaAngledCta>
          </div>
        );
      })}

      {/* Bottom-left quote with angled brackets (Vectors 7374 / 7375) */}
      <div className={styles.bottomQuote}>
        <img
          src="/images/collaboration-innovation/quote_left.png"
          alt=""
          className={styles.quoteBracketLeft}
          aria-hidden="true"
        />
        <h2 className={styles.quoteText}>
          {highlightText(
            d.quote1.text.slice(1, d.quote1.text.length - 1),
            d.quote1.highlighted
          )}
        </h2>
        <img
          src="/images/collaboration-innovation/quote_right.png"
          alt=""
          className={styles.quoteBracketRight}
          aria-hidden="true"
        />
      </div>

      {/* Legacy statement */}
      <p className={styles.legacyQuote}>
        {highlightText(
          d.quote2.text.replace(/\r?\n/g, " "),
          d.quote2.highlighted
        )}
      </p>

      {/* Bottom-right CTAs */}
      <FigmaAngledCta
        className={styles.submitCta}
        style={{ position: "absolute", left: 1510, top: 741 }}
        onClick={() => {}}
      >
        Submit Proposal / Collaboration Inquiry
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.frameworkCta}
        style={{ position: "absolute", left: 1437, top: 819 }}
        icon="download"
        href="/green-innovation-partnership-framework.pdf"
      >
        GREEN Innovation Partnership Framework (PDF)
      </FigmaAngledCta>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored figmaPlaceholder="Let\'s Talk Energy"
          triggerVariant="figmaCanvas"
          triggerStyle={{
            top: 899,
            right: "auto",
            bottom: "auto",
            left: 1498,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}

      {/* Modals (keep existing data-driven dialogs functional) */}
      <OurPhilosophy
        isOpen={openModal === "philosophy"}
        onClose={() => setOpenModal(null)}
      />
      <WhoWeCollaborateWith
        isOpen={openModal === "collaborate"}
        onClose={() => setOpenModal(null)}
      />
      <InnovationSpotlight
        isOpen={openModal === "spotlight"}
        onClose={() => setOpenModal(null)}
      />
    </main>
  );
}

