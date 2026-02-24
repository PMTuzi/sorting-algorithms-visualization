class NumberSortingGame {
    constructor() {
        this.gameBoard = document.getElementById('gameBoard');
        this.timerElement = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.difficultySelect = document.getElementById('difficulty');
        this.resultModal = document.getElementById('resultModal');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        
        this.gridSize = 4; // 默认中等难度
        this.tiles = [];
        this.emptyIndex = -1;
        this.moves = 0;
        this.startTime = 0;
        this.timerInterval = null;
        this.isPlaying = false;

        
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.playAgainBtn.addEventListener('click', () => this.restartGame());
        this.difficultySelect.addEventListener('change', () => this.updateDifficulty());
        
        // 初始化显示
        this.updateStatus('点击"开始游戏"开始挑战');
        this.renderEmptyBoard();
    }
    
    updateDifficulty() {
        const difficulty = this.difficultySelect.value;
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
    
    renderEmptyBoard() {
        this.gameBoard.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = `grid ${this.difficultySelect.value}`;
        this.gameBoard.appendChild(grid);
    }
    
    startGame() {
        this.isPlaying = true;
        this.moves = 0;
        this.startTime = Date.now();
        
        this.startBtn.disabled = true;
        this.restartBtn.disabled = false;
        this.difficultySelect.disabled = true;
        
        this.generateNumbers();
        this.startTimer();
    }
    
    generateNumbers() {
        const totalTiles = this.gridSize * this.gridSize;
        const numbers = Array.from({length: totalTiles - 1}, (_, i) => i + 1);
        
        // 随机打乱数字
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
    
    renderBoard() {
        const grid = this.gameBoard.querySelector('.grid');
        grid.innerHTML = '';
        
        this.tiles.forEach((number, index) => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            
            if (number === null) {
                tile.className += ' empty';
                tile.textContent = '';
            } else {
                tile.textContent = number;
                tile.draggable = true;
                
                // 设置拖拽事件
                tile.addEventListener('dragstart', (e) => this.onDragStart(e, index));
                tile.addEventListener('dragover', (e) => e.preventDefault());
                tile.addEventListener('drop', (e) => this.onDrop(e, index));
                
                // 添加触摸事件支持
                tile.addEventListener('touchstart', (e) => this.onTouchStart(e, index));
                tile.addEventListener('touchend', (e) => this.onTouchEnd(e, index));
            }
            
            grid.appendChild(tile);
        });
    }
    
    onDragStart(e, index) {
        e.dataTransfer.setData('text/plain', index.toString());
    }
    
    onDrop(e, targetIndex) {
        e.preventDefault();
        const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
        this.moveTile(sourceIndex, targetIndex);
    }
    
    onTouchStart(e, index) {
        this.touchStartIndex = index;
        e.preventDefault();
    }
    
    onTouchEnd(e, targetIndex) {
        if (this.touchStartIndex !== undefined) {
            this.moveTile(this.touchStartIndex, targetIndex);
            this.touchStartIndex = undefined;
        }
        e.preventDefault();
    }
    
    moveTile(sourceIndex, targetIndex) {
        if (!this.isPlaying) return;
        
        // 检查是否与空位相邻
        if (this.canMove(sourceIndex, targetIndex)) {
            // 交换位置
            [this.tiles[sourceIndex], this.tiles[targetIndex]] = 
            [this.tiles[targetIndex], this.tiles[sourceIndex]];
            
            this.emptyIndex = sourceIndex;
            this.moves++;
            
            this.renderBoard();
            
            if (this.checkWin()) {
                this.endGame();
            }
        }
    }
    
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
    
    checkWin() {
        for (let i = 0; i < this.tiles.length - 1; i++) {
            if (this.tiles[i] !== i + 1) {
                return false;
            }
        }
        return this.tiles[this.tiles.length - 1] === null;
    }
    
    startTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    updateTimer() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    

    
    endGame() {
        this.stopTimer();
        this.isPlaying = false;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const rating = this.calculateRating(elapsed, this.moves);
        
        this.showResult(elapsed, this.moves, rating);
    }
    
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
    
    showResult(time, moves, rating) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('finalTime').textContent = timeString;
        document.getElementById('finalMoves').textContent = moves;
        document.getElementById('rating').textContent = rating;
        
        this.resultModal.style.display = 'flex';
    }
    
    restartGame() {
        this.stopTimer();
        this.resultModal.style.display = 'none';
        
        this.startBtn.disabled = false;
        this.restartBtn.disabled = true;
        this.difficultySelect.disabled = false;
        
        this.timerElement.textContent = '00:00';
        
        this.isPlaying = false;
        this.renderEmptyBoard();
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new NumberSortingGame();
});