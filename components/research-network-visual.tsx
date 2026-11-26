const visuals: Record<string, string> = {
  project: "멀티모달 의료정보와 AI 연구를 연결하는 협업 공간",
  technology: "다양한 의료데이터를 분석하는 의료 AI 연구 워크스테이션",
  solutions: "의료정보와 AI 지원 화면을 활용하는 임상 업무 공간",
  validation: "의료영상과 AI 분석 결과를 함께 검토하는 연구진",
  roadmap: "데이터 준비부터 임상 검토까지 이어지는 연구공간",
  consortium: "여러 의료기관의 연구정보를 연결하는 공동 연구 공간",
};
export default function ResearchNetworkVisual({ page }: { page: string }) {
  const key = visuals[page] ? page : "project";
  return <figure className="research-domain-visual">
    <img src={`/hero/subpages/${key}.jpg`} alt={visuals[key]} width="1536" height="1024" />
    <div className="research-domain-glow" aria-hidden="true" />
  </figure>;
}
