import {
  ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, CalendarRange,
  Building2, Database, Layers3, LockKeyhole, Network, ShieldCheck,
} from "lucide-react";
import PartnerDirectory, { type Partner } from "@/components/partner-directory";
import BrandLockup from "@/components/brand-lockup";
import { researchPageLinks } from "@/components/research-subpage";

const menu = [
  ["사업 소개", "/project"], ["핵심기술", "/technology"], ["AI 솔루션", "/solutions"],
  ["실증·검증", "/validation"], ["추진체계", "/consortium"], ["참여기관", "#partners"], ["성과·소식", "#news"],
];

// Participating institution names are transcribed from the supplied logo archive.
// The display order is Korean alphabetical order, ignoring corporate prefixes.
const partnerRecords: Partner[] = [
  { name: "가천대 길병원", logo: "/partner-logos/gachon-gil-hospital.svg" },
  { name: "강원대학교", logo: "/partner-logos/kangwon-university.png" },
  { name: "강원대학교병원", logo: "/partner-logos/kangwon-university-hospital.png" },
  { name: "구미차병원", logo: "/partner-logos/gumi-cha-hospital.png" },
  { name: "닥터스바이오텍", logo: "/partner-logos/doctors-biotech.png" },
  { name: "도우", logo: "/partner-logos/dowoo.jpeg" },
  { name: "동아대학교병원", logo: "/partner-logos/donga-university-hospital.png" },
  { name: "분당차병원", logo: "/partner-logos/bundang-cha-hospital.png" },
  { name: "삼성서울병원", logo: "/partner-logos/samsung-medical-center.png" },
  { name: "서울대학교", logo: "/partner-logos/seoul-national-university.png" },
  { name: "성균관대학교", logo: "/partner-logos/sungkyunkwan-university.png" },
  { name: "세브란스병원", logo: "/partner-logos/severance-hospital.png" },
  { name: "(주)에이젠다", logo: "/partner-logos/agenda.png" },
  { name: "우리아이들병원", logo: "/partner-logos/woori-children-hospital.png" },
  { name: "유니스트", logo: "/partner-logos/unist.png" },
  { name: "전북대학교병원", logo: "/partner-logos/jeonbuk-university-hospital.jpg" },
  { name: "제로원 AI", logo: "/partner-logos/zeroone-ai.png" },
  { name: "제주대학교병원", logo: "/partner-logos/jeju-university-hospital.jpg" },
  { name: "차바이오텍", logo: "/partner-logos/cha-biotech.png" },
  { name: "차헬스케어", logo: "/partner-logos/cha-healthcare.png" },
  { name: "파이디지털헬스케어", logo: "/partner-logos/phi-digital-healthcare.png" },
  { name: "하해호", logo: "/partner-logos/hahaeho.png", profileHref: "/partners/hahaeho" },
  { name: "한림대학교", logo: "/partner-logos/hallym-university.png" },
  { name: "BK Instruments", logo: "/partner-logos/bk-instruments.png" },
];

const koreanCollator = new Intl.Collator("ko-KR");
const partnerSortKey = (name: string) => name.replace(/^\(주\)\s*/, "").normalize("NFC");
const sortedPartners = [...partnerRecords].sort((left, right) => {
  const a = partnerSortKey(left.name);
  const b = partnerSortKey(right.name);
  const aKorean = /^[가-힣]/.test(a);
  const bKorean = /^[가-힣]/.test(b);
  if (aKorean !== bKorean) return aKorean ? -1 : 1;
  return koreanCollator.compare(a, b);
});

const tracks = [
  {
    index: "01", icon: Database, en: "Multimodal Data", title: "멀티모달 의료데이터",
    description: "텍스트, 영상, 이미지, 음성, 정형데이터 등 의료현장의 다양한 정보를 체계적으로 표준화하고 학습 기반을 마련합니다.",
    keywords: ["DATA STANDARD", "MULTIMODAL"],
  },
  {
    index: "02", icon: BrainCircuit, en: "Foundation Model", title: "의료 범용 파운데이션 모델",
    description: "다양한 형태의 의료정보를 함께 이해하고, 의료 업무 지원 솔루션에 활용할 수 있는 기반 모델을 연구합니다.",
    keywords: ["MEDICAL AI", "FOUNDATION MODEL"],
  },
  {
    index: "03", icon: Network, en: "Federated Learning", title: "병원 특화 연합학습 플랫폼",
    description: "의료기관별 데이터를 한곳으로 모으지 않고도 공동 학습과 모델 고도화가 가능하도록 연합학습 체계를 구축합니다.",
    keywords: ["FEDERATED AI", "SECURE COLLABORATION"],
  },
];

function Brand() {
  return <BrandLockup href="#top" />;
}

function Heading({eyebrow, title, detail}: {eyebrow:string; title:string; detail?:string}) {
  return <div className="heading">
    <p className="eyebrow dark">{eyebrow}</p>
    <h2>{title}</h2>
    {detail && <p>{detail}</p>}
  </div>;
}

function NetworkVisual() {
  const points = [[110,354,4],[247,221,5],[503,209,5],[640,330,4],[253,415,4],[514,444,5],[94,262,2],[645,372,2],[184,147,3],[448,137,2],[431,547,3],[606,151,2],[595,519,2]];
  const hospitals = [[72,232,"01"],[509,159,"02"],[485,451,"03"],[95,466,"04"],[559,322,"05"]];
  return <div className="hero-art" aria-hidden="true">
    <div className="hero-art-glow"/>
    <div className="floating-label top"><span/> HOSPITAL-SPECIFIC FEDERATED AI</div>
    <svg className="network-illustration" viewBox="0 0 720 640" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="coreGlow"><stop stopColor="#8CE9E8" stopOpacity=".5"/><stop offset=".52" stopColor="#3BA8CE" stopOpacity=".14"/><stop offset="1" stopColor="#0A2B53" stopOpacity="0"/></radialGradient>
        <linearGradient id="meshLine" x1="90" y1="130" x2="600" y2="530" gradientUnits="userSpaceOnUse"><stop stopColor="#4EE4D4" stopOpacity=".07"/><stop offset=".5" stopColor="#7AD4FA" stopOpacity=".7"/><stop offset="1" stopColor="#4E6DFF" stopOpacity=".13"/></linearGradient>
        <linearGradient id="coreRing" x1="120" y1="130" x2="580" y2="510" gradientUnits="userSpaceOnUse"><stop stopColor="#B6FFF0"/><stop offset=".52" stopColor="#48A4ED"/><stop offset="1" stopColor="#335B95"/></linearGradient>
        <filter id="pointGlow"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      <ellipse className="orbit-a" cx="362" cy="320" rx="303" ry="173" transform="rotate(-26 362 320)" stroke="url(#meshLine)" strokeWidth="1.2" strokeDasharray="4 10"/>
      <ellipse className="orbit-b" cx="362" cy="320" rx="280" ry="214" transform="rotate(35 362 320)" stroke="#55A5DB" strokeOpacity=".34"/>
      <circle cx="362" cy="320" r="206" stroke="#50BEDD" strokeOpacity=".12"/>
      <circle cx="362" cy="320" r="164" stroke="#77CBE7" strokeOpacity=".23" strokeDasharray="2 9"/>
      <circle cx="362" cy="320" r="176" fill="url(#coreGlow)"/>
      <path d="M110 354L247 221L362 320L503 209L640 330M94 262L253 415L362 320L514 444L645 372M247 221L253 415M503 209L514 444M110 354L362 320L640 330M253 415L514 444" stroke="url(#meshLine)" strokeWidth="1.4"/>
      <path d="M184 147L247 221L362 320L448 137M253 415L362 320L431 547M503 209L362 320L606 151M514 444L362 320L595 519" stroke="#67D5EA" strokeOpacity=".18"/>
      <g className="mesh-sphere">
        <circle cx="362" cy="320" r="122" fill="#081A38" fillOpacity=".86" stroke="url(#coreRing)" strokeWidth="1.2"/>
        <circle cx="362" cy="320" r="108" stroke="#7CC8E6" strokeOpacity=".26"/>
        <ellipse cx="362" cy="320" rx="122" ry="43" stroke="#7CDDEB" strokeOpacity=".33"/>
        <ellipse cx="362" cy="320" rx="44" ry="122" stroke="#6CE7E6" strokeOpacity=".3"/>
        <ellipse cx="362" cy="320" rx="122" ry="75" transform="rotate(-42 362 320)" stroke="#6BC8EB" strokeOpacity=".25"/>
        <path d="M258 261C330 303 392 339 466 380M260 376C327 329 399 301 464 261" stroke="#74E0E9" strokeOpacity=".22"/>
        <circle cx="362" cy="320" r="69" fill="#0B2D50" stroke="#9CE9EE" strokeOpacity=".7"/>
        <circle cx="362" cy="320" r="57" stroke="#66CBDD" strokeOpacity=".27" strokeDasharray="3 7"/>
        <path d="M339 311L350 290L365 305L380 290L393 311L380 329L362 344L342 329Z" stroke="#B5F8F1" strokeWidth="2.1" strokeLinejoin="round"/>
        <path d="M350 290L362 344M380 290L362 344M339 311H393M342 329H380" stroke="#71C2E6" strokeOpacity=".65"/>
        <circle cx="362" cy="320" r="75" stroke="#9DD4FC" strokeOpacity=".45" strokeDasharray="1 12" strokeWidth="3"/>
      </g>
      <g className="hospital-connectors" stroke="#83E8E2" strokeWidth="1.8" strokeLinecap="round">
        <path d="M184 259L247 221" strokeOpacity=".7"/>
        <path d="M509 203L503 209" strokeOpacity=".7"/>
        <path d="M516 451L514 444" strokeOpacity=".7"/>
        <path d="M207 485L253 415" strokeOpacity=".95"/>
        <path d="M559 349L514 444" strokeOpacity=".78"/>
      </g>
      {points.map(([x,y,r],i)=><g key={i}><circle cx={x} cy={y} r={r*2.6} fill="#61DCE6" opacity=".28" filter="url(#pointGlow)"/><circle cx={x} cy={y} r={r} fill={i%3===0?"#A6FAF0":"#75BDFF"}/></g>)}
      {hospitals.map(([x,y,n])=><g key={n} transform={"translate("+x+" "+y+")"}>
        <rect width="112" height="54" rx="11" fill="#0D2447" stroke="#4B91B8" strokeOpacity=".6"/>
        <rect x="12" y="12" width="30" height="30" rx="7" fill="#0F4A64"/>
        <path d="M27 18V36M18 27H36" stroke="#A0F1E9" strokeWidth="2"/>
        <text x="51" y="24" fill="#C4EAF4" fontSize="8" fontWeight="700" letterSpacing="1.4">HOSPITAL</text>
        <text x="51" y="38" fill="#6FE4D7" fontSize="10" fontWeight="700">NODE {n}</text>
      </g>)}
    </svg>
    <div className="floating-label bottom"><span className="signal"><i/><i/><i/><i/></span><span>MULTIMODAL LEARNING<small>TEXT / IMAGE / AUDIO / TABULAR</small></span></div>
    <span className="art-caption">FLAME-ARK / NETWORK MODEL 01</span>
  </div>;
}

export default function Home() {
  return <main id="top">
    <div className="preview-ribbon">FLAME-ARK WEBSITE <span>·</span> FIRST DESIGN PREVIEW</div>
    <header className="site-header"><div className="container header-inner">
      <BrandLockup href="#top" biSrc="/brand/flame-ark-home-header-bi.png" />
      <nav className="desktop-nav" aria-label="주 메뉴">{menu.map(([label,href])=><a href={href} key={href}>{label}</a>)}</nav>
      <a className="header-contact" href="/research"><LockKeyhole size={14}/> 연구자 전용 <ArrowUpRight size={15}/></a>
      <details className="mobile-menu"><summary aria-label="메뉴 열기"><i/><i/><i/></summary><nav aria-label="모바일 메뉴">{menu.map(([label,href])=><a href={href} key={href}>{label}<ArrowUpRight size={16}/></a>)}<a href="/research"><LockKeyhole size={15}/> 연구자 전용</a></nav></details>
    </div></header>
    <section className="hero-graphic-section" aria-labelledby="hero-title">
      <img className="hero-graphic-image" src="/flame-ark-hero-hd.png" alt="FLAME-ARK 병원 특화 연합학습 기반 멀티모달 의료AI 연구개발 소개 이미지" width="1672" height="941" fetchPriority="high" />
      <div className="hero-graphic-mobile-caption">
        <h1 id="hero-title">FLAME-ARK</h1>
        <p>병원 특화 연합학습 기반 멀티모달 파운데이션 모델 구축 및 AI 솔루션 개발</p>
      </div>
      <div className="hero-graphic-toolbar">
        <div className="container hero-graphic-toolbar-inner">
          <p>2025.04 - 2029.12 <span>HOSPITAL-SPECIFIC FEDERATED MEDICAL AI</span></p>
          <div className="hero-graphic-actions">
            <a href="#about">프로젝트 알아보기 <ArrowUpRight size={16}/></a>
            <a href="#research">연구개발 분야 <ArrowRight size={16}/></a>
          </div>
        </div>
      </div>
    </section>

    <section className="home-explore" aria-labelledby="home-explore-title">
      <div className="container">
        <div className="home-explore-heading">
          <div><p className="eyebrow dark">EXPLORE THE PROJECT</p><h2 id="home-explore-title">연구계획서로 살펴보는 FLAME-ARK</h2></div>
          <p>연구의 목표부터 기술개발, AI 솔루션과 의료기관 실증까지 상세 내용을 확인할 수 있습니다.</p>
        </div>
        <div className="home-explore-grid">
          {researchPageLinks.map((item) => <a key={item.slug} href={"/" + item.slug}>
            <span>{item.small}</span>
            <strong>{item.title}</strong>
            <small>{item.subtitle}</small>
            <ArrowUpRight size={18} aria-hidden="true"/>
          </a>)}
        </div>
      </div>
    </section>

    <section className="section about" id="about"><div className="container about-layout">
      <div><p className="eyebrow dark">ABOUT FLAME-ARK</p><h2>데이터를 모으지 않고,<br/><em>지능을 연결하다.</em></h2></div>
      <div className="about-text"><p className="big">FLAME-ARK는 의료데이터의 안전한 활용을 바탕으로, 여러 의료기관이 함께 발전시키는 의료AI 기술을 연구합니다.</p><p>다양한 형태의 의료정보를 활용하는 멀티모달 파운데이션 모델과 병원 특화 연합학습 플랫폼을 개발하고, 실제 의료환경에서 AI 솔루션의 활용 가능성을 실증하는 연구개발 프로젝트입니다.</p><a href="/project" className="text-link">사업 목표 자세히 보기 <ArrowUpRight size={18}/></a> <a href="#identity" className="text-link">CI의 의미 <ArrowUpRight size={18}/></a></div>
    </div><div className="container principles"><div><ShieldCheck size={23}/><span>SECURE DATA UTILIZATION</span><strong>안전한 의료데이터 활용</strong></div><div><Layers3 size={23}/><span>MULTIMODAL INTELLIGENCE</span><strong>다양한 의료정보의 통합 이해</strong></div><div><Network size={23}/><span>COLLABORATIVE LEARNING</span><strong>의료기관 간 협력 학습</strong></div></div></section>

    <section className="section brand-story" id="identity" aria-labelledby="brand-story-title"><div className="container">
      <div className="brand-story-heading">
        <div><p className="eyebrow dark">BRAND IDENTITY</p><h2 id="brand-story-title">FLAME-ARK CI에 담긴 의미</h2></div>
        <p>연결된 의료 데이터가 하나의 AI 지능으로 통합되는 구조를 상징합니다.</p>
      </div>
      <div className="brand-story-layout">
        <div className="brand-story-showcase">
          <span className="brand-story-small">BI / SYMBOL</span>
          <img className="brand-story-symbol" src="/brand/flame-ark-new-logo.png" alt="네 개의 의료데이터 모듈과 중앙 의료 플러스가 연결된 FLAME-ARK BI" width="1200" height="1200" loading="lazy" />
          <img className="brand-story-wordmark" src="/brand/flame-ark-ci-transparent.png" alt="FLAME-ARK CI 워드마크" width="2048" height="384" loading="lazy" />
          <span className="brand-story-small">FEDERATED MEDICAL AI / CONNECTED INTELLIGENCE</span>
        </div>
        <div className="brand-story-description">
          <p className="brand-story-lead">서로 다른 의료정보가 연결되어 공동의 AI 지능으로 발전하는 과정을 시각화했습니다.</p>
          <div className="brand-meaning-list">
            <div><span>01</span><div><h3>중앙의 의료 플러스</h3><p>의료 현장의 문제 해결과 검증 가능한 AI 서비스를 의미합니다.</p></div></div>
            <div><span>02</span><div><h3>네 개의 데이터 모듈</h3><p>영상, 텍스트, 검사, 생체신호 등 서로 다른 형태의 멀티모달 의료 데이터를 나타냅니다.</p></div></div>
            <div><span>03</span><div><h3>기관을 잇는 연결 구조</h3><p>병원과 연구기관이 데이터를 한곳에 모으지 않고도 함께 학습하는 연합학습 네트워크를 뜻합니다.</p></div></div>
            <div><span>04</span><div><h3>원형 연결 노드</h3><p>의료정보가 표준화, 학습, 검증을 거쳐 모델 성능 향상으로 이어지는 지식의 흐름을 표현합니다.</p></div></div>
            <div><span>05</span><div><h3>하나로 이어지는 연구 과정</h3><p>파운데이션 모델 개발, 성능 고도화, 의료AI 서비스 실증으로 연결되는 과제의 방향을 담았습니다.</p></div></div>
          </div>
          <div className="brand-color-guide">
            <div><i className="brand-color-chip is-navy"/><p><strong>Deep Navy</strong><span>의료와 연구의 신뢰성·전문성</span></p></div>
            <div><i className="brand-color-chip is-teal"/><p><strong>Muted Teal</strong><span>의료 데이터와 AI 기술의 혁신·확장성</span></p></div>
          </div>
          <p className="brand-story-footnote">일관된 심볼 구조를 활용해 홈페이지, 파비콘, 연구과제 배너, 보고서 표지와 플랫폼 아이콘에 적용합니다.</p>
        </div>
      </div>
    </div></section>

    <section className="section research" id="research"><div className="container">
      <Heading eyebrow="CORE RESEARCH AREAS" title="세 가지 핵심 기술, 하나의 목표" detail="의료데이터부터 AI 모델, 실제 의료기관에서 활용 가능한 플랫폼까지 연결하는 연구개발 체계를 구축합니다."/>
      <div className="research-grid">{tracks.map((track)=><article className="research-card" key={track.index}><div className="card-top"><span>{track.index} / 03</span><track.icon size={28} strokeWidth={1.5}/></div><div className="card-visual"><span/><track.icon size={56} strokeWidth={1}/></div><p className="research-en">{track.en}</p><h3>{track.title}</h3><p className="research-description">{track.description}</p><div className="research-tags">{track.keywords.map(x=><span key={x}>{x}</span>)}</div></article>)}</div>
      <a href="/technology" className="home-section-link">핵심 연구기술 자세히 보기 <ArrowUpRight size={18}/></a>
    </div></section>

    <section className="section roadmap" id="roadmap"><div className="container roadmap-layout">
      <div><p className="eyebrow">RESEARCH ROADMAP</p><h2>연구에서 실증까지,<br/>미래 의료AI를 향한 여정</h2><p>2025년부터 2029년까지 단계적으로 기반기술을 개발하고, 의료기관에서 적용·실증하며 발전시킵니다.</p></div>
      <div className="roadmap-list">{[
        ["2025","기반 연구","데이터 표준화 및 플랫폼·모델 설계"],
        ["2026-27","핵심기술 개발","모델 및 연합학습 플랫폼 개발·고도화"],
        ["2028-29","실증 및 확산","의료기관 실증, 운영 최적화 및 성과 확산"],
      ].map(([year,phase,description],i)=><div className="roadmap-item" key={year}><span className="roadmap-index">0{i+1}</span><span className="roadmap-year">{year}</span><div><h3>{phase}</h3><p>{description}</p></div><ArrowUpRight size={20}/></div>)}</div>
      <a className="home-section-link is-light" href="/roadmap">연차별 연구 일정 자세히 보기 <ArrowUpRight size={18}/></a>
    </div></section>

    <section className="section governance" id="governance"><div className="container">
      <div className="governance-heading"><Heading eyebrow="PROJECT ORGANIZATION" title="FLAME-ARK 연구 추진체계" detail="총괄 운영과 세부 연구영역, 의료기관 실증을 연결하는 협력 구조입니다. 기관별 역할과 책임은 확정된 추진체계 자료를 전달받은 후 반영합니다."/><span>구조 시안</span></div>
      <div className="organization-chart">
        <div className="org-top"><div className="org-overall"><span className="org-en">PROJECT GOVERNANCE</span><strong>총괄연구개발 및 운영협의체</strong><small>연구조정 · 기관 간 협력 · 성과관리</small></div></div>
        <div className="org-branches"><div className="org-card"><span>RESEARCH TRACK 01</span><strong>멀티모달 데이터 및<br/>파운데이션 모델</strong><small>데이터 표준화 · 모델 개발</small></div><div className="org-card"><span>RESEARCH TRACK 02</span><strong>연합학습 기반<br/>의료서비스 플랫폼</strong><small>협력학습 기술 · 플랫폼 구축</small></div><div className="org-card"><span>RESEARCH TRACK 03</span><strong>의료AI 솔루션<br/>개발 및 실증</strong><small>서비스 적용 · 검증 · 고도화</small></div></div>
        <div className="org-bottom"><Building2 size={22}/><div><strong>참여 연구기관 및 실증 의료기관</strong><small>기관별 세부 역할 및 참여구성 등록 예정</small></div></div>
      </div>
      <p className="chart-note">※ 위 도식은 홈페이지 구성을 위한 개념도이며, 최종 공식 추진체계도로 확정된 것은 아닙니다.</p>
      <a href="/consortium" className="home-section-link">5개 주관 연구영역 살펴보기 <ArrowUpRight size={18}/></a>
    </div></section>

    <section className="section upcoming" id="solutions"><div className="container">
      <div className="upcoming-heading"><Heading eyebrow="AI SOLUTIONS" title="연구성과를 의료현장의 가치로" detail="진료기록, 다학제 협진, 회송·전원, 환자 건강관리 등 연구계획서에 제시된 AI 솔루션을 소개합니다."/><span className="status-badge"><span/>RESEARCH PLAN</span></div>
      <div className="upcoming-card"><div className="upcoming-icon"><BrainCircuit size={45} strokeWidth={1.2}/></div><div><span className="small-uppercase">SOLUTION RESEARCH</span><h3>의료현장별 AI 솔루션 개발과 실증</h3><p>5개 주관 연구영역에서 추진하는 솔루션의 개발 목적과 주요 기능, 적용 시나리오를 확인해 보세요. 아래 내용은 연구 목표로, 서비스 상용화 완료를 의미하지 않습니다.</p><a href="/solutions" className="home-inline-link">AI 솔루션 전체 보기 <ArrowUpRight size={16}/></a></div><span className="upcoming-number">02 / 05</span></div>
    </div></section>

    <section className="section partners" id="partners"><div className="container">
      <div className="partners-title"><Heading eyebrow="PARTNERS & CONSORTIUM" title="함께 만드는 의료AI의 미래" detail="의료AI 연구개발에 함께하는 참여기관을 소개합니다. 기관 로고와 명칭을 가나다순으로 확인할 수 있습니다."/><span>참여기관 {sortedPartners.length}개</span></div>
      <PartnerDirectory partners={sortedPartners} />
      <p className="partner-note">기관명과 로고는 제공받은 자료를 기준으로 등록했으며, 기관별 참여 역할은 확인 후 추가될 예정입니다.</p>
    </div></section>

    <section className="section news" id="news"><div className="container">
      <div className="news-heading"><Heading eyebrow="NEWS & INSIGHTS" title="FLAME-ARK 소식" detail="연구개발 현황, 주요 성과, 행사 및 공지사항을 공유합니다."/><span className="news-preview-pill">운영형 게시판 개발 예정</span></div>
      <div className="empty-news"><span>NOTICE / PUBLICATIONS / EVENTS</span><p>게시된 소식이 없습니다.</p><small>공개 가능한 자료 확인 후 순차적으로 업데이트됩니다.</small><ArrowUpRight size={24}/></div>
    </div></section>

    <footer id="contact" className="footer"><div className="container">
      <div className="footer-main"><div><Brand/><p>FLAME-ARK 솔루션 개발 실증: 병원 특화 연합학습 기반<br/>멀티모달 파운데이션 모델 구축 및 AI 솔루션 개발</p></div><div className="footer-detail"><span>PROJECT PERIOD</span><strong>2025. 04. 01 - 2029. 12. 31</strong><span>CONTACT</span><strong>문의처 확인 후 등록 예정</strong></div></div>
      <div className="footer-bottom"><span>© FLAME-ARK Research Project. All rights reserved.</span><span>본 페이지는 검토를 위한 디자인 시안입니다.</span><a href="/research"><LockKeyhole size={12}/> 연구자 전용</a><a href="#top">BACK TO TOP ↑</a></div>
    </div></footer>
  </main>;
}
