import BrandLockup from "./brand-lockup";
import BrandIdentityDialog from "./brand-identity-dialog";
import BrandIdentityContent from "./brand-identity-content";
import { projectName } from "./site-navigation";

export default function SiteFooter() {
  return <footer id="contact" className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-identity"><BrandLockup /><p>{projectName}</p></div>
        <div className="footer-project-period"><span>연구개발 기간</span><strong>2025. 04 — 2029. 12</strong><p>의료기관과 연구진이 함께 만드는 의료AI</p></div>
      </div>
      <div className="footer-utilities">
        <div className="footer-utility-links">
          <a href="/#partners">참여기관 보기</a>
          <a href="/research">연구자 전용</a>
          <BrandIdentityDialog><BrandIdentityContent /></BrandIdentityDialog>
        </div>
        <a className="footer-top" href="#top">맨 위로</a>
      </div>
      <p className="footer-copyright">© FLAME-ARK Research Project. All rights reserved.</p>
    </div>
  </footer>;
}
