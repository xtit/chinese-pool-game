#!/bin/bash

# 中式台球游戏 - 使用 Token 部署到 GitHub
# 使用方法：./deploy-with-token.sh

echo "🚀 中式台球游戏 GitHub 部署工具"
echo "================================"
echo ""

# 检查 Git 是否安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误：未找到 Git，请先安装 Git"
    exit 1
fi

# 进入项目目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "📁 项目目录：$SCRIPT_DIR"
echo ""

# 获取 GitHub 用户名
read -p "请输入你的 GitHub 用户名：" GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ 错误：用户名不能为空"
    exit 1
fi

echo ""
echo "🔑 接下来需要 Personal Access Token"
echo "如果没有 Token，请按以下步骤创建："
echo "1. 打开：https://github.com/settings/tokens"
echo "2. 点击 'Generate new token (classic)'"
echo "3. Note 填写：Chinese Pool Game"
echo "4. Expiration 选择：No expiration"
echo "5. Select scopes 勾选：repo（全选）"
echo "6. 点击 'Generate token' 并复制生成的 token"
echo ""

read -sp "请输入你的 GitHub Token（以 ghp_ 开头）：" GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ 错误：Token 不能为空"
    exit 1
fi

echo ""
echo "⚙️  正在配置 Git..."

# 设置 Git 用户信息
git config --global user.name "$GITHUB_USERNAME"
echo "✅ Git 用户名已设置：$GITHUB_USERNAME"

# 移除旧的 remote
git remote remove origin 2>/dev/null || true
echo "✅ 已清理旧的 remote 配置"

# 添加新的 remote（包含 Token）
REMOTE_URL="https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/chinese-pool-game.git"
git remote add origin "$REMOTE_URL"
echo "✅ Remote 已配置"

echo ""
echo "📤 正在推送代码到 GitHub..."

# 切换到 main 分支
git branch -M main 2>/dev/null || true

# 推送代码
if git push -u origin main --force; then
    echo ""
    echo "🎉 部署成功！"
    echo ""
    echo "🌐 你的游戏地址："
    echo "https://${GITHUB_USERNAME}.github.io/chinese-pool-game/"
    echo ""
    echo "⚠️  记得在 GitHub 仓库启用 Pages："
    echo "1. 打开：https://github.com/${GITHUB_USERNAME}/chinese-pool-game/settings/pages"
    echo "2. Source 选择：main"
    echo "3. 点击 Save"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "1. GitHub 仓库是否已创建（名称：chinese-pool-game）"
    echo "2. Token 是否正确且有 repo 权限"
    echo "3. 用户名是否正确"
    exit 1
fi
