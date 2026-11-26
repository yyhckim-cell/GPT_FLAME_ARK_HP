import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PartnerDirectory from "@/components/partner-directory";
import { sortedPartners } from "@/components/partner-data";
import ResearchNetworkVisual from "@/components/research-network-visual";

export default function PartnersPage() {
  return <main id="top" className="detail-page partners-page">
    <SiteHeader currentPath="/partners" />
    <section className="detail-hero">
      <ResearchNetworkVisual page="consortium" />
      <div className="container detail-hero-layout"><div>
        <p className="detail-eyebrow">PARTNERS &amp; CONSORTIUM</p>
        <h1>함께 만드는<br />의료AI의 미래</h1>
        <p className="detail-hero-lead">의료AI 연구개발에 함께하는 참여기관을 소개합니다.<br />기관을 선택하면 소개와 주요 연구내용을 확인할 수 있습니다.</p>
      </div></div>
    </section>
    <section className="detail-section partners-directory-section"><div className="container">
      <div className="partners-directory-heading"><h2>참여기관</h2><span>총 {sortedPartners.length}개 기관</span></div>
      <PartnerDirectory partners={sortedPartners} />
    </div></section>
    <SiteFooter />
  </main>;
}
