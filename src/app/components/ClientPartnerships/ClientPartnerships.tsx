"use client";
import React from "react";
import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./ClientPartnerships.module.css";
import OurClientPartnershipModel from "./Dialog/OurClientPartnershipModel";
import PartnershipOnboarding from "./Dialog/PartnershipOnboarding";
import UseCases from "./Dialog/UseCases";
import WhatSetsGREENApart from "./Dialog/WhatSetsGREENApart";
import WhoWePartnerWith from "./Dialog/WhoWePartnerWith";

// Figma-locked design content (node 7077:15858). Rows open the same
// data-driven dialogs; canvas geometry is exact to the Figma node tree.
const FALLBACK = {
  subHeadline: "We Don\u2019t Just Serve Clients. We Scale Their Missions.",
  description:
    "From electrifying rural provinces to powering national infrastructure, GREEN partners with clients whose ambitions match our execution.  We don\u2019t just deliver energy \u2014 we deliver outcomes that endure.",
  rows: [
    {
      key: "whoWePartnerWith",
      title: "Who We Partner With",
      subtitle: "Strategic Clients. Transformational Outcomes.",
      cta: "Explore",
      ctaX: 943,
      ctaY: 364,
      titleY: 360,
      subtitleY: 386,
      lineX: 264,
      lineY: 424,
    },
    {
      key: "ourClientPartnership",
      title: "Our Client Partnership Model",
      subtitle: "Aligned by Design. Delivered with Accountability.",
      cta: "Explore",
      ctaX: 943,
      ctaY: 442,
      titleY: 438,
      subtitleY: 464,
      lineX: 262,
      lineY: 507,
    },
    {
      key: "whatSetsGreenApart",
      title: "What Sets GREEN Apart",
      subtitle: "Strategic Clients. Transformational Outcomes.",
      cta: "Explore",
      ctaX: 937,
      ctaY: 526,
      titleY: 522,
      subtitleY: 549,
      lineX: 262,
      lineY: 592,
    },
    {
      key: "useCases",
      title: "Client Testimonials / Use Cases",
      subtitle: "Strategic Clients. Transformational Outcomes.",
      cta: "Explore",
      ctaX: 933,
      ctaY: 610,
      titleY: 606,
      subtitleY: 632,
      lineX: 266,
      lineY: 677,
    },
    {
      key: "partnershipOnboarding",
      title: "Partnership Onboarding",
      subtitle: "Let\u2019s Build What Your Nation or Enterprise Needs Next.",
      cta: "Explore",
      ctaX: 926,
      ctaY: 698,
      titleY: 690,
      subtitleY: 719,
      lineX: 266,
      lineY: 767,
    },
    {
      key: "clientPartnerLogin",
      title: "CLIENT PARTNER LOGIN",
      subtitle: "Let\u2019s Build What Your Nation or Enterprise Needs Next.",
      cta: "Login",
      ctaX: 926,
      ctaY: 788,
      titleY: 780,
      subtitleY: 809,
      lineX: 266,
      lineY: 767,
    },
  ],
  quote1: "\u201cISO Compliant \u2022 Donor Trusted \u2022 Built Across PNG\u201d",
  quote2: "From Brief to  Commissioning in 90 Days",
  statement: "Let\u2019s Build What Your Nation or Enterprise Needs Next.",
};

interface ClientPartnershipsProps {
  canvas?: boolean;
}

export default function ClientPartnerships({
  canvas = false,
}: ClientPartnershipsProps) {
  const d = FALLBACK;
  const [isWhoWePartnerOpen, setIsWhoWePartnerOpen] = useState(false);
  const [isOurModelOpen, setIsOurModelOpen] = useState(false);
  const [isWhatSetsOpen, setIsWhatSetsOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isPartnershipOnboardingOpen, setIsPartnershipOnboardingOpen] =
    useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);


  return (
    <main className={styles.page} data-node-id="7077:15858">
      <SiteHeader
        layout={canvas ? "figmaCanvas" : "viewport"}
        panel="logoOnly"
      />

      {/* Left green/yellow angled panel (Group 1171277870, 326×662 at -15,-1) */}
      <div className={styles.leftPanel} aria-hidden="true" />

      {/* Vertical outlined side title (Raleway 900 70px, stroke #989898) */}
      <h2
        className={styles.verticalTitle}
        aria-hidden="true"
        role="presentation"
      >
        CLIENT PARTNERSHIPS
      </h2>

      {/* Right-side photo collage (Mask group at 1063,-59, 1003×2134) */}
      <div className={styles.rightCollage} aria-hidden="true">
        <img src="/images/client-partnerships/mask_composite.png" alt="" />
      </div>

      {/* Header section */}
      <div className={styles.headerBlock}>
        <h1 className={styles.mainTitle}>CLIENT PARTNERSHIPS</h1>
        <p className={styles.subHeadline}>{d.subHeadline}</p>
        <p className={styles.description}>{d.description}</p>
      </div>

      {/* Five menu rows (titles, subtitles, green divider lines, angled pills) */}
      {d.rows.map((row) => (
        <React.Fragment key={row.key}>
          <div
            className={styles.rowLine}
            style={{
              position: "absolute",
              left: row.lineX,
              top: row.lineY,
              width: 812,
              display: row.key === "clientPartnerLogin" ? "none" : "block",
            }}
            aria-hidden="true"
          />
          <div
            className={styles.rowText}
            style={{ position: "absolute", left: 266, top: row.titleY }}
          >
            <h3
              className={styles.rowTitle}
              onClick={
                row.key === "clientPartnerLogin"
                  ? undefined
                  : () =>
                      row.key === "whoWePartnerWith"
                        ? setIsWhoWePartnerOpen(true)
                        : row.key === "ourClientPartnership"
                          ? setIsOurModelOpen(true)
                          : row.key === "whatSetsGreenApart"
                            ? setIsWhatSetsOpen(true)
                            : row.key === "partnershipOnboarding"
                              ? setIsPartnershipOnboardingOpen(true)
                              : setIsUseCasesOpen(true)
              }
              style={{ cursor: "pointer" }}
            >
              {row.title}
            </h3>
            <p className={styles.rowSubtitle}>{row.subtitle}</p>
          </div>
          <FigmaAngledCta
            className={styles.rowCta}
            style={{ position: "absolute", left: row.ctaX, top: row.ctaY }}
            onClick={
              row.key === "partnershipOnboarding" || row.key === "clientPartnerLogin"
                ? () => setIsPartnershipOnboardingOpen(true)
                : () =>
                    row.key === "whoWePartnerWith"
                      ? setIsWhoWePartnerOpen(true)
                      : row.key === "ourClientPartnership"
                        ? setIsOurModelOpen(true)
                        : row.key === "whatSetsGreenApart"
                          ? setIsWhatSetsOpen(true)
                          : setIsUseCasesOpen(true)
            }
          >
            {row.cta}
          </FigmaAngledCta>
        </React.Fragment>
      ))}

      {/* Right-column quote over the collage */}
      <p className={styles.rightQuote}>{d.quote1}</p>
      <p className={styles.rightSubQuote}>{d.quote2}</p>

      {/* Bracketed statement (Vectors 7374 / 7375) */}
      <div className={styles.statementBlock}>
        <img
          src="/images/client-partnerships/quote_left.png"
          alt=""
          className={styles.statementBracketLeft}
          aria-hidden="true"
        />
        <p className={styles.statementText}>{d.statement}</p>
        <img
          src="/images/client-partnerships/quote_right.png"
          alt=""
          className={styles.statementBracketRight}
          aria-hidden="true"
        />
      </div>

      {/* Bottom-right CTAs */}
      <FigmaAngledCta
        className={styles.bookCta}
        style={{ position: "absolute", left: 1647, top: 732 }}
        onClick={() => setIsBookCallOpen(true)}
      >
        Book a Discovery Call
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.prospectusCta}
        style={{ position: "absolute", left: 1516, top: 812 }}
        icon="download"
        href="/supply-partners/client-partnership-prospectus.pdf"
      >
        GREEN Client Partnership Prospectus
      </FigmaAngledCta>
      <a className={styles.readMore} href="#read-more" style={{ position: "absolute", left: 1521, top: 799 }}>
        Read more
      </a>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored figmaPlaceholder="Let\'s Talk Energy"
          triggerVariant="figmaCanvas"
          figmaPlaceholder="Let’s Talk Energy"
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

      {/* Modals & Dialogs */}
      <WhoWePartnerWith
        isOpen={isWhoWePartnerOpen}
        onClose={() => setIsWhoWePartnerOpen(false)}
      />
      <OurClientPartnershipModel
        isOpen={isOurModelOpen}
        onClose={() => setIsOurModelOpen(false)}
      />
      <WhatSetsGREENApart
        isOpen={isWhatSetsOpen}
        onClose={() => setIsWhatSetsOpen(false)}
      />
      <UseCases
        isOpen={isUseCasesOpen}
        onClose={() => setIsUseCasesOpen(false)}
      />
      <PartnershipOnboarding
        isOpen={isPartnershipOnboardingOpen}
        onClose={() => setIsPartnershipOnboardingOpen(false)}
      />

      {/* Discovery Call Inquiry Modal */}
      <ProductEnquiry
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
        titlePrefix="BOOK A"
        titleAccent="DISCOVERY CALL"
        interestLabel="AREA OF INTEREST"
        interestOptions={[
          "Government & Utilities",
          "Donors & Development Banks",
          "Private Sector Enterprise",
          "Institutions (Health, Education, Telecom)",
          "Commercial & Industrial EPC",
          "Other",
        ]}
        defaultInterest="Government & Utilities"
      />
    </main>
  );
}
