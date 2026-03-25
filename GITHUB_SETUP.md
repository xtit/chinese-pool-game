# 📋 GitHub 仓库设置完整指南

## 第一步：在 GitHub 创建仓库

### 方法 1：通过网页创建（推荐新手）

1. **访问 GitHub**
   - 打开 https://github.com
   - 登录你的账号

2. **创建新仓库**
   - 点击右上角 "+" → "New repository"
   - 或访问 https://github.com/new

3. **填写信息**
   ```
   Repository name: chinese-pool-game
   Description: 🎱 中式台球游戏 - Chinese Pool Game | HTML5 Canvas Pool Game with Physics Engine
   Visibility: Public（公开，让全世界都能看到）
   
   ✅ Initialize this repository with a README（先不勾选，我们用现有代码）
   ```

4. **点击 "Create repository"**

---

## 第二步：上传代码到 GitHub

### 方法 A：使用命令行（推荐）

在项目目录下执行：

```bash
# 进入项目目录
cd /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "🎱 中式台球游戏初始版本

- 完整的 HTML5 Canvas 渲染
- 真实物理引擎（碰撞、摩擦、反弹）
- 中式台球规则实现
- 双人对战模式
- 力量控制系统
- 犯规判定系统
- 精美 UI 界面

在线试玩：https://YOUR_USERNAME.github.io/chinese-pool-game/"

# 设置主分支名称
git branch -M main

# 关联远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/chinese-pool-game.git

# 推送到 GitHub
git push -u origin main
```

### 方法 B：使用 GitHub Desktop（图形界面）

1. 下载 https://desktop.github.com
2. 安装并登录 GitHub
3. File → Add Local Repository
4. 选择 `chinese-pool-game` 文件夹
5. 输入 Commit 信息
6. Click "Commit to main"
7. Click "Publish repository"

### 方法 C：直接上传文件（适合小项目）

1. 在创建的仓库页面
2. 点击 "uploading an existing file"
3. 拖拽所有文件到浏览器
4. 输入 Commit 信息
5. 点击 "Commit changes"

---

## 第三步：启用 GitHub Pages

1. **进入仓库设置**
   - 在你的仓库页面
   - 点击 "Settings" 标签

2. **配置 Pages**
   - 左侧菜单找到 "Pages"
   - 或在 URL 输入：https://github.com/YOUR_USERNAME/chinese-pool-game/settings/pages

3. **设置部署源**
   ```
   Source: Deploy from a branch
   
   Branch: 
     - main
     - / (root)
   
   Enforce HTTPS: ✅ （启用后自动获取 SSL 证书）
   ```

4. **点击 "Save"**

5. **等待部署**
   - 通常 1-2 分钟完成
   - 刷新页面查看状态
   - 成功后会显示访问链接

---

## 第四步：美化仓库页面

### 更新 README.md

你的 README.md 已经包含：
- ✅ 项目介绍
- ✅ 在线试玩链接
- ✅ 功能特点
- ✅ 操作说明
- ✅ 游戏规则
- ✅ 本地运行方法
- ✅ 部署指南

### 添加 Topics（标签）

在仓库页面右侧：
1. 点击齿轮图标 ⚙️
2. 添加以下 topics：
   ```
   game, html5, javascript, pool, chinese-pool, 
   canvas-game, web-game, physics, two-player, 
   open-source, github-pages
   ```
3. 点击 "Save"

### 添加网站链接

在仓库主页右侧 "About" 区域：
1. 点击齿轮 ⚙️
2. Website: 填入你的 GitHub Pages 链接
   ```
   https://YOUR_USERNAME.github.io/chinese-pool-game/
   ```
3. Save

---

## 第五步：验证部署

### 检查清单

- [ ] 仓库已创建且为 Public
- [ ] 所有文件已上传（index.html, game.js, README.md 等）
- [ ] GitHub Pages 已启用
- [ ] 访问链接可以打开游戏
- [ ] 游戏功能正常

### 测试链接

访问：`https://YOUR_USERNAME.github.io/chinese-pool-game/`

如果看到 404：
- 等待 1-2 分钟再试
- 检查 Pages 设置是否正确
- 确认文件名是 `index.html`（不是 Index.html）

---

## 第六步：分享你的作品

### 获取短链接

GitHub Pages 链接较长，可以使用：
- Bitly: https://bitly.com
- TinyURL: https://tinyurl.com

生成短链接方便分享！

### 分享渠道

**社交媒体：**
```
🎱 我刚刚发布了一款中式台球游戏！
纯网页版，无需下载，即开即玩！
在线试玩：[你的链接]
#HTML5 #WebGame #ChinesePool #独立游戏
```

**技术社区：**
- V2EX: https://www.v2ex.com/go/share
- 知乎：写一篇文章介绍开发过程
- 掘金：https://juejin.cn
- SegmentFault

**游戏平台：**
- Product Hunt: https://www.producthunt.com
- itch.io: https://itch.io

---

## 🔧 常见问题

### Q1: 推送时提示权限错误？
```
A: 确保远程仓库 URL 正确：
   git remote -v  # 查看当前远程
   git remote remove origin
   git remote add origin https://github.com/YOUR_USERNAME/chinese-pool-game.git
```

### Q2: Pages 部署后显示 404？
```
A: 
1. 等待 1-2 分钟
2. 检查 Settings → Pages 设置
3. 确认 index.html 在根目录
4. 清除浏览器缓存
```

### Q3: 如何更新代码？
```bash
git add .
git commit -m "修复 XX 问题 / 添加 XX 功能"
git push
```
自动部署，几分钟后更新生效！

### Q4: 如何绑定自定义域名？
```
1. Settings → Pages → Custom domain
2. 输入你的域名
3. 在域名 DNS 添加 CNAME 记录
4. 等待 DNS 生效
```

---

## 📊 仓库统计

部署成功后，你可以在：
- Insights → Traffic 查看访问量
- Insights → Clone traffic 查看克隆数
- Pulse 查看代码动态

---

## 🎉 恭喜！

你现在拥有了一个：
- ✅ 全球可访问的网页游戏
- ✅ 开源的 GitHub 项目
- ✅ 可以写在简历里的作品
- ✅ 随时可以更新的产品

**开始分享吧，让全世界看到你的作品！** 🌍

---

**需要帮助？**
- GitHub Docs: https://docs.github.com
- GitHub Pages: https://pages.github.com
