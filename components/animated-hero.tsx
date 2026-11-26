"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedHero() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const image = imageRef.current;
    let frame = 0;
    let current = 0;
    let target = 0;
    const paint = () => {
      frame = 0;
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.00015) current = target;
      if (image) image.style.transform = `scale(${1 + current * 0.48})`;
      if (current !== target) frame = requestAnimationFrame(paint);
    };
    const update = () => {
      setReducedMotion(preference.matches);
      const distance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      target = preference.matches ? 0 : Math.min(1, Math.max(0, scrollY / distance));
      if (preference.matches) current = 0;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    preference.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      preference.removeEventListener("change", update);
    };
  }, []);

  return <section className="cinematic-hero" aria-labelledby="hero-title" data-paused={reducedMotion}>
    <div className="cinematic-scene" aria-hidden="true">
      <img ref={imageRef} className="cinematic-poster" src="/hero/main-federated.jpg" alt="" width="1672" height="941" fetchPriority="high" />
      <div className="cinematic-glow" />
      <div className="cinematic-wash" />
    </div>
    <div className="container cinematic-content">
      <p className="cinematic-eyebrow">FLAME-ARK · MEDICAL AI RESEARCH</p>
      <h1 id="hero-title">병원을 연결하고,<br /><span>의료AI를 발전시키다.</span></h1>
      <p className="cinematic-description">의료데이터의 가치를 연결하는 병원 특화 연합학습.<br className="cinematic-desktop-break" />
        멀티모달 파운데이션 모델부터 의료현장의 AI 솔루션까지,<br className="cinematic-desktop-break" />
        FLAME-ARK가 함께 연구하고 검증합니다.</p>
      <div className="cinematic-actions">
        <a className="cinematic-primary" href="/project">프로젝트 살펴보기</a>
        <a className="cinematic-secondary" href="/technology">핵심 연구기술</a>
      </div>
    </div>
    <div className="container cinematic-footer">
      <p>FEDERATED LEARNING <span>·</span> CONNECTED MEDICAL INTELLIGENCE</p>
      <div className="cinematic-footer-actions">
        <a href="#home-explore-title">FLAME-ARK 주요 내용</a>

      </div>
    </div>
  </section>;
}
