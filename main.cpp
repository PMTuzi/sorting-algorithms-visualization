/**
 * @file main.cpp
 * @brief 排序算法演示主程序
 */

#include "sorting_algorithms.h"
#include <iostream>
#include <vector>
#include <string>
#include <iomanip>

/**
 * @brief 打印向量内容
 */
template<typename T>
void print_vector(const std::vector<T>& vec) {
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]";
}

/**
 * @brief 测试三种排序算法
 */
void test_sorting_algorithms() {
    std::vector<std::vector<int>> test_cases = {
        {64, 34, 25, 12, 22, 11, 90},
        {5, 2, 8, 1, 9},
        {1},
        {},
        {3, 3, 3, 3},
        {9, 8, 7, 6, 5, 4, 3, 2, 1}
    };

    std::cout << std::string(60, '=') << std::endl;
    std::cout << "排序算法测试" << std::endl;
    std::cout << std::string(60, '=') << std::endl;

    for (size_t i = 0; i < test_cases.size(); ++i) {
        std::cout << "\n测试用例 " << (i + 1) << ": ";
        print_vector(test_cases[i]);
        std::cout << std::endl;

        std::cout << "冒泡排序: ";
        print_vector(bubble_sort(test_cases[i]));
        std::cout << std::endl;

        std::cout << "快速排序: ";
        print_vector(quick_sort(test_cases[i]));
        std::cout << std::endl;

        std::cout << "归并排序: ";
        print_vector(merge_sort(test_cases[i]));
        std::cout << std::endl;
    }
}

/**
 * @brief 性能对比测试
 */
void performance_comparison() {
    std::cout << "\n" << std::string(60, '=') << std::endl;
    std::cout << "性能特性对比" << std::endl;
    std::cout << std::string(60, '=') << std::endl;

    std::cout << "\n算法特性表:" << std::endl;
    std::cout << std::string(60, '-') << std::endl;
    std::cout << std::left << std::setw(15) << "算法名称"
              << std::setw(20) << "时间复杂度"
              << std::setw(15) << "空间复杂度"
              << std::setw(10) << "稳定性" << std::endl;
    std::cout << std::string(60, '-') << std::endl;

    std::cout << std::left << std::setw(15) << "冒泡排序"
              << std::setw(20) << "O(n²)"
              << std::setw(15) << "O(1)"
              << std::setw(10) << "稳定" << std::endl;

    std::cout << std::left << std::setw(15) << "快速排序"
              << std::setw(20) << "O(n log n) 平均"
              << std::setw(15) << "O(log n)"
              << std::setw(10) << "不稳定" << std::endl;

    std::cout << std::left << std::setw(15) << "归并排序"
              << std::setw(20) << "O(n log n)"
              << std::setw(15) << "O(n)"
              << std::setw(10) << "稳定" << std::endl;

    std::cout << std::string(60, '-') << std::endl;
}

/**
 * @brief 字符串排序演示
 */
void string_sorting_demo() {
    std::cout << "\n" << std::string(60, '=') << std::endl;
    std::cout << "字符串排序演示" << std::endl;
    std::cout << std::string(60, '=') << std::endl;

    std::vector<std::string> fruits = {"banana", "apple", "cherry", "date", "elderberry"};

    std::cout << "\n原始数组: ";
    print_vector(fruits);
    std::cout << std::endl;

    std::cout << "归并排序结果: ";
    print_vector(merge_sort(fruits));
    std::cout << std::endl;

    std::cout << "快速排序结果: ";
    print_vector(quick_sort(fruits));
    std::cout << std::endl;
}

/**
 * @brief 主函数
 */
int main() {
    std::cout << "\n╔════════════════════════════════════════════════════════════╗" << std::endl;
    std::cout << "║            C++ 排序算法实现与测试程序                      ║" << std::endl;
    std::cout << "╚════════════════════════════════════════════════════════════╝" << std::endl;

    // 基本功能测试
    test_sorting_algorithms();

    // 性能特性对比
    performance_comparison();

    // 字符串排序演示
    string_sorting_demo();

    std::cout << "\n" << std::string(60, '=') << std::endl;
    std::cout << "程序执行完毕！" << std::endl;
    std::cout << std::string(60, '=') << std::endl;

    return 0;
}