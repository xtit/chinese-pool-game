#!/bin/bash

# 中式台球游戏 - GitHub 推送脚本
# 作者：徐杰
# 日期：2026-03-25

echo "🎱 中式台球游戏 - GitHub 部署"
echo "================================"
echo ""

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在 chinese-pool-game 目录下运行此脚本"
    exit 1
fi

echo "✅ 检测到游戏文件"
echo ""

# 配置 Git 用户信息（如果未配置）
git config user.name "xujie123" 2>/dev/null || true
git config user.email "xjy@xtit.net" 2>/dev/null || true

echo "📝 Git 用户信息已配置"
echo ""

# 确保在 main 分支
git branch -M main 2>/dev/null || true
echo "✅ 当前分支：main"
echo ""

# 添加所有文件
echo "📦 准备提交文件..."
git add .
git commit -m "🎱 Chinese Pool Game - Ready for deployment" 2>/dev/null || echo "ℹ️  没有新文件需要提交"
echo ""

# 设置远程仓库
echo "🔗 配置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/xujie123/chinese-pool-game.git
echo "✅ 远程仓库已配置：https://github.com/xujie123/chinese-pool-game.git"
echo ""

# 推送代码
echo "🚀 开始推送代码到 GitHub..."
echo ""
echo "⚠️  当提示输入时："
echo "   - Username: xujie123"
echo "   - Password: 粘贴你的 Personal Access Token (以 ghp_ 开头)"
echo ""
echo "💡 如果没有 Token，请访问：https://github.com/settings/tokens"
echo "   创建一个新的 token，勾选 'repo' 权限"
echo ""
read -p "按回车键继续..."

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 推送成功！"
    echo ""
    echo "🌐 访问你的游戏："
    echo "   https://xujie123.github.io/chinese-pool-game/"
    echo ""
    echo "📋 GitHub 仓库地址："
    echo "   https://github.com/xujie123/chinese-pool-game"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "   1. GitHub 仓库是否已创建"
    echo "   2. Token 是否正确"
    echo "   3. 网络连接是否正常"
    echo ""
fi
