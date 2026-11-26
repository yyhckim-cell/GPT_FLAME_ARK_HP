"use client";
import { useRef, useState } from "react";
const boards = ["공지사항", "연구성과", "행사"];
export default function NewsTabs() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className="news-boards">
    <div className="news-tabs" role="tablist" aria-label="소식 게시판">
      {boards.map((label, index) => <button key={label} ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`news-tab-${index}`} aria-controls={`news-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        let next = active;
        if (event.key === "ArrowRight") next = (active + 1) % boards.length;
        else if (event.key === "ArrowLeft") next = (active + boards.length - 1) % boards.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = boards.length - 1;
        else return;
        event.preventDefault(); setActive(next); buttons.current[next]?.focus();
      }}>{label}</button>)}
    </div>
    {boards.map((label, index) => <div key={label} role="tabpanel" id={`news-panel-${index}`} aria-labelledby={`news-tab-${index}`} hidden={active !== index} className="news-empty-panel"><p>등록된 게시글이 없습니다.</p></div>)}
  </div>;
}
