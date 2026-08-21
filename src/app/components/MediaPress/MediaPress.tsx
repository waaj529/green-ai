"use client";
import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import FigmaQuoteBrackets from "../FigmaQuoteBrackets/FigmaQuoteBrackets";
import SiteHeader from "../SiteHeader/SiteHeader";
import LatestPressReleases from "./Dialog/LatestPressReleases";
import MediaContactInterviewRequests from "./Dialog/MediaContactInterviewRequests";
import MediaKitDownload from "./Dialog/MediaKitDownload";
import GreenInTheNews from "./Dialog/GreenInTheNews";
import OfficialSpokesPeople from "./Dialog/OfficialSpokesPeople";
import RequestQuoteAppointment from "./Modals/RequestQuoteAppointment";
import styles from "./MediaPress.module.css";

const CTA_LINKS = {
  pressKit: "/press-kit.pdf",
  partnershipFramework: "/volunteer-welcome-pack.pdf",
};

const ROWS = [
  {
    id: "latest-press-releases",
    title: "Latest Press Releases",
    titlePos: { left: 392, top: 316 },
    explorePos: { left: 1208, top: 309 },
    lineY: 381,
    dialog: "latest" as const,
  },
  {
    id: "media-contact",
    title: "Media Contact & Interview Requests",
    titlePos: { left: 351, top: 420 },
    explorePos: { left: 1167, top: 412 },
    lineY: 485,
    dialog: "contact" as const,
  },
  {
    id: "media-kit",
    title: " Media Kit Download",
    titlePos: { left: 306, top: 530 },
    explorePos: { left: 1122, top: 521 },
    lineY: 597,
    dialog: "kit" as const,
  },
  {
    id: "green-news",
    title: "GREEN in the News",
    titlePos: { left: 259, top: 636 },
    explorePos: { left: 1075, top: 627 },
    lineY: 701,
    dialog: "news" as const,
  },
  {
    id: "spokes-people",
    title: "Official Spokes people",
    titlePos: { left: 217, top: 740 },
    explorePos: { left: 1033, top: 731 },
    lineY: null,
    dialog: "spokes" as const,
  },
];

interface MediaPressProps {
  canvas?: boolean;
}

export default function MediaPress({ canvas = false }: MediaPressProps) {
  const [latestOpen, setLatestOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [kitOpen, setKitOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [spokesOpen, setSpokesOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const open =
    { latest: setLatestOpen, contact: setContactOpen, kit: setKitOpen, news: setNewsOpen, spokes: setSpokesOpen } as const;

  return (
    <main className={styles.page} data-node-id="7077:23952">
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Vertical side title (Raleway Black, outlined, bottom-up) */}
      <div style={{ position: 'absolute', top: '320px', left: '25px', width: '59px', height: '582px', pointerEvents: 'none', zIndex: 10 }}>
        <svg width="59" height="582">
          <text 
            fill="none" 
            stroke="rgba(0,0,0,0.1)" 
            strokeWidth="1.3" 
            fontFamily="Raleway" 
            fontWeight="900" 
            fontSize="70" 
            transform="translate(50,580) rotate(-90)"
          >
            MEDIA & PRESS
          </text>
        </svg>
      </div>

      {/* Right faint collage */}
      <div className={styles.rightCollage} aria-hidden="true">
        <img src="/images/media-press/mainImg.png" alt="" />
      </div>

      {/* Header block */}
      <div className={styles.headerBlock}>
        <h1 className={styles.mainTitle}>
          MEDIA &amp; <span className={styles.greenText}>PRESS</span>
        </h1>
        <p className={styles.subHeadline}>
          Telling the Energy Story — The Right Way.
        </p>
        <p className={styles.description}>
          <span className={styles.greenText}>GREEN</span> Limited is shaping
          the future of energy access in PNG and the Pacific. For accurate
          information, interviews, brand assets, and official statements —
          this is your source.
        </p>
      </div>

      {/* Menu rows with Explore pills and separator lines */}
      {ROWS.map((row) => (
        <div key={row.id}>
          <h3 className={styles.rowTitle} style={row.titlePos}>
            {row.title}
          </h3>
          <FigmaAngledCta
            className={styles.exploreBtn}
            style={{
              position: "absolute",
              left: row.explorePos.left,
              top: row.explorePos.top,
            }}
            onClick={() => open[row.dialog](true)}
          >
            Explore
          </FigmaAngledCta>
          {row.lineY !== null ? (
            <hr
              className={styles.rowLine}
              style={{ top: row.lineY, left: row.titlePos.left - 16 }}
              aria-hidden="true"
            />
          ) : null}
        </div>
      ))}

      {/* Bottom-left quote */}
      <div className={styles.quoteBlock}>
        <FigmaQuoteBrackets
          leftStyle={{ left: -64, top: -16 }}
          rightStyle={{ right: -34, top: -9 }}
        />
        <p className={styles.quoteText}>
          We Don&rsquo;t Tell Stories To Impress.
          <br />
          We Share Stories That Prove What{" "}
          <span className={styles.greenText}>Energy</span> Can Do.
        </p>
      </div>

      {/* Right CTAs */}
      <FigmaAngledCta
        className={styles.ctaDownload}
        style={{ position: "absolute", left: 1571, top: 695 }}
        icon="download"
        href={CTA_LINKS.pressKit}
      >
        Download the Press Kit
      </FigmaAngledCta>

      {/* PDF link above/beside the quote CTA */}
      <a
        href={CTA_LINKS.partnershipFramework}
        className={styles.pdfLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        GREEN Innovation Partnership Framework (PDF)
      </a>

      <FigmaAngledCta
        className={styles.ctaQuote}
        style={{ position: "absolute", left: 1536, top: 773 }}
        onClick={() => setQuoteOpen(true)}
      >
        Request Quote Or Appearance
      </FigmaAngledCta>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          figmaPlaceholder="Let's Talk Energy"
          triggerVariant="figmaCanvas"
          figmaPlaceholder="Let's Talk Energy"
          triggerStyle={{
            top: 853,
            right: "auto",
            bottom: "auto",
            left: 1499,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}

      <LatestPressReleases isOpen={latestOpen} onClose={() => setLatestOpen(false)} />
      <MediaContactInterviewRequests isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <MediaKitDownload isOpen={kitOpen} onClose={() => setKitOpen(false)} />
      <GreenInTheNews isOpen={newsOpen} onClose={() => setNewsOpen(false)} />
      <OfficialSpokesPeople isOpen={spokesOpen} onClose={() => setSpokesOpen(false)} />
      <RequestQuoteAppointment isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}
