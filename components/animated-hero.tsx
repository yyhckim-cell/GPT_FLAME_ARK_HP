"use client";
import { useEffect, useRef } from "react";

export default function AnimatedHero() {
  const stripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      const distance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const progress = preference.matches ? 0 : Math.min(1, Math.max(0, scrollY / distance));
      if (stripRef.current) stripRef.current.style.transform = `translate3d(0,${-progress * innerHeight * 3}px,0)`;
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(paint); };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    preference.addEventListener("change", update);
    return () => { cancelAnimationFrame(frame);removeEventListener("scroll", update);removeEventListener("resize", update);preference.removeEventListener("change", update); };
  }, []);
  return <section className="cinematic-hero cinematic-hero-background" aria-labelledby="hero-title">
    <div className="cinematic-scene cinematic-full-background" aria-hidden="true">
      <div className="cinematic-background-strip" ref={stripRef}>
        {[0,1,2,3].map(index => <div className="cinematic-background-frame" key={index}>
          <img src={`/hero/corridor-scene-${index}.png`} alt="" width="1672" height="941"
            fetchPriority={index === 0 ? "high" : "auto"} decoding="async" />
        </div>)}
      </div>
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
