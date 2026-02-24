// MiniArcade - 数字排序游戏模块
// 基于现有数字排序挑战游戏重构为模块化版本

class NumberSortGame {
    constructor() {
        this.gameId = 'number-sort';
        this.container = null;
        this.gameBoard = null;
        this.timerElement = null;
        this.movesElement = null;
        
        this.gridSize = 4;
        this.tiles = [];
        this.emptyIndex = -1;
        this.moves = 0;
        this.startTime = 0;
        this.timerInterval = null;
        this.isPlaying = false;
        this.touchStartIndex = null;
    }

    // 初始化游戏
    async init(container) {
        this.container = container;
        this.renderGameInterface();
        this.bindEvents();
        console.log('数字排序游戏初始化完成');
    }

    // 渲染游戏界面
    renderGameInterface() {
        this.container.innerHTML = `
            <div class="number-sort-game">
                <div class="game-controls-panel">
                    <div class="difficulty-selector">
                        <label for="difficulty">难度：</label>
                        <select id="difficulty">
                            <option value="easy">简单 (3×3)</option>
                            <option value="medium" selected>中等 (4×4)</option>
                            <option value="hard">困难 (5×5)</option>
                        </select>
                    </div>
                    <button id="startBtn" class="btn btn-primary">开始游戏</button>
                    <button id="restartBtn" class="btn btn-secondary" disabled>重新开始</button>
                </div>

                <div class="game-stats">
                    <div class="stat-card">
                        <span class="stat-label">时间：</span>
                        <span id="timer" class="stat-value">00:00</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">步数：</span>
                        <span id="moves" class="stat-value">0</span>
                    </div>
                </div>

                <div class="game-board-container">
                    <div class="game-board" id="gameBoard">
                        <!-- 游戏网格将通过JavaScript动态生成 -->
                    </div>
                </div>

                <div class="game-instructions">
                    <h3>游戏说明：</h3>
                    <p>拖拽数字方块，将它们按从小到大的顺序排列。只能移动与空位相邻的方块。</p>
                </div>
            </div>
        `;

        // 存储DOM引用
        this.gameBoard = this.container.querySelector('#gameBoard');
        this.timerElement = this.container.querySelector('#timer');
        this.movesElement = this.container.querySelector('#moves');
    }

    // 绑定事件
    bindEvents() {
        // 难度选择
        const difficultySelect = this.container.querySelector('#difficulty');
        difficultySelect.addEventListener('change', () => this.updateDifficulty());

        // 开始游戏按钮
        const startBtn = this.container.querySelector('#startBtn');
        startBtn.addEventListener('click', () => this.startGame());

        // 重新开始按钮
        const restartBtn = this.container.querySelector('#restartBtn');
        restartBtn.addEventListener('click', () => this.restartGame());
    }

    // 更新难度
    updateDifficulty() {
        const difficulty = this.container.querySelector('#difficulty').value;
        switch(difficulty) {
            case 'easy':
                this.gridSize = 3;
                break;
            case 'medium':
                this.gridSize = 4;
                break;
            case 'hard':
                this.gridSize = 5;
                break;
        }

        if (this.isPlaying) {
            this.restartGame();
        } else {
            this.renderEmptyBoard();
        }
    }

    // 渲染空棋盘
    renderEmptyBoard() {
        this.gameBoard.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = `grid grid-${this.gridSize}`;
        this.gameBoard.appendChild(grid);
    }

    // 开始游戏
    startGame() {
        this.isPlaying = true;
        this.moves = 0;
        this.startTime = Date.now();
        
        this.updateUIState();
        this.generateNumbers();
        this.startTimer();
    }

    // 生成数字
    generateNumbers() {
        const totalTiles = this.gridSize * this.gridSize;
        const numbers = Array.from({length: totalTiles - 1}, (_, i) => i + 1);
        
        // Fisher-Yates洗牌算法
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        
        // 添加空位
        numbers.push(null);
        this.tiles = numbers;
        this.emptyIndex = numbers.length - 1;
        
        this.renderBoard();
    }

    // 渲染游戏板
    renderBoard() {
        const grid = this.gameBoard.querySelector('.grid') || document.createElement('div');
        grid.className = `grid grid-${this.gridSize}`;
        grid.innerHTML = '';
        
        this.tiles.forEach((number, index) => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.index = index;
            
            if (number === null) {
                tile.classList.add('empty');
            } else {
                tile.textContent = number;
                tile.draggable = true;
                
                // 拖拽事件
                tile.addEventListener('dragstart', (e) => this.onDragStart(e, index));
                tile.addEventListener('dragover', (e) => e.preventDefault());
                tile.addEventListener('drop', (e) => this.onDrop(e, index));
                
                // 触摸事件
                tile.addEventListener('touchstart', (e) => this.onTouchStart(e, index));
                tile.addEventListener('touchend', (e) => this.onTouchEnd(e, index));
                tile.addEventListener('touchmove', (e) => e.preventDefault());
            }
            
            grid.appendChild(tile);
        });

        if (!this.gameBoard.contains(grid)) {
            this.gameBoard.appendChild(grid);
        }
    }

    // 拖拽开始
    onDragStart(e, index) {
        e.dataTransfer.setData('text/plain', index.toString());
    }

    // 拖拽放置
    onDrop(e, targetIndex) {
        e.preventDefault();
        const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
        this.moveTile(sourceIndex, targetIndex);
    }

    // 触摸开始
    onTouchStart(e, index) {
        this.touchStartIndex = index;
        e.preventDefault();
    }

    // 触摸结束
    onTouchEnd(e, targetIndex) {
        if (this.touchStartIndex !== undefined && this.touchStartIndex !== targetIndex) {
            this.moveTile(this.touchStartIndex, targetIndex);
        }
        this.touchStartIndex = undefined;
        e.preventDefault();
    }

    // 移动方块
    moveTile(sourceIndex, targetIndex) {
        if (!this.isPlaying) return;
        
        if (this.canMove(sourceIndex, targetIndex)) {
            // 交换位置
            [this.tiles[sourceIndex], this.tiles[targetIndex]] = 
            [this.tiles[targetIndex], this.tiles[sourceIndex]];
            
            this.emptyIndex = sourceIndex;
            this.moves++;
            this.movesElement.textContent = this.moves;
            
            this.renderBoard();
            
            if (this.checkWin()) {
                this.endGame();
            }
        }
    }

    // 检查是否可以移动
    canMove(sourceIndex, targetIndex) {
        // 目标必须是空位
        if (this.tiles[targetIndex] !== null) return false;
        
        const sourceRow = Math.floor(sourceIndex / this.gridSize);
        const sourceCol = sourceIndex % this.gridSize;
        const targetRow = Math.floor(targetIndex / this.gridSize);
        const targetCol = targetIndex % this.gridSize;
        
        // 检查是否相邻（上下左右）
        const rowDiff = Math.abs(sourceRow - targetRow);
        const colDiff = Math.abs(sourceCol - targetCol);
        
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }

    // 检查胜利条件
    checkWin() {
        for (let i = 0; i < this.tiles.length - 1; i++) {
            if (this.tiles[i] !== i + 1) {
                return false;
            }
        }
        return this.tiles[this.tiles.length - 1] === null;
    }

    // 开始计时器
    startTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    // 停止计时器
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    // 更新计时器
    updateTimer() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        this.timerElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // 更新UI状态
    updateUIState() {
        const startBtn = this.container.querySelector('#startBtn');
        const restartBtn = this.container.querySelector('#restartBtn');
        const difficultySelect = this.container.querySelector('#difficulty');
        
        startBtn.disabled = this.isPlaying;
        restartBtn.disabled = !this.isPlaying;
        difficultySelect.disabled = this.isPlaying;
    }

    // 结束游戏
    endGame() {
        this.stopTimer();
        this.isPlaying = false;
        this.updateUIState();
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const rating = this.calculateRating(elapsed, this.moves);
        
        this.showResult(elapsed, this.moves, rating);
    }

    // 计算评级
    calculateRating(time, moves) {
        const maxMoves = this.gridSize * this.gridSize * 10;
        const maxTime = this.gridSize * 30;
        
        const moveScore = 1 - (moves / maxMoves);
        const timeScore = 1 - (time / maxTime);
        const totalScore = (moveScore + timeScore) / 2;
        
        if (totalScore > 0.8) return '⭐⭐⭐⭐⭐';
        if (totalScore > 0.6) return '⭐⭐⭐⭐';
        if (totalScore > 0.4) return '⭐⭐⭐';
        if (totalScore > 0.2) return '⭐⭐';
        return '⭐';
    }

    // 显示结果
    showResult(time, moves, rating) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const resultHTML = `
            <div class="game-result-modal">
                <div class="result-content">
                    <h2>🎉 游戏完成！</h2>
                    <div class="result-stats">
                        <p>用时：<span>${timeString}</span></p>
                        <p>步数：<span>${moves}</span></p>
                        <p>评级：<span>${rating}</span></p>
                    </div>
                    <button class="btn btn-primary" onclick="this.closest('.game-result-modal').remove();">
                        再玩一次
                    </button>
                </div>
            </div>
        `;
        
        this.container.insertAdjacentHTML('beforeend', resultHTML);
    }

    // 重新开始游戏
    restartGame() {
        this.stopTimer();
        this.isPlaying = false;
        this.moves = 0;
        this.timerElement.textContent = '00:00';
        this.movesElement.textContent = '0';
        this.updateUIState();
        this.generateNumbers();
        
        // 移除结果模态框
        const existingModal = this.container.querySelector('.game-result-modal');
        if (existingModal) {
            existingModal.remove();
        }
    }

    // 销毁游戏（清理资源）
    destroy() {
        this.stopTimer();
        this.isPlaying = false;
        // 清理事件监听器等资源
    }
}

// 导出游戏类
export default NumberSortGame;