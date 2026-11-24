import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "FLAME-ARK | 병원 특화 연합학습 기반 의료AI 연구개발",
  description: "FLAME-ARK: 병원 특화 연합학습 기반 멀티모달 파운데이션 모델 구축 및 AI 솔루션 개발·실증 연구과제",
  icons: { icon: "/brand/flame-ark-new-logo.png", shortcut: "/brand/flame-ark-new-logo.png" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
