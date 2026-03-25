#!/bin/bash

# 中式台球游戏 - 一键推送到 GitHub
# 使用方法：./一键推送 GitHub.sh your-github-username

# 检查是否提供了 GitHub 用户名
if [ -z "$1" ]; then
    echo "❌ 请提供你的 GitHub 用户名"
    echo "用法：./一键推送 GitHub.sh your-username"
    echo "例如：./一键推送 GitHub.sh xujie123"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="chinese-pool-game"
REMOTE_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "🎱 中式台球游戏 - 开始部署到 GitHub"
echo "======================================"
echo ""
echo "GitHub 用户名：${GITHUB_USERNAME}"
echo "仓库地址：${REMOTE_URL}"
echo ""

# 确认推送
read -p "确认要推送到 GitHub 吗？(y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "❌ 已取消推送"
    exit 0
fi

echo ""
echo "📦 步骤 1/4: 设置远程仓库..."
# 移除旧的 remote（如果存在）
git remote remove origin 2>/dev/null
git remote add origin $REMOTE_URL

echo "✅ 远程仓库已设置"
echo ""

echo "📦 步骤 2/4: 切换到 main 分支..."
git branch -M main
echo "✅ 分支已设置"
echo ""

echo "📦 步骤 3/4: 推送到 GitHub..."
echo "💡 提示：如果是第一次推送，可能需要输入 GitHub 用户名和密码（或 Token）"
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "======================================"
    echo "🎉 恭喜！代码已成功上传到 GitHub"
    echo "======================================"
    echo ""
    echo "📍 下一步：启用 GitHub Pages"
    echo "1. 打开：https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
    echo "2. Source 选择 'Deploy from a branch'"
    echo "3. Branch 选择 'main'，文件夹选择 '/(root)'"
    echo "4. 点击 'Save'"
    echo ""
    echo "🌐 完成后访问：https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
    echo ""
    echo "🎮 让全世界一起玩你的游戏吧！"
    echo ""
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "可能的原因："
    echo "1. GitHub 仓库不存在 - 请先在 https://github.com/new 创建仓库"
    echo "2. 认证失败 - 请使用 Personal Access Token 代替密码"
    echo "3. 网络问题 - 请检查网络连接"
    echo ""
    exit 1
fi
