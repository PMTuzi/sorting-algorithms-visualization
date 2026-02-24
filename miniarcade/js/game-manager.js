// MiniArcade - 游戏管理器
// 负责游戏数据的加载、状态管理和游戏切换

class GameManager {
    constructor() {
        this.games = [];
        this.currentGame = null;
        this.gameInstances = new Map();
        this.scores = this.loadScores();
    }

    // 游戏数据定义
    getGameDefinitions() {
        return [
            {
                id: 'number-sort',
                title: '数字排序挑战',
                description: '通过拖拽数字方块，将它们按从小到大的顺序排列。考验你的逻辑思维和操作技巧！',
                icon: '🔢',
                difficulty: 'medium',
                category: 'puzzle',
                tags: ['益智', '排序', '拖拽'],
                minPlayers: 1,
                maxPlayers: 1,
                estimatedTime: '3-10分钟'
            },
            {
                id: 'memory-match',
                title: '记忆匹配',
                description: '翻开卡片找到相同的图案配对，挑战你的记忆力和反应速度！',
                icon: '🧠',
                difficulty: 'easy',
                category: 'puzzle',
                tags: ['记忆', '配对', '反应'],
                minPlayers: 1,
                maxPlayers: 2,
                estimatedTime: '2-5分钟'
            },
            {
                id: 'tic-tac-toe',
                title: '井字棋',
                description: '经典的井字棋游戏，与AI或朋友对战，三子连线即可获胜！',
                icon: '⭕',
                difficulty: 'easy',
                category: 'strategy',
                tags: ['对战', '策略', '经典'],
                minPlayers: 1,
                maxPlayers: 2,
                estimatedTime: '1-3分钟'
            },
            {
                id: 'guess-number',
                title: '猜数字',
                description: '计算机随机生成数字，通过提示猜中目标数字，看看你需要几次！',
                icon: '🎯',
                difficulty: 'easy',
                category: 'puzzle',
                tags: ['猜谜', '逻辑', '数字'],
                minPlayers: 1,
                maxPlayers: 1,
                estimatedTime: '1-5分钟'
            },
            {
                id: 'minesweeper',
                title: '扫雷',
                description: '避开地雷，标记所有安全区域，经典的扫雷游戏在线版！',
                icon: '💣',
                difficulty: 'hard',
                category: 'strategy',
                tags: ['推理', '冒险', '经典'],
                minPlayers: 1,
                maxPlayers: 1,
                estimatedTime: '5-15分钟'
            },
            {
                id: 'snake',
                title: '贪吃蛇',
                description: '控制小蛇吃掉食物不断成长，小心不要撞到墙壁或自己的身体！',
                icon: '🐍',
                difficulty: 'medium',
                category: 'action',
                tags: ['动作', '敏捷', '经典'],
                minPlayers: 1,
                maxPlayers: 1,
                estimatedTime: '2-8分钟'
            },
            {
                id: 'tetris',
                title: '俄罗斯方块',
                description: '旋转移动下落的方块，填满整行消除得分，挑战最高分！',
                icon: '🧊',
                difficulty: 'medium',
                category: 'action',
                tags: ['堆叠', '敏捷', '经典'],
                minPlayers: 1,
                maxPlayers: 1,
                estimatedTime: '3-10分钟'
            },
            {
                id: 'typing-test',
                title: '打字速度测试',
                description: '测试你的打字速度和准确率，提升键盘输入技能！',
                icon: '⌨️',
                difficulty: 'easy',
                category: 'educational',
                tags: ['学习', '速度', '准确'],
                minPlayers: 1,
                maxPlayers: 1,
                estimatedTime: '1-3分钟'
            },
            {
                id: 'math-challenge',
                title: '数学心算挑战',
                description: '快速解答数学题目，锻炼你的心算能力和反应速度！',
                icon: '🧮',
                difficulty: 'medium',
                category: 'educational',
                tags: ['数学', '心算', '学习'],
                minPlayers: 1,
                maxPlayers: 1,
                estimatedTime: '2-5分钟'
            },
            {
                id: 'color-match',
                title: '颜色配对',
                description: '按照颜色分类配对，训练你的色彩识别和分类能力！',
                icon: '🎨',
                difficulty: 'easy',
                category: 'puzzle',
                tags: ['颜色', '分类', '配对'],
                minPlayers: 1,
                maxPlayers: 1,
                estimatedTime: '2-4分钟'
            }
        ];
    }

    // 加载游戏数据
    async loadGames() {
        try {
            this.games = this.getGameDefinitions();
            console.log(`加载了 ${this.games.length} 个游戏`);
        } catch (error) {
            console.error('加载游戏数据失败:', error);
            throw new Error('无法加载游戏数据');
        }
    }

    // 获取所有游戏
    getGames() {
        return this.games;
    }

    // 根据ID获取游戏
    getGameById(gameId) {
        return this.games.find(game => game.id === gameId);
    }

    // 搜索游戏
    searchGames(query) {
        if (!query.trim()) return this.games;
        
        const searchTerm = query.toLowerCase();
        return this.games.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm) ||
            game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // 按分类过滤游戏
    filterGamesByCategory(category) {
        if (category === 'all') return this.games;
        return this.games.filter(game => game.category === category);
    }

    // 启动游戏
    async startGame(gameId) {
        try {
            // 停止当前游戏
            this.stopCurrentGame();

            // 加载游戏模块
            const gameModule = await this.loadGameModule(gameId);
            
            // 创建游戏实例
            const gameInstance = new gameModule.default();
            this.gameInstances.set(gameId, gameInstance);
            this.currentGame = gameId;

            console.log(`游戏 ${gameId} 启动成功`);
            return gameInstance;
        } catch (error) {
            console.error(`启动游戏 ${gameId} 失败:`, error);
            throw new Error(`无法启动游戏: ${gameId}`);
        }
    }

    // 动态加载游戏模块
    async loadGameModule(gameId) {
        try {
            // 根据游戏ID动态导入对应的游戏模块
            switch(gameId) {
                case 'number-sort':
                    // 先加载对应的CSS样式
                    await this.loadGameCSS(gameId);
                    return await import(`./games/${gameId}.js`);
                default:
                    // 其他游戏暂时返回模拟模块
                    console.warn(`游戏 ${gameId} 尚未实现，使用模拟模块`);
                    return {
                        default: class MockGame {
                            async init(container) {
                                container.innerHTML = `
                                    <div style="text-align: center; padding: 40px;">
                                        <div style="font-size: 48px; margin-bottom: 20px;">🎮</div>
                                        <h3>游戏开发中</h3>
                                        <p>${gameId} 游戏正在开发中，敬请期待...</p>
                                        <button class="btn btn-primary" onclick="window.app.backToGames()" style="margin-top: 20px;">
                                            返回游戏中心
                                        </button>
                                    </div>
                                `;
                            }
                            destroy() {}
                        }
                    };
            }
        } catch (error) {
            console.error(`加载游戏模块 ${gameId} 失败:`, error);
            throw new Error(`游戏模块加载失败: ${gameId}`);
        }
    }

    // 加载游戏CSS样式
    async loadGameCSS(gameId) {
        return new Promise((resolve, reject) => {
            // 检查是否已经加载过该CSS
            if (document.querySelector(`link[href="css/games/${gameId}.css"]`)) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `css/games/${gameId}.css`;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    // 停止当前游戏
    stopCurrentGame() {
        if (this.currentGame) {
            const instance = this.gameInstances.get(this.currentGame);
            if (instance && typeof instance.destroy === 'function') {
                instance.destroy();
            }
            this.currentGame = null;
        }
    }

    // 保存游戏分数
    saveScore(gameId, score) {
        if (!this.scores[gameId]) {
            this.scores[gameId] = [];
        }
        
        this.scores[gameId].push({
            score,
            timestamp: Date.now(),
            date: new Date().toISOString()
        });

        // 只保留最近10条记录
        this.scores[gameId] = this.scores[gameId].slice(-10);
        
        this.saveScores();
    }

    // 获取游戏最高分
    getHighScore(gameId) {
        const scores = this.scores[gameId] || [];
        return scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0;
    }

    // 获取游戏历史记录
    getGameHistory(gameId) {
        return this.scores[gameId] || [];
    }

    // 加载保存的分数
    loadScores() {
        try {
            const saved = localStorage.getItem('miniarcade_scores');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('加载分数失败:', error);
            return {};
        }
    }

    // 保存分数到本地存储
    saveScores() {
        try {
            localStorage.setItem('miniarcade_scores', JSON.stringify(this.scores));
        } catch (error) {
            console.error('保存分数失败:', error);
        }
    }

    // 重置所有数据
    resetData() {
        this.scores = {};
        localStorage.removeItem('miniarcade_scores');
    }
}

// 导出供其他模块使用
export { GameManager };