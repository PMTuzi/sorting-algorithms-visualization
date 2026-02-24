// MiniArcade - UI管理器
// 负责界面渲染、事件处理和用户交互

class UIManager {
    constructor(app) {
        this.app = app;
        this.elements = {};
        this.initSelectors();
    }

    // 初始化DOM元素选择器
    initSelectors() {
        this.elements = {
            gamesGrid: document.getElementById('gamesGrid'),
            categoryNav: document.getElementById('categoryNav'),
            gameSearch: document.getElementById('gameSearch'),
            gameModal: document.getElementById('gameModal'),
            gameContainer: document.getElementById('gameContainer'),
            gameArea: document.getElementById('gameArea'),
            backToGames: document.getElementById('backToGames'),
            currentGameTitle: document.getElementById('currentGameTitle')
        };
    }

    // 初始化UI管理器
    async init() {
        this.bindEvents();
        console.log('UI管理器初始化完成');
    }

    // 绑定事件监听器
    bindEvents() {
        // 分类导航点击事件
        this.elements.categoryNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                this.handleCategoryClick(e.target);
            }
        });

        // 搜索功能
        this.elements.gameSearch.addEventListener('input', (e) => {
            this.app.searchGames(e.target.value);
        });

        // 搜索按钮点击
        document.querySelector('.search-btn').addEventListener('click', () => {
            this.app.searchGames(this.elements.gameSearch.value);
        });

        // 返回游戏中心
        this.elements.backToGames.addEventListener('click', () => {
            this.app.backToGames();
        });

        // 模态框关闭
        document.getElementById('modalClose').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.hideModal();
        });

        // 开始游戏按钮
        document.getElementById('playGameBtn').addEventListener('click', () => {
            this.startSelectedGame();
        });

        // 点击模态框外部关闭
        this.elements.gameModal.addEventListener('click', (e) => {
            if (e.target === this.elements.gameModal) {
                this.hideModal();
            }
        });
    }

    // 处理分类点击
    handleCategoryClick(button) {
        // 移除所有激活状态
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // 添加当前激活状态
        button.classList.add('active');

        // 过滤游戏
        const category = button.dataset.category;
        this.app.filterGamesByCategory(category);
    }

    // 渲染游戏网格
    renderGamesGrid(games) {
        if (!games || games.length === 0) {
            this.showEmptyState();
            return;
        }

        const gamesHTML = games.map(game => this.createGameCardHTML(game)).join('');
        this.elements.gamesGrid.innerHTML = gamesHTML;

        // 绑定游戏卡片点击事件
        this.bindGameCardEvents();
    }

    // 创建游戏卡片HTML
    createGameCardHTML(game) {
        const difficultyClass = `game-card__difficulty--${game.difficulty}`;
        
        return `
            <div class="game-card" data-game-id="${game.id}">
                <div class="game-card__header">
                    <div class="game-card__icon">${game.icon}</div>
                    <div>
                        <h3 class="game-card__title">${game.title}</h3>
                        <p class="game-card__description">${game.description}</p>
                    </div>
                </div>
                <div class="game-card__meta">
                    <span class="game-card__difficulty ${difficultyClass}">
                        ${this.getDifficultyText(game.difficulty)}
                    </span>
                    <span class="game-card__category">${this.getCategoryText(game.category)}</span>
                </div>
            </div>
        `;
    }

    // 获取难度文本
    getDifficultyText(difficulty) {
        const texts = {
            'easy': '简单',
            'medium': '中等', 
            'hard': '困难'
        };
        return texts[difficulty] || difficulty;
    }

    // 获取分类文本
    getCategoryText(category) {
        const texts = {
            'puzzle': '益智',
            'strategy': '策略',
            'action': '动作',
            'educational': '教育'
        };
        return texts[category] || category;
    }

    // 绑定游戏卡片事件
    bindGameCardEvents() {
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => {
                const gameId = card.dataset.gameId;
                this.showGameModal(gameId);
            });
        });
    }

    // 显示游戏详情模态框
    showGameModal(gameId) {
        const game = this.app.gameManager.getGameById(gameId);
        if (!game) return;

        // 更新模态框内容
        document.getElementById('modalTitle').textContent = game.title;
        document.getElementById('modalDescription').textContent = game.description;
        document.getElementById('modalDifficulty').textContent = this.getDifficultyText(game.difficulty);
        document.getElementById('modalCategory').textContent = this.getCategoryText(game.category);
        
        // 更新游戏预览区域
        const preview = document.getElementById('gamePreview');
        preview.innerHTML = `<div class="game-preview__placeholder">${game.icon}</div>`;

        // 设置开始游戏按钮的数据
        document.getElementById('playGameBtn').dataset.gameId = gameId;

        // 显示模态框
        this.elements.gameModal.style.display = 'flex';
    }

    // 隐藏模态框
    hideModal() {
        this.elements.gameModal.style.display = 'none';
    }

    // 开始选中的游戏
    startSelectedGame() {
        const gameId = document.getElementById('playGameBtn').dataset.gameId;
        if (gameId) {
            this.hideModal();
            this.app.startGame(gameId);
        }
    }

    // 显示游戏屏幕
    async showGameScreen(gameId) {
        const game = this.app.gameManager.getGameById(gameId);
        if (!game) return;

        try {
            // 更新游戏标题
            this.elements.currentGameTitle.textContent = game.title;

            // 显示游戏容器，隐藏游戏网格
            this.elements.gameContainer.style.display = 'block';
            document.querySelector('.games-grid').style.display = 'none';
            document.querySelector('.category-nav').style.display = 'none';
            document.querySelector('.search-section').style.display = 'none';

            // 显示加载状态
            this.showLoading(this.elements.gameArea, `正在加载 ${game.title}...`);

            // 获取游戏实例并初始化
            const gameInstance = await this.app.gameManager.startGame(gameId);
            await gameInstance.init(this.elements.gameArea);

        } catch (error) {
            console.error(`显示游戏屏幕失败:`, error);
            this.showError('游戏加载失败，请重试');
            this.app.backToGames();
        }
    }

    // 显示游戏中心网格
    showGamesGrid() {
        this.elements.gameContainer.style.display = 'none';
        document.querySelector('.games-grid').style.display = 'grid';
        document.querySelector('.category-nav').style.display = 'flex';
        document.querySelector('.search-section').style.display = 'block';
    }

    // 显示空状态
    showEmptyState() {
        this.elements.gamesGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon">🔍</div>
                <div class="empty-state__text">未找到匹配的游戏</div>
                <div class="empty-state__subtext">尝试调整搜索条件或选择其他分类</div>
            </div>
        `;
    }

    // 显示错误消息
    showError(message) {
        // 简单的错误提示实现
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f56565;
            color: white;
            padding: 16px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // 3秒后自动移除
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }

    // 显示加载状态
    showLoading(container, message = '加载中...') {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div class="loading"></div>
                <p style="margin-top: 16px; color: #666;">${message}</p>
            </div>
        `;
    }

    // 更新游戏控制按钮状态
    updateGameControls(gameId, isPlaying) {
        // 可以根据游戏状态更新控制按钮
        const restartBtn = document.getElementById('restartGame');
        const settingsBtn = document.getElementById('gameSettings');
        
        if (restartBtn) {
            restartBtn.disabled = !isPlaying;
        }
    }
}

// 导出供其他模块使用
export { UIManager };