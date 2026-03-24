"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";

type GalleryShowcaseProps = {
  tags: string[];
  items: GalleryItem[];
};

export function GalleryShowcase({ tags, items }: GalleryShowcaseProps) {
  const [activeTag, setActiveTag] = useState("Todas");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleItems = useMemo(
    () =>
      activeTag === "Todas"
        ? items
        : items.filter((item) => item.tag === activeTag),
    [activeTag, items],
  );

  const activeItem = activeIndex === null ? null : visibleItems[activeIndex];

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setActiveTag(tag);
              setActiveIndex(null);
            }}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${
              activeTag === tag
                ? "border-[var(--color-gold)] bg-[rgba(214,214,219,0.16)] text-[var(--color-ivory)]"
                : "border-white/10 bg-white/5 text-[var(--color-mist)] hover:border-[var(--color-border)] hover:text-[var(--color-ivory)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-5 md:columns-2 xl:columns-3">
        {visibleItems.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative mb-5 block w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-black text-left break-inside-avoid"
          >
            <div className={`relative ${item.height}`}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                unoptimized
                className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">
                  {item.tag}
                </p>
                <p className="font-display text-3xl text-[var(--color-ivory)]">{item.title}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white"
            aria-label="Cerrar visor"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((value) => (value === null ? 0 : (value - 1 + visibleItems.length) % visibleItems.length))}
            className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white md:left-8"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[#101014]">
            <div className="relative h-[70vh] min-h-[24rem]">
              <Image src={activeItem.image} alt={activeItem.alt} fill unoptimized className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="eyebrow">{activeItem.tag}</p>
                <h3 className="font-display text-4xl text-[var(--color-ivory)] sm:text-5xl">
                  {activeItem.title}
                </h3>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveIndex((value) => (value === null ? 0 : (value + 1) % visibleItems.length))}
            className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white md:right-8"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      ) : null}
    </>
  );
}
