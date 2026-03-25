// 中式台球游戏 - Chinese Pool Game
// 包含物理引擎、碰撞检测、游戏规则

const canvas = document.getElementById('poolTable');
const ctx = canvas.getContext('2d');

// 游戏常量 - 优化为更真实的物理效果
const TABLE_WIDTH = 900;
const TABLE_HEIGHT = 450;
const BALL_RADIUS = 12;
const POCKET_RADIUS = 25;
const FRICTION = 0.992; // 降低摩擦力，让球滚动更远（原 0.985）
const MIN_VELOCITY = 0.05; // 降低停止阈值（原 0.1）
const CUSHION_BOUNCE = 0.85; // 提高库边反弹系数，减少能量损失（原 0.7）

// 球袋位置
const pockets = [
    { x: 0, y: 0 },
    { x: TABLE_WIDTH / 2, y: -10 },
    { x: TABLE_WIDTH, y: 0 },
    { x: 0, y: TABLE_HEIGHT },
    { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT + 10 },
    { x: TABLE_WIDTH, y: TABLE_HEIGHT }
];

// 游戏状态
let balls = [];
let cueBall;
let isAiming = true;
let isCharging = false;
let power = 0;
let powerDirection = 1;
let currentPlayer = 1;
let player1Balls = []; // 全色球 1-7
let player2Balls = []; // 花色球 9-15
let black8Ball = null;
let gameOver = false;
let foulCount = { 1: 0, 2: 0 };
let assignedGroups = false;
let player1Group = 'solids'; // 全色球
let player2Group = 'stripes'; // 花色球
let pottedBallsThisTurn = []; // 当前回合进球
let firstBallPottedThisTurn = null; // 当前回合第一个进球
let isFreeBall = false; // 是否自由球状态
let freeBallPosition = null; // 自由球摆放位置

// 球类
class Ball {
    constructor(x, y, number, color) {
        this.x = x;
        this.y = y;
        this.number = number;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.inPocket = false;
        this.mass = 1;
    }

    draw() {
        if (this.inPocket) return;

        ctx.beginPath();
        ctx.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
        
        // 渐变效果
        const gradient = ctx.createRadialGradient(
            this.x - 3, this.y - 3, 0,
            this.x, this.y, BALL_RADIUS
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.3, this.color);
        gradient.addColorStop(1, this.color);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 绘制号码
        if (this.number !== 0) {
            ctx.fillStyle = 'white';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // 白色圆圈背景
            ctx.beginPath();
            ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.fill();
            
            ctx.fillStyle = 'black';
            ctx.fillText(this.number, this.x, this.y);
        }
    }

    update() {
        if (this.inPocket) return;

        // 应用速度
        this.x += this.vx;
        this.y += this.vy;

        // 摩擦力
        this.vx *= FRICTION;
        this.vy *= FRICTION;

        // 停止阈值
        if (Math.abs(this.vx) < MIN_VELOCITY) this.vx = 0;
        if (Math.abs(this.vy) < MIN_VELOCITY) this.vy = 0;

        // 边界碰撞（库边反弹）
        if (this.x - BALL_RADIUS < 0) {
            this.x = BALL_RADIUS;
            this.vx = -this.vx * CUSHION_BOUNCE;
        }
        if (this.x + BALL_RADIUS > TABLE_WIDTH) {
            this.x = TABLE_WIDTH - BALL_RADIUS;
            this.vx = -this.vx * CUSHION_BOUNCE;
        }
        if (this.y - BALL_RADIUS < 0) {
            this.y = BALL_RADIUS;
            this.vy = -this.vy * CUSHION_BOUNCE;
        }
        if (this.y + BALL_RADIUS > TABLE_HEIGHT) {
            this.y = TABLE_HEIGHT - BALL_RADIUS;
            this.vy = -this.vy * CUSHION_BOUNCE;
        }

        // 检查是否进袋
        for (let pocket of pockets) {
            const dx = this.x - pocket.x;
            const dy = this.y - pocket.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance< POCKET_RADIUS) {
                this.inPocket = true;
                this.vx = 0;
                this.vy = 0;
                handleBallPotted(this);
                return;
            }
        }
    }

    isMoving() {
        return !this.inPocket && (Math.abs(this.vx) > 0 || Math.abs(this.vy) > 0);
    }
}

// 初始化游戏 - 添加开球提示
function initGame() {
    balls = [];
    player1Balls = [];
    player2Balls = [];
    currentPlayer = 1;
    assignedGroups = false;
    gameOver = false;
    foulCount = { 1: 0, 2: 0 };
    pottedBallsThisTurn = [];
    firstBallPottedThisTurn = null;
    isFreeBall = false;
    player1Group = 'solids';
    player2Group = 'stripes';
    
    // 创建白球
    cueBall = new Ball(TABLE_WIDTH / 4, TABLE_HEIGHT / 2, 0, '#ffffff');
    balls.push(cueBall);

    // 创建目标球（中式台球摆法）
    const startX = TABLE_WIDTH * 0.75;
    const startY = TABLE_HEIGHT / 2;
    const ballSpacing = BALL_RADIUS * 2 + 1;
    
    // 球号顺序（标准摆法）
    const ballNumbers = [
        [1],
        [9, 2],
        [10, 8, 3],
        [11, 7, 14, 4],
        [5, 13, 15, 6, 12],
        [8, 14, 7, 11],
        [3, 10, 9, 2, 1]
    ];

    const colors = {
        1: '#FFD700',  // 黄色
        2: '#0000FF',  // 蓝色
        3: '#FF0000',  // 红色
        4: '#800080',  // 紫色
        5: '#FFA500',  // 橙色
        6: '#008000',  // 绿色
        7: '#8B0000',  // 栗色
        8: '#000000',  // 黑色
        9: '#FFD700',
        10: '#0000FF',
        11: '#FF0000',
        12: '#800080',
        13: '#FFA500',
        14: '#008000',
        15: '#8B0000'
    };

    let ballIndex = 0;
    const rows = 5;
    
    for (let row = 0; row< rows; row++) {
        for (let col = 0; col <= row; col++) {
            const x = startX + row * (ballSpacing * Math.cos(Math.PI / 6));
            const y = startY + (col - row / 2) * ballSpacing;
            
            // 使用标准的中式台球编号
            let number;
            if (row === 2 && col === 1) {
                number = 8; // 黑八在中间
            } else {
                // 其他位置随机分配但确保角上是不同的球
                const availableNumbers = [1,2,3,4,5,6,7,9,10,11,12,13,14,15];
                number = availableNumbers[ballIndex % availableNumbers.length];
                ballIndex++;
            }
            
            const ball = new Ball(x, y, number, colors[number]);
            balls.push(ball);
            
            if (number === 8) {
                black8Ball = ball;
            } else if (number < 8) {
                player1Balls.push(ball);
            } else {
                player2Balls.push(ball);
            }
        }
    }

    updateUI();
    hideMessage();
    
    // 显示开球提示
    setTimeout(() => {
        showMessage("🎱 玩家 1 开球！");
        setTimeout(hideMessage, 2000);
    }, 500);
}

// 处理球进袋 - 完善游戏规则
function handleBallPotted(ball) {
    // 记录当前回合进球
    pottedBallsThisTurn.push(ball);
    if (!firstBallPottedThisTurn) {
        firstBallPottedThisTurn = ball;
    }
    
    if (ball === cueBall) {
        // 白球进袋 - 犯规
        foulCount[currentPlayer]++;
        showMessage(`❌ 犯规！白球进袋 - 玩家${currentPlayer}`);
        
        // 设置自由球状态
        isFreeBall = true;
        
        setTimeout(() => {
            ball.inPocket = false;
            // 自由球可以重新摆放
            if (isFreeBall) {
                showMessage("💡 对手获得自由球！点击桌面摆放白球");
            } else {
                ball.x = TABLE_WIDTH / 4;
                ball.y = TABLE_HEIGHT / 2;
            }
            ball.vx = 0;
            ball.vy = 0;
            switchPlayer();
        }, 1500);
        
    } else if (ball === black8Ball) {
        // 黑八进袋
        const playerBalls = currentPlayer === 1 ? player1Balls : player2Balls;
        const allPotted = playerBalls.every(b => b.inPocket);
        
        if (allPotted) {
            gameOver = true;
            showMessage(`🏆 玩家${currentPlayer}清台后打入黑八，获胜！🎉`);
        } else {
            gameOver = true;
            showMessage(`❌ 玩家${currentPlayer}提前打入黑八，对方获胜！`);
        }
        
    } else {
        // 普通球进袋
        if (!assignedGroups && !gameOver) {
            // 首次进球时分配花色
            assignedGroups = true;
            if (ball.number< 8) {
                player1Group = 'solids';
                player2Group = 'stripes';
                showMessage(`🎯 玩家${currentPlayer}获得全色球（1-7）`);
            } else {
                player1Group = 'stripes';
                player2Group = 'solids';
                showMessage(`🎯 玩家${currentPlayer}获得花色球（9-15）`);
                // 交换两组球
                [player1Balls, player2Balls] = [player2Balls, player1Balls];
            }
            updateScorePanel();
            setTimeout(hideMessage, 2000);
            
        } else if (assignedGroups) {
            // 检查是否是自己组的球
            const isOwnBall = (currentPlayer === 1 && player1Group === 'solids' && ball.number < 8) ||
                            (currentPlayer === 1 && player1Group === 'stripes' && ball.number > 8) ||
                            (currentPlayer === 2 && player2Group === 'solids' && ball.number< 8) ||
                            (currentPlayer === 2 && player2Group === 'stripes' && ball.number > 8);
            
            if (!isOwnBall) {
                // 打入对手的球 - 有效但不换发
                showMessage(`⚠️ 打进了对手的球`);
                setTimeout(() => {
                    if (allBallsStopped() && !gameOver) {
                        switchPlayer();
                    }
                }, 1000);
                return; // 不换发
            }
        }
        
        // 检查是否清台
        const playerBalls = currentPlayer === 1 ? player1Balls : player2Balls;
        const remainingBalls = playerBalls.filter(b => !b.inPocket).length;
        
        if (remainingBalls === 0 && !gameOver) {
            showMessage(`🔥 玩家${currentPlayer}清台！可以打黑八了！`);
            updateScorePanel();
            setTimeout(hideMessage, 2000);
        } else {
            updateScorePanel();
        }
    }
}

// 切换玩家 - 添加动画提示
function switchPlayer() {
    const oldPlayer = currentPlayer;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    
    // 重置回合状态
    pottedBallsThisTurn = [];
    firstBallPottedThisTurn = null;
    
    // 显示玩家切换横幅
    showSwitchPlayerBanner();
    
    updateUI();
}

// 显示玩家切换横幅
function showSwitchPlayerBanner() {
    const banner = document.getElementById('switchBanner');
    if (banner) {
        banner.textContent = `🎱 玩家${currentPlayer} 回合`;
        banner.style.display = 'block';
        
        // 2 秒后自动隐藏
        setTimeout(() => {
            banner.style.display = 'none';
        }, 2000);
    }
}

// 更新 UI - 完善计分显示
function updateUI() {
    document.getElementById('currentPlayer').textContent = `玩家${currentPlayer}`;
    document.getElementById('powerValue').textContent = Math.round(power);
    
    // 更新计分面板高亮
    const player1Panel = document.getElementById('player1Panel');
    const player2Panel = document.getElementById('player2Panel');
    
    if (currentPlayer === 1) {
        player1Panel.classList.add('current-turn');
        player2Panel.classList.remove('current-turn');
    } else {
        player2Panel.classList.add('current-turn');
        player1Panel.classList.remove('current-turn');
    }
    
    updateScorePanel();
}

// 更新计分面板
function updateScorePanel() {
    const p1Potted = player1Balls.filter(b => b.inPocket).length;
    const p1Remaining = player1Balls.length - p1Potted;
    const p2Potted = player2Balls.filter(b => b.inPocket).length;
    const p2Remaining = player2Balls.length - p2Potted;
    
    // 更新显示
    const p1Label = player1Group === 'solids' ? '全色球' : '花色球';
    const p2Label = player2Group === 'solids' ? '全色球' : '花色球';
    const p1Icon = player1Group === 'solids' ? '🟡' : '🔵';
    const p2Icon = player2Group === 'solids' ? '🟡' : '🔵';
    
    document.getElementById('player1Panel').querySelector('strong').innerHTML = `${p1Icon} 玩家 1（${p1Label}）`;
    document.getElementById('player2Panel').querySelector('strong').innerHTML = `${p2Icon} 玩家 2（${p2Label}）`;
    
    document.getElementById('player1Potted').textContent = p1Potted;
    document.getElementById('player1Remaining').textContent = p1Remaining;
    document.getElementById('player2Potted').textContent = p2Potted;
    document.getElementById('player2Remaining').textContent = p2Remaining;
    
    document.getElementById('foulCount').textContent = `P1: ${foulCount[1]} | P2: ${foulCount[2]}`;
}

// 显示消息
function showMessage(text) {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.style.display = 'block';
}

function hideMessage() {
    document.getElementById('message').style.display = 'none';
}

// 检测球与球之间的碰撞
function checkCollisions() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];
            
            if (b1.inPocket || b2.inPocket) continue;
            
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = BALL_RADIUS * 2;
            
            if (distance < minDist) {
                // 碰撞检测 - 弹性碰撞
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);
                
                // 旋转速度
                const vx1 = b1.vx * cos + b1.vy * sin;
                const vy1 = b1.vy * cos - b1.vx * sin;
                const vx2 = b2.vx * cos + b2.vy * sin;
                const vy2 = b2.vy * cos - b2.vx * sin;
                
                // 交换 x 方向速度（质量相同）
                const vx1Final = vx2;
                const vx2Final = vx1;
                
                // 旋转回原坐标系
                b1.vx = vx1Final * cos - vy1 * sin;
                b1.vy = vy1 * cos + vx1Final * sin;
                b2.vx = vx2Final * cos - vy2 * sin;
                b2.vy = vy2 * cos + vx2Final * sin;
                
                // 分离球体
                const overlap = (minDist - distance) / 2;
                b1.x -= overlap * Math.cos(angle);
                b1.y -= overlap * Math.sin(angle);
                b2.x += overlap * Math.cos(angle);
                b2.y += overlap * Math.sin(angle);
            }
        }
    }
}

// 检查所有球是否静止
function allBallsStopped() {
    return balls.every(ball => !ball.isMoving());
}

// 绘制球杆
function drawCue() {
    // 自由球模式不显示球杆
    if (isFreeBall) return;
    
    if (!isAiming || !allBallsStopped() || !cueBall || cueBall.inPocket) return;
    
    const mouseX = lastMouseX || cueBall.x + 100;
    const mouseY = lastMouseY || cueBall.y;
    
    const angle = Math.atan2(mouseY - cueBall.y, mouseX - cueBall.x);
    const cueLength = 200;
    const offset = BALL_RADIUS + 5;
    
    ctx.save();
    ctx.translate(cueBall.x, cueBall.y);
    ctx.rotate(angle);
    
    // 球杆
    const gradient = ctx.createLinearGradient(-cueLength, 0, 0, 0);
    gradient.addColorStop(0, '#8B4513');
    gradient.addColorStop(1, '#DEB887');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(-cueLength - offset, -3, cueLength, 6);
    
    // 瞄准线
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 0);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.restore();
}

// 绘制自由球指示器
function drawFreeBallIndicator() {
    if (!isFreeBall || !cueBall || cueBall.inPocket) return;
    
    // 绘制白球摆放位置的半透明圆圈
    ctx.beginPath();
    ctx.arc(cueBall.x, cueBall.y, BALL_RADIUS * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // 绘制提示文字
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('点击桌面摆放白球', cueBall.x, cueBall.y - 30);
}

// 绘制球袋
function drawPockets() {
    ctx.fillStyle = '#1a1a1a';
    pockets.forEach(pocket => {
        ctx.beginPath();
        ctx.arc(pocket.x, pocket.y, POCKET_RADIUS, 0, Math.PI * 2);
        ctx.fill();
    });
}

// 游戏主循环
function gameLoop() {
    // 清空画布
    ctx.clearRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);
    
    // 绘制球袋
    drawPockets();
    
    // 更新和绘制所有球
    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });
    
    // 检测碰撞
    checkCollisions();
    
    // 绘制自由球指示器
    drawFreeBallIndicator();
    
    // 绘制球杆
    drawCue();
    
    // 如果所有球都停了，可以瞄准
    if (allBallsStopped() && !gameOver) {
        isAiming = true;
    } else {
        isAiming = false;
    }
    
    requestAnimationFrame(gameLoop);
}

// 击球
function shoot() {
    if (!isAiming || !cueBall || cueBall.inPocket || gameOver) return;
    
    const mouseX = lastMouseX || cueBall.x + 100;
    const mouseY = lastMouseY || cueBall.y;
    
    const angle = Math.atan2(mouseY - cueBall.y, mouseX - cueBall.x);
    const force = power / 100 * 35; // 最大力度从 15 提升到 35，实现大力击球效果
    
    // 母球沿瞄准线方向滚动（去掉负号）
    cueBall.vx = Math.cos(angle) * force;
    cueBall.vy = Math.sin(angle) * force;
    
    power = 0;
    isCharging = false;
    updateUI();
    
    // 等待球停后切换玩家
    setTimeout(() => {
        if (allBallsStopped() && !gameOver) {
            switchPlayer();
        }
    }, 2000);
}

// 鼠标控制
let lastMouseX = 0;
let lastMouseY = 0;

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    lastMouseX = e.clientX - rect.left;
    lastMouseY = e.clientY - rect.top;
    
    // 自由球摆放模式
    if (isFreeBall && cueBall && !cueBall.inPocket) {
        // 在桌面上移动白球（不进入袋口区域）
        cueBall.x = Math.max(BALL_RADIUS, Math.min(TABLE_WIDTH - BALL_RADIUS, lastMouseX));
        cueBall.y = Math.max(BALL_RADIUS, Math.min(TABLE_HEIGHT - BALL_RADIUS, lastMouseY));
    }
});

// 点击桌面摆放自由球
canvas.addEventListener('click', (e) => {
    if (isFreeBall && allBallsStopped()) {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // 确保不会重叠其他球
        let canPlace = true;
        for (let ball of balls) {
            if (ball !== cueBall && !ball.inPocket) {
                const dx = clickX - ball.x;
                const dy = clickY - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < BALL_RADIUS * 2.5) {
                    canPlace = false;
                    break;
                }
            }
        }
        
        if (canPlace) {
            cueBall.x = clickX;
            cueBall.y = clickY;
            isFreeBall = false;
            showMessage("✅ 自由球已摆放");
            setTimeout(hideMessage, 1000);
        }
    }
});

// 蓄力控制
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isCharging && isAiming && !gameOver) {
        isCharging = true;
        power = 0;
    }
    if (e.code === 'KeyR') {
        initGame();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space' && isCharging) {
        isCharging = false;
        shoot();
    }
});

// 按钮事件
document.getElementById('shootBtn').addEventListener('click', () => {
    if (isCharging) {
        isCharging = false;
        shoot();
    } else if (isAiming && !gameOver) {
        isCharging = true;
        power = 0;
    }
});

document.getElementById('resetBtn').addEventListener('click', initGame);

// 蓄力动画
function chargePower() {
    if (isCharging) {
        power += 2 * powerDirection;
        if (power >= 100) {
            power = 100;
            powerDirection = -1;
        } else if (power <= 0) {
            power = 0;
            powerDirection = 1;
        }
        updateUI();
        document.getElementById('powerFill').style.width = power + '%';
    }
    requestAnimationFrame(chargePower);
}

// 启动游戏
initGame();
gameLoop();
chargePower();

console.log('中式台球游戏已加载！');
console.log('操作说明：');
console.log('- 鼠标移动：控制瞄准方向');
console.log('- 按住空格/点击击球按钮：蓄力');
console.log('- 松开空格/再次点击：击球');
console.log('- R 键：重新开始游戏');
