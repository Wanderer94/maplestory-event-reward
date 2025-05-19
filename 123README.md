# maplestory-event-reward

NestJS 기반 MSA 프로젝트 – 메이플스토리 PC 백엔드 과제

이 프로젝트는 사용자 이벤트 조건 검증 및 보상 자동화를 위한 시스템이며, MSA 구조를 기반으로 Gateway, Auth, Event 세 개의 독립 서비스로 구성되어 있습니다.

---

## 1. 디렉토리 구조

```
maplestory-event-reward/
├── app/
│ ├── gateway/ # 인증/권한 검증 및 라우팅
│ ├── auth/ # 로그인, 회원가입, JWT 발급
│ └── event/ # 이벤트 등록, 보상 요청 및 지급
├── docs/ # 설계 문서
├── docker-compose.yml
├── .gitignore
├── README.md
```

---

## 2. 사용 기술

- **Node.js 18**
- **NestJS**
- **MongoDB (Mongoose)**
- **JWT (인증/권한 관리)**
- **Docker / docker-compose**
- **TypeScript**
- **Prettier (포맷터)**

---

## 3. 실행 방법

```bash
# 프로젝트 클론 후
npm install -g @nestjs/cli

# 도커 실행
docker-compose up --build
```

## 4. 사용 기술

- **Node.js 18**
- **NestJS**
- **MongoDB (Mongoose)**
- **JWT (인증/권한 관리)**
- **Docker / docker-compose**
- **TypeScript**
- **Prettier (포맷터)**

---

## 5. 실행 방법

```bash
# 프로젝트 클론 후
npm install -g @nestjs/cli

# 도커 실행
docker-compose up --build
```

---

## 6. 서비스 설명

| 서비스    | 설명                                                     |
| --------- | -------------------------------------------------------- |
| `gateway` | 모든 요청의 진입점. JWT 검증 및 권한 검사 후 라우팅 처리 |
| `auth`    | 유저 등록, 로그인, JWT 발급, 역할(Role) 관리             |
| `event`   | 이벤트 등록, 조건 설정, 보상 정의 및 유저 요청 처리      |

---

## 7. 문서

- 설계 설명: `docs/architecture.md`
- API 명세: 추후 Swagger 또는 `docs/api-specs.md` 작성 예정
