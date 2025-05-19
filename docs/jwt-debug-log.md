# JWT 인증 이슈 회고 - 2025.05.18

## ✅ 개요

NestJS에서 `@nestjs/jwt` 모듈을 활용하여 로그인 및 인증 기능 구현 중, `JwtService.sign()` 호출 시 다음과 같은 오류 발생:

```json
{
  "message": "secretOrPrivateKey must have a value",
  "error": "Internal Server Error"
}
```

---

## 🔍 문제 원인 분석

### 1. JwtService.options가 `{}`로 비어 있었음

- 디버깅 결과 `this.jwtService.options = {}`
- `sign()` 호출 시 `secret`이 누락되어 있음 → 에러 발생

### 2. JwtModule 설정은 정상적으로 작동 중

- `JwtModule.registerAsync(...)` 내부에서 `JWT_SECRET` 값이 잘 출력됨 → useFactory는 실행됨

### 3. 그러나 UsersService가 받은 JwtService 인스턴스는 "설정되지 않은 인스턴스"

- 원인: NestJS 의존성 주입 범위(scope) 이해 부족

### 4. UsersModule에서 JwtModule을 단순 import했지만, AppModule에서 설정한 JwtModule과 연결되지 않았음

- **중복 등록 or exports/import 연결 미비 → 설정 덮어쓰기 or 주입 실패**

---

## 🛠️ 해결 방법

### ✅ AppModule 방식 (실패)

- AppModule에서 JwtModule 설정 후 exports
- UsersModule에서 import
- 문제 발생: 설정 누락된 인스턴스가 주입됨

### ✅ 최종 해결: UsersModule에서 직접 JwtModule.registerAsync()

```ts
JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get("JWT_SECRET") || "dev_secret",
    signOptions: { expiresIn: "1h" },
  }),
});
```

→ 같은 모듈 스코프에서 설정하고 사용하는 방식으로 주입 오류 완전 해결

---

## ✅ 교훈

- NestJS에서 설정된 모듈을 다른 모듈에서 사용하려면 **exports/imports 명확히 연결**해야 한다
- `JwtModule.register()` 또는 `registerAsync()`는 **단 한 번만**, 중복 호출 시 의도치 않게 덮어씌워짐
- 모듈 로컬화가 Nest 구조에서 의존성 충돌을 방지하는 데 효과적이다

---

## ✅ 적용 결과

- JwtService에 `options.secret` 정상 주입 확인
- 토큰 발급 및 검증 정상 작동 (`sign()` / `JwtAuthGuard` / `RolesGuard` 모두 동작)
- Swagger 또는 curl로 `Bearer` 인증 시 토큰 유효성 문제 없음

---

## ✅ 관련 파일 정리

- `users.module.ts` 내 JwtModule.registerAsync()
- `jwt.strategy.ts` / `jwt-auth.guard.ts`
- 디버깅용 로그 제거 완료

---

# 🔄 RESTful 인증 흐름 요약

## ✅ 회원가입 및 로그인

1. `POST /auth/signup` → 사용자 생성 (email, password, role)
2. `POST /auth/login` → 유효한 사용자일 경우 JWT 토큰 반환

```json
{
  "access_token": "<JWT>"
}
```

## ✅ 인증된 사용자 API

- `GET /auth/me`

  - `@UseGuards(JwtAuthGuard)` 적용
  - Authorization: Bearer `<token>`
  - 토큰에서 사용자 정보 추출하여 `req.user`에 할당

## ✅ 관리자 전용 API 흐름

1. `@Roles('ADMIN')` + `@UseGuards(JwtAuthGuard, RolesGuard)`
2. `GET /admin/dashboard` → 관리자 권한만 접근 가능

## ✅ 토큰 구조 예시

```json
{
  "sub": "user_id",
  "email": "user@test.com",
  "role": "USER",
  "iat": 1712345678,
  "exp": 1712349278
}
```

- `sub`: 사용자 ID
- `iat`: 발급 시간
- `exp`: 만료 시간 (1시간 후)
- `role`: 권한 정보 (USER, ADMIN 등)

---

✅ 인증 흐름과 토큰 내용이 명확히 이해되었고, 실제 curl 및 Swagger 요청으로 동작 확인 완료됨.

---
