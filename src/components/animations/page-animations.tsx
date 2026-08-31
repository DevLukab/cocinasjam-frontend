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
        const shouldAnimateOnLoad = (element: HTMLElement, viewportRatio = 0.94) => {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight * viewportRatio;
        };

        const heroShell = scope.current?.querySelector<HTMLElement>("[data-animate='hero-shell']");
        const heroCopyItems = scope.current?.querySelectorAll<HTMLElement>("[data-animate='hero-copy'] > *");
        const heroImage = scope.current?.querySelector<HTMLElement>("[data-animate='hero-video']");

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

          const animationConfig = {
            opacity: 0,
            y: 32,
            stagger: 0.12,
            duration: 0.85,
            ease: "power2.out",
          } as const;

          if (shouldAnimateOnLoad(group)) {
            gsap.from(items, {
              ...animationConfig,
              delay: 0.12,
            });
            return;
          }

          gsap.from(items, {
            ...animationConfig,
            scrollTrigger: {
              trigger: group,
              start: "top 88%",
            },
          });
        });

        const revealBlocks = gsap.utils.toArray<HTMLElement>("[data-animate='reveal']");
        revealBlocks.forEach((block) => {
          const animationConfig = {
            opacity: 0,
            y: 34,
            duration: 0.95,
            ease: "power2.out",
          } as const;

          if (shouldAnimateOnLoad(block)) {
            gsap.from(block, {
              ...animationConfig,
              delay: 0.14,
            });
            return;
          }

          gsap.from(block, {
            ...animationConfig,
            scrollTrigger: {
              trigger: block,
              start: "top 90%",
            },
          });
        });

        const mediaBlocks = gsap.utils.toArray<HTMLElement>("[data-animate='media']");
        mediaBlocks.forEach((block) => {
          const animationConfig = {
            opacity: 0,
            scale: 0.97,
            duration: 1,
            ease: "power2.out",
          } as const;

          if (shouldAnimateOnLoad(block)) {
            gsap.from(block, {
              ...animationConfig,
              delay: 0.16,
            });
            return;
          }

          gsap.from(block, {
            ...animationConfig,
            scrollTrigger: {
              trigger: block,
              start: "top 92%",
            },
          });
        });

      });

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const heroSection = scope.current?.querySelector<HTMLElement>("section.luxury-shell");
          const videoWrap = scope.current?.querySelector<HTMLElement>("[data-animate='hero-video']");
          const video = videoWrap?.querySelector<HTMLVideoElement>("[data-hero-video]");
          const overlay = videoWrap?.querySelector<HTMLElement>("[data-hero-video-overlay]");
          const caption = videoWrap?.querySelector<HTMLElement>("[data-hero-video-caption]");
          const heroCopy = scope.current?.querySelector<HTMLElement>("[data-animate='hero-copy']");

          if (!heroSection || !videoWrap) return;

          const revealTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "+=90%",
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          });

          revealTimeline.to(
            videoWrap,
            {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
              borderWidth: 0,
              zIndex: 40,
            },
            0,
          );

          if (overlay) revealTimeline.to(overlay, { backgroundColor: "rgba(0,0,0,0.5)" }, 0);
          if (caption) revealTimeline.to(caption, { opacity: 0, y: 24 }, 0);
          if (heroCopy) revealTimeline.to(heroCopy, { yPercent: -18, opacity: 0 }, 0);

          const refresh = () => ScrollTrigger.refresh();
          video?.addEventListener("loadedmetadata", refresh, { once: true });

          return () => {
            video?.removeEventListener("loadedmetadata", refresh);
          };
        },
      );

      return () => media.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
