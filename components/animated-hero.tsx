"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (preference.matches) videoRef.current?.pause();
      else videoRef.current?.play().catch(() => {});
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return <section className="cinematic-hero cinematic-hero-video" aria-labelledby="hero-title">
    <div className="container cinematic-video-layout">
    <div className="cinematic-content">
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
    <div className="cinematic-motion-panel">
      <video ref={videoRef} className="cinematic-motion-video" muted loop playsInline preload="metadata"
        poster="/hero/corridor-journey-poster.png" aria-label="의료AI 연구공간을 따라 이동하는 영상"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source src="/hero/corridor-journey.mp4" type="video/mp4" />
      </video>
      <button className="cinematic-playback" type="button" onClick={togglePlayback}
        aria-label={playing ? "배경 영상 일시정지" : "배경 영상 재생"} title={playing ? "일시정지" : "재생"}>
        {playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6v12M16 6v12" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z" /></svg>}
      </button>
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
