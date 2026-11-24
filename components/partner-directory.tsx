"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import HahehoProfile from "./haheho-profile";
import PartnerProfileBody from "./partner-profile-body";
import { partnerProfiles, type PartnerProfile } from "./partner-profiles";

export type Partner = { name: string; logo: string };
type ActivePartner = { profile: PartnerProfile; logo: string };

export default function PartnerDirectory({ partners }: { partners: Partner[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<ActivePartner | null>(null);

  useEffect(() => {
    if (!active) return;
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [active]);

  function hasIntroduction(name: string) {
    const profile = partnerProfiles[name];
    return Boolean(profile && !profile.pending && (
      profile.introduction?.trim() ||
      profile.capabilities?.some((item) => item.description.trim()) ||
      profile.developments?.some((item) => item.description.trim())
    ));
  }

  function openProfile(partner: Partner) {
    if (!hasIntroduction(partner.name)) {
      window.alert("소개자료 준비중입니다");
      return;
    }
    const profile = partnerProfiles[partner.name];
    setActive({ profile, logo: partner.logo });
  }

  function closeDialog() {
    dialogRef.current?.close();
    setActive(null);
  }

  return <>
    <div className="partner-grid">
      {partners.map((partner) => (
        <button
          type="button"
          className="partner-tile partner-tile-interactive"
          key={partner.name}
          onClick={() => openProfile(partner)}
          aria-haspopup={hasIntroduction(partner.name) ? "dialog" : undefined}
          aria-label={hasIntroduction(partner.name) ? `${partner.name} 기관 소개 보기` : `${partner.name} 소개자료 준비중`}
        >
          <span className="partner-logo"><img src={partner.logo} alt="" loading="lazy" /></span>
          <strong>{partner.name}</strong>
          <span className="partner-action">{hasIntroduction(partner.name) ? "기관 소개 보기" : "소개자료 준비중"} <ArrowUpRight size={13} aria-hidden="true" /></span>
        </button>
      ))}
    </div>

    <dialog
      ref={dialogRef}
      className="partner-dialog"
      aria-label={active?.profile.title ?? "기관 소개"}
      onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}
      onClose={() => setActive(null)}
    >
      {active?.profile.title === "주식회사 하해호" ? <div className="haheho-modal-content">
        <button autoFocus type="button" className="partner-dialog-close" onClick={closeDialog} aria-label="기관 소개 닫기"><X size={21} /></button>
        <HahehoProfile />
      </div> : active && <div className="partner-dialog-content">
        <header className="partner-dialog-header">
          <div className="partner-dialog-identity">
            <span className="partner-dialog-eyebrow">PARTNER PROFILE</span>
            <h2 id="partner-dialog-title">{active.profile.title}</h2>
            {active.profile.subtitle && <p>{active.profile.subtitle}</p>}
          </div>
          <img className="partner-dialog-logo" src={active.logo} alt={`${active.profile.title} 로고`} />
          <button autoFocus type="button" className="partner-dialog-close" onClick={closeDialog} aria-label="기관 소개 닫기"><X size={21} /></button>
        </header>

        <PartnerProfileBody profile={active.profile} />
      </div>}
    </dialog>
  </>;
}
