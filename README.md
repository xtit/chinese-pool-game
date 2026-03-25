# 🎱 中式台球 Chinese Pool

一个使用 HTML5 Canvas 和 JavaScript 开发的网页版中式台球游戏。

## 🎮 在线试玩

[点击这里开始游戏](https://xujie-games.github.io/chinese-pool-game/)

## ✨ 功能特点

- **真实物理引擎**：模拟真实的球体碰撞、摩擦力和库边反弹
- **中式台球规则**：完整实现中式台球游戏规则（全色球 vs 花色球）
- **双人对战**：支持本地双人轮流对战
- **精美界面**：渐变背景、立体球体效果、动态瞄准线
- **力量控制**：按住空格蓄力，精准控制击球力度
- **犯规判定**：白球进袋、提前打入黑八等犯规行为自动判定

## 🕹️ 操作说明

| 操作 | 说明 |
|------|------|
| 鼠标移动 | 控制瞄准方向 |
| 按住空格键 | 开始蓄力 |
| 松开空格键 | 击球 |
| R 键 | 重新开始游戏 |
| 点击"击球"按钮 | 蓄力/击球 |
| 点击"重新开始" | 重置游戏 |

## 📋 游戏规则

1. **分组**：开球后首次进球决定花色归属
   - 全色球（1-7 号）：纯色球
   - 花色球（9-15 号）：带条纹的球

2. **获胜条件**：
   - 先将所有自己的目标球打入袋中
   - 然后合法地将黑八（8 号球）打入指定袋口

3. **犯规行为**：
   - 白球进袋
   - 未先击中自己的目标球
   - 提前打入黑八（直接判负）

## 🛠️ 本地运行

### 方法 1：直接打开
```bash
# 直接用浏览器打开 index.html 即可
open index.html
```

### 方法 2：使用本地服务器
```bash
# Python 3
python3 -m http.server 8000

# 然后访问 http://localhost:8000
```

### 方法 3：使用 Node.js
```bash
npx serve .
```

## 📁 文件结构

```
chinese-pool-game/
├── index.html      # 主页面
├── game.js         # 游戏逻辑
└── README.md       # 说明文档
```

## 🚀 部署发布

### GitHub Pages 部署步骤：

1. 创建 GitHub 仓库
```bash
git init
git add .
git commit -m "Initial commit - Chinese Pool Game"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chinese-pool-game.git
git push -u origin main
```

2. 在 GitHub 仓库设置中启用 GitHub Pages：
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main / root
   - Save

3. 访问：`https://YOUR_USERNAME.github.io/chinese-pool-game/`

### 其他免费部署平台：

- **Vercel**: 连接 GitHub 仓库自动部署
- **Netlify**: 拖拽文件夹或连接 Git 仓库
- **Cloudflare Pages**: 免费快速部署

## 🎯 技术实现

- **渲染**: HTML5 Canvas 2D
- **物理引擎**: 自定义弹性碰撞检测
- **动画**: requestAnimationFrame
- **无依赖**: 纯原生 JavaScript，无需任何库

## 📝 开发日志

- ✅ 基础物理引擎（碰撞、摩擦、反弹）
- ✅ 中式台球规则实现
- ✅ 双人对战模式
- ✅ 力量控制系统
- ✅ 犯规判定系统
- ✅ UI 界面优化
- ✅ 移动端适配（待完善）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 自由使用和修改

## 👨‍💻 作者

徐杰 (xujie)

---

**享受游戏！🎱**
