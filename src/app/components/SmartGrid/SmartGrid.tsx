"use client";

import Link from "next/link";
import { useState } from "react";
import { useEnergyStorageSmartGrid } from "../../../hooks/useEnergyStorageSmartGrid";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import DispatchArchitect from "./Modals/DispatchArchitect";
import StorageSystemReview from "./Modals/StorageSystemReview";
import styles from "./SmartGrid.module.css";

const ARCHITECTURE = [
  ["Modular Lithium & LFP Systems", "from 5 kWh to 2+ MWh"],
  ["Rapid-Deploy Banks", "for remote, mobile, or critical use cases"],
  ["Hybrid Optimization", "solar, diesel, and grid coordination"],
  [
    "Thermal & Control Integration",
    "CICU enclosures with built-in intelligence",
  ],
  ["Telematics-Enabled", "live diagnostics, alerts, and predictive insights"],
] as const;

function GreenWords({ text }: { text: string }) {
  const [beforeEnergy, afterEnergy = ""] = text.split("Energy");
  const [beforeStore, afterStore = ""] = afterEnergy.split("Store");
  return (
    <>
      {beforeEnergy}
      <span>Energy</span>
      {beforeStore}
      <span>Store</span>
      {afterStore}
    </>
  );
}

export default function SmartGrid() {
  const { smartGridData } = useEnergyStorageSmartGrid();
  const [isDispatchArchitectOpen, setIsDispatchArchitectOpen] = useState(false);
  const [isStorageReviewOpen, setIsStorageReviewOpen] = useState(false);
  const title = smartGridData?.header?.title || "Energy Storage & Smart Grid";
  const subtitle =
    smartGridData?.header?.subtitle ||
    "Power That Thinks. Systems That React. Continuity Without Compromise.";
  const description =
    smartGridData?.header?.description ||
    "At GREEN, we don’t build systems that wait for problems. We build systems that predict, protect, and perform — before failure strikes.";
  const architecture = smartGridData?.architecture?.items?.length
    ? smartGridData.architecture.items.map(
        (item) => [item.title, item.description] as const,
      )
    : ARCHITECTURE;
  const quote = smartGridData?.quote?.text || "Where Energy Stops, We Store.";
  const statementHeading =
    smartGridData?.statement?.heading ||
    "Engineered for the Real World. Built to Hold When Everything Else Doesn’t.";
  const statementDescription =
    smartGridData?.statement?.description ||
    "From hospitals in blackout zones to island grids stretched to the edge";

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6475">
      <img
        className={styles.backgroundArt}
        src="/images/smart-grid/mainImg.png"
        alt=""
        width="989"
        height="970"
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <img
        className={styles.verticalTitle}
        src="/images/smart-grid/smard-grid.png"
        alt=""
        width="40"
        height="773"
      />
      <h1 className={styles.pageTitle} data-node-id="7077:6488">
        {title}
      </h1>
      <p className={styles.subtitle} data-node-id="7077:6509">
        {subtitle}
      </p>
      <p className={styles.description} data-node-id="7077:6510">
        {description.split("GREEN")[0]}
        <strong>GREEN</strong>
        {description.split("GREEN")[1]}
      </p>
      <section className={styles.architecture} data-node-id="7077:6506">
        <h2>
          {smartGridData?.architecture?.heading || "Our Storage Architecture"}
        </h2>
        <ul>
          {architecture.map(([itemTitle, itemDescription]) => (
            <li key={itemTitle}>
              <strong>{itemTitle}</strong> – {itemDescription}
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.storageQuote} data-node-id="7077:6500">
        <p>
          <GreenWords text={quote} />
        </p>
      </section>
      <p className={styles.failureQuote} data-node-id="7077:6503">
        “Where Grids Fail, We <span>Respond.</span>
        <br /> Where <span>Intelligence</span> Is Needed,
        <br /> We <span>Lead</span>”
      </p>
      <p className={styles.statement} data-node-id="7077:6508">
        <strong>{statementHeading}</strong>
        <br />— <span>{statementDescription}</span>
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={() => setIsDispatchArchitectOpen(true)}>
          <img
            src="/images/smart-grid/talk.png"
            alt=""
            width="341"
            height="53"
          />
          <span>
            {smartGridData?.callToActions?.[0]?.text ||
              "Talk to Our Dispatch Architects"}
          </span>
          <b aria-hidden="true">›</b>
        </button>
        <button type="button" onClick={() => setIsStorageReviewOpen(true)}>
          <img
            src="/images/smart-grid/book.png"
            alt=""
            width="351"
            height="53"
          />
          <span>
            {smartGridData?.callToActions?.[1]?.text ||
              "Book a Storage System Review"}
          </span>
          <b aria-hidden="true">›</b>
        </button>
        <Link href={smartGridData?.callToActions?.[2]?.href || "#"}>
          <img
            src="/images/smart-grid/download.png"
            alt=""
            width="441"
            height="53"
          />
          <span>
            {smartGridData?.callToActions?.[2]?.text ||
              "Download Our Smart Grid & Storage Dossier"}
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
    <main className={styles.mobilePage} data-node-id="7077:6475-mobile">
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileContent}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>{description}</p>
        <blockquote>
          <GreenWords text={quote} />
        </blockquote>
        <section className={styles.mobileArchitecture}>
          <h3>
            {smartGridData?.architecture?.heading || "Our Storage Architecture"}
          </h3>
          <ul>
            {architecture.map(([itemTitle, itemDescription]) => (
              <li key={itemTitle}>
                <strong>{itemTitle}</strong> – {itemDescription}
              </li>
            ))}
          </ul>
        </section>
        <p className={styles.mobileStatement}>
          <strong>{statementHeading}</strong> —{" "}
          <span>{statementDescription}</span>
        </p>
        <div className={styles.mobileActions}>
          <button
            type="button"
            onClick={() => setIsDispatchArchitectOpen(true)}
          >
            Talk to Our Dispatch Architects
          </button>
          <button type="button" onClick={() => setIsStorageReviewOpen(true)}>
            Book a Storage System Review
          </button>
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:6475" />
      <DispatchArchitect
        isOpen={isDispatchArchitectOpen}
        onClose={() => setIsDispatchArchitectOpen(false)}
      />
      <StorageSystemReview
        isOpen={isStorageReviewOpen}
        onClose={() => setIsStorageReviewOpen(false)}
      />
    </>
  );
}
