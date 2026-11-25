type BrandLockupProps = { href?: string; biSrc?: string };

export default function BrandLockup({ href = "/", biSrc = "/brand/flame-ark-new-logo.png" }: BrandLockupProps) {
  return (
    <a href={href} className="brand" aria-label="FLAME-ARK 홈">
      <img
        className="brand-bi"
        src={biSrc}
        alt=""
        width="1200"
        height="1200"
      />
      <span className="brand-ci-wrap">
        <img
          className="brand-ci"
          src="/brand/flame-ark-ci-transparent.png"
          alt=""
          width="2048"
          height="384"
        />
        <span className="brand-project-name">병원 특화 연합학습 기반 멀티모달 파운데이션 모델 구축 및 AI 솔루션 개발</span>
      </span>
    </a>
  );
}
