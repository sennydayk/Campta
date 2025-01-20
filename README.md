# CAMPTA
> **캠핑용품 중고거래 서비스를 제공하는 웹서비스 프로젝트** <br/> **개발기간 : 2024.10.16 ~ 2024.11.20** <br/> **개발인원 : 1명(본인)

<br>

## 배포 주소

> **프론트 배포 주소** : https://what-is-your-ideal-type.vercel.app/

<br>

## 1. 프로젝트 소개

프로젝트는 Next.js 14 App Router와 Firebase를 기반으로 구현되었으며, 최신 웹 기술을 활용한 사용자 경험을 목표로 하고 있습니다.

<br>

## 2. 시작 가이드

### Requirements
For building and running the application you need:

- [Node.js v20.15.1](https://nodejs.org/en/download/package-manager)
- [Npm 9.2.0](https://www.npmjs.com/package/download)
- Firebase 프로젝트 및 설정 (Firebase 콘솔에서 서비스 계정 키 파일 준비)

### Environment Variables
프로젝트 실행을 위해 다음 환경 변수를 설정해야 합니다:
```
NEXT_PUBLIC_FIREBASE_API_KEY=<your_firebase_api_key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your_firebase_project_id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your_firebase_app_id>
```
Firebase 콘솔에서 제공된 값을 .env.local 파일에 복사하여 프로젝트 루트에 추가하세요.

### Installation
``` bash
# 1. Repository 클론
$ git clone https://github.com/sennydayk/Campta.git

# 2. 의존성 설치
$ npm install

# 4. 로컬 개발 서버 실행
$ npm run dev
```

### Scripts
다음은 프로젝트의 주요 npm 스크립트입니다:
```
npm run dev: 로컬 개발 서버 실행
npm run build: 프로덕션 빌드 생성
npm start: 프로덕션 환경에서 서버 시작
```

---

<br>

## 3. 기술 스택
### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white) 
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white) 
![Vercel](https://img.shields.io/badge/Vercel-00000?style=for-the-badge&logo=Vercel&logoColor=white) 

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)        

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=purple)
![Css](https://img.shields.io/badge/Css-1572B6?style=for-the-badge&logo=Css&logoColor=white)

### Communication
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white)

---

<br>

## 4. 채택한 기술과 전략

### Next.js 14, TypeScript, Tailwind css

- **Next.js**
  - 채택한 이유 : Next.js 14은 최신 App Router와 React Server Components를 지원하여 클라이언트와 서버 간의 경계를 명확히 관리하고 성능 최적화를 제공합니다. 이는 SEO, 서버 렌더링, 정적 사이트 생성 등 다양한 요구사항에 적합합니다.
  - 사용 이점
    - 동적 라우팅 및 페이지 구조 관리 용이
    - 클라이언트/서버 컴포넌트 분리를 통해 효율적인 데이터 패칭 가능
    - 빌트인 이미지 최적화 및 간단한 API 라우팅
- **TypeScript**
  - 채택한 이유 : TypeScript는 강력한 정적 타입 시스템을 제공하여 개발 초기 단계에서 버그를 예방하고, 코드의 가독성과 유지보수를 용이하게 만들 수 있습니다.
  - 사용 이점
    - 안정적이고 예측 가능한 코드 작성 가능
    - 코드 리팩토링 및 확장성 향상
- **Tailwind css**
  - 채택한 이유 : Tailwind CSS는 유틸리티 중심의 CSS 프레임워크로, 빠르고 효율적인 스타일링을 지원합니다. 클래스 기반 접근 방식은 반복적인 스타일 작성의 필요성을 줄여줍니다.
  - 사용 이점
    - 일관된 디자인 시스템 구현
    - CSS-in-JS의 오버헤드 없이 효율적인 스타일 관리
    - 반응형 디자인 구현 용이
- **Zustand**
  - 채택한 이유 : React 애플리케이션에서 전역 상태를 간단하게 관리할 수 있습니다. Redux에 비해 설정이 간단하고, 비동기 상태 및 중첩 상태를 보다 쉽게 처리할 수 있습니다.
  - 사용 이점
    - 불필요한 보일러플레이트 코드를 줄여 코드 가독성을 높이고 빠른 개발 가능
    - React 컴포넌트에서의 통합이 매우 간단하며 TypeScript와도 자연스럽게 연동 가능
    - 불필요한 리렌더링을 방지하고 상태 관리 성능을 개선하여 퍼포먼스 향상
    - Next.js 프레임워크에서 SSR을 지원하여 다양한 렌더링 요구사항을 충족
    - 미들웨어를 지원하여 로깅, 상태 지속성, 디버깅 등 확장 가능한 기능 구현 가능

### 브랜치 전략

- git-flow 전략을 기반으로 master, develop 브랜치와 보조 브랜치를 운용하였습니다.
  - **main** : 배포 단계에서만 사용하는 배포용 브랜치입니다.
  - **dev** : 개발 단계에서 git-flow의 main 역할을 하는 브랜치입니다.
  - **feat** : 기능 단위로 독립적인 개발 환경을 생성하여 개발한 뒤 merge 후 삭제하는 브랜치입니다. (ex. feat/login)
  - **fix** : 잘못된 개발 로직으로 인해 발생한 오류를 해결한 뒤 merge 후 삭제하는 브랜치입니다. (ex. fix/login)
  - **refactor** : 코드 구조 및 사용자 경험 등을 개선하도록 코드를 리팩토링한 뒤 merge 후 삭제하는 브랜치입니다. (ex. refactor/auth)

  <br>
  
## 5. 프로젝트 구조

<details>
  <summary>
     폴더 구조
  </summary>
```
📦src
 ┣ 📂api
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜login.ts
 ┃ ┃ ┗ 📜signup.ts
 ┃ ┣ 📂comments
 ┃ ┃ ┗ 📜comments.ts
 ┃ ┣ 📂posts
 ┃ ┃ ┗ 📜posts.ts
 ┃ ┗ 📂profile
 ┣ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂generateCustomtoken
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂logout
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📂verifyuser
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂comments
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┗ 📂posts
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜GeistMonoVF.woff
 ┃ ┃ ┗ 📜GeistVF.woff
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂posts
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂create
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂profile
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜page.tsx
 ┃ ┗ 📜providers.tsx
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜RememberMe.tsx
 ┃ ┃ ┗ 📂signup
 ┃ ┃ ┃ ┗ 📜ProfileImageUploader.tsx
 ┃ ┣ 📂comments
 ┃ ┃ ┣ 📜Comment.tsx
 ┃ ┃ ┗ 📜CommentSection.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📂ui
 ┃ ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┃ ┗ 📜FooterButton.tsx
 ┃ ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SearchBar.tsx
 ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┣ 📜ContentBox.tsx
 ┃ ┃ ┃ ┣ 📜FormInput.tsx
 ┃ ┃ ┃ ┗ 📜WriteButton.tsx
 ┃ ┣ 📂posts
 ┃ ┃ ┣ 📜AuthorInfo.tsx
 ┃ ┃ ┣ 📜ImageSlider.tsx
 ┃ ┃ ┣ 📜PostContent.tsx
 ┃ ┃ ┣ 📜PostForm.tsx
 ┃ ┃ ┣ 📜PostImageUploader.tsx
 ┃ ┃ ┗ 📜PostList.tsx
 ┃ ┗ 📂profile
 ┃ ┃ ┣ 📜ProfileContent.tsx
 ┃ ┃ ┣ 📜ProfileDetails.tsx
 ┃ ┃ ┣ 📜ProfileImage.tsx
 ┃ ┃ ┗ 📜ProfileInfo.tsx
 ┣ 📂lib
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┗ 📜useStore.ts
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┗ 📜auth.ts
 ┃ ┣ 📂comments
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂firebase
 ┃ ┃ ┣ 📜firebase.admin.ts
 ┃ ┃ ┗ 📜firebaseConfig.ts
 ┃ ┣ 📂posts
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┣ 📜usePostMutations.ts
 ┃ ┃ ┃ ┗ 📜usePostQuery.ts
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂profile
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📜api.ts
 ┃ ┗ 📜queryClient.ts
 ┣ 📂store
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜authStore.ts
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂comments
 ┃ ┃ ┣ 📜commentStore.tsx
 ┃ ┃ ┗ 📜types.ts
 ┃ ┗ 📂posts
 ┃ ┃ ┣ 📜postStore.tsx
 ┃ ┃ ┗ 📜types.ts
 ┗ 📜middleware.ts
```
</details>

---

<br>

## 6. 와이어 프레임

![image](https://github.com/user-attachments/assets/b59a58d4-9572-43f2-b7d3-33fcf09ed49f)

---

<br>

## 7. ERD

![image](https://github.com/user-attachments/assets/672b31e2-c366-4eaa-b63d-bfb2d86dbf9c)


## 8. 페이지별 기능

### [메인페이지]

- 작성된 모든 게시글을 불러오는 서비스 초기화면으로, 페이지 진입 시 사용자가 모든 게시글을 탐색할 수 있습니다.
- 모바일, 중간 크기, 데스크톱 화면에 따라 각각 다른 반응형 레이아웃을 제공합니다.

<br>

<div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
  <img width="500" alt="캠타-메인2" src="https://github.com/user-attachments/assets/58e839b9-a791-45d5-a04b-a79535385edb" />
  <img width="500" alt="캠타-메인2" src="https://github.com/user-attachments/assets/b2bd8ed0-8605-4a88-867e-6b9274275037" />
</div>

<br>

**주요 기능**
- **서버 사이드 렌더링(SSR)** : 초기 데이터는 서버에서 렌더링한 뒤 브라우저로 전송하는 SSR 렌더링을 적용하며 페이지 진입 시 보다 빠르고 지연 없는 사용자 경험을 제공합니다.
- **무한 스크롤** : TanStack Query의 useInfiniteQuery를 사용하여 사용자가 스크롤할 때 추가 데이터를 동적으로 로딩합니다.

<br>

### [메인페이지 모달]

- 궁금한 게시글의 상세 내용을 모달창으로 확인할 수 있습니다.
- 게시글에 작성된 댓글 목록은 모달창에서 표시되지 않습니다.
- Next.js App Router의 Intercept routing 기능을 활용하여 구현했으며, 새로고침 시 게시글 실제 상세페이지로 이동합니다.

<br>

<div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
  <img width="500" alt="캠타-모달" src="https://github.com/user-attachments/assets/6ea7bc32-2315-4f34-af10-1808ded924d4" />
  <img width="500" alt="캠타-모달2" src="https://github.com/user-attachments/assets/e0aa9b12-9aa1-4844-ae63-aa7b4c6e6e74" />
</div>

![모달](https://github.com/user-attachments/assets/804f77b9-d0db-42cd-b929-2a3330eacb1e)

<br>

### [회원가입 페이지]

- 회원가입 시, 사용자의 입력값을 실시간으로 감지하여 유효성 검사를 진행합니다.
- 사용자는 닉네임 중복확인을 통해 고유한 닉네임으로 가입할 수 있습니다.

<br>

<div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
  <img width="400" height="484" alt="유효성검사" src="https://github.com/user-attachments/assets/2bb01f62-2420-4f93-afb8-833f880f37c0" width="100"/>
  <img width="400" height="484" alt="중복확인" src="https://github.com/user-attachments/assets/15c1ea91-2c07-42d8-acfd-4c2fdc7ab3ae" width="100"/>
</div>

<br>

### [로그인 페이지]

- 로그인 과정에서 입력한 ID는 저장하여 기억할 수 있습니다.

<br>

<div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
  <img width="400" alt="캠타-로그인" src="https://github.com/user-attachments/assets/fe0937a0-bebd-4a92-b7c4-feebd0babc14" />
  <img width="400" alt="캠타-로그인2" src="https://github.com/user-attachments/assets/4c8f8e0a-8950-4a6f-aa49-fecf6fc7f8ec" />
</div>

<br>

### [게시글 작성 및 수정페이지]

- 게시글 작성 시, 첨부한 이미지를 로드해서 확인할 수 있습니다.
- 게시글 수정 시, 기존 작성 내용과 사진을 확인하고 원하는 내용으로 수정해서 게시할 수 있습니다.

<br>

<div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
  <img width="500" alt="캠타-글작성" src="https://github.com/user-attachments/assets/f3757d89-eff7-4455-b153-322aa3363c7b" />
  <img width="500" alt="캠타-글작성2" src="https://github.com/user-attachments/assets/a3391078-5c5c-441c-857a-01f7c33812af" />
</div>

<div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
  <img width="500" alt="캠타-글작성" src="https://github.com/user-attachments/assets/6c56c6fd-6f53-4e91-80ad-576e3d1f7af0" />
  <img width="500" alt="캠타-글작성2" src="https://github.com/user-attachments/assets/99ee72aa-aef4-487e-bb67-8c3e0cfdcb7e" />
</div>


<br>

### [게시글 상세페이지]

- 게시글 상세내용을 확인하고 마음에 드는 게시글을 스크랩할 수 있습니다.
- 게시글 작성자의 경우, 게시글 수정 및 삭제가 가능합니다.
- 로그인한 사용자인 경우 댓글 및 대댓글을 작성할 수 있고, 댓글 수정 및 삭제가 가능합니다.

<br>

<div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
  <img width="300" alt="캠타-글상세" src="https://github.com/user-attachments/assets/b73a7c65-0450-4985-8fd5-16244bf376f0" />
  <img width="300" alt="캠타-글상세2" src="https://github.com/user-attachments/assets/b816a461-a156-4f26-a657-23c949d64ed7" />
  <img width="300" alt="캠타-글상세3" src="https://github.com/user-attachments/assets/a6b88423-3d96-49b6-9f33-1847a60e2e00" />
</div>

<div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
  <img width="460" alt="대댓글작성" src="https://github.com/user-attachments/assets/9a221cbd-83a0-4a09-8b28-1c9c6c901872" />
  <img width="460" alt="대댓글수정" src="https://github.com/user-attachments/assets/cd57b149-31a7-4ef9-a0d5-0583d7c23d7a" />
</div>

<br>

**주요 기능**
- **게시글 세부정보 조회** : 게시물의 제목, 내용, 작성자 세부정보 및 관련 메타데이터를 표시합니다. 작성자의 경우 게시글 수정과 삭제를 할 수 있습니다.
- **댓글 및 상호작용** : 사용자가 게시글에 작성된 댓글을 확인하고 댓글 및 대댓글을 작성할 수 있습니다. 댓글 작성자의 경우 댓글 수정과 삭제를 할 수 있습니다.
- **댓글 무한 스크롤** : 댓글 영역은 효율적인 데이터 로딩을 위해 useInfiniteQuery를 사용하여 무한 스크롤을 구현했습니다.
- **서버 사이드 렌더링(SSR)** : 게시글 세부 내용은 서버에서 렌더링한 뒤 브라우저로 전송하는 SSR 렌더링을 적용하며 페이지 진입 시 보다 빠르고 지연 없는 사용자 경험을 제공합니다.

<br>

### [프로필 페이지]

- 사용자가 가입 시 등록한 회원정보를 조회하고 수정하는 페이지입니다.

<br>

<img width="800" alt="캠타-프로필2" src="https://github.com/user-attachments/assets/99d330ff-ee8f-4ad1-90b6-6a4cb3188200" />

<br>

**주요 기능**
  - **사용자 데이터 표시** : 프로필 이미지, 닉네임, 기타 개인정보 등 사용자 세부정보를 Firebase에서 가져와 표시합니다.
  - **프로필 수정**: 사용자가 자신의 프로필 이미지와 닉네임을 업데이트할 수 있습니다. zustand를 통해 변경된 상태를 실시간으로 동기화하고, 변경 사항이 UI에 즉시 반영됩니다.

<br>

## 9. 트러블슈팅


---

<br>

## 10. 회고

