import BrandLockup from "./brand-lockup";
import BrandIdentityDialog from "./brand-identity-dialog";
import BrandIdentityContent from "./brand-identity-content";
import { projectName, siteNavigation } from "./site-navigation";

export default function SiteFooter() {
  return <footer id="contact" className="footer">
    <div className="container">
      <div className="footer-main">
        <div><BrandLockup /><p>{projectName}</p></div>
        <div className="footer-detail">
          <span>PROJECT PERIOD</span><strong>2025. 04. 01 - 2029. 12. 31</strong>
          <span>CONTACT</span><strong>문의처 확인 후 등록 예정</strong>
        </div>
      </div>
      <nav className="footer-navigation" aria-label="하단 메뉴">
        {siteNavigation.map(({ label, href }) => <a key={href} href={href}>{label === "참여기관" ? "참여기관 보기" : label}</a>)}
      </nav>
      <div className="footer-bottom">
        <span>© FLAME-ARK Research Project. All rights reserved.</span>
        <BrandIdentityDialog><BrandIdentityContent /></BrandIdentityDialog>
        <a href="/research">연구자 전용</a>
        <a href="#top">맨 위로</a>
      </div>
    </div>
  </footer>;
}
