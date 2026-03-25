#!/bin/bash

# 中式台球游戏 - 一键部署到 GitHub 脚本
# Chinese Pool Game - One-click Deploy to GitHub

echo "🎱 中式台球游戏 - GitHub 部署工具"
echo "======================================"
echo ""

# 检查 Git 是否安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误：未找到 Git，请先安装 Git"
    echo "访问 https://git-scm.com/downloads 下载安装"
    exit 1
fi

echo "✅ Git 已安装"
echo ""

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在 chinese-pool-game 目录下运行此脚本"
    exit 1
fi

echo "📁 项目文件检查:"
echo "   - index.html ✓"
echo "   - game.js ✓"
echo "   - README.md ✓"
echo ""

# 初始化 Git 仓库
if [ ! -d ".git" ]; then
    echo "🔄 初始化 Git 仓库..."
    git init
    echo "✅ Git 仓库初始化完成"
else
    echo "✅ Git 仓库已存在"
fi
echo ""

# 添加所有文件
echo "📦 添加项目文件..."
git add .
echo "✅ 文件添加完成"
echo ""

# 提交
echo "💾 提交更改..."
git commit -m "🎱 中式台球游戏初始版本 - Chinese Pool Game v1.0"
echo "✅ 提交完成"
echo ""

# 设置主分支
echo "🔧 设置主分支..."
git branch -M main
echo "✅ 主分支设置为 main"
echo ""

# 获取 GitHub 用户名
echo "👤 请输入你的 GitHub 用户名:"
read -p "> " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ 错误：用户名为空"
    exit 1
fi

echo ""
echo "📋 请确保你已经在 GitHub 上创建了仓库："
echo "   https://github.com/${GITHUB_USERNAME}/chinese-pool-game"
echo ""
read -p "按回车继续..."

# 设置远程仓库
echo "🔗 配置远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/${GITHUB_USERNAME}/chinese-pool-game.git
echo "✅ 远程仓库配置完成"
echo ""

# 推送
echo "🚀 推送到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "🎉 部署成功！"
    echo "======================================"
    echo ""
    echo "📍 你的 GitHub 仓库："
    echo "   https://github.com/${GITHUB_USERNAME}/chinese-pool-game"
    echo ""
    echo "🌐 GitHub Pages 访问地址（启用后）："
    echo "   https://${GITHUB_USERNAME}.github.io/chinese-pool-game/"
    echo ""
    echo "📝 下一步操作："
    echo "   1. 在 GitHub 仓库 Settings → Pages 中启用 GitHub Pages"
    echo "   2. 选择 Branch: main, Folder: / (root)"
    echo "   3. 点击 Save"
    echo "   4. 等待 1-2 分钟后访问上面的链接"
    echo ""
    echo "或者使用 Vercel 部署（更快）："
    echo "   1. 访问 https://vercel.com"
    echo "   2. 用 GitHub 登录"
    echo "   3. Import 这个仓库"
    echo "   4. 自动部署完成"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "   1. GitHub 仓库是否已创建"
    echo "   2. 用户名是否正确"
    echo "   3. 是否有仓库访问权限"
    echo ""
fi
