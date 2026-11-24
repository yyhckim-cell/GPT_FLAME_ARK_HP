"use client";

import React, { useRef, useState } from "react";
import "./haheho-profile.css";

type TabId = "overview" | "pmo" | "dashboard" | "mediguide" | "voc";
const TAB_ITEMS: { id: TabId; label: string; detail: string }[] = [
  { id: "overview", label: "기관 개요", detail: "회사 소개 및 전문 역량" },
  { id: "pmo", label: "PMO", detail: "과제관리 및 컨소시엄 운영" },
  { id: "dashboard", label: "FLAME 대시보드", detail: "연구현황 통합 모니터링" },
  { id: "mediguide", label: "메디가이드", detail: "수술 동의서 지원 AI" },
  { id: "voc", label: "VoC 모니터링", detail: "환자 및 보호자 민원처리" },
];

function SectionHeading({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return <div className="fh-section-heading">{eyebrow && <p className="fh-small-label">{eyebrow}</p>}<h2>{children}</h2></div>;
}
function Chip({ children }: { children: React.ReactNode }) { return <span className="fh-chip">{children}</span>; }
function MiniCard({ title, children }: { title: string; children: React.ReactNode }) { return <article className="fh-mini-card"><h3>{title}</h3><div>{children}</div></article>; }
function Target({ value, label }: {value: string;label: string}) { return <div className="fh-target"><strong>{value}</strong><span>{label}</span></div>; }
function Pillar({number, title, children}:{number:number;title:string;children:React.ReactNode}) {return <div className="fh-pillar"><span>{String(number).padStart(2,"0")}</span><h3>{title}</h3><p>{children}</p></div>}

function OverviewTab() {
  return <div className="fh-tab-inner">
    <SectionHeading eyebrow="ABOUT HAHEHO">환자와 의료진을 위한 서비스 경험 디자인</SectionHeading>
    <p className="fh-lead">하해호는 환자, 보호자, 의료진 모두를 중심에 두고 미래 헬스케어 서비스를 디자인하는 기업입니다. 서비스경험디자인 Lab으로서 의료 현장의 문제를 환자 여정 관점에서 분석하고, 공간·업무 프로세스·IT 솔루션·의료진 소통을 아우르는 헬스케어 컨설팅과 교육을 제공해 왔습니다. 이 경험을 바탕으로 대화형 AI 에이전트 플랫폼 ‘Haheho AI’를 개발해 국내외 의료 현장에 적용하고 있습니다.</p>
    <div className="fh-metric-grid">
      <Target value="25,000+" label="연간 의료기관 VoC 분석"/>
      <Target value="2,000+" label="연간 병원 관계자 교육"/>
      <Target value="34+" label="메디컬 네트워크(병원·기업)"/>
      <Target value="23+" label="글로벌 연구 네트워크"/>
    </div>
    <div className="fh-two-col">
      <MiniCard title="HAHEHO Advisory"><p>헬스케어 컨설팅 · 환자경험 교육</p></MiniCard>
      <MiniCard title="HAHEHO Systems"><p>Haheho AI 에이전트 구축·운영</p></MiniCard>
    </div>
    <div className="fh-soft-note"><strong>주요 적용 사례</strong><p>강원대학교병원 · 삼성서울병원 · 일본 준텐도대학병원 등</p></div>
  </div>;
}
function PMOTab() {
  return <div className="fh-tab-inner">
    <SectionHeading eyebrow="CONSORTIUM MANAGEMENT">FLAME-ARK 과제관리 및 컨소시엄 운영 지원</SectionHeading>
    <p className="fh-lead">FLAME-ARK 컨소시엄의 과제 수행을 위해 정의서·샘플데이터·실증 준비 일정을 안내·취합하고, 주관기관 대면 소통회와 규제 컨설팅 연계, 회의·협의체 운영을 지원합니다.</p>
    <div className="fh-process fh-pmo-process" aria-label="과제 추진 체계"><div><strong>총괄 PI</strong><small>과제 총괄</small></div><span aria-hidden="true">→</span><div className="fh-process-focus"><strong>PMO · 하해호</strong><small>과제 수행 지원</small></div><span aria-hidden="true">→</span><div><strong>1~5주관</strong><small>컨소시엄 기관</small></div></div>
    <p className="fh-detail-line">협의체 4종: 기술개선, 데이터분석관리, AI안전윤리, 사용자경험</p>
    <div className="fh-three-col">
      <MiniCard title="WBS 및 문서관리"><ul><li>서비스 정의서 검토·보완 요청</li><li>데이터 정의서 템플릿 배포</li><li>표준화 매뉴얼 템플릿·취합</li></ul></MiniCard>
      <MiniCard title="심의 및 실증 지원"><ul><li>IRB·DRB 진행 현황 모니터링</li><li>샘플데이터 제출 안내·검토</li><li>실증 사전 현황조사·토론회</li></ul></MiniCard>
      <MiniCard title="협력 및 규제 연계"><ul><li>기관별 대면 소통회</li><li>디지털의료기기 등급 사전점검</li><li>규제 컨설팅 결과 공유</li><li>정기회의·세미나·워크숍</li></ul></MiniCard>
    </div>
  </div>;
}
function DashboardTab() {
  return <div className="fh-tab-inner">
    <SectionHeading eyebrow="FLAME DASHBOARD">연합학습·파운데이션 데이터 통합 대시보드</SectionHeading>
    <p className="fh-lead">FLAME-ARK 참여기관의 연합학습·파운데이션 데이터 수집 현황, 라운드별 학습 성능, 과제 KPI, 기관별 인프라 상태를 한 화면에서 모니터링하는 대시보드입니다.</p>
    <div className="fh-three-col">
      <MiniCard title="Service · 상세 현황"><ul><li>연합 데이터·학습 라운드 현황</li><li>기관별 상세 및 참여기관 지도</li><li>모달리티, 전향·후향 수집</li></ul></MiniCard>
      <MiniCard title="KPI · 종합 성과"><ul><li>데이터셋 구축률·표준화 적용률</li><li>안정성·사용성·상대 성능 점수</li><li>모델 개발·검증 및 SCI(E) 논문</li></ul></MiniCard>
      <MiniCard title="Systems · 기술/인프라"><ul><li>네트워크 준비·서버 역할</li><li>CPU·GPU, RAM·스토리지</li><li>OS 구성 및 담당자</li></ul></MiniCard>
    </div>
    <div className="fh-subheading">데이터 처리 흐름</div>
    <div className="fh-process fh-four-step"><div><strong>관리항목 API</strong><small>제로원에이아이 연동</small></div><span>→</span><div><strong>수기 입력</strong><small>2차년도 우선 적용</small></div><span>→</span><div><strong>집계·저장</strong><small>지표 관리</small></div><span>→</span><div><strong>지표 산출</strong><small>대시보드 표시</small></div></div>
    <div className="fh-plan"><div><b>2026 · 2차년도</b><span>파이프라인·UI 프로토타입, 수기 입력 테스트</span></div><div><b>2027 · 3차년도</b><span>9개 기관 확대·고도화, 2027년 6월 1차 개통 계획</span></div></div>
  </div>;
}
function MediGuideTab() {
  return <div className="fh-tab-inner">
    <SectionHeading eyebrow="AI SERVICE 01">메디가이드</SectionHeading>
    <div className="fh-inline-chips"><Chip>수술 동의서 지원</Chip><Chip>환자 맞춤형 생성형 AI</Chip><Chip>전북대학교병원 공동</Chip></div>
    <p className="fh-lead">수술·검사 전 환자가 모바일로 동의서 핵심 내용을 학습하고 AI와 질의응답합니다. 이해도·질문 결과를 의료진에 전달해 대면 설명과 동의 과정을 보조합니다. 제왕절개 동의서부터 적용할 계획입니다.</p>
    <div className="fh-three-col">
      <MiniCard title="환자 · 모바일 웹"><ol><li>접속코드로 입장</li><li>단계별 설명·시각자료</li><li>자유 질의응답</li><li>Teach-back 이해도 확인</li><li>학습 요약본</li></ol></MiniCard>
      <MiniCard title="AI 엔진 · 병원 내부망"><ul><li>컨소시엄 파운데이션 모델 연계</li><li>동의서 원본·전문의 검토 자료 기반 RAG</li><li>진료 판단 질문은 의료진 확인 항목으로 분류</li><li>다국어 지원, 베트남어 우선</li></ul></MiniCard>
      <MiniCard title="의료진 · 웹 대시보드"><ul><li>환자 학습 진행 상태 확인</li><li>질문·우려 사항 확인</li><li>이해도와 추가 설명 항목 확인</li><li>대면 보완 설명, 최종 동의·서명</li></ul></MiniCard>
    </div>
    <div className="fh-soft-note"><strong>EMR 연계 계획</strong><p>환자 식별정보, 수술·검사 종류, 일정 등 최소 정보로 해당 동의서 교육 콘텐츠를 연결합니다.</p></div>
    <div className="fh-subheading">연구 성능 목표 <span>달성 결과가 아닌 계획서상 목표치</span></div>
    <div className="fh-metric-grid fh-target-grid"><Target value="95% 이상" label="답변 정확도 (전문가 검수)"/><Target value="2% 미만" label="할루시네이션 발생률"/><Target value="5초 이내" label="질문 후 답변 시간"/><Target value="30% 이상" label="수술 설명 시간 단축 목표"/></div>
  </div>;
}
function VocTab() {
  return <div className="fh-tab-inner">
    <SectionHeading eyebrow="AI SERVICE 02">VoC 모니터링</SectionHeading>
    <div className="fh-inline-chips"><Chip>환자·보호자 민원처리</Chip><Chip>AI 기반 유형·감성 분석</Chip><Chip>전북대학교병원 공동</Chip></div>
    <p className="fh-lead">설문·콜센터·포털 등 다채널 민원을 통합 수집해 AI가 유형과 감성을 분류하고, 담당 부서 전달·응답 초안·정기 보고서 생성을 지원하는 서비스입니다.</p>
    <div className="fh-four-col">
      <Pillar number={1} title="입력 채널">설문(앱·웹·OCR), 콜센터 음성 STT, 포털·홈페이지, 병원 앱·키오스크</Pillar>
      <Pillar number={2} title="수집·전처리">다채널 통합 수집, 포맷 정규화(HL7/FHIR), 메타데이터, 식별정보 제거·가명처리·암호화</Pillar>
      <Pillar number={3} title="AI 분석 · NLP">민원 유형 자동 분류, 감성·키워드 추출, 요약·우선순위, 외래·병동 환자 여정 매핑</Pillar>
      <Pillar number={4} title="출력·대응">부서 전달, 긴급 알림, CS팀 검토 후 AI 응답 초안 발송, VoC 대시보드, PPT·Word 보고서</Pillar>
    </div>
    <div className="fh-soft-note"><strong>운영 및 보안 설계</strong><p>외부 SNS 크롤링 제외. 온프레미스 폐쇄망, RBAC 권한 제어, 로그·백업, CS·EMR·설문·포털 내부 API 연계를 고려합니다. 처리 결과를 서비스 개선과 후속 분석에 반영합니다.</p></div>
    <div className="fh-subheading">도입 후 6~12개월 성능 목표 <span>달성 결과가 아닌 계획서상 목표치</span></div>
    <div className="fh-metric-grid fh-target-grid"><Target value="15~25%" label="최초 응답 시간 단축 목표"/><Target value="78~85%" label="자동 분류 Macro-F1 목표"/><Target value="30~50%" label="AI 응답 초안 승인률 목표"/><Target value="20~30%" label="수작업 입력·분류 시간 절감 목표"/></div>
  </div>;
}
const CONTENT: Record<TabId, React.FC> = { overview: OverviewTab, pmo: PMOTab, dashboard: DashboardTab, mediguide: MediGuideTab, voc: VocTab };

export default function HahehoProfile() {
  const [tab, setTab] = useState<TabId>("overview");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleTabKeys = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % TAB_ITEMS.length;
    else if (e.key === "ArrowLeft") next = (index + TAB_ITEMS.length - 1) % TAB_ITEMS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TAB_ITEMS.length - 1;
    else return;
    e.preventDefault(); setTab(TAB_ITEMS[next].id); tabRefs.current[next]?.focus();
  };
  return <article className="fh-dialog fh-page" aria-labelledby="haheho-title">
      <header className="fh-header">
        <div className="fh-heading">
          <p className="fh-eyebrow">PARTNER PROFILE</p>
          <div className="fh-name-row"><h1 id="haheho-title">주식회사 하해호</h1><span>HAHEHO Corp.</span></div>
          <div className="fh-keywords">{["환자경험디자인","헬스케어AI","대화형AI에이전트","VoC분석","의료진업무경감"].map(k => <Chip key={k}>{k}</Chip>)}</div>
        </div>
        <div className="fh-logo"><img src="/partner-logos/haheho-profile.png" alt="하해호 로고"/></div>
      </header>
      <nav className="fh-tabs" role="tablist" aria-label="하해호 소개 항목">
        {TAB_ITEMS.map((t, i) => <button key={t.id} id={`fh-tab-${t.id}`} ref={el => { tabRefs.current[i] = el; }} role="tab" type="button" aria-selected={tab === t.id} aria-controls={`fh-panel-${t.id}`} tabIndex={tab === t.id ? 0 : -1} onClick={() => setTab(t.id)} onKeyDown={e => handleTabKeys(e,i)} className={`fh-tab ${tab === t.id ? "is-active" : ""}`}><strong>{t.label}</strong><small>{t.detail}</small></button>)}
      </nav>
      <div className="fh-content">
        {TAB_ITEMS.map(t => {
          const TabContent = CONTENT[t.id];
          return <div key={t.id} role="tabpanel" id={`fh-panel-${t.id}`} aria-labelledby={`fh-tab-${t.id}`} tabIndex={tab === t.id ? 0 : -1} hidden={tab !== t.id}><TabContent /></div>;
        })}
      </div>
  </article>;
}
