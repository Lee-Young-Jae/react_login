# 회원 가입 페이지를 구현하는 미션

[🤖Demo](https://react-login-lee-young-jae.vercel.app/)

## 🛠️ 기술 스택

TypeScript, React, Styled-Components

## 🛠️ 설치 및 실행

```bash
# 패키지 설치
$ npm install

# 개발 서버 실행
$ npm start
```

## 📚 폴더구조

```bash
📦src
 ┣ 📂components
 ┃ ┗ 📂Layout
 ┃ ┃ ┣ 📜Style.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useAuth.tsx
 ┃ ┗ 📜useForm.tsx
 ┣ 📂pages
 ┃ ┣ 📂Error
 ┃ ┃ ┣ 📜Style.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜Style.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Mypage
 ┃ ┃ ┣ 📜Style.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂Signup
 ┃ ┃ ┣ 📜Style.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂types
 ┃ ┗ 📜userData.ts
 ┣ 📂utills
 ┃ ┣ 📂validation
 ┃ ┃ ┣ 📜validateLoginForm.ts
 ┃ ┃ ┣ 📜validateMyPageForm.ts
 ┃ ┃ ┗ 📜validateSignupForm.ts
 ┃ ┗ 📜common.ts
```

## 📚 기능

로그인 페이지

- [x] width 320 ~ 770px 사이에서는 100%로 렌더링되고, 그 이상의 너비에서는 에러페이지를 출력한다.
- [x] 회원가입 버튼을 클릭하면 회원가입 페이지로 이동한다.
- [x] 로그인 버튼을 클릭하면 로그인을 시도한다.
  - [x] 유효성 검사를 시도한다.
    - [x] 아이디는 이메일 형식이어야 한다.
    - [x] 비밀번호는 13자 이하여야 한다.
    - [x] 숫자, 영문-소, 영문-대, 특수문자가 모두 포함되어야 하며, 연속된 숫자 3개 이상 금지
  - [x] 아이디 비밀번호 불일치시 실패 Alert를 띄운다.

에러 페이지

- [x] 에러 예외처리 페이지를 출력한다.
- [x] 통신 에러 - 3번 이상 가입시도시 에러페이지 출력
- [x] 해상도 에러 - 미지원 해상도 접근시 에러페이지 출력
- 전역 에러 - 나머지 에러 발생 시

  - (테스트를 위해 로그인 실패 3회 시 전역 에러 발생)

회원가입 페이지

- [x] 이미지는 파일명만 저장한다.
- [x] 회원 가입 호출 시 응답이 1초 이상 지연되면 로딩 모션이 출력되어야 한다.
- [x] 회원 가입시 유효성 검사는 사용자 입력에 라이브 하게 체크되어야한다.
- [x] 사용자 데이터는 쿠키에 저장하고 CRUD한다.
- [x] 쿠키에 이미 가입 정보가 있을 경우 덮어쓰기한다.
- [x] 가입 일시 값을 함께 저장한다.
- [x] 회원 가입 성공시 로그인 페이지로 이동한다.

회원 정보 조회 페이지 (로그인 후)

- [x] 쿠키에 저장된 회원 정보를 조회한다.
- [x] ID, 이름, 가입일시, 수정일시를 출력한다.
  - [x] 이름은 수정이 가능하다.

## ⌨️ 이런걸 했어요

### 이 프로젝트에서 집중한 부분

서비스 품질을 높이기 위해 에러 핸들링을 중점삼아 고민했습니다. 선언적으로 에러를 관리하고, UI가 깨지지 않도록 **Error Boundary**를 사용하여 전역 에러를 핸들링했습니다.

중복되는 코드를 줄이기 위해 **Custom Hook**을 사용하여 로직을 분리했습니다. 실제로 useForm 커스텀 훅은 회원가입 페이지와 로그인 페이지, 그리고 회원 정보 조회 페이지에서 사용되며, 각각의 페이지에서 필요한 로직을 커스텀 훅으로 분리하여 재사용성을 크게 높였습니다.
