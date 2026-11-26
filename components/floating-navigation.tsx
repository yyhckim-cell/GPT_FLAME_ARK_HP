"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronUp } from "lucide-react";
import { siteNavigation } from "./site-navigation";

export default function FloatingNavigation() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <div className="floating-navigation" ref={root}>
    {open && <nav id="floating-site-menu" className="floating-menu-panel" aria-label="빠른 전체 메뉴">
      <a href="/" onClick={() => setOpen(false)}>메인 화면</a>
      {siteNavigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      <a href="/research" onClick={() => setOpen(false)}>연구자 전용</a>
    </nav>}
    <div className="floating-navigation-actions">
      <button type="button" aria-label={open ? "전체 메뉴 닫기" : "전체 메뉴 열기"} aria-expanded={open} aria-controls="floating-site-menu" onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
      <a href="#top" aria-label="맨 위로" onClick={() => setOpen(false)}><ChevronUp size={22}/></a>
    </div>
  </div>;
}
