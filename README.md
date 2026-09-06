# WorkNest — Frontend

> 사내 업무 협업 관리 시스템 **WorkNest** 의 프론트엔드입니다.
> 일정 · 결재 · 근태 · 조직관리를 다루는 사내 도구를 기획부터 설계 · 구현까지 단독 진행하고 있습니다.

**React 19 · TypeScript · Vite · Tailwind CSS 4**

> [!NOTE]
> **이 저장소는 프론트엔드만 담고 있습니다.**
> 백엔드(NestJS + PostgreSQL)와 DB 스키마도 직접 구현했으나, 운영 정보를 포함하고 있어 private 저장소에서 관리합니다.
> 모노레포에서 `git subtree split` 으로 `web/` 이력만 추출해 이 저장소에 반영합니다.

<br>

## 진행 상황

프론트엔드는 **구현 중**입니다. 현재 기반 정비까지 완료된 상태입니다.

| 영역 | 상태 |
| --- | --- |
| 백엔드 API | ✅ 엔드포인트 78개 / 9개 도메인 |
| DB 스키마 | ✅ 22개 테이블 |
| 인증 (JWT + refresh) | ✅ 완료 |
| 프론트 기반 (구조 · 타입 · 테마) | ✅ 완료 |
| 화면 구현 | 🔶 진행 중 |
| 배포 | ⬜ 예정 |

<br>

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Core | React 19, TypeScript, Vite |
| 스타일 | Tailwind CSS 4, class-variance-authority |
| 라우팅 | React Router 7 |
| 서버 상태 | TanStack Query 5 |
| 폼 · 검증 | React Hook Form, Zod |
| 백엔드 *(private)* | NestJS, PostgreSQL, TypeORM |
| 인프라 *(private)* | Docker, PM2 |

<br>

## 폴더 구조

파일 종류별이 아니라 **업무 도메인별**로 묶는 feature 단위 구조입니다.
한 기능을 고치려고 `api/` `types/` `hooks/` `pages/` 를 오가지 않고, 해당 feature 폴더 하나만 열면 됩니다.

```text
src/
├── app/                    앱 조립부
│   ├── routes/             라우트 정의
│   ├── layout/             Header · Sidebar · Footer · MainLayout
│   └── provider/           전역 Provider
│
├── features/               업무 도메인
│   ├── auth/
│   │   ├── api/            도메인 API 호출 함수
│   │   ├── dto/            요청 · 응답 타입 (interface)
│   │   ├── model/          union · literal · 상태값 (type)
│   │   ├── hooks/          도메인 전용 훅
│   │   ├── pages/          라우터에 연결되는 화면
│   │   └── components/     이 기능 안에서만 쓰는 UI
│   ├── users/
│   ├── dashboard/
│   ├── schedules/
│   └── approvals/
│
├── shared/                 여러 feature 에서 재사용
│   ├── api/http.ts         모든 API 요청 통로
│   ├── types/              ApiResponse<T> · Paginated<T>
│   ├── ui/                 Button · Input · DataTable …
│   └── utils/
│
├── theme/                  컬러 · 타이포 토큰
└── assets/
```

**의존 방향은 `app` → `features` → `shared` 한쪽입니다.**
feature 끼리 직접 import 하지 않고, 공유가 필요하면 `shared` 로 올립니다.

<br>

## 설계 결정

작업하면서 내린 판단과 근거를 기록합니다.

### 인증 — accessToken + refreshToken 분리

accessToken 하나만 쓰면 유효기간 딜레마가 생깁니다. 짧게 잡으면 계속 재로그인해야 하고, 길게 잡으면 탈취 시 위험이 길어집니다.

- **accessToken** — 1시간, 무상태, 모든 요청의 `Authorization` 헤더
- **refreshToken** — 30일, **DB 저장**, `/auth/refresh` 에서만 사용

refreshToken 을 DB 에 두는 이유는 **무효화** 때문입니다. JWT 는 서명만 맞으면 통과해 서버가 취소할 수 없지만, 저장된 행을 폐기하면 즉시 무효가 됩니다. 로그아웃이 실제로 동작하려면 이 저장소가 필요합니다.

401 이 발생하면 프론트가 재발급 후 원래 요청을 재시도하므로, 사용자는 만료를 인지하지 못합니다. 여러 요청이 동시에 401 을 받아도 재발급은 한 번만 실행되도록 진행 중인 요청을 공유합니다.

### API 응답 포맷 통일

모든 응답을 `{ success, message, data }` 봉투로 감쌉니다. 전역 인터셉터가 처리하므로 컨트롤러는 `data` 값만 반환합니다.

프론트는 `shared/api/http.ts` 에서 봉투를 벗겨 `data` 만 돌려주므로, 화면과 훅은 봉투의 존재를 몰라도 됩니다.

### 식별자 노출 기준

- **UUID `id`** — 라우팅 · 수정 · 삭제 요청용. 화면에 표시하지 않습니다
- **업무 식별자** — `employeeNumber`(EMP-0002) · `department.code`(DEV) · `approval.docNo`(WN-VAC-0012)

사용자에게는 「권혁준 (EMP-0002)」처럼 업무 식별자를 보여줍니다. 동명이인 구분과 업무 대화가 UUID 로는 되지 않기 때문입니다.

응답에서는 FK 단독 필드(`departmentId` 등)를 제거하고 요약 객체로 대체했으며, 엔티티를 그대로 반환하지 않고 응답 DTO 화이트리스트로 고정했습니다. 엔티티에 컬럼이 추가돼도 자동으로 노출되지 않게 하기 위함입니다.

### 스타일 — cva + tailwind-merge

variant 가 있는 컴포넌트는 `*.styles.ts` 에 `cva` 로 정의하고, 컴포넌트는 variant 값만 받아 `twMerge` 로 적용합니다.

`className` prop 은 받지 않습니다. 호출부가 스타일을 주입하면 컴포넌트 경계가 흐려지고 스타일 출처를 추적하기 어려워집니다. 변경이 필요하면 variant 를 추가합니다.

<br>

## 실행 방법

### 요구 사항

- Node.js 20 이상
- 백엔드 API 서버 (private 저장소)

### 설치

```bash
npm install
```

### 환경 변수

`.env.example` 을 복사해 `.env.development` 를 만들고 값을 채웁니다.

```bash
cp .env.example .env.development
```

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 개발 서버

```bash
npm run dev
```

`http://localhost:5173` 에서 확인합니다.

### 빌드

```bash
npm run build
```

<br>

## 구현 범위

| 화면 | 내용 |
| --- | --- |
| 로그인 | 이메일 · 비밀번호 인증, 게스트 체험 |
| 대시보드 | 요약 카드, 최근 일정, 결재 현황 |
| 일정 | 캘린더 · 목록, 검색 · 필터 · 페이지네이션, 참여자 · 첨부 |
| 결재함 | 받은 / 보낸 결재, 결재선 지정, 승인 · 반려 |
| 마이페이지 | 프로필, 학력 · 경력 · 자격증, 정보 수정 요청 |
| 관리자 | 직원 · 부서 · 권한 관리, 운영 통계 |

권한은 `GUEST` · `USER` · `MANAGER` · `ADMIN` 4단계이며, 게스트는 조회만 가능합니다.
쓰기 차단은 화면 비활성화가 아니라 **백엔드 가드**로 처리합니다.
