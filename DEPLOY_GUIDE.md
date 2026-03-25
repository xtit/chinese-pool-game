# 🚀 快速部署指南

## 方式一：Vercel 部署（推荐 - 最快）

### 步骤：

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 选择你刚创建的 `chinese-pool-game` 仓库

3. **部署**
   - 保持默认设置
   - 点击 "Deploy"
   - 等待 1-2 分钟完成

4. **获取访问链接**
   - 部署完成后会获得类似这样的链接：
   - `https://chinese-pool-game.vercel.app`
   - 全球可访问！

---

## 方式二：GitHub Pages 部署

### 命令行操作：

```bash
# 进入项目目录
cd chinese-pool-game

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "🎱 中式台球游戏 - Chinese Pool Game"

# 创建主分支
git branch -M main

# 关联远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/chinese-pool-game.git

# 推送到 GitHub
git push -u origin main
```

### GitHub 设置：

1. 进入你的仓库页面
2. 点击 **Settings** → **Pages**
3. Source 选择：**Deploy from a branch**
4. Branch 选择：**main** / **(root)**
5. 点击 **Save**

### 访问地址：
```
https://YOUR_USERNAME.github.io/chinese-pool-game/
```

---

## 方式三：Netlify 部署

### 方法 A：拖拽部署（最简单）

1. 访问 https://app.netlify.com/drop
2. 直接将 `chinese-pool-game` 文件夹拖到网页上
3. 立即获得访问链接！

### 方法 B：Git 部署

1. 登录 https://netlify.com
2. 点击 "Add new site" → "Import an existing project"
3. 连接 GitHub，选择你的仓库
4. 点击 "Deploy site"

---

## 方式四：Cloudflare Pages

1. 登录 https://dash.cloudflare.com
2. 导航到 **Workers & Pages** → **Create application**
3. 选择 **Pages** → **Connect to Git**
4. 选择你的仓库
5. 点击 **Begin setup** → **Save and Deploy**

---

## ✅ 部署后测试清单

部署完成后，请测试以下功能：

- [ ] 游戏能否正常加载
- [ ] 鼠标移动是否能瞄准
- [ ] 按住空格是否能蓄力（力量条增长）
- [ ] 松开空格是否能击球
- [ ] 球与球之间碰撞是否正常
- [ ] 球进袋后是否消失
- [ ] 白球进袋后是否重新放置
- [ ] 玩家切换是否正常
- [ ] 黑八进袋是否判定胜负
- [ ] 重新开始按钮是否有效

---

## 🌍 全球访问

部署成功后，你的游戏将通过 CDN 分发到全球：
- ✅ 亚洲（中国、日本、韩国、新加坡等）
- ✅ 欧洲（英国、德国、法国等）
- ✅ 北美（美国、加拿大）
- ✅ 南美、大洋洲、非洲

所有用户只需一个链接即可访问，无需安装！

---

## 📱 分享你的游戏

获得链接后，你可以：
- 在社交媒体分享（微信、微博、Twitter）
- 发送给朋友一起玩
- 嵌入到个人网站或博客
- 提交到游戏聚合平台

---

## 💡 提示

- **首次部署**建议使用 Vercel，最快 2 分钟完成
- 如果想要自定义域名，各平台都支持免费绑定
- 所有平台都提供免费的 HTTPS 证书
- 部署后每次 push 代码都会自动更新

**祝你部署成功！🎉**
