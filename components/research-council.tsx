const groups = [
  { code: "WG1", title: "연합학습 기술개선 협의체", focus: "기술 고도화", schedule: "월 1회 정기 미팅", chair: "분당차병원", vice: "UNIST", office: "분당차병원", lead: "제로원에이아이", tasks: ["플랫폼 아키텍처 및 인프라 설계", "학습 성능·효율 개선", "멀티모달 학습 적용 테스트", "기술 로드맵"] },
  { code: "WG2", title: "데이터 분석·관리 협의체", focus: "표준화 및 품질", schedule: "비정기 미팅", chair: "연세의료원", vice: "서울대학교", office: "연세의료원", lead: "파이디지털헬스케어", tasks: ["데이터 보안·가명화 프로토콜", "기관별 데이터 표준화 지침 합의", "공동 활용 데이터셋 선정", "데이터 품질관리 절차 확립"] },
  { code: "WG3", title: "AI 안전·윤리 협의체", focus: "규제 및 윤리", schedule: "정기 및 비정기 미팅", chair: "동아대학교병원", vice: "구미차병원", office: "동아대학교병원", lead: "도우", tasks: ["IRB 및 법적 규제 대응", "모델 안전성·편향성 검증", "환자 프라이버시 보호 정책", "LLM 윤리 이슈 및 내·외부 평가"] },
  { code: "WG4", title: "사용자 경험(UX) 협의체", focus: "서비스 최적화", schedule: "정기 및 비정기 미팅", chair: "닥터스바이오텍", vice: "전북대학교병원", office: "닥터스바이오텍", lead: "비주얼캠프", tasks: ["사용자 요구사항 수렴", "서비스 UI·UX 기획 자문", "공동 설계 세션 운영", "서비스 사용성 평가"] },
];

export default function ResearchCouncil() {
  return <section className="research-council" aria-labelledby="council-title"><div className="container">
    <div className="detail-section-heading"><div><p className="detail-section-eyebrow">RESEARCH GOVERNANCE</p><h2 id="council-title">FLAME-ARK 협의체</h2></div><p>기술, 데이터, 안전·윤리, 사용자 경험을 연결하는 공동 연구 운영체계입니다.</p></div>
    <div className="council-governance">
      <div className="council-governance-title"><span>공동 연구 운영</span><h3>FLAME-ARK 협의체</h3></div>
      <dl className="council-governance-roles"><div><dt>의장·부의장</dt><dd>삼성서울병원</dd></div><div><dt>구성</dt><dd>주관 책임자 · 기관 책임자<br />협의체 책임자 · 플랫폼 책임자</dd></div><div><dt>간사</dt><dd>하해호</dd></div></dl>
    </div>
    <div className="council-working-groups">{groups.map(group => <article className="council-group" key={group.code} aria-labelledby={`council-${group.code}`}>
      <header><div className="council-group-meta"><span>{group.code}</span><span>{group.focus}</span></div><h3 id={`council-${group.code}`}>{group.title}</h3><p>{group.schedule}</p></header>
      <div className="council-group-body"><h4>주요 역할</h4><ul>{group.tasks.map(task => <li key={task}>{task}</li>)}</ul><dl><div><dt>좌장 기관</dt><dd>{group.chair}</dd></div><div><dt>부좌장 기관</dt><dd>{group.vice}</dd></div><div><dt>실무기관</dt><dd>{group.office}</dd></div><div><dt>주도기관</dt><dd>{group.lead}</dd></div></dl></div>
    </article>)}</div>
  </div></section>;
}
