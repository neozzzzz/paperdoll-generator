#!/bin/zsh
# 기존 3001 포트 프로세스 정리
lsof -i :3004 -t 2>/dev/null | xargs kill -9 2>/dev/null
sleep 1
cd /Users/jongho/Projects/paperdoll-generator
exec /opt/homebrew/bin/node node_modules/.bin/next dev -p 3004
