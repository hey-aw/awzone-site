"use client";

import { type KeyboardEvent, type ReactNode, useRef } from "react";

type ProjectKeyboardNavigationProps = {
  children: ReactNode;
};

export function ProjectKeyboardNavigation({ children }: ProjectKeyboardNavigationProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  function moveTopicFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    const topicLinks = Array.from(
      regionRef.current?.querySelectorAll<HTMLAnchorElement>("[data-topic-link]") ?? [],
    );
    if (!topicLinks.length) return;

    const activeElement = document.activeElement;
    const activeTopicLink =
      activeElement instanceof HTMLAnchorElement && activeElement.matches("[data-topic-link]")
        ? activeElement
        : null;
    if (!activeTopicLink) return;

    const currentIndex = topicLinks.indexOf(activeTopicLink);
    let nextIndex = currentIndex;

    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = topicLinks.length - 1;
    if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % topicLinks.length;
    if (event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + topicLinks.length) % topicLinks.length;
    }

    event.preventDefault();
    topicLinks[nextIndex]?.focus();
  }

  return (
    <div className="project-keyboard-region" onKeyDown={moveTopicFocus} ref={regionRef}>
      {children}
    </div>
  );
}
