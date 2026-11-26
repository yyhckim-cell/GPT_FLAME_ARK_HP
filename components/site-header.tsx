import FloatingNavigation from "./floating-navigation";
import BrandLockup from "./brand-lockup";
import { siteNavigation } from "./site-navigation";

export default function SiteHeader({ currentPath = "/", home = false }: { currentPath?: string; home?: boolean }) {
  return <><header className="site-header">
    <div className="container header-inner">
      <BrandLockup href={home ? "#top" : "/"}
        biSrc={home ? "/brand/flame-ark-home-header-bi.png" : undefined} />
      <nav className="desktop-nav" aria-label="주 메뉴">
        {siteNavigation.map(({ label, href }) =>
          <a key={href} href={href} aria-current={href === currentPath ? "page" : undefined}>{label}</a>)}
      </nav>
      <a className="header-contact" href="/research">연구자 전용</a>
      <details className="mobile-menu">
        <summary aria-label="메뉴 열기"><i /><i /><i /></summary>
        <nav aria-label="전체 메뉴">
          <a href="/">메인 화면</a>
          {siteNavigation.map(({ label, href }) =>
            <a key={href} href={href} aria-current={href === currentPath ? "page" : undefined}>{label}</a>)}
          <a href="/research">연구자 전용</a>
        </nav>
      </details>
    </div>
  </header><FloatingNavigation /></>;
}
