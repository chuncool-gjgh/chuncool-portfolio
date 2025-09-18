#!/bin/bash

# 🚀 천년수 포트폴리오 빠른 배포 스크립트
echo "🌟 천년수 포트폴리오 Cloudflare Pages 배포 시작!"
echo ""

# GitHub 사용자명 입력 받기
echo "📝 GitHub 사용자명을 입력하세요:"
read -p "GitHub Username: " github_username

if [ -z "$github_username" ]; then
    echo "❌ GitHub 사용자명이 필요합니다."
    exit 1
fi

echo ""
echo "🔗 GitHub 저장소: https://github.com/$github_username/chuncool-portfolio"
echo ""

# 최신 변경사항 커밋
echo "📝 최신 변경사항 커밋 중..."
git add .
git commit -m "Final commit before deployment - $(date '+%Y-%m-%d %H:%M:%S')"

# GitHub 원격 저장소 설정
echo "🔗 GitHub 원격 저장소 연결 중..."
git remote add origin "https://github.com/$github_username/chuncool-portfolio.git"

# 메인 브랜치 설정
echo "🌿 메인 브랜치 설정 중..."
git branch -M main

# GitHub에 푸시
echo "📤 GitHub에 코드 업로드 중..."
echo "⚠️  GitHub 인증이 필요할 수 있습니다."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 GitHub 업로드 성공!"
    echo ""
    echo "📋 다음 단계:"
    echo "1. 🌐 https://dash.cloudflare.com 접속"
    echo "2. 📄 Pages > 'Create a project' 클릭"
    echo "3. 🔗 'Connect to Git' > GitHub 연결"
    echo "4. 📁 'chuncool-portfolio' 저장소 선택"
    echo "5. ⚙️  설정:"
    echo "   - Project name: chuncool-portfolio"
    echo "   - Production branch: main"
    echo "   - Build command: (비워두기)"
    echo "   - Build output directory: /"
    echo "6. 🚀 'Save and Deploy' 클릭"
    echo ""
    echo "🌍 배포 완료 후:"
    echo "- 임시 URL: https://chuncool-portfolio.pages.dev"
    echo "- 커스텀 도메인: chuncool.co.kr 설정"
    echo ""
    echo "✨ 모든 설정이 완료되었습니다!"
else
    echo ""
    echo "❌ GitHub 업로드 실패"
    echo "💡 해결 방법:"
    echo "1. GitHub에서 'chuncool-portfolio' 저장소를 먼저 생성하세요"
    echo "2. Personal Access Token을 사용하여 인증하세요"
    echo "3. 또는 SSH 키를 설정하세요"
    echo ""
    echo "🔗 저장소 생성: https://github.com/new"
    exit 1
fi
