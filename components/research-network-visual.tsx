export default function ResearchNetworkVisual({ label }: { label: string }) {
  return <figure className="research-campus-visual" aria-label={`${label}: 의료기관과 연구를 연결하는 공간`}>
    <img src="/hero/research-campus.jpg" alt="빛으로 연결된 병원 연구공간" width="1920" height="1080" />
    <div className="research-campus-light" aria-hidden="true" />
    <figcaption><span>FLAME-ARK</span><strong>의료현장과 연구를 연결하다</strong></figcaption>
  </figure>;
}
