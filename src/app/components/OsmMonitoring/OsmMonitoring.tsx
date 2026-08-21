"use client";

import { useState } from "react";
import { useOMMonitoring } from "../../../hooks/useOMMonitoring";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import LiveDemoPOC from "./Modals/LiveDemoPOC";
import OMProposal from "./Modals/OMProposal";
import styles from "./OsmMonitoring.module.css";

const PHILOSOPHY = [
  {
    title: "Predict. Prevent. Perform.",
    description:
      "Downtime isn’t an option — especially in mission-critical energy environments. GREEN’s O&M model is built around predictive diagnostics, remote oversight, and rapid field response.",
  },
  {
    title: "Standardized. Yet Site-Specific.",
    description:
      "Our O&M structure is templated for efficiency but tuned to each site’s unique geography, usage profile, and stakeholder needs.",
  },
  {
    title: "Contracted for Clarity. Delivered with Discipline.",
    description:
      "Our clients benefit from clear SLAs, cost transparency, and KPI-driven service performance.",
  },
];

const SERVICES = [
  ["System Monitoring", "24/7 performance tracking via GREEN POC"],
  [
    "Preventive Maintenance",
    "Scheduled inspections, cleaning, and performance audits",
  ],
  ["Corrective Maintenance", "Remote diagnostics + rapid-response field teams"],
  [
    "Performance Reporting",
    "Monthly/quarterly reports, uptime dashboards, asset health reports",
  ],
  [
    "Spare Parts & Inventory",
    "On-demand replacement cycle management through GREEN’s supply network",
  ],
  ["Warranty Compliance", "Vendor liaison and documentation support"],
  [
    "Training & Handover",
    "O&M onboarding for local teams, CBOs, and institutional clients",
  ],
] as const;

export default function OsmMonitoring() {
  const { omData } = useOMMonitoring();
  const [isOMProposalOpen, setIsOMProposalOpen] = useState(false);
  const [isLiveDemoOpen, setIsLiveDemoOpen] = useState(false);
  const philosophy = omData?.philosophy?.items?.length
    ? omData.philosophy.items
    : PHILOSOPHY;
  const services = omData?.services?.items?.length
    ? omData.services.items.map(
        (item) => [item.title, item.description] as const,
      )
    : SERVICES;
  const title = omData?.header?.title || "O&M & Monitoring";
  const intro =
    omData?.header?.subtitle ||
    "At GREEN, Operations & Maintenance (O&M) is not an afterthought.";
  const description =
    omData?.header?.description ||
    "It is a core pillar of our Engineering DNA — designed to ensure long-term system efficiency, financial integrity, and real-world impact. We don’t just build systems. We stand behind them — with real-time data, preventative protocols, and field-tested service teams.";

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:4516">
      <img
        className={styles.backgroundArt}
        src="/images/osm-monitoring/mainImg.png"
        alt=""
        width="1146"
        height="970"
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <img
        className={styles.verticalTitle}
        src="/images/osm-monitoring/osm.png"
        alt=""
        width="59"
        height="760"
      />
      <h1 className={styles.pageTitle} data-node-id="7077:4521">
        <span>O&amp;M</span>
        {title.replace(/O&M/i, "")}
      </h1>
      <div className={styles.intro} data-node-id="7077:4569">
        <p>{intro}</p>
        <p>{description}</p>
      </div>
      <section className={styles.philosophy} data-node-id="7077:4558">
        <h2>{omData?.philosophy?.heading || "Our O&M Philosophy"}</h2>
        {philosophy.slice(0, 3).map((item) => (
          <article key={item.title}>
            <img
              src="/images/osm-monitoring/lighting.png"
              alt=""
              width="60"
              height="60"
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
      <p className={styles.systemsQuote} data-node-id="7077:4533">
        <span>Sustaining</span> Systems.
        <br />
        <span>Securing</span> Performance.
        <br />
        <span>Scaling</span> Trust.
      </p>
      <section className={styles.whyMatters} data-node-id="7077:4568">
        <h2>{omData?.whyMatters?.heading || "Why This Matters"}</h2>
        <p>
          — <span>Systems that are not monitored</span> Fail Quietly.
        </p>
        <p>
          — <span>Systems that are not maintained</span> Fail Early.
        </p>
      </section>
      <section className={styles.services} aria-label="O&M services">
        {services.slice(0, 7).map(([serviceTitle, serviceDescription]) => (
          <article key={serviceTitle}>
            <img
              src="/images/osm-monitoring/lighting.png"
              alt=""
              width="41"
              height="41"
            />
            <h3>{serviceTitle}</h3>
            <p>{serviceDescription}</p>
          </article>
        ))}
      </section>
      <div className={styles.actions}>
        <button type="button" onClick={() => setIsOMProposalOpen(true)}>
          <img
            src="/images/osm-monitoring/request.png"
            alt=""
            width="301"
            height="53"
          />
          <span>
            {omData?.callToActions?.[0]?.text || "Request an O&M Proposal"}
          </span>
          <b>›</b>
        </button>
        <button type="button" onClick={() => setIsLiveDemoOpen(true)}>
          <img
            src="/images/osm-monitoring/book.png"
            alt=""
            width="351"
            height="53"
          />
          <span>
            {omData?.callToActions?.[1]?.text ||
              "Book a Live Demo of GREEN POC"}
          </span>
          <b>›</b>
        </button>
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
    <main className={styles.mobilePage} data-node-id="7077:4516-mobile">
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileContent}>
        <h1>
          <span>O&amp;M</span> &amp; Monitoring
        </h1>
        <p>
          {intro} {description}
        </p>
        <h2>{omData?.philosophy?.heading || "Our O&M Philosophy"}</h2>
        {philosophy.slice(0, 3).map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
        <blockquote>
          <span>Sustaining</span> Systems. <span>Securing</span> Performance.{" "}
          <span>Scaling</span> Trust.
        </blockquote>
        <section className={styles.mobileServices}>
          {services.slice(0, 7).map(([serviceTitle, serviceDescription]) => (
            <article key={serviceTitle}>
              <h3>{serviceTitle}</h3>
              <p>{serviceDescription}</p>
            </article>
          ))}
        </section>
        <div className={styles.mobileActions}>
          <button type="button" onClick={() => setIsOMProposalOpen(true)}>
            Request an O&amp;M Proposal
          </button>
          <button type="button" onClick={() => setIsLiveDemoOpen(true)}>
            Book a Live Demo of GREEN POC
          </button>
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:4516" />
      <OMProposal
        isOpen={isOMProposalOpen}
        onClose={() => setIsOMProposalOpen(false)}
      />
      <LiveDemoPOC
        isOpen={isLiveDemoOpen}
        onClose={() => setIsLiveDemoOpen(false)}
      />
    </>
  );
}
