"use client";

import { useState } from "react";
import { useSustainabilityESG } from "../../../hooks/useSustainabilityESG";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import styles from "./EsgCommitments.module.css";
import BookTechnicalDebrief from "./Modals/BookTechnicalDebrief";
import RequestEngineeringDossier from "./Modals/RequestEngineeringDossier";

const FALLBACK_SECTIONS = [
  {
    heading: "Environmental Stewardship",
    intro:
      "We are actively reshaping our footprint by prioritizing climate-positive action.",
    points: [
      "Carbon-neutral operations by 2026",
      "100% transition to renewable energy across all facilities",
      "Use of biodegradable and recyclable materials",
      "Sustainable procurement and green supply chain initiatives",
      "Reforestation and carbon offset programs",
    ],
    icon: "/images/esg-commitments/icon_env.png",
    card: "/images/esg-commitments/panel_env_trim.png",
    nodeId: "7077:6738",
  },
  {
    heading: "Social Responsibility",
    intro:
      "Sustainability is about people, too. We invest in inclusive progress and resilient communities.",
    points: [
      "Training programs in green skills and clean-tech employment",
      "Local sourcing and support for underserved regions",
      "Ethical labor, diversity, and fair-wage policies",
      "Collaboration with indigenous and rural communities for eco-preservation",
    ],
    icon: "/images/esg-commitments/icon_social.png",
    card: "/images/esg-commitments/panel_social_trim.png",
    nodeId: "7077:6730",
  },
  {
    heading: "Ethical Governance",
    intro: "Good governance is the foundation of sustainable growth.",
    points: [
      "ESG-aligned decision-making and board oversight",
      "Transparent sustainability reporting and KPIs",
      "Responsible investment screening (no fossil fuels, conflict materials, etc.)",
      "Climate risk assessment and mitigation planning",
    ],
    icon: "/images/esg-commitments/icon_gov.png",
    card: "/images/esg-commitments/panel_gov_trim.png",
    nodeId: "7077:6743",
  },
] as const;

interface EsgSection {
  heading: string;
  intro: string;
  points: readonly string[];
  icon: string;
  card: string;
  nodeId: string;
}

interface PillarProps {
  section: EsgSection;
  index: number;
  mobile?: boolean;
}

function EsgPillar({ section, index, mobile = false }: PillarProps) {
  return (
    <article
      className={`${styles.pillar} ${mobile ? styles.mobilePillar : ""}`}
      data-node-id={section.nodeId}
    >
      <img className={styles.cardShape} src={section.card} alt="" />
      <div className={styles.pillarContent}>
        <h2>{section.heading}</h2>
        <p>{section.intro}</p>
        <ul>
          {section.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <img
        className={styles.pillarIcon}
        src={section.icon}
        alt=""
        width={index === 0 ? 73 : index === 1 ? 75 : 77}
        height={index === 0 ? 73 : index === 1 ? 75 : 77}
      />
    </article>
  );
}

export default function EsgCommitments() {
  const { sustainabilityData } = useSustainabilityESG();
  const [isDebriefOpen, setIsDebriefOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const sections = FALLBACK_SECTIONS.map((fallback, index) => ({
    ...fallback,
    heading: sustainabilityData?.sections?.[index]?.heading || fallback.heading,
    points: sustainabilityData?.sections?.[index]?.points?.length
      ? sustainabilityData.sections[index].points
      : fallback.points,
  }));
  const subtitle =
    sustainabilityData?.header?.subtitle ||
    "sustainability is more than a goal—it’s our core operating principle. We integrate Environmental, Social and Governance (ESG) values into everything we do, from product design to energy use, supply chains, and community partnerships.";
  const quote =
    sustainabilityData?.quote?.text ||
    "We lead with purpose—to build a thriving, low-carbon future through sustainable innovation and ESG integrity";

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6707">
      <img
        className={styles.background}
        src="/images/esg-commitments/mask_composite.png"
        alt=""
        width="967"
        height="1297"
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <img
        className={styles.verticalTitle}
        src="/images/esg-commitments/title_vert.png"
        alt=""
        aria-hidden="true"
        width="49"
        height="837"
      />
      <img
        className={styles.pageTitle}
        src="/images/esg-commitments/title_h1.png"
        alt="Sustainability & ESG Commitments"
        data-node-id="7077:6715"
        width="1030"
        height="37"
      />
      <p className={styles.intro} data-node-id="7077:6708">
        <strong>GREEN</strong>, {subtitle}
      </p>
      <div className={styles.pillars}>
        {sections.map((section, index) => (
          <EsgPillar key={section.heading} section={section} index={index} />
        ))}
      </div>
      <blockquote className={styles.quote} data-node-id="7077:6735">
        “<span>{quote}</span>”
        <span className={styles.quoteMark} aria-hidden="true">
          “
        </span>
      </blockquote>
      <img
        className={styles.tomorrowPanel}
        src="/images/esg-commitments/tomorrow_panel.png"
        alt=""
        width="511"
        height="132"
      />
      <div className={styles.tomorrow} data-node-id="7077:6726">
        <span>Green Today.</span>
        <strong>Greener Tomorrow.</strong>
      </div>
      <div className={styles.actions}>
        <FigmaAngledCta
          onClick={() => setIsDebriefOpen(true)}
          style={{ position: "absolute", top: 658, left: 1620, width: 299 }}
        >
          Book a Technical Debrief
        </FigmaAngledCta>
        <FigmaAngledCta
          onClick={() => setIsDossierOpen(true)}
          style={{ position: "absolute", top: 732, left: 1557, width: 359 }}
        >
          Request Our Engineering Dossier
        </FigmaAngledCta>
        <FigmaAngledCta
          style={{ position: "absolute", top: 812, left: 1497, width: 419 }}
        >
          Explore a System Built for Your Reality
        </FigmaAngledCta>
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
    <main className={styles.mobilePage} data-node-id="7077:6707-mobile">
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileContent}>
        <h1>
          Sustainability &amp; ESG <span>Commitments</span>
        </h1>
        <p>
          <strong>GREEN</strong>, {subtitle}
        </p>
        <div className={styles.mobilePillars}>
          {sections.map((section, index) => (
            <EsgPillar
              key={section.heading}
              section={section}
              index={index}
              mobile
            />
          ))}
        </div>
        <blockquote>
          “<span>{quote}</span>”
        </blockquote>
        <div className={styles.mobileTomorrow}>
          <span>Green Today.</span>
          <strong>Greener Tomorrow.</strong>
        </div>
        <div className={styles.mobileActions}>
          <button type="button" onClick={() => setIsDebriefOpen(true)}>
            Book a Technical Debrief
          </button>
          <button type="button" onClick={() => setIsDossierOpen(true)}>
            Request Our Engineering Dossier
          </button>
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:6707" />
      <BookTechnicalDebrief
        isOpen={isDebriefOpen}
        onClose={() => setIsDebriefOpen(false)}
      />
      <RequestEngineeringDossier
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
    </>
  );
}
