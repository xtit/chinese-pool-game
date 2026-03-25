# GitHub 部署认证问题解决方案

## 🔍 问题分析

从截图看到错误信息：
- `remote: Support for password authentication was removed` - GitHub 已不再支持密码认证
- `Authentication failed` - 认证失败

## ✅ 解决方案（推荐方案一）

### 方案一：使用 Personal Access Token（最简单）

#### 第 1 步：创建 Token

1. 打开 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 填写信息：
   - **Note**: `Chinese Pool Game Deploy`
   - **Expiration**: 选择 `No expiration`
   - **Select scopes**: 勾选 `repo`（全部权限）
4. 点击 **Generate token**
5. **复制生成的 token**（以 `ghp_` 开头，只显示一次！）

#### 第 2 步：更新远程仓库地址

```bash
cd /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game

# 移除旧的 remote
git remote remove origin

# 添加新的 remote（替换为你的 GitHub 用户名）
git remote add origin https://YOUR_USERNAME@github.com/YOUR_USERNAME/chinese-pool-game.git
```

#### 第 3 步：推送代码

```bash
# 推送到 main 分支
git push -u origin main
```

当提示输入密码时，**粘贴刚才创建的 Token**（不是你的 GitHub 登录密码）

---

### 方案二：使用 SSH 密钥（永久方便）

#### 第 1 步：生成 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
一直按回车即可

#### 第 2 步：添加公钥到 GitHub

```bash
cat ~/.ssh/id_ed25519.pub
```
复制输出的内容，然后：
1. 打开 https://github.com/settings/keys
2. 点击 **New SSH key**
3. 粘贴公钥内容
4. 点击 **Add SSH key**

#### 第 3 步：使用 SSH 地址推送

```bash
cd /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game

# 移除旧的 remote
git remote remove origin

# 添加 SSH 方式的 remote（替换为你的 GitHub 用户名）
git remote add origin git@github.com:YOUR_USERNAME/chinese-pool-game.git

# 推送
git push -u origin main
```

---

### 方案三：使用 GitHub Desktop（图形界面）

1. 下载 https://desktop.github.com
2. 登录 GitHub 账号
3. 选择 `Add Local Repository` → 选择 `chinese-pool-game` 文件夹
4. 点击 `Publish repository`

---

## 🎯 快速操作步骤

**推荐使用方案一**，完整命令如下：

```bash
# 1. 在浏览器打开创建 Token
open https://github.com/settings/tokens

# 2. 创建 Token 后复制（ghp_xxxxxxxxxxxx）

# 3. 设置 Git 用户信息（首次使用）
git config --global user.name "xujie123"
git config --global user.email "your_email@example.com"

# 4. 进入项目目录
cd /Users/jarry/.real/users/user-2efca62d7539f55582e4e71179aebf90/workspace/chinese-pool-game

# 5. 移除旧 remote
git remote remove origin

# 6. 添加新 remote（替换 xujie123 为你的 GitHub 用户名）
git remote add origin https://xujie123@github.com/xujie123/chinese-pool-game.git

# 7. 推送（会提示输入密码，粘贴 Token）
git push -u origin main
```

---

## ❓ 常见问题

### Q: Token 安全吗？
A: Token 只用于 Git 操作，可以隨時删除。建议设置过期时间。

### Q: 忘记复制 Token 了怎么办？
A: 删除这个 Token，重新生成一个新的。

### Q: 还是推送失败怎么办？
A: 检查：
1. GitHub 仓库是否已创建且为 Public
2. Remote URL 是否正确（用户名要一致）
3. Token 是否有 repo 权限

---

## 🌐 发布后访问链接

成功后访问：`https://xujie123.github.io/chinese-pool-game/`

记得在 GitHub 仓库启用 Pages：
**Settings** → **Pages** → Source 选择 `main` → **Save**
