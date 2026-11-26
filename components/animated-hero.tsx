export default function AnimatedHero() {
  return <section className="cinematic-hero cinematic-hero-stills" aria-labelledby="hero-title">
    <div className="container cinematic-stills-layout">
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
    <div className="cinematic-stills-sequence" aria-label="의료AI 연구공간 둘러보기">
      {[
        "의료데이터를 분석하는 연구진과 연구공간",
        "유리벽을 따라 이어지는 연구 복도",
        "협업 연구실로 이어지는 복도 안쪽",
        "의료AI 연구 사무실과 회의 공간",
      ].map((description, index) => <img key={index} src={`/hero/corridor-scene-${index}.png`}
        alt={description} width="1672" height="941" loading={index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"} decoding="async" />)}
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
