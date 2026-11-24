"use client";

import { useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";

const connections = [
  { x: 18, y: 28 },
  { x: 40, y: 28 },
  { x: 11, y: 53 },
  { x: 47, y: 53 },
];

export default function AnimatedHero() {
  const [paused, setPaused] = useState(false);
  return <div className="hero-motion" data-paused={paused}>
    <img className="hero-graphic-image" src="/flame-ark-hero-hd.png"
      alt="FLAME-ARK 병원 특화 연합학습 기반 멀티모달 의료AI 연구개발 소개 이미지"
      width="1672" height="941" fetchPriority="high" />
    <div className="hero-network-light" aria-hidden="true">
      {connections.map((point, index) => <span key={index}
        className="hero-data-flow"
        style={{
          "--start-x": point.x + "%",
          "--start-y": point.y + "%",
          "--delay": index * -1.4 + "s",
        } as CSSProperties} />)}
      <span className="hero-model-pulse" />
      <span className="hero-model-halo" />
    </div>
    <button type="button" className="hero-motion-control"
      onClick={() => setPaused(!paused)} aria-pressed={paused}
      aria-label={paused ? "배너 애니메이션 재생" : "배너 애니메이션 정지"}>
      {paused ? <Play size={15} /> : <Pause size={15} />}
      <span>{paused ? "움직임 재생" : "움직임 정지"}</span>
    </button>
  </div>;
}
