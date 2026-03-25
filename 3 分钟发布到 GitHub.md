# 🚀 3 分钟发布中式台球游戏到 GitHub

## 第 1 步：在 GitHub 创建仓库（1 分钟）

1. 打开 https://github.com/new
2.  Repository name: `chinese-pool-game`
3.  设置为 **Public**（公开）
4.  点击 **Create repository**

---

## 第 2 步：获取 Personal Access Token（1 分钟）

GitHub 从 2021 年起不再支持密码推送，需要使用 Token：

1. 打开 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 填写信息：
   - **Note**: `Chinese Pool Game`
   - **Expiration**: `No expiration`
   - **Select scopes**: 勾选 ✅ **repo**（全选）
4. 点击 **Generate token**
5. **立即复制**生成的 token（以 `ghp_` 开头）⚠️ 只显示一次

---

## 第 3 步：运行部署命令（1 分钟）

在终端依次执行：

```bash
# 进入项目目录
cd /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/chinese-pool-game.git

# 切换到 main 分支
git branch -M main

# 推送代码（会提示输入用户名和密码）
git push -u origin main
```

**当提示输入密码时：**
- Username: 你的 GitHub 用户名
- Password: **粘贴刚才复制的 Token**（不是你的 GitHub 登录密码）

---

## ✅ 完成后的访问链接

```
https://你的用户名.github.io/chinese-pool-game/
```

---

## 🎮 游戏说明

- **瞄准**：鼠标拖拽白球
- **力度**：拖动距离决定击球力度
- **击球**：松开鼠标发射
- **目标**：将所有球打入袋中

支持电脑和手机浏览器！

---

## ❓ 遇到问题？

如果推送失败，请检查：
1. GitHub 仓库是否已创建
2. Token 是否正确复制（以 `ghp_` 开头）
3. 远程仓库 URL 中的用户名是否正确

需要帮助随时告诉我！
