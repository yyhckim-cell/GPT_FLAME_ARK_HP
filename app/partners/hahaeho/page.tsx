import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";
import BrandLockup from "@/components/brand-lockup";
import HahehoProfile from "@/components/haheho-profile";

export const metadata: Metadata = { title: "주식회사 하해호 | FLAME-ARK 참여기관" };

export default function HahaehoPage() {
  return <main id="top" className="detail-page">
    <SiteHeader />
    <div className="container partner-profile-page">
      <a className="partner-profile-back" href="/partners"><ArrowLeft size={16} /> 참여기관 목록</a>
      <HahehoProfile />
    </div>
    <SiteFooter />
  </main>;
}
