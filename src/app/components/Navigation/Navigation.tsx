"use client";
import { useEffect, useState } from "react";
import type { NavigationItem, NavigationText } from "../../hooks/useNavigation";

interface Props {
  onClose: () => void;
  navigationData: NavigationItem[];
  activeSection: NavigationItem | null;
  setActiveSection: (section: NavigationItem) => void;
  featuredChild: {
    image?: { src: string; alt: string };
    text?: NavigationText;
  } | null;
  currentPath?: string;
}

const Navigation = ({
  onClose,
  navigationData,
  activeSection,
  setActiveSection,
  featuredChild,
  currentPath,
}: Props) => {
  const [selectedParent, setSelectedParent] = useState<NavigationItem | null>(
    null,
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const getHighlightedText = (text: NavigationText) => {
    const { description, highlighted } = text;

    if (!highlighted) {
      return <span className="text-gray-700 capitalize">{description}</span>;
    }

    const highlightWords = highlighted
      .split(/[\s,]+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    if (highlightWords.length === 0) {
      return <span className="text-gray-700 capitalize">{description}</span>;
    }

    const escapedWords = highlightWords.map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, (match) => `\\${match}`),
    );
    const regex = new RegExp(`\\b(${escapedWords.join("|")})\\b`, "gi");
    const parts = description.split(regex);
    const partOccurrences = new Map<string, number>();

    return (
      <>
        {parts.map((part) => {
          if (!part) return null;
          const occurrence = (partOccurrences.get(part) ?? 0) + 1;
          partOccurrences.set(part, occurrence);
          const key = `${part}-${occurrence}`;
          const isHighlighted = highlightWords.some(
            (word) => part.toLowerCase() === word.toLowerCase(),
          );
          return isHighlighted ? (
            <span
              key={key}
              className="text-[#23B14D] font-semibold not-italic capitalize"
            >
              {part}
            </span>
          ) : (
            <span key={key} className="text-gray-700 capitalize">
              {part}
            </span>
          );
        })}
      </>
    );
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      setSelectedParent(item);
    }
  };
  const renderMainNavigationItems = (items: NavigationItem[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isSelected = selectedParent?.id === item.id;
      const isCurrentPath = currentPath === item.slug;

      return (
        <li key={item.id}>
          {hasChildren ? (
            <div
              className={`font-semibold flex justify-between items-center text-sm lg:text-lg capitalize ${
                isSelected || isCurrentPath ? "text-[#23B14D]" : "text-gray-800"
              }`}
            >
              {item.slug ? (
                <a
                  href={item.slug}
                  className="flex-1 cursor-pointer hover:text-[#23B14D]"
                >
                  {item.name}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className="flex-1 cursor-pointer bg-transparent p-0 text-left hover:text-[#23B14D]"
                >
                  {item.name}
                </button>
              )}
              <button
                type="button"
                aria-label={`Show ${item.name} items`}
                onClick={() => handleItemClick(item)}
                className="ml-2 cursor-pointer hover:text-[#23B14D]"
              >
                ›
              </button>
            </div>
          ) : (
            <a
              href={item.slug}
              className={`font-semibold block text-sm lg:text-lg hover:text-[#23B14D] capitalize ${
                isCurrentPath ? "text-[#23B14D]" : "text-gray-800"
              }`}
            >
              {item.name}
            </a>
          )}
        </li>
      );
    });
  };

  const renderSubNavigationItems = () => {
    if (!selectedParent || !selectedParent.children) return null;

    return selectedParent.children.map((item) => {
      const isCurrentPath = currentPath === item.slug;

      return (
        <li key={item.id}>
          <a
            href={item.slug}
            className={`block font-semibold text-sm lg:text-base hover:text-[#23B14D] capitalize ${
              isCurrentPath ? "text-[#23B14D]" : "text-gray-800"
            }`}
          >
            {item.name}
          </a>
        </li>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0 bg-white lg:max-w-[60vw] lg:left-[40vw]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 md:top-6 md:right-6 text-3xl md:text-4xl text-gray-800 hover:text-black z-10 font-light"
          aria-label="Close navigation"
        >
          ✕
        </button>

        {/* Mobile Layout */}
        <div className="md:hidden h-full relative pb-32">
          <div className="flex-1 flex">
            {/* Left Column - Sub Navigation Items and Image */}
            <div className="flex-1 p-4 pt-16 overflow-y-auto">
              <div className="border-r-2 border-[#23B14D] pr-4 mb-6">
                {selectedParent ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedParent(null)}
                      className="mb-3 flex items-center gap-1 text-sm font-semibold text-[#23B14D] cursor-pointer"
                    >
                      ‹ Back
                    </button>
                    <ul className="space-y-3 text-base">
                      {renderSubNavigationItems()}
                    </ul>
                  </>
                ) : activeSection?.children &&
                  activeSection.children.length > 0 ? (
                  <ul className="space-y-3 text-base">
                    {renderMainNavigationItems(activeSection.children)}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    Select an item to view details
                  </p>
                )}
              </div>

              {/* Mobile Image */}
              {featuredChild?.image && (
                <div className="mb-6">
                  <div className="w-full mx-auto">
                    <img
                      src={featuredChild.image.src}
                      alt={featuredChild.image.alt}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Quote */}
              <div className="">
                <blockquote className="text-sm italic text-gray-700 leading-relaxed text-center">
                  {featuredChild?.text ? (
                    <>"{getHighlightedText(featuredChild.text)}"</>
                  ) : (
                    <span className="text-gray-700">
                      "Explore our comprehensive solutions and services"
                    </span>
                  )}
                </blockquote>
              </div>
            </div>

            {/* Right Column - Main Navigation */}
            <div className="w-32 flex flex-col">
              <div className="flex-1 p-4 pt-16 overflow-y-auto">
                <nav className="space-y-6">
                  {[...navigationData]
                    .sort((a, b) => a.id - b.id)
                    .map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section);
                          setSelectedParent(null);
                        }}
                        type="button"
                        className={`block text-left text-sm cursor-pointer font-bold w-full ${
                          activeSection?.id === section.id
                            ? "text-[#23B14D]"
                            : "text-gray-800 hover:text-[#23B14D]"
                        }`}
                      >
                        {section.name}
                      </button>
                    ))}
                </nav>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="absolute flex flex-col space-y-8 right-0 bottom-4">
            <button type="button" className="cursor-pointer">
              <img
                src="/images/nav/enquiry.png"
                alt="enquiryBtn"
                className="h-10"
              />
            </button>
            <button type="button" className="cursor-pointer">
              <img
                src="/images/nav/contact.png"
                alt="contactBtn"
                className="h-10"
              />
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="h-full hidden md:flex">
          {/* Left section - Sub-items and Image */}
          <div className="flex-1 p-12 flex flex-col overflow-y-auto overflow-x-hidden">
            <div className="flex gap-6 mb-8">
              {/* Left side - Image */}
              <div className="w-56 shrink-0">
                {/* Image with green vertical line */}
                {featuredChild?.image && (
                  <div className="w-full h-44 relative mb-10">
                    <img
                      src={featuredChild.image.src}
                      alt={featuredChild.image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -right-3 top-0 w-1 h-full bg-[#23B14D]"></div>
                  </div>
                )}

                {/* Sub-items below image */}
                {selectedParent?.children && (
                  <div className="ml-0">
                    <ul className="space-y-4 text-base lg:text-lg">
                      {renderSubNavigationItems()}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right side - Main menu items */}
              <div className="flex-1 min-w-0 pt-2">
                <ul className="space-y-5 text-base lg:text-lg">
                  {activeSection &&
                    renderMainNavigationItems(activeSection.children || [])}
                </ul>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-auto pt-6">
              <blockquote className="text-2xl 2xl:text-3xl italic text-gray-700 leading-relaxed">
                {featuredChild?.text ? (
                  <>"{getHighlightedText(featuredChild.text)}"</>
                ) : (
                  <span className="text-gray-700">
                    "Explore our comprehensive solutions and services"
                  </span>
                )}
              </blockquote>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="relative">
            <div className="absolute top-16 bottom-32 w-px bg-gray-400"></div>
          </div>

          {/* Right section - Top-level navigation */}
          <div className="w-60 2xl:w-72 shrink-0 flex flex-col">
            <div className="flex-1 p-10 2xl:p-16 pb-8">
              <nav className="space-y-10 pt-8">
                {[...navigationData]
                  .sort((a, b) => a.id - b.id)
                  .map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section);
                        setSelectedParent(null); // Reset selected parent when changing section
                      }}
                      type="button"
                      className={`block text-left text-xl cursor-pointer font-bold ${
                        activeSection?.id === section.id
                          ? "text-[#23B14D]"
                          : "text-gray-800 hover:text-[#23B14D]"
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
              </nav>
            </div>

            {/* Desktop Action buttons */}
            <div className="px-10 2xl:px-16 pb-12 flex flex-col gap-4 items-end">
              <button type="button">
                <img
                  src="/images/nav/enquiry.png"
                  alt="enquiryBtn"
                  className="h-12 w-auto"
                />
              </button>
              <button type="button">
                <img
                  src="/images/nav/contact.png"
                  alt="contactBtn"
                  className="h-12 w-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
