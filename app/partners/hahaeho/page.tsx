import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";
import BrandLockup from "@/components/brand-lockup";
import HahehoProfile from "@/components/haheho-profile";

export const metadata: Metadata = { title: "주식회사 하해호 | FLAME-ARK 참여기관" };

export default function HahaehoPage() {
  return <main className="detail-page">
    <header className="site-header">
      <div className="container header-inner">
        <BrandLockup />
        <a className="header-contact" href="/research"><LockKeyhole size={14} /> 연구자 전용 <ArrowUpRight size={15} /></a>
      </div>
    </header>
    <div className="container partner-profile-page">
      <a className="partner-profile-back" href="/#partners"><ArrowLeft size={16} /> 참여기관 목록</a>
      <HahehoProfile />
    </div>
  </main>;
}
