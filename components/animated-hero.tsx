"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;
    if (reducedMotion) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) {
        video.play().catch(() => { /* The poster remains visible when autoplay is unavailable. */ });
      } else {
        video.pause();
      }
    });
    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0) video.play().catch(() => {});
    };
    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reducedMotion, videoFailed]);

  return <section className="cinematic-hero" aria-labelledby="hero-title" data-paused={reducedMotion}>
    <div className="cinematic-scene" aria-hidden="true">
      <img className="cinematic-poster" src="/hero/research-campus.jpg" alt="" width="1920" height="1080" fetchPriority="high" />
      {!reducedMotion && !videoFailed && <video ref={videoRef} className="cinematic-video"
        autoPlay muted loop playsInline preload="metadata" poster="/hero/research-campus.jpg"
        onError={() => setVideoFailed(true)}>
        <source src="/hero/research-campus.mp4" type="video/mp4" />
      </video>}
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
