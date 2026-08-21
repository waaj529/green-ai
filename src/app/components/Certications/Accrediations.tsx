"use client";

import { useState } from "react";
import { useCertificationsAccreditations } from "../../../hooks/useCertificationsAccreditations";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./Accrediations.module.css";
import ListofCertificates from "./ListofCertificates";
import LetsStart from "./Modals/LetsStart";

const FALLBACK_CERTIFICATES = [
  {
    name: "ISO 9001",
    title: "Quality Management",
    description:
      "Ensures consistent product and service quality through robust process management and customer focus.",
    image: "/images/certifications-accredication/figma-iso-9001.png",
    nodeId: "7077:3283",
  },
  {
    name: "ISO 14001",
    title: "Environmental management",
    description:
      "Supports sustainable operations by reducing environmental impact and promoting eco-efficiency.",
    image: "/images/certifications-accredication/figma-iso-14001.png",
    nodeId: "7077:3284",
  },
  {
    name: "ISO 45001",
    title: "Occupational Health & Safety",
    description:
      "Prioritizes safe, healthy workplaces through proactive risk management and employee well-being.",
    image: "/images/certifications-accredication/figma-iso-45001.png",
    nodeId: "7077:3281",
  },
  {
    name: "ISO 50001",
    title: "Energy Management Systems",
    description:
      "Ensures implement, maintain, and improve their energy performance, including energy efficiency, use, and consumption.",
    image: "/images/certifications-accredication/figma-iso-50001.png",
    nodeId: "7077:3282",
  },
] as const;

const FALLBACK_ESG_POINTS = [
  "Environmental: We reduce emissions, conserve resources, and support climate-resilient operations.",
  "Social: We promote diversity, equity, inclusion, employee well-being, and community engagement.",
  "Governance: We ensure transparent leadership, ethical conduct, and regulatory compliance.",
  (
    <span key="esg-int">
      ESG Integration: We align with{" "}
      <strong>GRI, SASB, and UN SDGs</strong>, with clear reporting and
      measurable progress.
    </span>
  ),
] as const;

export default function Accrediations() {
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const { certificationsData } = useCertificationsAccreditations();
  const title = certificationsData?.title || "Certifications & Accreditations";
  const [titleStart = "Certifications", titleEnd = "Accreditations"] =
    title.split(" & ");
  const certificates = FALLBACK_CERTIFICATES.map((fallback, index) => ({
    ...fallback,
    ...certificationsData?.isoSection?.certificates?.[index],
  }));
  const esgPoints = certificationsData?.esgSection?.points?.length
    ? certificationsData.esgSection.points
    : FALLBACK_ESG_POINTS;

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:3221">
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <img
        className={styles.watermark}
        src="/images/certifications/mask_composite.png"
        alt=""
        width="755"
        height="755"
      />
      <img
        className={styles.verticalTitleImg}
        src="/images/certifications/title_vert.png"
        alt=""
        aria-hidden="true"
        width="61"
        height="555"
      />
      <h1 className={styles.pageTitle} data-node-id="7077:3249">
        <img
          className={styles.pageTitleImg}
          src="/images/certifications/title_h1.png"
          alt={title}
          width="487"
          height="98"
        />
      </h1>
      <button
        type="button"
        className={styles.quote}
        onClick={() => setIsCertificatesOpen(true)}
        data-node-id="7077:3263"
      >
        <img
          src="/images/certifications/quote_panel.png"
          alt=""
          width="606"
          height="155"
        />
        <span>
          &ldquo;Setting the Benchmark
          <br />
          for Excellence.&rdquo;
        </span>
      </button>
      <section className={styles.esg} data-node-id="7077:3250">
        <h2>
          {certificationsData?.esgSection?.heading ||
            "Environmental, Social, and Governance (ESG)"}
        </h2>
        <p>
          {certificationsData?.esgSection?.description ||
            "Our ESG standards reflect a deep commitment to sustainable growth, ethical practices, and positive impact on society and the environment. We align our actions with globally recognized ESG frameworks to create long-term value for all stakeholders."}
        </p>
        <ul>
          {esgPoints.map((point, i) => (
            <li key={`esg-${i}`}>{point}</li>
          ))}
        </ul>
      </section>
      <section className={styles.iso} data-node-id="7077:3251">
        <h2>{certificationsData?.isoSection?.heading || "ISO Standards"}</h2>
        <p className={styles.isoIntro}>
          {certificationsData?.isoSection?.description ||
            "At [Your Company Name], we adhere to globally recognized ISO standards to ensure quality, efficiency, and continuous improvement across our operations. These certifications reflect our commitment to excellence, customer satisfaction, and regulatory compliance."}
        </p>
        <div className={styles.certificates}>
          {certificates.map((certificate) => (
            <button
              type="button"
              className={styles.certificate}
              key={certificate.name}
              onClick={() => setIsCertificatesOpen(true)}
              data-node-id={certificate.nodeId}
            >
              <img
                src={certificate.image}
                alt={`${certificate.name} certification`}
                width="145"
                height="176"
              />
              <strong>{certificate.name}</strong>
              <b>({certificate.title})</b>
              <span>{certificate.description}</span>
            </button>
          ))}
        </div>
      </section>
      <section className={styles.cleanEnergy} data-node-id="7077:3252">
        <div>
          <h2>
            {certificationsData?.cleanEnergySection?.heading ||
              "Clean Energy Council"}
          </h2>
          <p>
            {certificationsData?.cleanEnergySection?.description ||
              "Australian industry association that represents businesses involved in renewable energy and energy storage"}
          </p>
        </div>
        <img
          src="/images/certifications/cec_logo.png"
          alt="Clean Energy Council"
          width="262"
          height="117"
        />
      </section>
      <button
        type="button"
        className={styles.startButton}
        onClick={() => setIsStartOpen(true)}
        data-node-id="7077:3275"
      >
        <img
          src="/images/certifications/cta_panel.png"
          alt=""
          width="178"
          height="52"
        />
        <span>{certificationsData?.cta?.text || "Let’s Start"}</span>
      </button>
      <D6Chatbot
        canvasAnchored figmaPlaceholder="Let\'s Talk Energy"
        triggerVariant="figmaCanvas"
        triggerClassName={styles.chatTrigger}
        triggerStyle={{
            top: 885,
            right: "auto",
            bottom: "auto",
            left: 1497,
            width: 418,
          }}
      />
    </main>
  );

  const mobile = (
    <main className={styles.mobilePage} data-node-id="7077:3221-mobile">
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileContent}>
        <h1>
          {titleStart} &amp; <span>{titleEnd}</span>
        </h1>
        <blockquote>
          &ldquo;
          {certificationsData?.tagline ||
            "Setting the Benchmark for Excellence."}
          &rdquo;
        </blockquote>
        <section>
          <h2>
            {certificationsData?.esgSection?.heading ||
              "Environmental, Social, and Governance (ESG)"}
          </h2>
          <p>
            {certificationsData?.esgSection?.description ||
              "Our ESG standards reflect a commitment to sustainable growth, ethical practices, and positive impact on society and the environment."}
          </p>
          <ul>
            {esgPoints.map((point, i) => (
              <li key={`esg-${i}`}>{point}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>{certificationsData?.isoSection?.heading || "ISO Standards"}</h2>
          <p>
            {certificationsData?.isoSection?.description ||
              "We adhere to globally recognized ISO standards to ensure quality, efficiency, and continuous improvement across our operations."}
          </p>
          <div className={styles.mobileCertificates}>
            {certificates.map((certificate) => (
              <button
                type="button"
                key={certificate.name}
                onClick={() => setIsCertificatesOpen(true)}
              >
                <img
                  src={certificate.image}
                  alt={`${certificate.name} certification`}
                  width="145"
                  height="176"
                />
                <strong>{certificate.name}</strong>
                <b>({certificate.title})</b>
                <span>{certificate.description}</span>
              </button>
            ))}
          </div>
        </section>
        <section className={styles.mobileCleanEnergy}>
          <div>
            <h2>Clean Energy Council</h2>
            <p>
              {certificationsData?.cleanEnergySection?.description ||
                "Australian industry association that represents businesses involved in renewable energy and energy storage"}
            </p>
          </div>
          <img
            src="/images/certifications/cec_logo.png"
            alt="Clean Energy Council"
            width="262"
            height="117"
          />
        </section>
        <button
          type="button"
          className={styles.mobileStart}
          onClick={() => setIsStartOpen(true)}
        >
          Let’s Start
        </button>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:3221" />
      <ListofCertificates
        isOpen={isCertificatesOpen}
        onClose={() => setIsCertificatesOpen(false)}
      />
      <LetsStart isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />
    </>
  );
}
