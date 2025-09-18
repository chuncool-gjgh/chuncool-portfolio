#!/bin/bash

# 천년수 포트폴리오 배포 스크립트
# chuncool.co.kr 도메인으로 Cloudflare Pages 배포

echo "🚀 천년수 포트폴리오 배포 시작..."

# Git 상태 확인
echo "📋 Git 상태 확인 중..."
git status

# 변경사항이 있는지 확인
if [[ -n $(git status -s) ]]; then
    echo "📝 변경사항 발견. 커밋을 진행합니다..."
    
    # 모든 변경사항 스테이징
    git add .
    
    # 커밋 메시지 입력 받기
    echo "💬 커밋 메시지를 입력하세요:"
    read commit_message
    
    # 기본 메시지 설정
    if [ -z "$commit_message" ]; then
        commit_message="Update portfolio website - $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    # 커밋 실행
    git commit -m "$commit_message"
    echo "✅ 커밋 완료: $commit_message"
else
    echo "✅ 변경사항이 없습니다."
fi

# 원격 저장소에 푸시
echo "📤 원격 저장소에 푸시 중..."
git push origin main

if [ $? -eq 0 ]; then
    echo "🎉 배포 완료!"
    echo "🌐 사이트 확인: https://chuncool.co.kr"
    echo "⏳ Cloudflare Pages가 자동으로 배포를 진행합니다. (약 1-2분 소요)"
    echo "📊 배포 상태는 Cloudflare Dashboard에서 확인하세요."
else
    echo "❌ 푸시 실패. Git 설정을 확인해주세요."
    exit 1
fi

echo "✨ 배포 스크립트 완료!"
