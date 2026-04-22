"use client";

import { PropsWithChildren, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageAnimations({ children }: PropsWithChildren) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const heroShell = scope.current?.querySelector<HTMLElement>("[data-animate='hero-shell']");
        const heroCopyItems = scope.current?.querySelectorAll<HTMLElement>("[data-animate='hero-copy'] > *");
        const heroImage = scope.current?.querySelector<HTMLElement>("[data-animate='hero-image']");

        if (heroShell) {
          const heroTimeline = gsap.timeline({
            defaults: {
              duration: 0.9,
              ease: "power3.out",
            },
          });

          heroTimeline.from(heroShell, {
            opacity: 0,
            y: 36,
            scale: 0.985,
          });

          if (heroCopyItems?.length) {
            heroTimeline.from(
              heroCopyItems,
              {
                opacity: 0,
                y: 28,
                stagger: 0.12,
              },
              "-=0.45",
            );
          }

          if (heroImage) {
            heroTimeline.from(
              heroImage,
              {
                opacity: 0,
                x: 36,
                scale: 0.97,
              },
              "-=0.78",
            );
          }
        }

        const groupedSections = gsap.utils.toArray<HTMLElement>("[data-animate-group]");
        groupedSections.forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-animate='item']");
          if (!items.length) return;

          gsap.from(items, {
            opacity: 0,
            y: 32,
            stagger: 0.12,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
            },
          });
        });

        const revealBlocks = gsap.utils.toArray<HTMLElement>("[data-animate='reveal']");
        revealBlocks.forEach((block) => {
          gsap.from(block, {
            opacity: 0,
            y: 34,
            duration: 0.95,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 82%",
            },
          });
        });

        const mediaBlocks = gsap.utils.toArray<HTMLElement>("[data-animate='media']");
        mediaBlocks.forEach((block) => {
          gsap.from(block, {
            opacity: 0,
            scale: 0.97,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 84%",
            },
          });
        });

        const parallaxMedia = gsap.utils.toArray<HTMLElement>("[data-animate='parallax']");
        parallaxMedia.forEach((mediaBlock) => {
          gsap.to(mediaBlock, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: mediaBlock,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });
      });

      return () => media.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
