# 🚀 Cloudflare Pages 배포 가이드

## chuncool.co.kr 도메인으로 천년수 포트폴리오 배포하기

### 📋 사전 준비사항

✅ **이미 완료된 사항들:**
- 웹사이트 파일들이 모두 준비됨
- `_headers` 파일 설정 완료 (보안 헤더, 캐시 설정)
- `_redirects` 파일 설정 완료 (HTTPS 리다이렉트, SPA 라우팅)
- 반응형 디자인 구현 완료
- 성능 최적화 완료

### 🌐 1단계: Cloudflare 계정 및 도메인 설정

1. **Cloudflare 계정 로그인**
   - [Cloudflare Dashboard](https://dash.cloudflare.com) 접속
   - 계정이 없다면 회원가입

2. **도메인 등록 확인**
   - `chuncool.co.kr` 도메인이 Cloudflare에 등록되어 있는지 확인
   - 도메인이 없다면 먼저 도메인 등록 필요

### 📁 2단계: GitHub 저장소 준비

1. **GitHub 저장소 생성**
   ```bash
   # 현재 디렉토리에서 Git 초기화
   cd /Users/balmyeong/vibecoding-study/study_claude_code
   git init
   
   # 파일들 추가
   git add .
   git commit -m "Initial commit: Chuncool Portfolio Website"
   
   # GitHub에 저장소 생성 후 연결
   git remote add origin https://github.com/[YOUR_USERNAME]/chuncool-portfolio.git
   git branch -M main
   git push -u origin main
   ```

### ⚡ 3단계: Cloudflare Pages 배포

1. **Cloudflare Pages 접속**
   - Cloudflare Dashboard > Pages 메뉴 선택
   - "Create a project" 클릭

2. **GitHub 연결**
   - "Connect to Git" 선택
   - GitHub 계정 연결 및 저장소 선택
   - `chuncool-portfolio` 저장소 선택

3. **빌드 설정**
   ```
   Project name: chuncool-portfolio
   Production branch: main
   Build command: (비워두기 - 정적 사이트)
   Build output directory: / (루트 디렉토리)
   ```

4. **환경 변수** (필요시)
   - 특별한 환경 변수 없음 (정적 사이트)

### 🌍 4단계: 커스텀 도메인 설정

1. **도메인 추가**
   - Pages 프로젝트 > "Custom domains" 탭
   - "Set up a custom domain" 클릭
   - `chuncool.co.kr` 입력

2. **DNS 설정 확인**
   ```
   Type: CNAME
   Name: @
   Target: [your-project].pages.dev
   
   Type: CNAME  
   Name: www
   Target: [your-project].pages.dev
   ```

### 🔧 5단계: 추가 최적화 설정

1. **Performance 설정**
   - Auto Minify: HTML, CSS, JavaScript 활성화
   - Brotli 압축 활성화
   - HTTP/2 및 HTTP/3 활성화

2. **Security 설정**
   - Always Use HTTPS 활성화
   - HSTS 설정
   - Security Level: Medium

3. **Caching 설정**
   - Browser Cache TTL: 4 hours
   - Development Mode: Off (배포 후)

### 📊 6단계: 배포 확인 및 테스트

1. **기본 확인사항**
   - [ ] 사이트가 정상적으로 로드되는가?
   - [ ] 모든 섹션이 올바르게 표시되는가?
   - [ ] 반응형 디자인이 작동하는가?
   - [ ] 애니메이션이 부드럽게 동작하는가?

2. **성능 테스트**
   - [PageSpeed Insights](https://pagespeed.web.dev/) 테스트
   - [GTmetrix](https://gtmetrix.com/) 성능 분석
   - 목표: Lighthouse 점수 95+ 달성

3. **기능 테스트**
   - [ ] 네비게이션 메뉴 동작
   - [ ] 스무스 스크롤 기능
   - [ ] 연락 폼 제출 (UI만)
   - [ ] 모바일 메뉴 토글

### 🚨 문제 해결

**일반적인 문제들:**

1. **404 오류**
   - `_redirects` 파일이 올바르게 설정되었는지 확인
   - SPA 리다이렉트 규칙: `/* /index.html 200`

2. **CSS/JS 파일이 로드되지 않음**
   - 파일 경로가 상대경로로 올바르게 설정되었는지 확인
   - `_headers` 파일의 캐시 설정 확인

3. **도메인 연결 실패**
   - DNS 설정이 올바른지 확인
   - DNS 전파 시간 대기 (최대 48시간)

4. **성능 이슈**
   - 이미지 최적화 (WebP 형식 사용)
   - CSS/JS 파일 압축 확인
   - 불필요한 리소스 제거

### 📈 7단계: 모니터링 설정

1. **Analytics 설정**
   - Cloudflare Web Analytics 활성화
   - Google Analytics 연동 (선택사항)

2. **성능 모니터링**
   - Real User Monitoring (RUM) 설정
   - Core Web Vitals 추적

### 🔄 8단계: 자동 배포 설정

**Git 기반 자동 배포가 이미 설정됨:**
- `main` 브랜치에 푸시하면 자동 배포
- Pull Request 시 미리보기 배포 생성
- 빌드 로그 및 배포 상태 확인 가능

### 📞 지원 및 문의

**배포 관련 문제가 발생하면:**
1. Cloudflare Pages 문서 참조
2. Cloudflare Community 포럼 활용
3. 기술적 이슈는 GitHub Issues 활용

---

## 🎉 배포 완료 후 확인사항

✅ **최종 체크리스트:**
- [ ] https://chuncool.co.kr 접속 확인
- [ ] SSL 인증서 정상 작동
- [ ] 모든 페이지 섹션 정상 표시
- [ ] 모바일/태블릿 반응형 확인
- [ ] 성능 점수 95+ 달성
- [ ] 연락처 정보 정확성 확인

**축하합니다! 🎊 천년수 포트폴리오 웹사이트가 성공적으로 배포되었습니다.**

---

*이 가이드는 2024년 9월 기준으로 작성되었으며, Cloudflare의 UI나 정책 변경에 따라 일부 내용이 달라질 수 있습니다.*
