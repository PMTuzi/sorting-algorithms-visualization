# 🎓 排序算法多语言演示平台

这是一个包含三种编程语言（JavaScript、Python、Java）的排序算法学习平台，每种语言都实现了三种经典的排序算法：冒泡排序、快速排序和归并排序。

## 🚀 快速开始

### 方法一：使用启动脚本（推荐）
```bash
cd SortTest
python3 demo_launcher.py
```

### 方法二：直接访问网页
1. 启动本地服务器：
```bash
cd SortTest
python3 -m http.server 8080
```
2. 在浏览器中访问：http://localhost:8080

## 📚 包含的算法

### 1. 冒泡排序 (Bubble Sort)
- **时间复杂度**: O(n²)
- **空间复杂度**: O(1)
- **稳定性**: 稳定
- **特点**: 简单易懂，适合教学演示

### 2. 快速排序 (Quick Sort)
- **时间复杂度**: O(n log n) 平均，O(n²) 最坏
- **空间复杂度**: O(log n)
- **稳定性**: 不稳定
- **特点**: 效率高，实际应用广泛

### 3. 归并排序 (Merge Sort)
- **时间复杂度**: O(n log n)
- **空间复杂度**: O(n)
- **稳定性**: 稳定
- **特点**: 性能稳定，适合大数据量

## 💻 三种语言版本

### 🌐 JavaScript 版本
- **文件**: `sorting_visualizer.html` + `javascript_sorting_demo.js`
- **特点**: 
  - 交互式可视化界面
  - 实时动画演示
  - 详细的步骤追踪
  - 性能统计分析
- **使用**: 直接在浏览器中打开 HTML 文件

### 🐍 Python 版本
- **文件**: `python_sorting_algorithms.py`
- **特点**:
  - 代码简洁易读
  - 详细的执行过程输出
  - 交互式命令行界面
  - 丰富的注释说明
- **运行**:
```bash
python3 python_sorting_algorithms.py
```

### ☕ Java 版本
- **文件**: `JavaSortingAlgorithms.java`
- **特点**:
  - 面向对象设计
  - 强类型安全保障
  - 详细的执行跟踪
  - 完整的类结构设计
- **编译运行**:
```bash
javac JavaSortingAlgorithms.java
java JavaSortingAlgorithms
```

## 🎮 使用说明

### 浏览器版本（JavaScript）
1. 选择排序算法
2. 调整数组大小和动画速度
3. 点击"开始排序"观看动画演示
4. 支持暂停、重置、逐步执行等功能
5. 键盘快捷键：
   - 空格键：开始/暂停
   - 左右箭头键：逐步执行

### 命令行版本（Python/Java）
1. 运行对应的程序文件
2. 选择生成随机数组或手动输入
3. 选择要演示的排序算法
4. 查看详细的执行过程和统计信息
5. 支持多次运行和算法对比

## 📊 学习价值

### 算法理解
- 直观理解排序算法的工作原理
- 观察不同算法的执行效率差异
- 理解时间复杂度和空间复杂度概念

### 编程语言对比
- 比较不同语言的语法特点
- 理解面向对象与过程式编程的区别
- 学习各语言的最佳实践

### 实际应用
- 掌握算法在实际开发中的应用场景
- 理解算法选择的重要性
- 培养算法思维和问题解决能力

## 🔧 技术特点

### JavaScript 版本
- 现代 ES6+ 语法
- 异步动画控制
- 响应式设计
- 事件驱动架构

### Python 版本
- 类型提示支持
- 函数式编程特性
- 丰富的内置库
- 清晰的代码结构

### Java 版本
- 完整的面向对象设计
- 泛型支持
- 异常处理机制
- 标准库最佳实践

## 🎯 适用人群

- **初学者**: 通过可视化演示理解算法原理
- **学生**: 学习数据结构与算法课程
- **开发者**: 复习排序算法知识
- **教师**: 教学演示工具
- **面试准备者**: 算法练习和复习

## 📝 文件说明

```
SortTest/
├── index.html                 # 主菜单页面
├── sorting_visualizer.html    # JavaScript 可视化演示
├── javascript_sorting_demo.js # JavaScript 算法核心
├── python_sorting_algorithms.py # Python 算法实现
├── JavaSortingAlgorithms.java   # Java 算法实现
├── demo_launcher.py           # 启动脚本
├── README.md                  # 说明文档
└── 其他现有文件...
```

## ⚡ 系统要求

### 浏览器版本
- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 支持 JavaScript ES6+

### Python 版本
- Python 3.6+
- 无需额外依赖

### Java 版本
- JDK 8+
- javac 和 java 命令可用

## 🤝 贡献

欢迎提出改进建议、报告问题或贡献新的功能！

## 📄 许可证

本项目仅供学习和教育用途。

---
**Happy Learning! 🎓**