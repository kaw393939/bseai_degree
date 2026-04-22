"use client";

/**
 * Shared presentation navigation helpers.
 * Used by the progress rail, keyboard shortcuts, and command palette
 * so every entry point jumps to a slide the same way.
 */

export function getSlideSections(): HTMLElement[] {
  if (typeof document === "undefined") return [];
  return Array.from(
    document.querySelectorAll<HTMLElement>("[data-presentation-slide='true']")
  );
}

export function goToSlide(oneBasedIndex: number): void {
  const sections = getSlideSections();
  if (sections.length === 0) return;
  const clamped = Math.min(Math.max(oneBasedIndex, 1), sections.length);
  const target = sections[clamped - 1];
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function getActiveSlideIndex(): number {
  const sections = getSlideSections();
  if (sections.length === 0) return 1;
  const viewportHeight = window.innerHeight;
  let best = 0;
  for (let i = 1; i < sections.length; i += 1) {
    const top = sections[i].getBoundingClientRect().top;
    if (top <= viewportHeight / 2) {
      best = i;
    }
  }
  return best + 1;
}

export function nextSlide(): void {
  goToSlide(getActiveSlideIndex() + 1);
}

export function prevSlide(): void {
  goToSlide(getActiveSlideIndex() - 1);
}

export function firstSlide(): void {
  goToSlide(1);
}

export function lastSlide(): void {
  const sections = getSlideSections();
  goToSlide(sections.length);
}
