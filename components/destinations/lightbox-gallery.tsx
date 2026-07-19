"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export function LightboxGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((image, i) => (
          <button
            key={image}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="relative h-36 overflow-hidden rounded-lg md:h-44"
            aria-label={`Open image ${i + 1}`}
          >
            <Image src={image} alt={`${title} ${i + 1}`} fill className="object-cover transition-transform hover:scale-105" />
          </button>
        ))}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} index={index} slides={images.map((src) => ({ src }))} />
    </>
  );
}
