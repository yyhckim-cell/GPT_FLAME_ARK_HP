"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

export default function BrandIdentityDialog({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);

  function close() {
    dialogRef.current?.close();
  }

  return <>
    <button type="button" className="footer-brand-button" aria-haspopup="dialog"
      onClick={() => {
        dialogRef.current?.showModal();
        setOpen(true);
      }}>로고에 담긴 의미</button>
    <dialog ref={dialogRef} className="brand-identity-dialog" aria-labelledby="brand-story-title"
      onClose={() => setOpen(false)}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <button type="button" autoFocus className="brand-identity-close" aria-label="로고 설명 닫기" onClick={close}><X size={21} /></button>
      {children}
    </dialog>
  </>;
}
