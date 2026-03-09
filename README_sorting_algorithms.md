# 多语言排序算法展示项目

## 项目概述

该项目提供了三种编程语言（C++、Python、JavaScript）的经典排序算法实现，并通过交互式Web页面让用户能够方便地查看和比较不同语言的实现方式。

## 已完成的功能

### 1. 交互式选择页面
- **文件**: `sorting_algorithm_selector.html`
- **功能**: 
  - 可选择编程语言(C++、Python、JavaScript)
  - 可选择排序算法(冒泡排序、快速排序、归并排序)
  - 实时生成对应语言的排序算法代码
  - 语法高亮显示代码

### 2. C++ 实现
- **文件**: 
  - `sorting_algorithms.h` - 算法声明和接口
  - `sorting_algorithms.tpp` - 算法模板实现
  - `main.cpp` - 测试和演示程序
- **包含算法**:
  - 冒泡排序 (Bubble Sort)
  - 快速排序 (Quick Sort)
  - 归并排序 (Merge Sort)
  - 堆排序 (Heap Sort)

### 3. Python 实现
- **文件**: `sorting_algorithms_python.py`
- **包含算法**:
  - 冒泡排序 (Bubble Sort)
  - 快速排序 (Quick Sort)
  - 归并排序 (Merge Sort)
  - 堆排序 (Heap Sort)
- **额外功能**:
  - 完整的测试用例
  - 性能基准测试
  - 多种数据类型支持(整数、浮点数、字符串)

### 4. JavaScript 实现
- **文件**: `javascript_sorting_demo.js`
- **包含算法**:
  - 冒泡排序
  - 快速排序
  - 归并排序
- **额外功能**:
  - 动画可视化支持
  - 逐步执行演示

## 使用方法

### 查看交互式页面
直接在浏览器中打开 `sorting_algorithm_selector.html` 文件即可开始使用。

### 运行C++程序
```bash
g++ -std=c++17 main.cpp -o sorting_demo && ./sorting_demo
```

### 运行Python程序
```bash
python3 sorting_algorithms_python.py
```

### 运行JavaScript程序
可以在网页中嵌入JavaScript代码，或使用Node.js环境运行。

## 算法特性对比

| 算法 | 时间复杂度 | 空间复杂度 | 稳定性 | 适用场景 |
|------|------------|------------|--------|----------|
| 冒泡排序 | O(n²) | O(1) | 稳定 | 教学用途，小数据集 |
| 快速排序 | O(n log n)平均 | O(log n) | 不稳定 | 通用场景，性能要求高 |
| 归并排序 | O(n log n) | O(n) | 稳定 | 大数据集，需要稳定性 |
| 堆排序 | O(n log n) | O(1) | 不稳定 | 内存敏感场景 |

## 项目结构

```
SortTest/
├── sorting_algorithm_selector.html  # 交互式选择器
├── sorting_algorithms_python.py     # Python实现
├── sorting_algorithms.h             # C++头文件
├── sorting_algorithms.tpp           # C++模板实现
├── main.cpp                         # C++主程序
├── javascript_sorting_demo.js       # JavaScript实现
└── README_sorting_algorithms.md     # 项目说明
```

## 技术特点

1. **多语言支持**: 同一算法在不同语言中的实现对比
2. **模板化设计**: C++实现使用模板支持多种数据类型
3. **测试完备**: 包含边界情况测试和性能基准测试
4. **用户友好**: 交互式界面便于学习和理解算法
5. **代码规范**: 遵循各语言的编程规范和最佳实践

## 开发和测试

所有算法都经过严格的测试验证，包括：
- 普通乱序数组
- 边界情况（空数组、单元素）
- 重复元素数组
- 逆序数组
- 不同数据类型测试

## 扩展计划

未来可以考虑添加：
- 更多排序算法的实现（基数排序、计数排序等）
- 可视化排序过程
- 并行算法实现
- WebAssembly版本的C++算法