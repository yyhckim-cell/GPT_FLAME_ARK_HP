import BrandLockup from "./brand-lockup";
import BrandIdentityDialog from "./brand-identity-dialog";
import BrandIdentityContent from "./brand-identity-content";

export default function SiteFooter() {
  return <footer id="contact" className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-identity"><BrandLockup /></div>
        <div className="footer-project-period"><span>연구개발 기간</span><strong>2025. 04 ~ 2029. 12</strong><p>의료기관과 연구진이 함께 만드는 의료AI</p></div>
      </div>
      <div className="footer-utilities">
        <div className="footer-utility-links">
          <a href="https://www.samsunghospital.com/" target="_blank" rel="noopener noreferrer">총괄기관: 삼성서울병원<span className="sr-only"> (새 창)</span></a>
          <a href="/partners">참여기관 보기</a>
          <a href="/research">연구자 전용</a>
          <BrandIdentityDialog><BrandIdentityContent /></BrandIdentityDialog>
        </div>
<nav className="footer-related-links" aria-label="유관사이트 바로가기">
        <span>유관사이트</span>
        <a href="https://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer">보건복지부<span className="sr-only"> (새 창)</span></a>
        <a href="https://www.khidi.or.kr/kps" target="_blank" rel="noopener noreferrer">한국보건산업진흥원<span className="sr-only"> (새 창)</span></a>
        <a href="https://www.htdream.kr/" target="_blank" rel="noopener noreferrer">HTdream<span className="sr-only"> (새 창)</span></a>
      </nav>
      </div>

      <p className="footer-copyright">© FLAME-ARK Research Project. All rights reserved.</p>
    </div>
  </footer>;
}
