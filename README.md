# YoPlan - 사용자 맞춤형 통신사 요금제 추천 서비스

## 1. 프로젝트 개요

YoPlan은 사용자 맞춤형 통신사 요금제 추천 서비스를 제공하기 위해, AI 챗봇을 활용한 상담 자동화 및 정보 탐색의 효율화를 목표로 합니다. 복잡하고 방대한 요금제 정보를 간단한 대화형 인터페이스로 간소화하고, 사용자 개개인에게 최적화된 요금제를 쉽고 빠르게 추천하는 것이 본 프로젝트의 주요 목적입니다.

### 핵심 가치

- **사용자 편의성**: 직접 요금제를 검색하거나 비교할 필요 없이, AI 챗봇과 진단 시스템을 통해 쉽고 빠르게 요금제 탐색 가능
- **정보 접근성 향상**: 누구나 언제든지, 복잡한 절차 없이 요금제 정보를 대화 형식으로 쉽게 확인할 수 있도록 설계
- **상담 효율성**: 반복되는 질문에 대한 자동 응답으로 고객센터 상담 업무의 부담을 줄이고 운영 효율을 향상
- **맞춤화된 사용자 경험**: 대화형 문답을 통해 사용자 정보를 수집하고 개인별 통신 사용 패턴에 맞는 요금제를 제안

## 2. 서비스 소개

YoPlan은 AI 기반 챗봇을 통해 사용자의 통신 사용 패턴을 분석하고, 개인에게 최적화된 요금제를 추천하는 웹 서비스입니다. 복잡한 요금제 정보를 직관적인 대화형 인터페이스로 제공하여 사용자가 쉽게 이해하고 선택할 수 있도록 돕습니다.

## 3. YoPlan 관련 페이지

- **YoPlan**: [YoPlan](https://yoplan.vercel.app/)
- **BackEnd**: [백엔드](https://github.com/ureca-chatbot-team3/Ureca-Chatbot-Team3-Backend)
- **Notion**: [노션](https://boundless-bread-fb1.notion.site/3-YoPlan-206a44b1a0d48009ba3af40bac9fd295)
- **디자인 시안**: [디자인 시안 보러가기](https://www.figma.com/design/CaxLZjtFqQi5twrWLiql1V/3%EC%A1%B0-%7C-%EC%9A%94%ED%94%8C%EB%9E%9C?node-id=16-117&p=f&t=mF617FRsa9rHpkOu-0)

## 4. 디렉터리 구조

```
Ureca-Chatbot-Team3-Frontend/
├── public/                          # 정적 파일
├── src/
│   ├── apis/                        # API 호출 관련 파일
│   ├── assets/                      # 이미지, 아이콘 등 정적 자원
│   ├── components/                  # 재사용 가능한 컴포넌트
│   │   ├── ChatbotLauncher.jsx     # 챗봇 런처 컴포넌트
│   │   ├── Header.jsx              # 헤더 컴포넌트
│   │   ├── MobileHeader.jsx        # 모바일 헤더
│   │   ├── PlanCard.jsx            # 요금제 카드 컴포넌트
│   │   ├── MobilePlanCard.jsx      # 모바일 요금제 카드
│   │   ├── CompareDropdown.jsx     # 비교 드롭다운
│   │   ├── ProtectedRoute.jsx      # 인증 보호 라우트
│   │   ├── ResponsiveHeader.jsx    # 반응형 헤더
│   │   └── modals/                 # 모달 컴포넌트들
│   ├── constants/                   # 상수 정의
│   ├── contexts/                    # React Context 파일들
│   ├── hooks/                       # 커스텀 훅
│   ├── layout/                      # 레이아웃 컴포넌트
│   ├── mocks/                       # 모의 데이터
│   ├── pages/                       # 페이지 컴포넌트
│   │   ├── AuthPage/               # 인증 페이지
│   │   ├── ChatbotGuidePage/       # 챗봇 가이드 페이지
│   │   ├── ChatbotPage/            # 챗봇 상담 페이지
│   │   ├── ComparePage/            # 요금제 비교 페이지
│   │   ├── DetailPage/             # 요금제 상세 페이지
│   │   ├── DiagnosisPage/          # 요금제 진단 페이지
│   │   ├── MainPage/               # 메인 페이지
│   │   ├── MyPage/                 # 마이페이지
│   │   └── PlanListPage/           # 요금제 목록 페이지
│   ├── router/                      # 라우팅 설정
│   ├── store/                       # 상태 관리
│   ├── utils/                       # 유틸리티 함수
│   ├── index.css                    # 전역 스타일
│   └── main.jsx                     # 애플리케이션 진입점
├── .env                             # 환경 변수
├── package.json                     # 의존성 관리
├── tailwind.config.js               # Tailwind CSS 설정
├── vite.config.js                   # Vite 빌드 도구 설정
└── vercel.json                      # Vercel 배포 설정
```

## 5. 서버 실행 방법

### 개발 환경 설정

1. **Node.js 설치**
   - Node.js 16.0.0 이상 버전 필요

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   ```bash
   # .env 파일 생성
   VITE_API_BASE_URL=백엔드 서버 URL (예: http://localhost:5000/api)
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   - 개발 서버가 http://localhost:5173에서 실행됩니다.

5. **빌드**
   ```bash
   npm run build
   ```

6. **프리뷰 (빌드된 결과물 미리보기)**
   ```bash
   npm run preview
   ```

7. **코드 포맷팅**
   ```bash
   npm run format
   ```

8. **린팅**
   ```bash
   npm run lint
   ```

## 6. 주요 기능 소개

### 6.1 메인 페이지 (MainPage/)
- **주요 기능**: 서비스 소개 및 주요 기능 안내
- **핵심 컴포넌트**: 
  - `MainIntro.jsx`: 서비스 메인 소개 섹션
  - `DiagnosisIntro.jsx`: 진단 서비스 소개
  - `ChatbotIntro.jsx`: 챗봇 서비스 소개
  - `BackgroundWrapper.jsx`: 배경 래퍼 컴포넌트
- **특징**: 반응형 디자인, 스크롤 애니메이션, 자동 스크롤 기능

### 6.2 AI 챗봇 상담 (ChatbotPage/)
- **주요 기능**: 실시간 대화형 요금제 상담
- **핵심 컴포넌트**:
  - `ChatbotModal.jsx`: 챗봇 모달 메인 컴포넌트
  - `ChatbotHeader.jsx`: 챗봇 헤더
  - `ChatMessage.jsx`: 메시지 표시 컴포넌트
  - `ChatbotInput.jsx`: 메시지 입력 컴포넌트
  - `ChatbotQuickQuestionBubble.jsx`: 빠른 질문 버블
- **특징**: 실시간 스트리밍 응답, 소켓 통신, FAQ 추천, 대화 이력 관리

### 6.3 요금제 진단 시스템 (DiagnosisPage/)
- **주요 기능**: 단계별 질문을 통한 사용 패턴 분석 및 개인화된 요금제 추천
- **핵심 컴포넌트**:
  - `DiagnosisPage.jsx`: 진단 메인 페이지
  - `DiagnosisIntroSection.jsx`: 진단 소개 섹션
- **특징**: 단일/복수 선택 지원, 진행률 표시, 응답 검증, 세션 관리

### 6.4 요금제 목록 (PlanListPage/)
- **주요 기능**: 통신사별 요금제 정보 조회 및 필터링
- **핵심 컴포넌트**:
  - `PlanListPage.jsx`: 요금제 목록 메인 페이지
  - `Filter.jsx`: 필터링 컴포넌트
- **특징**: 검색 기능, 다양한 정렬 옵션, 필터링, 페이지네이션, 반응형 카드 레이아웃

### 6.5 요금제 비교 (ComparePage/)
- **주요 기능**: 최대 3개(데스크톱) / 2개(모바일) 요금제 상세 비교
- **핵심 컴포넌트**:
  - `ComparePage.jsx`: 요금제 비교 메인 페이지
- **특징**: 드롭다운 선택, 북마크 요금제 우선 표시, 상세 정보 비교, 반응형 레이아웃

### 6.6 마이페이지 (MyPage/)
- **주요 기능**: 개인정보 관리, 요금제 보관함, 상담 내역
- **핵심 컴포넌트**:
  - `MyPage.jsx`: 개인정보 수정 페이지
  - `MyPageSidebar.jsx`: 사이드바 네비게이션 (데스크톱)
- **하위 페이지**:
  - 요금제 보관함 (`/mypage/bookmarks`)
  - 챗봇 상담 내역 (`/mypage/chat-history`)
  - 비밀번호 변경 (`/mypage/password-change`)
- **특징**: 실시간 입력 검증, 모바일 드롭다운 메뉴, 카카오 로그인 사용자 구분

### 6.7 인증 시스템 (AuthPage/)
- **주요 기능**: 로그인/회원가입 및 소셜 로그인
- **특징**: 일반 로그인, 카카오 소셜 로그인, 보호된 라우트 관리

### 6.8 공통 컴포넌트 (components/)
- **Header.jsx / MobileHeader.jsx**: 반응형 헤더
- **PlanCard.jsx / MobilePlanCard.jsx**: 요금제 카드 컴포넌트
- **ChatbotLauncher.jsx**: 챗봇 실행 버튼
- **CompareDropdown.jsx**: 비교 드롭다운
- **ProtectedRoute.jsx**: 인증 보호 라우트
- **특징**: 일관된 디자인 시스템, 접근성 및 반응형 디자인

## 7. 기술 스택

### Frontend Framework & Language
- **React 19.1.0**: 사용자 인터페이스 구축을 위한 메인 프레임워크
- **JavaScript (ES6+)**: 프로그래밍 언어
- **JSX**: React 컴포넌트 마크업

### 빌드 도구 & 개발 환경
- **Vite 6.2.0**: 빠른 빌드 도구 및 개발 서버
- **ESLint**: 코드 품질 및 스타일 검사
- **Prettier**: 코드 포맷팅
- **PostCSS**: CSS 후처리

### UI & 스타일링
- **Tailwind CSS 4.1.10**: 유틸리티 퍼스트 CSS 프레임워크
- **Motion 12.18.1**: 애니메이션 라이브러리
- **Canvas Confetti**: 효과 애니메이션
- **React Responsive**: 반응형 디자인 지원

### 상태 관리 & 라우팅
- **React Router DOM 7.6.2**: 클라이언트 사이드 라우팅
- **React Context API**: 전역 상태 관리

### 통신 & API
- **Axios 1.10.0**: HTTP 클라이언트
- **Socket.io Client 4.8.1**: 실시간 통신 (챗봇)
- **REST API**: 백엔드 서버와의 데이터 통신

### UI 컴포넌트 & 라이브러리
- **React Modal 3.16.3**: 모달 컴포넌트
- **React Hot Toast 2.5.2**: 토스트 알림
- **React Markdown 10.1.0**: 마크다운 렌더링
- **Swiper 11.2.8**: 슬라이더/캐러셀 컴포넌트

### 개발 도구
- **npm**: 패키지 관리
- **Git**: 버전 관리
- **VS Code**: 개발 환경 (설정 포함)

### 배포
- **Vercel**: 프론트엔드 배포 및 호스팅 플랫폼
- **환경 변수**: Vite 환경 변수 시스템 활용

## 8. 팀원 소개

### 👨‍💼 유동석 (팀장)
**기획 및 UI / UX**
- 챗봇 기능
- 챗봇 대화창 모달
- 챗봇 상담 내역 페이지
- 모바일 반응형

### 👩‍💻 김소은
**기획 및 UI / UX**
- 메인 페이지
- 챗봇 안내 페이지
- 모바일 반응형

### 👨‍💻 김준서
**기획 및 UI / UX**
- 요금제 진단 페이지
- 요금제 비교 페이지
- 마이페이지
- 백엔드 개발
- 모바일 반응형

### 👨‍💻 양세현
**기획 및 UI / UX**
- 데이터 정제 및 정규화
- 요금제 리스트 페이지
- 모바일 반응형

### 👨‍💻 홍석준
**기획 및 UI / UX**
- 로그인/회원가입
- 요금제 상세 페이지
- 모바일 반응형

---

## 9. 프로젝트 특징

### 반응형 디자인
- 모바일 퍼스트 접근 방식
- 데스크톱/태블릿/모바일 대응
- Tailwind CSS를 활용한 효율적인 스타일링

### 사용자 경험 (UX)
- 직관적인 인터페이스 디자인
- 부드러운 애니메이션 및 전환 효과
- 접근성 고려한 UI 컴포넌트

### 성능 최적화
- Vite 기반 빠른 개발 및 빌드
- 코드 스플리팅 및 지연 로딩
- 최적화된 이미지 및 리소스 관리

### 개발 환경
- ESLint + Prettier 코드 품질 관리
- Git 기반 협업 워크플로우
- 모듈화된 컴포넌트 아키텍처

---

*이 README는 YoPlan 프론트엔드 프로젝트의 개요와 사용법을 안내합니다. 추가 질문이나 기술 지원이 필요한 경우 팀원에게 문의해주세요.*
