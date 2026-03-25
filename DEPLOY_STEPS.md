# 🎱 中式台球游戏 - 部署发布完整步骤

## ✅ 已完成的工作

1. ✓ 游戏开发完成（HTML5 + JavaScript 物理引擎）
2. ✓ Git 仓库已初始化
3. ✓ 代码已提交（10 个文件）
4. ✓ 部署文档已准备

## 🚀 接下来只需 3 步

### 第 1 步：在 GitHub 创建仓库（2 分钟）

1. 打开 https://github.com/new
2. 仓库名称：`chinese-pool-game`
3. 设置为 **Public**（公开）
4. **不要**勾选"Initialize this repository with a README"
5. 点击 "Create repository"

### 第 2 步：推送代码到 GitHub（1 分钟）

在你的终端执行以下命令：

```bash
# 进入项目目录
cd /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game

# 设置你的 GitHub 用户名（替换 YOUR_GITHUB_USERNAME）
export GITHUB_USER="YOUR_GITHUB_USERNAME"

# 添加远程仓库
git remote set-url origin https://github.com/${GITHUB_USER}/chinese-pool-game.git

# 推送到 GitHub
git push -u origin main
```

**如果遇到认证问题**，使用 Personal Access Token：
```bash
# 使用 Token 推送（替换 YOUR_TOKEN）
git push https://YOUR_GITHUB_USERNAME:YOUR_TOKEN@github.com/YOUR_GITHUB_USERNAME/chinese-pool-game.git main
```

### 第 3 步：启用 GitHub Pages（1 分钟）

1. 打开你的仓库页面：https://github.com/YOUR_USERNAME/chinese-pool-game
2. 点击 **Settings** → **Pages**
3. Source 选择：**Deploy from a branch**
4. Branch 选择：**main** / **/** (root)
5. 点击 **Save**
6. 等待 1-2 分钟，页面会显示访问地址

🎉 完成后你的游戏将在：
```
https://YOUR_USERNAME.github.io/chinese-pool-game/
```

---

## 🌐 其他免费部署平台（可选）

### Vercel（推荐）
1. 访问 https://vercel.com
2. 用 GitHub 账号登录
3. 点击 "New Project"
4. 导入 `chinese-pool-game` 仓库
5. 自动部署，获得域名：`https://chinese-pool-game.vercel.app`

### Netlify
1. 访问 https://netlify.com
2. 拖拽 `chinese-pool-game` 文件夹到部署区域
3. 获得域名：`https://xxx.netlify.app`

---

## 📋 游戏功能测试清单

部署后请测试以下功能：

- [ ] 白球控制：鼠标拖拽调整击球方向和力度
- [ ] 瞄准线：虚线显示预测轨迹
- [ ] 力度条：右侧绿色进度条显示当前力度
- [ ] 碰撞检测：球与球、球与桌边碰撞正常
- [ ] 进球效果：球进袋后有动画和提示
- [ ] 重置功能：点击"重新开始"按钮重置游戏
- [ ] 移动端适配：手机上可以正常操作

---

## 📦 项目文件说明

```
chinese-pool-game/
├── index.html          # 游戏主页面
├── game.js            # 游戏核心逻辑（物理引擎、碰撞检测）
├── README.md          # 项目说明文档
├── DEPLOY_STEPS.md    # 本部署指南
├── vercel.json        # Vercel 部署配置
├── .gitignore         # Git 忽略文件
└── .git/              # Git 仓库数据
```

---

## 💡 常见问题

**Q: 推送时出现 "Permission denied"**
A: 确保你在 GitHub 创建了仓库，并且使用了正确的用户名

**Q: GitHub Pages 不显示**
A: 等待 1-2 分钟，刷新 Settings → Pages 页面查看状态

**Q: 游戏加载空白**
A: 检查浏览器控制台是否有错误，确保所有文件都已推送

---

## 🎮 游戏操作说明

- **瞄准**：鼠标移动调整方向
- **蓄力**：按住鼠标左键，力度条增长
- **击球**：松开鼠标左键
- **重置**：点击"重新开始"按钮

---

准备好了吗？现在开始第 1 步：去 GitHub 创建仓库吧！🚀
