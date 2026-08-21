"use client";

import Link from "next/link";
import { useState } from "react";
import { useHybridMicrogridSolutions } from "../../../hooks/useHybridMicrogridSolutions";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./MicroGridSolutions.module.css";
import DeploymentReview from "./Modals/DeploymentReview";
import SystemArchitect from "./Modals/SystemArchitect";

const FALLBACK_HYBRID = [
  "Solar + Battery + Diesel + Grid",
  "Smart switching & fuel-saving logic",
  "Zero blackout tolerance",
];

const FALLBACK_MICROGRIDS = [
  "From 10 kW to multi-megawatt",
  "Designed for islands, districts, institutions",
  "Plug-and-deploy with GRID-INTEL™",
  "Remote command & visibility",
];

const FALLBACK_USE_CASES = [
  "Rural hospitals with 24/7 uptime",
  "Schools powered entirely off-grid",
  "Agricultural cold chains deep inland",
  "Telecom towers beyond road access",
  "Island communities free from diesel lock-in",
];

function PointList({ points }: { points: readonly string[] }) {
  return (
    <ul>
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}

function HighlightedQuote({ text }: { text: string }) {
  const [beforeEnergy, afterEnergy = ""] = text.split("Energy");
  const [beforeDeliver, afterDeliver = ""] = afterEnergy.split("Deliver");

  return (
    <>
      {beforeEnergy}
      <span>Energy</span>
      {beforeDeliver}
      <span>Deliver</span>
      {afterDeliver}
    </>
  );
}

export default function MicroGridSolutions() {
  const { microgridData } = useHybridMicrogridSolutions();
  const [isArchitectOpen, setIsArchitectOpen] = useState(false);
  const [isDeploymentReviewOpen, setIsDeploymentReviewOpen] = useState(false);

  const hybrid = microgridData?.solutions?.find(
    (solution) => solution.id === "hybridSystems",
  );
  const microgrids = microgridData?.solutions?.find(
    (solution) => solution.id === "microgrids",
  );
  const title = microgridData?.header?.title || "Hybrid & Microgrid Solutions";
  const subtitle =
    microgridData?.header?.subtitle || "This Is Power, Engineered to Stay On";
  const description =
    microgridData?.header?.description ||
    "In the places where the grid is weak, unreliable, or nonexistent — GREEN builds energy ecosystems that never stop.";
  const quote =
    microgridData?.quote?.text ||
    "Where Energy Is Unstable, We Deliver What Doesn’t Blink.";
  const statement =
    microgridData?.statement?.text ||
    "We design complete hybrid and microgrid systems that balance solar, battery, diesel, and grid — with zero disruption, and full intelligence.";
  const statementParts = statement.split("—");
  const useCases = microgridData?.useCases?.items?.length
    ? microgridData.useCases.items
    : FALLBACK_USE_CASES;

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:5239">
      <img
        className={styles.backgroundArt}
        src="/images/microgrid-solutions/mainImg.png"
        alt=""
        width="793"
        height="970"
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <img
        className={styles.verticalTitle}
        src="/images/microgrid-solutions/hybridLogo.png"
        alt=""
        width="40"
        height="805"
      />
      <h1 className={styles.pageTitle} data-node-id="7077:5253">
        {title.replace(/solutions/i, "")}
        <span>Solutions</span>
      </h1>
      <h2 className={styles.subtitle} data-node-id="7077:5295">
        {subtitle}
      </h2>
      <p className={styles.description} data-node-id="7077:5294">
        {description.split("GREEN")[0]}
        <strong>GREEN</strong>
        {description.split("GREEN")[1]}
      </p>

      <section className={styles.solutionColumns} aria-label="Hybrid solutions">
        <article data-node-id="7077:5286">
          <h3>{hybrid?.heading || "Hybrid Systems"}</h3>
          <PointList
            points={hybrid?.points?.length ? hybrid.points : FALLBACK_HYBRID}
          />
        </article>
        <div className={styles.columnDivider} aria-hidden="true" />
        <article data-node-id="7077:5288">
          <h3>{microgrids?.heading || "Microgrids"}</h3>
          <PointList
            points={
              microgrids?.points?.length
                ? microgrids.points
                : FALLBACK_MICROGRIDS
            }
          />
        </article>
      </section>

      <section className={styles.useCases} data-node-id="7077:5240">
        <h3>
          {microgridData?.useCases?.heading || "Use-Cases We've Engineered"}
        </h3>
        <div>
          <PointList points={useCases.slice(0, 3)} />
          <PointList points={useCases.slice(3)} />
        </div>
      </section>

      <p className={styles.statement} data-node-id="7077:5293">
        <strong>{statementParts[0]?.trim()}</strong>
        <br />— <span>{statementParts.slice(1).join("—").trim()}</span>
      </p>

      <section className={styles.quote} data-node-id="7077:5265">
        <img
          src="/images/microgrid-solutions/vector.png"
          alt=""
          width="82"
          height="101"
        />
        <p>
          <HighlightedQuote text={quote} />
        </p>
      </section>

      <div className={styles.actions}>
        <button type="button" onClick={() => setIsArchitectOpen(true)}>
          <img
            src="/images/microgrid-solutions/systemarchitect.png"
            alt=""
            width="301"
            height="53"
          />
          <span>
            {microgridData?.callToActions?.[0]?.text ||
              "Talk to a System Architect"}
          </span>
          <b aria-hidden="true">›</b>
        </button>
        <button type="button" onClick={() => setIsDeploymentReviewOpen(true)}>
          <img
            src="/images/microgrid-solutions/book.png"
            alt=""
            width="351"
            height="53"
          />
          <span>
            {microgridData?.callToActions?.[1]?.text ||
              "Book a Deployment Review"}
          </span>
          <b aria-hidden="true">›</b>
        </button>
        <Link href={microgridData?.callToActions?.[2]?.href || "#"}>
          <img
            src="/images/microgrid-solutions/downloadhybrid.png"
            alt=""
            width="441"
            height="53"
          />
          <span>
            {microgridData?.callToActions?.[2]?.text ||
              "Download Our Hybrid & Microgrid Overview"}
          </span>
          <b aria-hidden="true">⇩</b>
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
    <main className={styles.mobilePage} data-node-id="7077:5239-mobile">
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileContent}>
        <h1>
          Hybrid &amp; Microgrid <span>Solutions</span>
        </h1>
        <h2>{subtitle}</h2>
        <p>{description}</p>
        <blockquote>
          <HighlightedQuote text={quote} />
        </blockquote>
        <div className={styles.mobileColumns}>
          <article>
            <h3>{hybrid?.heading || "Hybrid Systems"}</h3>
            <PointList
              points={hybrid?.points?.length ? hybrid.points : FALLBACK_HYBRID}
            />
          </article>
          <article>
            <h3>{microgrids?.heading || "Microgrids"}</h3>
            <PointList
              points={
                microgrids?.points?.length
                  ? microgrids.points
                  : FALLBACK_MICROGRIDS
              }
            />
          </article>
        </div>
        <section className={styles.mobileUseCases}>
          <h3>
            {microgridData?.useCases?.heading || "Use-Cases We've Engineered"}
          </h3>
          <PointList points={useCases} />
        </section>
        <p className={styles.mobileStatement}>
          <strong>{statementParts[0]?.trim()}</strong> —{" "}
          <span>{statementParts[1]?.trim()}</span>
        </p>
        <div className={styles.mobileActions}>
          <button type="button" onClick={() => setIsArchitectOpen(true)}>
            Talk to a System Architect
          </button>
          <button type="button" onClick={() => setIsDeploymentReviewOpen(true)}>
            Book a Deployment Review
          </button>
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:5239" />
      <SystemArchitect
        isOpen={isArchitectOpen}
        onClose={() => setIsArchitectOpen(false)}
      />
      <DeploymentReview
        isOpen={isDeploymentReviewOpen}
        onClose={() => setIsDeploymentReviewOpen(false)}
      />
    </>
  );
}
