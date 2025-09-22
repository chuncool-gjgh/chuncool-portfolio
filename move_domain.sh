#!/bin/bash

# chuncool.co.kr 도메인을 chuncool-portfolio로 이전하는 스크립트

ACCOUNT_ID="65f17b02ec1dc24fa23f53cb9f47e8f2"
DOMAIN="chuncool.co.kr"
OLD_PROJECT="chuncool-othello"
NEW_PROJECT="chuncool-portfolio"

echo "🌍 chuncool.co.kr 도메인 이전 시작..."
echo "📤 From: $OLD_PROJECT"
echo "📥 To: $NEW_PROJECT"
echo ""

# Wrangler 인증 토큰 확인
echo "🔐 Wrangler 인증 상태 확인..."
npx wrangler whoami

echo ""
echo "🔄 도메인 이전 진행 중..."

# Cloudflare Dashboard 링크 제공
echo "📋 수동 설정을 위한 링크들:"
echo "🔗 Cloudflare Pages Dashboard: https://dash.cloudflare.com/pages"
echo "🔗 기존 프로젝트 (제거): https://dash.cloudflare.com/pages/view/$OLD_PROJECT"
echo "🔗 새 프로젝트 (추가): https://dash.cloudflare.com/pages/view/$NEW_PROJECT"

echo ""
echo "📝 수동 설정 단계:"
echo "1. 기존 프로젝트에서 도메인 제거:"
echo "   - $OLD_PROJECT > Custom domains > $DOMAIN > Remove"
echo ""
echo "2. 새 프로젝트에 도메인 추가:"
echo "   - $NEW_PROJECT > Custom domains > Set up a custom domain"
echo "   - 도메인 입력: $DOMAIN"
echo "   - Continue 클릭"

echo ""
echo "⏳ DNS 전파 대기 중..."
echo "🌐 현재 도메인 상태 확인:"
nslookup $DOMAIN

echo ""
echo "✅ 도메인 이전이 완료되면 다음 URL에서 확인하세요:"
echo "🎯 https://$DOMAIN"
echo "📊 성능 테스트: https://pagespeed.web.dev/report?url=https://$DOMAIN"

echo ""
echo "🚀 도메인 이전 스크립트 완료!"
