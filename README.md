## 서비스 개요
설명에 앞서 2.10(월)에 연락 주셨음에도 평소 면접 합격 관련 연락을 문자로 받아와서 빠르게 인지를 못해서 2.14(금)부터 구현을 시작하게되었습니다. </br>
충분히 더 구현하고 디테일하게 표현할 부분이 많으나 미흡한 결과물을 보내게 되어 너무 죄송스럽고, 그럼에도 과제전형 기회를 주셔서 너무나도 감사드립니다..!!


> 배포 주소 : https://bigs-test-two.vercel.app/

> 계정 정보

<table>
<thead>
<tr>
<th align="center">아이디</th>
<th align="left"><a href="mailto:test01@test.com">bigstest2@test.com</a></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">비밀번호</td>
<td align="left">성공한다1!</td>
</tr>
</tbody>
</table>

## 📚 기술 스택

<div>
NextJS / Styled-component / React-hook-form / Zod / Zustand / Typescript / Terser-webpack-plugin
</div>

## 폴더 구조

```
📁 app
├──📁 api                               # 훅(post는 클라이언트에서 api요청)
│   └──📁 auth
│       ├──📁 login  
│       └──📁 register
│
├──📁 components                        # style.ts / ui 컴포넌트
│   ├──📁 common
│   ├──📁 login
│   ├──📁 navbar
│   ├──📁 post
│   └──📁 register
│
├──📁 hooks                            # 훅
│   ├──📁 login
│   ├──📁 posts
│   └──📁 register
│
├──📁 login                             # 로그인 페이지
│
├──📁 post                              
│   └──📁 [id]                          # 게시글 상세 페이지
│
├──📁 register                          # 회원가입 페이지
│
├──📁 store                             # zustand
├
├──📁 types                             # post 타입
│   └──📁 post
│
├──📁 utils                             # 유틸 함수
│   ├──📁 auth                          # 토큰 인증 / JWT토큰 디코딩
│   ├──📁 validations                   # zod 유효성 검사
│
📁 hooks                                # Auth, Comment, Follow, Like, Post
```

## 인증 API
#### POST 회원가입
  - 회원가입 POST 요청 후 username / name 로컬스토리지에 저장
#### POST 로그인
  - 로그인 POST 요청 후 로컬스토리지에 accessToken / refreshToken 저장
  - JWT 토큰의 페이로드에 들어 있는 유저네임, 이름 데이터 UTF-8로 디코딩하여 영문/한글 깨지지 않게 가져옴
#### POST 리프래시
  - 로그인 이후 다른 서버 요청 api 호출 시 리프래시 POST 통해 액세스 토큰이 만료되어 있으면, 로컬 스토리지에 있는 리프레시 토큰을 통해 액세스 토큰 재발급(로그인/회원가입 제외 전부)
  - 위의 내용 공용 비동기 함수로 만들어서 fetch시도 시 적용해서 컴포넌트 전역으로 사용할 수 있도록 처리
   
## 게시판 API
#### POST 글쓰기
  - JSON형식으로 바디에 타이틀, 내용, 카테고리를 담아서 생성 시도하였으나 서버가 원하는 타입이 아니였음
  - formdata 객체를 사용하여 multipart/form-data 형식이 아닌 application/json 타입으로 JSON 데이터를 Blob으로 감싸서 서버에 전송하여 게시글 생성
#### PATCH 글수정
  - 최초 작성자와 로그인 유저의 아이디가 일치할 때만 수정되도록 시도하였으나 JST 토큰 안에 작성자 데이터가 담겨있지 않음
  - 로그인한 유저의 게시글만 나와 보내주는 구조여서 타이틀 / 내용 / 카테고리 수정하도록 바로 조치
#### DEL 글삭제
  - body에 게시글 데이터 넘기지 않고 바로 삭제 조치
#### GET 글조회
  - 게시글 자세히 클릭했을 때 화면 이동하여 볼 수 있도록 post/[id]/page.tsx에서 요청 결과물 처리
  - 받은 내용 중 title / content / boardCategory / createdAt 만 사용
  - boardCategory가 글 생성 시 입력한 영어로 반환되어서 따로 한글로 바꾸어서 UI 조치 취함
#### GET 글목록조회
  - title과 category, createdAt 즉 content 제외한 데이터 제공해주는 것 확인
  - 메인 페이지에 내용 제외한 글 보여줘서 목록 펼침
#### GET 게시판카테고리
  - 키 값이 영어, 밸류 값이 한글로 데이터 주는 부분 확인
  - UI로는 value인 한글로 보이도록 조치, 서버엔 영어로 전달하여 해당 카테고리 데이터 가져옴
  - 그 값을 기반으로 클라측에서 필터링을 통해 선택한 카테고리의 게시글만 보여주도록 구현

## 로그인 / 회원가입
  - Zod를 이용한 **폼 유효성 검증**(런타임 및 정적 타입 검사)
  - React-Hook-Form를 이용한 **폼 작성**(입력 값 내부에서 관리해서 리렌더링 최소화 및 zod와 호환성 좋아서 채택)
  - app/route.ts 즉, 넥스트 서버에서 api 엔드포인트 관련 코드 넣어서 클라이언트 측에서 엔드포인트 탈취 관련 보안 강화

## 게시글 CRUD
  - 

## 구현 못한 부분

## 트러블 슈팅
