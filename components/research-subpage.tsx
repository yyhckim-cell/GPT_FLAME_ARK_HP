import ResearchNetworkVisual from "./research-network-visual";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole, Network, ShieldCheck } from "lucide-react";
import BrandLockup from "@/components/brand-lockup";

type Entry = { title: string; description: string; note?: string };
type Section = {
  eyebrow: string;
  title: string;
  description?: string;
  layout?: "cards" | "steps" | "timeline";
  entries: Entry[];
};
type PageContent = {
  label: string;
  english: string;
  heading: string;
  lead: string;
  summary: string;
  highlight: string;
  sections: Section[];
};

export const researchPages: Record<string, PageContent> = {
  project: {
    label: "사업 소개", english: "PROJECT OVERVIEW",
    heading: "의료데이터의 가치를 연결하는 공동 연구",
    lead: "의료기관이 보유한 다양한 의료정보를 안전하게 활용해 범용 멀티모달 AI 기술을 개발하고, 실제 진료 환경에 필요한 서비스를 함께 검증합니다.",
    summary: "FLAME-ARK 솔루션 개발 실증: 병원 특화 연합학습 기반 멀티모달 파운데이션 모델 구축 및 AI 솔루션 개발",
    highlight: "2025.04 ~ 2029.12  |  5개 주관 연구영역",
    sections: [
      {
        eyebrow: "BACKGROUND", title: "왜 이 연구가 필요한가",
        description: "의료 데이터와 진료 업무의 특성을 함께 고려하는 연구개발 과제입니다.",
        entries: [
          { title: "분산된 의료데이터", description: "의료정보는 병원별 환경과 형식이 다르고 개인정보 보호가 필수적입니다. 기관 간 협력을 위해 데이터의 안전한 처리와 표준화가 필요합니다." },
          { title: "다양한 데이터 형태", description: "의무기록, 영상, 음성, 이미지, 정형정보가 실제 진료에서 함께 활용됩니다. 이를 종합적으로 이해하는 멀티모달 모델이 요구됩니다." },
          { title: "현장 업무의 복잡성", description: "의료진의 문서 작성, 협진, 입·퇴원 관리, 전원·회송, 환자 설명 등 반복적이면서도 정확성이 중요한 업무를 보조할 수 있는 기술을 연구합니다." },
        ],
      },
      {
        eyebrow: "FINAL OBJECTIVES", title: "네 가지 연구개발 목표",
        layout: "steps",
        entries: [
          { title: "멀티모달 데이터셋 구축 및 관리", description: "다양한 의료데이터의 표준화 절차를 마련하고 연구 활용에 필요한 데이터 품질 체계를 구축합니다." },
          { title: "의료 범용 멀티모달 파운데이션 모델", description: "이질적인 의료정보를 통합적으로 처리하는 기반 모델을 개발하고 의료업무 지원 솔루션과 연계합니다." },
          { title: "연합학습 기반 의료서비스 지원 플랫폼", description: "병원 환경을 고려한 협력학습, 모델 관리, 평가와 운영을 지원하는 플랫폼을 구축합니다." },
          { title: "기관 연계 협력과 성과관리", description: "연구 협의체를 통해 기관 간 과제를 조정하고, 개발 성과와 실증 결과의 확산을 추진합니다." },
        ],
      },
      {
        eyebrow: "EXPECTED VALUE", title: "현장에 닿는 연구",
        entries: [
          { title: "의료진 업무 지원", description: "기록 작성과 정보 요약 등 의료진의 업무 부담을 줄일 수 있는 보조 기술의 적용 가능성을 검증합니다." },
          { title: "환자 이해와 소통", description: "복잡한 의료정보를 환자와 보호자가 이해하기 쉽게 제공하는 서비스를 연구합니다." },
          { title: "다기관 기술 활용", description: "기관별 여건에 맞춘 AI 학습과 적용을 통해 연구성과를 여러 의료환경으로 확장할 기반을 마련합니다." },
        ],
      },
    ],
  },
  technology: {
    label: "핵심 연구기술", english: "CORE TECHNOLOGIES",
    heading: "데이터에서 모델까지, 모델에서 현장까지",
    lead: "FLAME-ARK의 기반 연구는 멀티모달 데이터 표준화, 의료 범용 파운데이션 모델, 병원 특화 연합학습 플랫폼으로 연결됩니다.",
    summary: "다양한 의료정보의 특성을 유지하면서 기관 간 협력학습과 의료서비스 활용을 지원하는 기술 체계",
    highlight: "DATA  /  FOUNDATION MODEL  /  FEDERATED LEARNING",
    sections: [
      {
        eyebrow: "01 / MULTIMODAL DATA", title: "의료 멀티모달 데이터 표준화",
        description: "데이터 준비, 획득, 정제, 라벨링, 검사 절차를 연결하는 품질 관리 체계를 구축합니다.",
        entries: [
          { title: "정형 및 서술형 정보", description: "진단·처방·검사 결과 등 구조화된 정보와 진료기록, 경과기록, 의뢰내용 등 서술형 의료문서를 대상으로 합니다." },
          { title: "의료영상과 이미지", description: "의료영상, 영상 판독 정보, 이미지 및 문서의 OCR 정보 등 시각적 의료자료의 특성을 고려합니다." },
          { title: "음성과 영상 매체", description: "진료 현장의 음성, 상담 기록 및 수술영상 등 매체별 특성에 맞는 수집·전처리 절차를 연구합니다." },
        ],
      },
      {
        eyebrow: "02 / FOUNDATION MODEL", title: "의료 범용 파운데이션 모델",
        description: "의료정보 간 연관성을 반영하는 멀티모달 모델의 설계와 학습, 개선을 추진합니다.",
        layout: "steps",
        entries: [
          { title: "모달리티별 정보 표현", description: "텍스트·이미지·음성 등 데이터 유형별 표현을 학습할 수 있는 구조를 설계합니다." },
          { title: "공통 의료 문맥 이해", description: "서로 다른 정보의 연결성을 파악할 수 있도록 멀티모달 모델을 개발합니다." },
          { title: "의료업무별 적응과 평가", description: "기관별 데이터 특성 및 활용 목적을 고려해 미세조정과 성능 평가 절차를 연구합니다." },
        ],
      },
      {
        eyebrow: "03 / FEDERATED LEARNING", title: "병원 특화 연합학습 플랫폼",
        description: "의료기관별 보안·운영 환경과 승인 조건을 고려한 협력학습 구조입니다. 세부 데이터 처리 방식은 기관별 심의 및 확정된 구현 설계에 따라 적용합니다.",
        layout: "steps",
        entries: [
          { title: "기관별 학습 환경", description: "각 의료기관의 시스템과 자원에 맞춘 학습·추론 환경 및 데이터 처리 절차를 구성합니다." },
          { title: "모델 업데이트의 협력", description: "기관에서 학습한 모델 결과를 협력학습에 반영하고, 다기관 데이터 이질성과 성능 편차를 검토합니다." },
          { title: "플랫폼 운영과 관리", description: "학습 상태, 데이터 품질, 모델 성능 등 연구 운영에 필요한 대시보드와 평가 기반을 구축합니다." },
        ],
      },
    ],
  },
  solutions: {
    label: "AI 솔루션", english: "AI SOLUTION RESEARCH",
    heading: "의료업무의 흐름에 맞춘 AI 서비스",
    lead: "의료진과 환자를 지원하는 AI 솔루션의 개발 목표와 활용 시나리오를 소개합니다.",
    summary: "아래 서비스는 연구개발 목표와 실증 계획입니다. 상용 서비스 제공 여부나 의료기기 인증 완료를 의미하지 않습니다.",
    highlight: "CLINICAL WORKFLOW  /  PATIENT EXPERIENCE",
    sections: [
      {
        eyebrow: "SAMSUNG MEDICAL CENTER", title: "삼성서울병원 IRB 행정지원 솔루션",
        description: "연구윤리심의(IRB)와 관련된 행정업무를 지원하는 AI 솔루션입니다.",
        entries: [
          { title: "IRB 연구행정 업무 지원", description: "IRB 심의 과정에 필요한 정보 확인과 문서 검토 등 연구행정 업무를 보조하는 솔루션을 개발합니다." },
          { title: "연구 문서의 정보 활용", description: "연구 관련 문서의 정보를 정리하고 담당자가 필요한 내용을 확인할 수 있도록 지원합니다." },
          { title: "담당자 중심의 검토", description: "AI가 제공하는 정보를 담당자의 검토와 함께 활용하여 연구행정 업무의 효율성을 높이는 것을 목표로 합니다." },
        ],
      },
      {
        eyebrow: "RESEARCH GROUP 02", title: "환자 중심 다학제 진료",
        description: "협진 전·중·후의 정보를 연결하고 의료진과 환자의 의사소통을 지원합니다.",
        entries: [
          { title: "다학제 협진 환자 요약", description: "협진에 필요한 환자 진료정보를 요약하여 의료진의 사전 검토와 진료 협력을 지원합니다." },
          { title: "가상 다학제실 플랫폼", description: "환자 정보 확인, 협진 중 의사소통, 협진 결과 공유를 하나의 흐름으로 연결하는 플랫폼을 연구합니다." },
          { title: "환자 친화적 리포트와 대화 에이전트", description: "복잡한 협진 결과를 환자 눈높이로 설명하고, 모호한 질문에 대한 명확화 질문 및 맞춤형 대화를 연구합니다." },
        ],
      },
      {
        eyebrow: "RESEARCH GROUP 03", title: "진료기록과 입·퇴원 지원",
        description: "의무기록 작성 부담을 줄이고 환자에게 필요한 교육정보를 제공하는 기술입니다.",
        entries: [
          { title: "생성형 AI 음성인식 EMR", description: "진료 중 음성정보와 의료 용어를 처리해 의무기록 작성을 보조하는 서비스를 개발하고 평가합니다." },
          { title: "AI 회진 지원", description: "의무기록 및 진료 상황정보를 활용하여 회진 업무를 지원하는 맞춤형 서비스를 연구합니다." },
          { title: "환자 맞춤형 퇴원 교육", description: "진단과 치료기록을 바탕으로 환자 및 보호자를 위한 퇴원 후 관리·교육 콘텐츠를 제공하는 기술을 연구합니다." },
        ],
      },
      {
        eyebrow: "RESEARCH GROUP 04", title: "회송·전원과 의료정보 연계",
        description: "의료기관 간 환자 이동 과정에서 정보 단절과 문서 작성 부담을 줄이는 것을 목표로 합니다.",
        entries: [
          { title: "전원·회송 서류 생성 보조", description: "의무기록의 핵심 내용을 분석해 회송서와 전원의뢰서 초안을 생성하는 서비스를 개발합니다." },
          { title: "초진 상담 AI 에이전트", description: "타 기관의 의무기록 요약 및 관련 임상지식을 활용해 의료진의 초진 정보 확인을 지원합니다." },
          { title: "OCR·LLM 기반 의료문서 처리", description: "인쇄물 등 다양한 형태의 의료문서를 디지털화하고 요약·분석하는 체계를 연구합니다." },
        ],
      },
      {
        eyebrow: "RESEARCH GROUP 05", title: "소아청소년 건강관리와 응급 전원",
        description: "일상 건강관리부터 응급의료 의사결정까지 서로 다른 의료현장을 지원합니다.",
        entries: [
          { title: "소아청소년 건강·성장 관리", description: "연령별 검진, 성장발달 정보, 건강 문진과 의료데이터를 바탕으로 맞춤형 건강정보와 질병 예방 서비스를 연구합니다." },
          { title: "호흡기 질환 분석 지원", description: "호흡음과 증상 등 멀티모달 자료를 활용한 소아청소년 호흡기 질환 분석 기술을 개발합니다." },
          { title: "요양기관과 응급실 간 전원 지원", description: "환자 상태, 의료기관의 수용 역량과 이송 조건 등을 고려해 전원 필요성과 목적지 판단을 지원하는 AI를 연구합니다." },
        ],
      },
    ],
  },
  validation: {
    label: "실증 및 검증", english: "CLINICAL VALIDATION",
    heading: "연구실의 기술을 의료현장의 기준으로 검토합니다",
    lead: "FLAME-ARK는 개발 기술의 성능뿐 아니라 실제 진료 흐름에서의 적합성, 사용성, 안전성과 지속적인 개선 가능성을 확인하는 실증을 계획하고 있습니다.",
    summary: "의료AI의 최종 판단과 활용은 승인된 임상 절차와 의료진의 책임 아래 이루어져야 합니다.",
    highlight: "PERFORMANCE  /  SAFETY  /  USABILITY",
    sections: [
      {
        eyebrow: "VALIDATION FRAMEWORK", title: "세 단계로 연결되는 검증",
        layout: "steps",
        entries: [
          { title: "데이터 품질 점검", description: "수집·표준화·라벨링 단계에서 데이터의 정확성, 완전성, 일관성과 연구 목적 적합성을 확인합니다." },
          { title: "모델 및 기술 평가", description: "학습 모델의 성능, 기관 간 데이터 차이에 따른 일반화 가능성, 오류와 안전성 관련 문제를 검토합니다." },
          { title: "임상 업무 시나리오 실증", description: "의료진과 환자가 사용하는 업무 흐름에서 기능 적합성, 이해 가능성, 사용성을 평가하고 개선사항을 반영합니다." },
        ],
      },
      {
        eyebrow: "RESEARCH SAFEGUARDS", title: "안전한 연구 수행의 전제",
        entries: [
          { title: "연구윤리 및 데이터 심의", description: "개인정보와 의료정보의 이용은 해당 기관의 IRB·DRB 등 적용 가능한 심의, 동의 및 관련 기준을 준수하는 것을 전제로 합니다." },
          { title: "의료진 검토와 역할 분담", description: "AI 생성 결과는 검토 가능한 보조 자료로 다루며, 의료진의 판단을 대체한다는 의미가 아닙니다." },
          { title: "기관별 단계적 적용", description: "파일럿 테스트와 임상 환경 검증 결과를 바탕으로 기능을 보완하고 다기관 적용 가능성을 검토합니다." },
        ],
      },
      {
        eyebrow: "FEEDBACK CYCLE", title: "실증 결과를 기술 개선으로",
        layout: "steps",
        entries: [
          { title: "현장 요구사항 수집", description: "의료진, 환자, 운영 담당자의 실제 사용 맥락과 요구사항을 확인합니다." },
          { title: "프로토타입 및 파일럿 평가", description: "개발 기능을 제한된 환경에서 검증하고 오류, 성능, 업무 적합성을 살펴봅니다." },
          { title: "개선과 재검증", description: "확인된 문제를 수정하고 모델 및 서비스의 고도화와 후속 평가를 이어갑니다." },
        ],
      },
    ],
  },
  roadmap: {
    label: "연구 추진일정", english: "RESEARCH ROADMAP",
    heading: "2025년부터 2029년까지 단계적으로",
    lead: "1단계는 기반 구축과 핵심 기술 개발에 집중하고, 2단계는 의료기관 적용·실증과 기술 고도화, 확산 가능성을 검토합니다.",
    summary: "전체 연구기간 2025년 4월 1일 ~ 2029년 12월 31일",
    highlight: "1단계 2025~2027  |  2단계 2028~2029",
    sections: [
      {
        eyebrow: "YEAR BY YEAR", title: "연차별 주요 연구 목표",
        layout: "timeline",
        entries: [
          { title: "2025 / 기반 설계", description: "멀티모달 데이터 표준화 절차 수립, 기반 모델과 연합학습 플랫폼 설계, 각 분야 AI 솔루션 요구사항 분석과 초기 시나리오 기획", note: "1차년도" },
          { title: "2026 / 핵심 기능 개발", description: "파운데이션 모델과 플랫폼 단위 기능 개발, 다학제·EMR·회송·건강관리 등 솔루션 개발 및 초기 기능 검증", note: "2차년도" },
          { title: "2027 / 통합과 고도화", description: "모델·플랫폼 고도화, 다기관 협력학습 및 서비스 프로토타입·파일럿 평가, 주요 연구 기능의 연계 강화", note: "3차년도" },
          { title: "2028 / 의료기관 적용", description: "병원별 적용 환경 확장, 솔루션 실증, 임상 사용성·성능 검토, 모델·플랫폼 운영 개선", note: "4차년도" },
          { title: "2029 / 검증과 성과 확산", description: "실증 피드백 반영, 기술 최적화, 후속 운영과 사업화 가능성 검토, 연구성과의 확산 기반 마련", note: "5차년도" },
        ],
      },
      {
        eyebrow: "RESEARCH STAGES", title: "기반 연구에서 실증 연구로",
        entries: [
          { title: "1단계: 2025~2027", description: "데이터 표준화, 모델 설계 및 학습, 핵심 플랫폼 개발, 솔루션의 초기 기능검증과 고도화에 집중합니다." },
          { title: "2단계: 2028~2029", description: "병원별 환경에서 기술을 적용·실증하고 검증 결과와 사용자 피드백을 반영하여 확산 가능성을 검토합니다." },
        ],
      },
    ],
  },
  consortium: {
    label: "연구 추진체계", english: "RESEARCH CONSORTIUM",
    heading: "다섯 연구영역이 하나의 과제를 완성합니다",
    lead: "공통 기반기술과 의료서비스 개발, 임상 실증을 연결하기 위해 주관 연구영역별 역할을 구분하고 참여기관 간 협력을 추진합니다.",
    summary: "5개 주관 연구영역이 기반기술 개발, 의료서비스 구현, 임상 실증을 연결하며 협력합니다.",
    highlight: "5 RESEARCH GROUPS  /  SHARED FOUNDATION",
    sections: [
      {
        eyebrow: "RESEARCH STRUCTURE", title: "주관 연구영역과 역할",
        layout: "timeline",
        entries: [
          { title: "1주관 / 공통 기반기술과 총괄", description: "멀티모달 데이터 표준화·구축, 의료 범용 파운데이션 모델, 연합학습 플랫폼 및 협의체 운영을 담당하는 연구영역입니다.", note: "기반 플랫폼" },
          { title: "2주관 / 환자 중심 다학제 진료", description: "협진 환자 요약, 가상 다학제실, 환자 친화적 리포트와 대화 에이전트 기술을 연구합니다.", note: "협진 지원" },
          { title: "3주관 / 기록과 입·퇴원 지원", description: "음성인식 EMR 작성 보조, AI 회진 및 맞춤형 퇴원 교육 서비스를 연구합니다.", note: "진료업무 지원" },
          { title: "4주관 / 회송·전원 지원", description: "의무기록 요약과 회송·전원 서류 생성, 초진 상담 AI, OCR 기반 의료정보 처리 기술을 연구합니다.", note: "의료정보 연계" },
          { title: "5주관 / 건강관리와 응급 전원", description: "소아청소년 건강관리·질병 예방과 요양기관·응급실 간 전원 의사결정 지원 기술을 연구합니다.", note: "환자 지원" },
        ],
      },
      {
        eyebrow: "COLLABORATION", title: "공동 연구의 연결 지점",
        entries: [
          { title: "기술 공유", description: "공통 데이터 기준과 멀티모달 모델, 연합학습 플랫폼을 중심으로 연구영역 간 기술을 연계합니다." },
          { title: "현장 피드백", description: "의료기관별 요구사항과 검증 결과를 수집해 솔루션의 업무 적합성과 기술 완성도를 높입니다." },
          { title: "협의체 운영", description: "기관 간 연구 일정과 이슈, 성과지표 및 후속 활용 방안을 협의합니다." },
        ],
      },
    ],
  },
};

export const researchPageLinks = [
  { slug: "project", small: "01", title: "사업 소개", subtitle: "연구 배경과 최종 목표" },
  { slug: "technology", small: "02", title: "핵심 연구기술", subtitle: "데이터·모델·연합학습" },
  { slug: "solutions", small: "03", title: "AI 솔루션", subtitle: "의료업무별 개발 기술" },
  { slug: "validation", small: "04", title: "실증 및 검증", subtitle: "임상 적용과 안전성" },
  { slug: "roadmap", small: "05", title: "연구 추진일정", subtitle: "연차별 개발 목표" },
  { slug: "consortium", small: "06", title: "연구 추진체계", subtitle: "5개 주관 연구영역" },
] as const;

export type ResearchPageKey = keyof typeof researchPages;

export default function ResearchSubpage({ page }: { page: ResearchPageKey }) {
  const content = researchPages[page];
  const isProject = page === "project";
  const currentIndex = researchPageLinks.findIndex((item) => item.slug === page);
  const next = researchPageLinks[(currentIndex + 1) % researchPageLinks.length];

  return <main id="top" className={`detail-page${isProject ? " project-overview-page" : ""}`}>
    <SiteHeader currentPath={"/" + page} />

    <section className="detail-hero">
      <div className="container detail-hero-layout">
        <div>
          <p className="detail-eyebrow">{content.english}</p>
          <h1>{page === "technology" ? <>데이터에서 모델까지,<br />모델에서 현장까지</> : content.heading}</h1>
          <p className="detail-hero-lead">{content.lead}</p>
          {isProject && <div className="project-hero-facts"><span>연구기간 <strong>2025.04 ~ 2029.12</strong></span><span>협력체계 <strong>5개 주관 연구영역</strong></span></div>}
        </div>
        <ResearchNetworkVisual label={content.label} />
      </div>
    </section>



    {isProject && <section className="project-research-flow" aria-label="사업의 연구개발 흐름"><div className="container">
      <div className="project-flow-intro"><span>OUR APPROACH</span><h2>데이터의 이해부터<br/>의료현장의 활용까지</h2><p>멀티모달 AI와 연합학습을 중심으로 연구와 실증을 연결합니다.</p></div>
      <ol>
        <li><span>DATA</span><h3>다양한 의료정보</h3><p>텍스트·표·영상·음성·이미지의 표준화와 품질 관리</p></li>
        <li><span>MODEL</span><h3>통합적인 의료 이해</h3><p>의료 범용 멀티모달 파운데이션 모델 개발</p></li>
        <li><span>FEDERATED LEARNING</span><h3>의료기관의 협력</h3><p>병원별 환경을 고려한 공동 학습과 플랫폼 구축</p></li>
        <li><span>APPLICATION</span><h3>현장 중심의 검증</h3><p>의료진과 환자를 지원하는 AI 솔루션 개발·실증</p></li>
      </ol>
    </div></section>}

    {content.sections.map((section, sectionIndex) => <section className="detail-section" key={section.eyebrow}>
      <div className="container">
        <div className="detail-section-heading">
          <div>
            <p className="detail-section-eyebrow">{section.eyebrow}</p>
            <h2>{section.title}</h2>
          </div>
          {section.description && <p>{section.description}</p>}
        </div>
        <div className={section.layout === "timeline" ? "detail-timeline" : section.layout === "steps" ? "detail-steps" : "detail-cards"}>
          {section.entries.map((entry, index) => <article className="detail-content-card" key={entry.title}>
            <div className="detail-content-top">
              <span className="detail-content-number">{String(index + 1).padStart(2,"0")}</span>
              {entry.note && <span className="detail-content-note">{entry.note}</span>}
            </div>
            <h3>{entry.title}</h3>
            <p>{entry.description}</p>
          </article>)}
        </div>
      </div>
    </section>)}

    <section className="detail-next">
      <div className="container detail-next-layout">
        <div>
          <p>CONTINUE EXPLORING</p>
          <h2>다음 연구 내용도 살펴보세요.</h2>
        </div>
        <a href={"/" + next.slug}>{next.title}</a>
      </div>
    </section>

    <SiteFooter />
  </main>;
}
