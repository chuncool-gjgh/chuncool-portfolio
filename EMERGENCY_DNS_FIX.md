# 🚨 EMERGENCY: Error 1000 DNS 충돌 해결

## ⚠️ 문제 상황
- **Error 1000**: DNS points to prohibited IP
- **원인**: DNS가 Cloudflare 내부 IP를 가리켜 충돌 발생
- **해결**: DNS 설정을 올바른 Pages IP로 변경 필요

## 🛠️ 즉시 해결 방법

### 1단계: Cloudflare DNS 설정 변경

**🔗 DNS 관리 페이지**: https://dash.cloudflare.com/zones

**현재 잘못된 설정:**
```
Type: CNAME
Name: @
Target: chuncool-portfolio.pages.dev
```

**올바른 설정으로 변경:**
```
Type: A
Name: @
Value: 172.66.47.155
Proxy: 🟠 Proxied (켜기)

Type: A  
Name: @
Value: 172.66.44.101
Proxy: 🟠 Proxied (켜기)
```

### 2단계: www 서브도메인도 설정

```
Type: CNAME
Name: www
Target: chuncool.co.kr
Proxy: 🟠 Proxied (켜기)
```

### 3단계: Cloudflare Pages에서 도메인 추가

**🔗 Pages 프로젝트**: https://dash.cloudflare.com/pages/view/chuncool-portfolio

1. "Custom domains" 탭
2. "Set up a custom domain"
3. `chuncool.co.kr` 입력
4. "Continue" 클릭

## 🚀 빠른 실행 가이드

**우선순위 1: DNS 수정**
1. https://dash.cloudflare.com/zones 접속
2. chuncool.co.kr 도메인 선택
3. DNS 레코드에서 @ 레코드 수정:
   - CNAME 삭제
   - A 레코드 추가: 172.66.47.155
   - A 레코드 추가: 172.66.44.101

**우선순위 2: Pages 도메인 추가**
1. https://dash.cloudflare.com/pages/view/chuncool-portfolio
2. Custom domains에서 chuncool.co.kr 추가

## ⏱️ 예상 해결 시간

- DNS 변경: 1분
- 전파 시간: 2-5분
- Pages 연결: 2-3분
- **총 소요시간**: 5-10분

## 🔍 해결 확인 방법

```bash
# DNS 전파 확인
dig chuncool.co.kr

# HTTP 상태 확인  
curl -I https://chuncool.co.kr

# 성공 시 200 OK 응답
```

---

## 🎯 핵심 해결책

**지금 즉시 실행:**
1. **DNS 설정 변경** (CNAME → A 레코드)
2. **Pages에서 도메인 추가**
3. **5분 후 https://chuncool.co.kr 테스트**

🚀 **긴급 수정 준비 완료!**
