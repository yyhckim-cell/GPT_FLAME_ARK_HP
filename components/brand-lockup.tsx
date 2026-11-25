import { projectName } from "./site-navigation";

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
        <span className="brand-project-name">{projectName}</span>
        <span className="brand-wordmark-frame"><img
          className="brand-ci"
          src="/brand/flame-ark-ci-transparent.png"
          alt=""
          width="2048"
          height="384"
        /></span>
      </span>
    </a>
  );
}
