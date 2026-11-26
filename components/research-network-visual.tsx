import { BrainCircuit, FileText, Table2, ScanLine, Mic, Image, Hospital } from "lucide-react";

const modalities = [
  { icon: FileText, label: "TEXT", position: "text" },
  { icon: Table2, label: "TABLE", position: "table" },
  { icon: ScanLine, label: "의료영상", position: "scan" },
  { icon: Mic, label: "VOICE", position: "voice" },
  { icon: Image, label: "IMAGE", position: "image" },
];
export default function ResearchNetworkVisual({ label }: { label: string }) {
  return <figure className="research-network-visual" aria-label="다양한 의료데이터를 기반 모델과 연결하고 의료현장으로 확장하는 연구 네트워크">
    <div className="research-network-stage">
      <div className="research-network-halo" aria-hidden="true" />
      <svg className="research-network-lines" viewBox="0 0 400 340" aria-hidden="true">
        <g><path d="M200 166 L70 90 M200 166 L200 44 M200 166 L330 90 M200 166 L88 250 M200 166 L312 250 M200 166 L200 305" /></g>
        <g className="research-network-flow"><path d="M70 90 L200 166 M200 44 L200 166 M330 90 L200 166 M88 250 L200 166 M312 250 L200 166 M200 166 L200 305" /></g>
      </svg>
      <div className="research-network-core"><BrainCircuit size={36} strokeWidth={1.3}/><strong>FLAME-ARK</strong><span>FOUNDATION MODEL</span></div>
      {modalities.map(({icon:Icon,label,position}) => <div key={position} className={`research-data-node research-data-${position}`}><Icon size={23} strokeWidth={1.4}/><span>{label}</span></div>)}
      <div className="research-network-hospital"><Hospital size={19}/><span>연결되는 의료현장</span></div>
    </div>
    <figcaption><span>CONNECTED MEDICAL INTELLIGENCE</span><strong>{label}</strong></figcaption>
  </figure>;
}
