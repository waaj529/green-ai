"use client";

import { useOurStory } from "../../../hooks/useOurStory";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./OurStory.module.css";

const FALLBACK_DESCRIPTION =
  "GREEN Limited renewable energy solutions and services are predominantly targeted at rural areas that lack access to conventional energy sources and utilities. Our products and services are primarily designed to empower rural communities for economic and social growth, thereby improving their quality of life in a sustainable and healthful manner. Our delivery of solutions, products, and services ensures environmental value addition.";

type Milestone = {
  tagImg: string;
  tagStyle: React.CSSProperties;
  textImg: string;
  textStyle: React.CSSProperties;
  dotStyle: React.CSSProperties;
  bubbleImg: string;
  bubbleStyle: React.CSSProperties;
};

const MILESTONES: Milestone[] = [
  {
    tagImg: "/images/our-story/tag2007.png",
    tagStyle: { top: 354, left: 1324, width: 56, height: 19 },
    textImg: "/images/our-story/mile2007.png",
    textStyle: { top: 353, left: 1328, width: 333, height: 40 },
    dotStyle: { top: 357, left: 1315 },
    bubbleImg: "/images/our-story/bubble0.png",
    bubbleStyle: { top: 369, left: 1291, width: 616, height: 51 },
  },
  {
    tagImg: "/images/our-story/tag2010.png",
    tagStyle: { top: 410, left: 1233, width: 56, height: 19 },
    textImg: "/images/our-story/mile2010.png",
    textStyle: { top: 408, left: 740, width: 493, height: 71 },
    dotStyle: { top: 412, left: 1288 },
    bubbleImg: "/images/our-story/bubble6.png",
    bubbleStyle: { top: 429, left: 760, width: 524, height: 57 },
  },
  {
    tagImg: "/images/our-story/tag2011.png",
    tagStyle: { top: 494, left: 1255, width: 56, height: 19 },
    textImg: "/images/our-story/mile2011.png",
    textStyle: { top: 492, left: 1249, width: 457, height: 54 },
    dotStyle: { top: 497, left: 1246 },
    bubbleImg: "/images/our-story/bubble1.png",
    bubbleStyle: { top: 513, left: 1231, width: 498, height: 43 },
  },
  {
    tagImg: "/images/our-story/tag2012.png",
    tagStyle: { top: 553, left: 1164, width: 56, height: 19 },
    textImg: "/images/our-story/mile2012.png",
    textStyle: { top: 552, left: 668, width: 495, height: 53 },
    dotStyle: { top: 556, left: 1218 },
    bubbleImg: "/images/our-story/bubble4.png",
    bubbleStyle: { top: 573, left: 686, width: 528, height: 43 },
  },
  {
    tagImg: "/images/our-story/tag2020.png",
    tagStyle: { top: 631, left: 1188, width: 56, height: 19 },
    textImg: "/images/our-story/mile2020.png",
    textStyle: { top: 629, left: 1180, width: 648, height: 52 },
    dotStyle: { top: 629, left: 1182 },
    bubbleImg: "/images/our-story/bubble7.png",
    bubbleStyle: { top: 650, left: 1164, width: 688, height: 43 },
  },
  {
    tagImg: "/images/our-story/tag2023.png",
    tagStyle: { top: 703, left: 1091, width: 56, height: 19 },
    textImg: "/images/our-story/mile2023.png",
    textStyle: { top: 701, left: 527, width: 364, height: 54 },
    dotStyle: { top: 706, left: 1146 },
    bubbleImg: "/images/our-story/bubble3.png",
    bubbleStyle: { top: 722, left: 754, width: 388, height: 43 },
  },
  {
    tagImg: "/images/our-story/tag2024.png",
    tagStyle: { top: 779, left: 1118, width: 56, height: 19 },
    textImg: "/images/our-story/mile2024.png",
    textStyle: { top: 778, left: 1111, width: 615, height: 49 },
    dotStyle: { top: 782, left: 1066 },
    bubbleImg: "/images/our-story/bubble2.png",
    bubbleStyle: { top: 798, left: 1092, width: 658, height: 43 },
  },
  {
    tagImg: "/images/our-story/tag2025.png",
    tagStyle: { top: 861, left: 1013, width: 56, height: 19 },
    textImg: "/images/our-story/mile2025.png",
    textStyle: { top: 861, left: 460, width: 571, height: 75 },
    dotStyle: { top: 866, left: 1108 },
    bubbleImg: "/images/our-story/bubble5.png",
    bubbleStyle: { top: 882, left: 455, width: 608, height: 68 },
  },
];

export default function OurStory() {
  const { ourStoryData } = useOurStory();
  const storyTitle = ourStoryData?.title || "Our Story";
  const description = ourStoryData?.description || FALLBACK_DESCRIPTION;
  const milestoneTitle = ourStoryData?.ourMilestone?.title || "Our Milestones";

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6923">
      <SiteHeader layout="figmaCanvas" highlightActive={false} />

      <img
        className={styles.collage}
        src="/images/our-story/collage.png"
        alt=""
      />

      <img
        className={styles.pageTitleImg}
        src="/images/our-story/title_h1.png"
        alt="Our Story & Milestone"
      />

      <img
        className={styles.watermark}
        src="/images/our-story/mile_vert.png"
        alt=""
      />

      <section className={styles.storyCopy}>
        <h2>{storyTitle}</h2>
        <p>{description}</p>
      </section>

      <section className={styles.milestones}>
        <h2 className={styles.milestonesTitle}>{milestoneTitle}</h2>
        <img
          className={styles.timelineLine}
          src="/images/our-story/timeline_line.png"
          alt=""
        />
        {MILESTONES.map((m, i) => (
          <div key={i}>
            <img className={styles.bubble} src={m.bubbleImg} alt="" style={m.bubbleStyle} />
            <img className={styles.dot} src="/images/our-story/dot.png" alt="" style={m.dotStyle} />
            <img className={styles.tag} src={m.tagImg} alt="" style={m.tagStyle} />
            <img className={styles.milestoneImg} src={m.textImg} alt="" style={m.textStyle} />
          </div>
        ))}
        <a className={styles.readMore} href="#read-more">
          <span>Read more</span>
          <img
            className={styles.readMoreArrow}
            src="/images/our-story/readmore_arrow.png"
            alt=""
          />
        </a>
      </section>

      <D6Chatbot
        canvasAnchored figmaPlaceholder="Let\'s Talk Energy"
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let’s Talk Energy"
        triggerClassName={styles.chatTrigger}
      />
    </main>
  );

  const mobile = (
    <main className={styles.mobilePage}>
      <SiteHeader panel="logoOnly" />
      <img
        className={styles.mobileArtwork}
        src="/images/our-story/mainImg.png"
        alt=""
      />
      <div className={styles.mobileContent}>
        <h1>
          Our Story &amp; <span>Milestone</span>
        </h1>
        <section>
          <h2>{storyTitle}</h2>
          <p>{description}</p>
        </section>
        <section>
          <h2>{milestoneTitle}</h2>
          <img
            src={
              ourStoryData?.ourMilestone?.maps?.secondaryImg ||
              "/images/our-story/ourstory2.png"
            }
            alt="Map of GREEN milestones across Papua New Guinea"
          />
        </section>
      </div>
      <D6Chatbot figmaPlaceholder="Let’s Talk Energy" />
    </main>
  );

  return <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:6923" />;
}
