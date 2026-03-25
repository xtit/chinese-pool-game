#!/bin/bash

# 中式台球游戏 - 一键推送到 GitHub 脚本
# 使用方法：./push-to-github.sh YOUR_GITHUB_USERNAME

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🎱 中式台球游戏 - GitHub 部署工具${NC}\n"

# 检查参数
if [ -z "$1" ]; then
    echo -e "${YELLOW}用法:${NC} ./push-to-github.sh YOUR_GITHUB_USERNAME"
    echo ""
    echo "例如：./push-to-github.sh xujie123"
    echo ""
    read -p "请输入你的 GitHub 用户名：" GITHUB_USER
else
    GITHUB_USER=$1
fi

# 检查 Git 是否已安装
if ! command -v git &> /dev/null; then
    echo -e "${RED}错误：Git 未安装，请先安装 Git${NC}"
    exit 1
fi

# 进入项目目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "\n${GREEN}✓ 项目目录:${NC} $PWD"

# 更新远程仓库地址
REMOTE_URL="https://github.com/${GITHUB_USER}/chinese-pool-game.git"
echo -e "\n${YELLOW}正在设置远程仓库...${NC}"
git remote set-url origin $REMOTE_URL
echo -e "${GREEN}✓ 远程仓库:${NC} $REMOTE_URL"

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
    echo -e "\n${YELLOW}检测到未提交的更改，正在提交...${NC}"
    git add .
    git commit -m "Auto-commit before deploy 🚀"
fi

# 推送到 GitHub
echo -e "\n${YELLOW}正在推送到 GitHub...${NC}"
echo -e "${YELLOW}提示：如果提示输入密码，请使用 Personal Access Token${NC}"
echo -e "${YELLOW}Token 获取：https://github.com/settings/tokens${NC}"
echo ""

if git push -u origin main; then
    echo ""
    echo -e "${GREEN}===========================================${NC}"
    echo -e "${GREEN}✅ 推送成功！${NC}"
    echo -e "${GREEN}===========================================${NC}"
    echo ""
    echo -e "${YELLOW}接下来请执行以下步骤:${NC}"
    echo ""
    echo "1️⃣  打开仓库页面:"
    echo -e "   ${GREEN}https://github.com/${GITHUB_USER}/chinese-pool-game${NC}"
    echo ""
    echo "2️⃣  启用 GitHub Pages:"
    echo "   - 点击 Settings → Pages"
    echo "   - Source: Deploy from a branch"
    echo "   - Branch: main → root"
    echo "   - 点击 Save"
    echo ""
    echo "3️⃣  等待 1-2 分钟后访问:"
    echo -e "   ${GREEN}https://${GITHUB_USER}.github.io/chinese-pool-game/${NC}"
    echo ""
    echo -e "${GREEN}🎉 恭喜！你的游戏将向全世界开放！${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}❌ 推送失败${NC}"
    echo ""
    echo -e "${YELLOW}可能的解决方案:${NC}"
    echo "1. 确保已在 GitHub 创建仓库：chinese-pool-game"
    echo "2. 使用 Personal Access Token 代替密码"
    echo "3. 检查网络连接"
    echo ""
    echo -e "${YELLOW}手动推送命令:${NC}"
    echo "git push https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/chinese-pool-game.git main"
    echo ""
    exit 1
fi
