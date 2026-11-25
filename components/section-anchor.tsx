"use client";

import { useEffect } from "react";

export default function SectionAnchor() {
  useEffect(() => {
    let frame = 0;
    const scrollToSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const id = window.location.hash.slice(1);
        if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
      });
    };
    scrollToSection();
    window.addEventListener("hashchange", scrollToSection);
    window.addEventListener("load", scrollToSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToSection);
      window.removeEventListener("load", scrollToSection);
    };
  }, []);
  return null;
}
