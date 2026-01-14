# C++ 排序算法实现

这是一个完整的C++排序算法项目，包含三种常见排序算法的实现：冒泡排序、快速排序和归并排序。

## 项目结构

```
SortingTest/
├── sorting_algorithms.h      # 排序算法头文件
├── sorting_algorithms.tpp    # 模板实现文件
├── main.cpp                   # 主程序演示
├── test_sorting_algorithms.cpp # Google Test单元测试
├── CMakeLists.txt            # CMake构建配置
├── README.md                 # 本文件
└── sorting_visualizer.html   # 可视化HTML（原Python项目保留）
```

## 功能特性

### 实现的排序算法

1. **冒泡排序 (Bubble Sort)**
   - 时间复杂度: O(n²)
   - 空间复杂度: O(1)
   - 稳定性: 稳定

2. **快速排序 (Quick Sort)**
   - 时间复杂度: 平均 O(n log n), 最坏 O(n²)
   - 空间复杂度: O(log n)
   - 稳定性: 不稳定

3. **归并排序 (Merge Sort)**
   - 时间复杂度: O(n log n)
   - 空间复杂度: O(n)
   - 稳定性: 稳定

### 特点

- **模板化设计**: 支持任何可比较的数据类型（整数、浮点数、字符串等）
- **非侵入式**: 不修改原始数组，返回新的排序数组
- **完整测试**: 包含30+个单元测试用例
- **易于使用**: 简洁的API接口

## 编译和运行

### 前置要求

- CMake 3.14 或更高版本
- C++17 兼容的编译器（GCC 7+, Clang 5+, MSVC 2017+）
- （可选）互联网连接用于下载Google Test

### 构建步骤

```bash
# 创建构建目录
mkdir build
cd build

# 配置项目
cmake ..

# 编译
cmake --build .

# 运行主程序
./main

# 运行测试（如果启用）
./test_sorting
# 或使用 ctest
ctest --output-on-failure
```

### 不使用测试构建

如果不想包含Google Test：

```bash
cmake -DBUILD_TESTS=OFF ..
cmake --build .
```

## 使用示例

### 基本使用

```cpp
#include "sorting_algorithms.h"
#include <vector>
#include <iostream>

int main() {
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    // 冒泡排序
    auto sorted1 = bubble_sort(arr);
    
    // 快速排序
    auto sorted2 = quick_sort(arr);
    
    // 归并排序
    auto sorted3 = merge_sort(arr);
    
    return 0;
}
```

### 排序不同类型

```cpp
// 排序浮点数
std::vector<double> doubles = {3.14, 2.71, 1.41, 1.73};
auto sorted_doubles = merge_sort(doubles);

// 排序字符串
std::vector<std::string> words = {"banana", "apple", "cherry"};
auto sorted_words = quick_sort(words);

// 排序自定义类型（需要重载 <, >, == 运算符）
std::vector<MyClass> objects = {...};
auto sorted_objects = merge_sort(objects);
```

## 测试

项目包含全面的单元测试，覆盖：

- 边界情况（空数组、单元素）
- 已排序和逆序数组
- 包含重复元素的数组
- 负数和混合正负数
- 大数据集
- 稳定性验证
- 不同数据类型（整数、浮点数、字符串）

运行所有测试：

```bash
cd build
./test_sorting
```

使用verbose模式：

```bash
./test_sorting --gtest_verbose
```

## API文档

### bubble_sort

```cpp
template<typename T>
std::vector<T> bubble_sort(const std::vector<T>& arr);
```

使用冒泡排序算法对数组进行排序。

**参数:**
- `arr`: 待排序的向量

**返回:** 排序后的新向量，原向量不被修改

### quick_sort

```cpp
template<typename T>
std::vector<T> quick_sort(const std::vector<T>& arr);
```

使用快速排序算法对数组进行排序。

**参数:**
- `arr`: 待排序的向量

**返回:** 排序后的新向量，原向量不被修改

### merge_sort

```cpp
template<typename T>
std::vector<T> merge_sort(const std::vector<T>& arr);
```

使用归并排序算法对数组进行排序。

**参数:**
- `arr`: 待排序的向量

**返回:** 排序后的新向量，原向量不被修改

## 性能对比

| 算法 | 最好情况 | 平均情况 | 最坏情况 | 空间复杂度 | 稳定性 |
|------|---------|---------|---------|-----------|--------|
| 冒泡排序 | O(n) | O(n²) | O(n²) | O(1) | 稳定 |
| 快速排序 | O(n log n) | O(n log n) | O(n²) | O(log n) | 不稳定 |
| 归并排序 | O(n log n) | O(n log n) | O(n log n) | O(n) | 稳定 |

## 从Python迁移的注意事项

这个C++版本保持了与原Python实现相同的接口和行为：

1. ✅ 所有函数都不修改原始数组，返回新数组
2. ✅ 支持泛型（Python可以处理任意可比较类型，C++通过模板实现）
3. ✅ 归并排序保持稳定性
4. ✅ 包含相同的测试用例
5. ✅ 输出格式相似的调试信息

主要区别：
- 使用 `std::vector<T>` 代替 Python list
- 模板语法需要在头文件中实现
- 需要显式类型声明
- 使用Google Test代替pytest

## 贡献

欢迎提交问题和改进建议！

## 许可证

MIT License

## 作者

从Python代码重构为C++版本
```
