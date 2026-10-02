# AI팀 가을 단합대회 — 소스와 운영 안내

- 행사 안내: https://davidkangs.github.io/ai-team-autumn/
- 프런트: GitHub Pages, `ai-team-autumn/`의 빌드 결과를 게시합니다.
- 공동 저장 API: https://ai-team-autumn-2026.ksw3037.chatgpt.site/api/camp
- 저장소: Cloudflare D1, Sites에서 관리합니다. GitHub에는 실제 응답 데이터·비밀키를 저장하지 않습니다.
- 모델 호출이 없으므로 방문·메뉴 선택·메모 입력으로 AI 토큰을 사용하지 않습니다.

## 화면 수정

Node 22.13 이상, pnpm을 사용합니다.

```sh
cd _camp-source/web
pnpm install --frozen-lockfile
pnpm build
```

`src/App.tsx`: 행사 문구, 일정, 경로, 식사·장보기 화면.
`src/globals.css`: 글꼴·간격·모바일 배치.
`public/images`: 공식 캠핑장 사진·배치도, 네이버지도 경로 캡처.
`src/lib/api.ts`: 공동 API와 브라우저별 익명 식사 응답 식별자.
빌드 후 `_camp-source/web`과 `ai-team-autumn` 변경을 함께 커밋하면 기존 GitHub Pages 게시 과정에서 반영됩니다.

## 공동 저장 서버

`server/`에 현재 서버 소스와 SQL 마이그레이션을 보관합니다. 서버를 복원할 때 `node prepare-assets.mjs`로 웹 자산을 복사합니다. `.openai/hosting.json`은 기존 Sites 프로젝트를 가리키며 비밀키를 포함하지 않습니다. API 변경은 Sites에 별도로 배포해야 합니다. GitHub에 서버 소스를 올리는 것만으로 서버가 갱신되지는 않습니다.

식사 응답은 브라우저별 익명 UUID로 구분합니다. 같은 브라우저에서 수정할 수 있으며, 저장 데이터를 지우거나 다른 브라우저를 쓰면 별도 응답이 됩니다. 브라우저에는 UUID만 저장하고, 식사·장보기의 실제 값은 D1에 함께 저장합니다. 이전 Sites 주소의 개인 쿠키는 새 GitHub 주소로 자동 이전되지 않습니다. 장보기·집계 데이터는 같은 DB를 사용합니다.

API는 정확한 `https://davidkangs.github.io` 출처만 교차 출처 요청을 허용합니다. 로그인 없이 링크를 가진 사람이 목록을 함께 수정하는 행사 안내 서비스입니다. CORS는 팀원 인증 수단이 아닙니다. 결제정보·비밀번호·민감한 개인 정보는 입력받지 않습니다.

## 출처와 확인 시점

- 캠핑장 사진·배치도·운영 안내: 대둔산 캠핑랜드 공식 홈페이지. 개별 D5·D6 사진으로 확정하지 않았으며, D존 갤러리 전경으로 표시합니다.
- 네이버지도: 2026-10-02 14:07 KST 실제 자동차 조회. LX한국국토정보공사 본사 → 대둔산캠핑랜드, 59분·61km·통행료 무료. 행사일 예측이 아닙니다.
- 기온: 기상청 2026-10-02 06시 발표 금산 중기예보의 정적 스냅샷.
- 자연 휴식 연구는 화면의 DOI 원논문 링크를 참고합니다. 캠핑장 자체의 효과를 측정한 수치가 아닙니다.
- Pretendard: SIL Open Font License, `web/public/fonts/Pretendard-LICENSE.txt`.
- Noto Serif KR: `web/public/fonts/LICENSE.txt`.

## 확정 후 보완할 정보

D존 중앙 카라반 두 동의 동·호수, D5·D6 최종 차량 진입·주차 위치, 카라반 비품·우천 시 식사 공간은 확인 후 안내합니다.

## 검증

정적 프런트와 서버 빌드, TypeScript 검사, 허용/차단 출처·사전 요청·세션 형식·기존 쿠키 호환 검사를 통과했습니다. 모바일 첫 화면과 네이버 경로를 실제 브라우저에서 확인했습니다. 개발용 DB 데이터는 게시하지 않습니다.

## 로컬 Codex에서 이어서 작업하기

```sh
git clone https://github.com/davidkangs/davidkangs.github.io.git
cd davidkangs.github.io
```

Codex에서 이 폴더를 열고 `_camp-source/README.md`를 먼저 읽도록 요청하세요. 단합대회 작업 범위는 `_camp-source/`와 `ai-team-autumn/`입니다.

Node.js 22.13 이상과 pnpm을 설치한 뒤 터미널 두 개를 사용합니다.

첫 번째 터미널 — 로컬 데이터베이스와 서버:

```sh
cd _camp-source/server
pnpm install --frozen-lockfile
node prepare-assets.mjs
pnpm exec wrangler d1 migrations apply DB --local --config wrangler.local.json --persist-to .wrangler/state
pnpm dev
```

두 번째 터미널 — 화면:

```sh
cd _camp-source/web
pnpm install --frozen-lockfile
pnpm dev
```

브라우저에서 `http://127.0.0.1:5174/ai-team-autumn/`을 엽니다. 개발 화면은 5173 포트의 **로컬 서버**만 사용하므로 운영 중인 팀원 응답을 수정하지 않습니다. 운영 데이터나 비밀키는 저장소에 포함되지 않습니다.

화면 수정 후 `pnpm build`를 실행하고 `_camp-source/`와 `ai-team-autumn/`을 함께 커밋·push하세요. 서버 API를 수정했다면 Sites 서버에도 별도 배포가 필요합니다.

로컬 Codex 전달 예시:

> `_camp-source/README.md`를 읽고 AI팀 가을 단합대회 사이트를 이어서 수정해 줘. 화면 소스는 `_camp-source/web`, 서버 소스는 `_camp-source/server`, GitHub Pages 결과물은 `ai-team-autumn`이야. 기존 개인 홈페이지 파일은 수정하지 말아 줘. 카라반 동·호수와 최종 차량 진입·주차 동선은 아직 확인 중이야.

운영 API의 외부 HTTP 검증은 이 실행환경에서 Cloudflare 1010으로 차단되어 완료하지 못했습니다. 배포 상태는 성공이며, CORS 규칙·세션 검사와 모바일 UI는 별도로 검증했습니다. GitHub 화면에는 연결이 어려울 때 같은 공동 저장소를 사용하는 준비 페이지를 직접 여는 링크도 마련했습니다.
