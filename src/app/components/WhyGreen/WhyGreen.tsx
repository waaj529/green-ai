"use client";

import { useWhyGreen } from "../../../hooks/useWhyGreen";
import { parseWhyGreenContent } from "../../utils/htmlParser";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./WhyGreen.module.css";

const FALLBACK_PARAGRAPHS = [
  "GREEN Limited - A Front-Runner in Sustainable Living and Renewable Energy Solution Provider in Papua New Guinea has its global presence in the USA, INDIA and Australia. The company helps to bring out the best of Product design, development and Project delivery strategies, prompt service and a support matrix more suitable to PNG with World Class standards. GREEN Limited is an ISO 9001 certified company and complies with all the international standards and quality management methodologies.",
  "GREEN is committed to enhancing and empowering lives through our energy and technology augmented solutions envisioned to end the energy-dependency on fossil fuels for a sustainable and promising future. With a Global perspective, GREEN bestows to deliver the finest solutions to Enable, Empower and Energize the drive for a sustainable future towards a Net-Zero Target!",
] as const;

const FALLBACK_SOLUTIONS = [
  {
    title: "Environment",
    description:
      "Renewable Energy reduces the devastating impacts of fossil fuels on the ecosystem.",
    image: "/images/why-green/envirornment.png",
    width: 70,
    height: 69,
  },
  {
    title: "Health",
    description:
      "Renewable energy emits no or low air pollutants. Healthcares can rely on renewable energy",
    image: "/images/why-green/health.png",
    width: 75,
    height: 73,
  },
  {
    title: "Economy",
    description:
      "Renewable Energy comes with low costs. Energy prices are affordable at all levels.",
    image: "/images/why-green/economy.png",
    width: 67,
    height: 67,
  },
  {
    title: "Application",
    description:
      "Residential applications, industrial, remote and transportation applications",
    image: "/images/why-green/application.png",
    width: 61,
    height: 61,
  },
  {
    title: "Independence",
    description:
      "Unaffected by the  failure of the conventional electrical grid",
    image: "/images/why-green/independence.png",
    width: 70,
    height: 65,
  },
  {
    title: "Efficiency",
    description:
      "Enhance energy security and lower risk of fuel spill, reduce the need for imported fuels",
    image: "/images/why-green/efficiency.png",
    width: 75,
    height: 73,
  },
] as const;

const SOLUTION_NODE_IDS = [
  "7077:4490",
  "7077:4498",
  "7077:4506",
  "7077:4494",
  "7077:4502",
  "7077:4510",
] as const;

export default function WhyGreen() {
  const { whyGreenData } = useWhyGreen();
  const parsedContent = whyGreenData
    ? parseWhyGreenContent(whyGreenData.content)
    : null;

  const companyName = parsedContent?.companyName || "GREEN Limited";
  const subtitle =
    parsedContent?.subtitle ||
    "A Sustainable Living and Frontrunner in Renewable Energy Solution Provider";
  const paragraphs = parsedContent?.paragraphs.length
    ? parsedContent.paragraphs.slice(0, 2)
    : FALLBACK_PARAGRAPHS;
  const envisionTitle =
    parsedContent?.envisionTitle || "Envision and Enlighten lives with";
  const solutionsTitle =
    parsedContent?.solutionsTitle || "GREEN’s Sustainable Energy Solutions";
  const solutions = FALLBACK_SOLUTIONS.map((fallback, index) => {
    const apiIcon = whyGreenData?.icons[index];
    return {
      ...fallback,
      title: apiIcon?.text || fallback.title,
      description: apiIcon?.description || fallback.description,
      image: apiIcon?.img.src || fallback.image,
    };
  });

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:4467">
      <img
        className={styles.heroImage}
        src="/images/why-green/mainImg.png"
        alt="Solar panels at sunrise"
        width="934"
        height="970"
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />

      <h1 className={styles.pageTitle} data-node-id="7077:4477">
        Why <strong>GREEN</strong>
      </h1>

      <div className={styles.watermark} data-node-id="7077:4515">
        <img
          src="/images/why-green/whygreen.png"
          alt=""
          width="61"
          height="481"
        />
      </div>

      <section
        className={styles.introduction}
        aria-labelledby="why-green-company"
      >
        <h2 id="why-green-company">{companyName}</h2>
        <p className={styles.subtitle}>–&nbsp; {subtitle}</p>
      </section>

      <div className={styles.bodyCopy} data-node-id="7077:4489">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section
        className={styles.solutions}
        aria-labelledby="why-green-solutions"
      >
        <h2 id="why-green-solutions">
          <span>{envisionTitle}</span>
          <strong>{solutionsTitle}</strong>
        </h2>

        <div className={styles.solutionsGrid}>
          {solutions.map((solution, index) => (
            <article
              className={styles.solution}
              key={solution.title}
              data-node-id={SOLUTION_NODE_IDS[index]}
            >
              <img
                src={solution.image}
                alt=""
                width={solution.width}
                height={solution.height}
              />
              <div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

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
    <main className={styles.mobilePage} data-node-id="7077:4467-mobile">
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileHero}>
        <img src="/images/why-green/mobileMainImg.png" alt="" />
        <h1>
          Why <strong>GREEN</strong>
        </h1>
      </div>
      <div className={styles.mobileContent}>
        <h2>{companyName}</h2>
        <p className={styles.mobileSubtitle}>– {subtitle}</p>
        <div className={styles.mobileBody}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <h2 className={styles.mobileSolutionsTitle}>
          <span>{envisionTitle}</span>
          <strong>{solutionsTitle}</strong>
        </h2>
        <div className={styles.mobileGrid}>
          {solutions.map((solution) => (
            <article key={solution.title}>
              <img
                src={solution.image}
                alt=""
                width={solution.width}
                height={solution.height}
              />
              <div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:4467" />
  );
}
