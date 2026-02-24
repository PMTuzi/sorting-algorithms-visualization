// MiniArcade - 主应用入口
// 使用ES6模块化组织代码

import { GameManager } from './game-manager.js';
import { UIManager } from './ui-manager.js';

class MiniArcadeApp {
    constructor() {
        this.gameManager = new GameManager();
        this.uiManager = new UIManager(this);
        this.currentGame = null;
        this.init();
    }

    async init() {
        try {
            // 初始化UI管理器
            await this.uiManager.init();
            
            // 加载游戏数据
            await this.gameManager.loadGames();
            
            // 渲染游戏网格
            this.uiManager.renderGamesGrid(this.gameManager.getGames());
            
            console.log('MiniArcade应用初始化完成');
        } catch (error) {
            console.error('应用初始化失败:', error);
            this.uiManager.showError('应用初始化失败，请刷新页面重试');
        }
    }

    // 启动游戏
    async startGame(gameId) {
        try {
            this.currentGame = gameId;
            await this.gameManager.startGame(gameId);
            this.uiManager.showGameScreen(gameId);
        } catch (error) {
            console.error(`启动游戏 ${gameId} 失败:`, error);
            this.uiManager.showError('游戏启动失败');
        }
    }

    // 返回游戏中心
    backToGames() {
        this.currentGame = null;
        this.gameManager.stopCurrentGame();
        this.uiManager.showGamesGrid();
    }

    // 搜索游戏
    searchGames(query) {
        const filteredGames = this.gameManager.searchGames(query);
        this.uiManager.renderGamesGrid(filteredGames);
    }

    // 按分类过滤游戏
    filterGamesByCategory(category) {
        const filteredGames = this.gameManager.filterGamesByCategory(category);
        this.uiManager.renderGamesGrid(filteredGames);
    }
}

// 应用启动
document.addEventListener('DOMContentLoaded', () => {
    new MiniArcadeApp();
});

// 导出供其他模块使用
export { MiniArcadeApp };