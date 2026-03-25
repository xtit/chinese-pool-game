# 🎱 中式台球游戏 - 快速部署指南

## ✅ 已完成

你的中式台球游戏已经开发完成！包含以下功能：

- ✅ 完整的中式台球规则（15 颗目标球 + 白球）
- ✅ 真实的物理碰撞引擎
- ✅ 拖拽式击球控制系统
- ✅ 力度指示器和瞄准线
- ✅ 进球检测和重置功能
- ✅ 响应式设计，支持桌面和移动端

## 🚀 三种免费发布方式

### 方式一：GitHub Pages（推荐 ⭐⭐⭐⭐⭐）

**优势**：永久免费、稳定可靠、全球访问、代码托管一体化

**操作步骤**：

```bash
# 1. 打开终端，进入游戏目录
cd /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "Initial commit: Chinese Pool Game"

# 5. 在 GitHub.com 创建新仓库（名称如：chinese-pool-game）
# 然后按提示关联远程仓库并推送
git remote add origin https://github.com/YOUR_USERNAME/chinese-pool-game.git
git branch -M main
git push -u origin main
```

**启用 GitHub Pages**：
1. 打开你的 GitHub 仓库页面
2. 点击 **Settings** → **Pages**
3. Source 选择 **Deploy from a branch**
4. Branch 选择 **main**，文件夹选择 **/(root)**
5. 点击 **Save**
6. 等待 1-2 分钟，你的游戏就会发布到：`https://YOUR_USERNAME.github.io/chinese-pool-game/`

---

### 方式二：Vercel（最快 ⭐⭐⭐⭐⭐）

**优势**：一键部署、自动 HTTPS、全球 CDN、无需配置

**操作步骤**：

1. 访问 [vercel.com](https://vercel.com)
2. 用 GitHub 账号登录
3. 点击 **Add New Project**
4. 选择 **Import Git Repository**
5. 选择你的 `chinese-pool-game` 仓库
6. 点击 **Deploy**
7. 完成！获得网址如：`https://chinese-pool-game.vercel.app`

**或者使用命令行**：
```bash
npm i -g vercel
cd /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game
vercel --prod
```

---

### 方式三：Netlify（简单 ⭐⭐⭐⭐）

**优势**：拖拽部署、自动 SSL、表单收集、分析功能

**操作步骤**：

1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录账号
3. 点击 **Add new site** → **Deploy manually**
4. 将整个 `chinese-pool-game` 文件夹拖拽到上传区域
5. 完成！获得网址如：`https://your-site-name.netlify.app`

---

## 📱 分享你的游戏

部署成功后，你可以：

- 🌐 将网址分享给全世界的朋友
- 📲 在手机、平板、电脑上都能玩
- 🔗 嵌入到其他网站或博客
- 📢 发布到社交媒体展示你的作品

---

## 🎮 游戏操作说明

1. **瞄准**：鼠标移动调整击球方向
2. **蓄力**：按住鼠标左键，向后拖动控制力度
3. **击球**：松开鼠标左键击打白球
4. **重置**：点击"重置游戏"按钮重新开始

---

## 🛠️ 本地测试

如果你想先在本地查看效果：

**方法一：直接用浏览器打开**
```bash
# 双击 index.html 文件即可在浏览器中打开
open /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game/index.html
```

**方法二：使用 Python 启动本地服务器**
```bash
cd /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game
python3 -m http.server 8000
# 然后在浏览器访问 http://localhost:8000
```

---

## 📦 项目文件清单

```
chinese-pool-game/
├── index.html          # 游戏主页面
├── game.js            # 游戏核心逻辑
├── README.md          # 项目说明文档
├── DEPLOY_GUIDE.md    # 详细部署指南
├── PUBLISH_README.md  # 发布说明
├── GITHUB_SETUP.md    # GitHub 设置指南
├── QUICK_DEPLOY.md    # 本文件
├── .gitignore         # Git 忽略文件
└── vercel.json        # Vercel 部署配置
```

---

## 💡 下一步建议

1. **立即部署**：选择上述任一方式，3 分钟内即可上线
2. **分享给朋友**：获取反馈，继续优化
3. **添加新功能**：如多人对战、计分系统、音效等
4. **自定义外观**：修改球桌颜色、球的样式等

---

**祝你部署顺利！🎉**

如有问题，请查看各平台的官方文档或随时询问我。
