"use client";
import Link from "next/link";
import { useState } from "react";
import { useGridIntel } from "../../../hooks/useGridIntel";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import Challenge from "./Challenge";
import styles from "./GridIntel.module.css";
import SystemArchitectureTeam from "./Modals/SystemArchitectureTeam";
import TechnicalDeepDive from "./Modals/TechnicalDeepDive";
import Product from "./Product";
import Scenerios from "./Scenerios";
import Solves from "./Solves";
import Technology from "./Technology";
import WhyIntel from "./WhyIntel";

const FEATURES = [
  "Multi-source energy optimization",
  "Remote telemetry & command",
  "Load prediction & performance analytics",
  "Zero-blackout logic & fault anticipation",
];
const SECTIONS = [
  "The Challenge",
  "What GRID-INTEL™",
  "Why GRID-INTEL™",
  "Built for These Scenarios",
  "Technology Stack Overview",
  "Product Integration",
];

export default function GridIntel() {
  const { gridIntelData } = useGridIntel();
  const d = gridIntelData?.mainPage;
  const [open, setOpen] = useState<number | null>(null);
  const [deep, setDeep] = useState(false);
  const [team, setTeam] = useState(false);
  const features = d?.features?.length
    ? d.features.map((x) => x.text)
    : FEATURES;
  const title = d?.title || "GRID-INTEL";
  const subtitle =
    d?.subtitle ||
    "The Intelligence Layer Powering Energy Systems with Precision and Foresight";
  const description =
    d?.description ||
    "GRID-INTEL™ is GREEN’s proprietary platform that controls, balances, and predicts energy flows across solar, battery, diesel, and grid infrastructure — in real time.";
  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:4592">
      <img
        className={styles.backgroundArt}
        src="/images/grid-intel/collage_mask.png"
        alt=""
        width="1146"
        height="1015"
        style={{ left: 450 }}
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <img
        className={styles.verticalTitle}
        src="/images/grid-intel/title_gridintel.png"
        alt=""
        width="91"
        height="689"
      />
      <h1 className={styles.pageTitle}>
        <span>GRID</span>
        {title.replace(/GRID/i, "")}
      </h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.description}>{description}</p>
      <section className={styles.platform}>
        <h2>
          {d?.energyIntelligencePlatform?.title ||
            "Energy Intelligence Platform"}
        </h2>
        {features.map((x) => (
          <p key={x}>{x}</p>
        ))}
      </section>
      <section className={styles.energy}>
        <h2>{d?.energyYouCanCountOn?.title || "Energy You Can Count On"}</h2>
        <h3>
          —{" "}
          {d?.energyYouCanCountOn?.subtitle ||
            "Even When the Grid Can’t Be Counted On"}
        </h3>
        <p>
          {d?.energyYouCanCountOn?.description ||
            "We deliver power infrastructure that anticipates failure, absorbs shocks, and ensures continuity — across any terrain, in any nation, under any grid condition"}
        </p>
      </section>
      <p className={styles.intelligence}>
        Built for <span>Intelligence.</span>
        <br />
        Backed by Discipline.
      </p>
      <p className={styles.smarter}>
        Run <span>Smarter.</span>
        <br />
        Operate with <span>Confidence.</span>
        <br />
        Scale Without <span>Uncertainty.</span>
      </p>
      <img
        className={`${styles.bracket} ${styles.bracketLeft}`}
        src="/images/grid-intel/v_7077_7374.png"
        alt=""
        width="79"
        height="98"
      />
      <img
        className={`${styles.bracket} ${styles.bracketRight}`}
        src="/images/grid-intel/v_7077_7375.png"
        alt=""
        width="80"
        height="99"
      />
      <nav className={styles.sections} aria-label="GRID-INTEL details">
        {SECTIONS.map((x, i) => (
          <button
            type="button"
            key={x}
            onClick={() => setOpen(i)}
            className={i === 2 ? styles.active : ""}
          >
            <img
              src={`/images/grid-intel/v_7077_${[7382, 7377, 7378, 7379, 7380, 7381][i]}.png`}
              alt=""
              width={i === 2 ? 263 : 78}
              height="62"
            />
            <span>{x}</span>
          </button>
        ))}
      </nav>
      <div className={styles.actions}>
        <button type="button" onClick={() => setDeep(true)}>
          <img
            src="/images/grid-intel/schedule.png"
            alt=""
            width="349"
            height="52"
          />
          <span>Schedule a Technical Deep-Dive</span>
        </button>
        <button type="button" onClick={() => setTeam(true)}>
          <img
            src="/images/grid-intel/engage.png"
            alt=""
            width="389"
            height="52"
          />
          <span>Engage Our System Architecture Team</span>
        </button>
        <Link href={d?.ctaButtons?.[2]?.href || "#"}>
          <img
            src="/images/grid-intel/download.png"
            alt=""
            width="459"
            height="52"
          />
          <span>Download the GRID-INTEL™ Product Dossier</span>
        </Link>
      </div>
      <D6Chatbot
        canvasAnchored figmaPlaceholder="Let\'s Talk Energy"
        triggerVariant="figmaCanvas"
        triggerClassName={styles.chatTrigger}
        triggerStyle={{
            top: 899,
            right: "auto",
            bottom: "auto",
            left: 1498,
            width: 418,
          }}
      />
    </main>
  );
  const mobile = (
    <main className={styles.mobilePage}>
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileContent}>
        <h1>
          <span>GRID</span>-INTEL
        </h1>
        <h2>{subtitle}</h2>
        <p>{description}</p>
        <section>
          <h3>Energy Intelligence Platform</h3>
          {features.map((x) => (
            <p key={x}>{x}</p>
          ))}
        </section>
        <blockquote>
          Built for <span>Intelligence.</span> Backed by Discipline.
        </blockquote>
        <div className={styles.mobileSections}>
          {SECTIONS.map((x, i) => (
            <button type="button" key={x} onClick={() => setOpen(i)}>
              {x}
            </button>
          ))}
        </div>
        <div className={styles.mobileActions}>
          <button type="button" onClick={() => setDeep(true)}>
            Schedule a Technical Deep-Dive
          </button>
          <button type="button" onClick={() => setTeam(true)}>
            Engage Our System Architecture Team
          </button>
        </div>
      </div>
      <D6Chatbot />
    </main>
  );
  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:4592" />
      <Challenge
        isOpen={open === 0}
        onClose={() => setOpen(null)}
        data={gridIntelData?.challenge}
      />
      <Solves
        isOpen={open === 1}
        onClose={() => setOpen(null)}
        data={gridIntelData?.whatSolves}
      />
      <WhyIntel isOpen={open === 2} onClose={() => setOpen(null)} />
      <Scenerios
        isOpen={open === 3}
        onClose={() => setOpen(null)}
        data={gridIntelData?.scenarios}
      />
      <Technology
        isOpen={open === 4}
        onClose={() => setOpen(null)}
        data={gridIntelData?.technologyStack}
      />
      <Product
        isOpen={open === 5}
        onClose={() => setOpen(null)}
        data={gridIntelData?.productIntegration}
      />
      <TechnicalDeepDive isOpen={deep} onClose={() => setDeep(false)} />
      <SystemArchitectureTeam isOpen={team} onClose={() => setTeam(false)} />
    </>
  );
}
