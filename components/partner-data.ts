import type { Partner } from "./partner-directory";

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
  { name: "하해호", logo: "/partner-logos/hahaeho.png" },
  { name: "한림대학교", logo: "/partner-logos/hallym-university.png" },
  { name: "BK Instruments", logo: "/partner-logos/bk-instruments.png" },
];

const koreanCollator = new Intl.Collator("ko-KR");
const partnerSortKey = (name: string) => name.replace(/^\(주\)\s*/, "").normalize("NFC");
export const sortedPartners = [...partnerRecords].sort((left, right) => {
  const a = partnerSortKey(left.name);
  const b = partnerSortKey(right.name);
  const aKorean = /^[가-힣]/.test(a);
  const bKorean = /^[가-힣]/.test(b);
  if (aKorean !== bKorean) return aKorean ? -1 : 1;
  return koreanCollator.compare(a, b);
});

