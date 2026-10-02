import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"AI팀 가을 단합대회 | 2026.10.9–10",description:"대둔산 캠핑랜드에서 함께 쉬어가는 1박 2일. 우리 자리, 일정, 식사 선택과 장보기.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
