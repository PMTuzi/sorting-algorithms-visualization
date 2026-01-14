/**
 * @file sorting_algorithms.h
 * @brief 三种常见排序算法的实现
 * 包括：冒泡排序、快速排序、归并排序
 */

#ifndef SORTING_ALGORITHMS_H
#define SORTING_ALGORITHMS_H

#include <vector>
#include <string>
#include <iostream>

/**
 * @brief 冒泡排序
 * 时间复杂度: O(n²)
 * 空间复杂度: O(1)
 * 稳定性: 稳定
 * 
 * @tparam T 数据类型
 * @param arr 待排序的数组
 * @return std::vector<T> 排序后的数组副本，原数组不会被修改
 */
template<typename T>
std::vector<T> bubble_sort(const std::vector<T>& arr);

/**
 * @brief 快速排序
 * 时间复杂度: 平均 O(n log n), 最坏 O(n²)
 * 空间复杂度: O(log n)
 * 稳定性: 不稳定
 * 
 * @tparam T 数据类型
 * @param arr 待排序的数组
 * @return std::vector<T> 排序后的新数组
 */
template<typename T>
std::vector<T> quick_sort(const std::vector<T>& arr);

/**
 * @brief 归并排序
 * 使用归并排序算法对数组进行排序
 * 
 * 归并排序采用分治策略，将数组递归地分成两半分别排序，然后合并两个有序子数组。
 * 该算法稳定且适用于各种数据类型，但需要额外的O(n)空间。
 * 
 * @tparam T 数据类型
 * @param arr 待排序的数组，可以是包含数字、字符串等可比较元素的向量
 * @return std::vector<T> 排序后的新数组，原数组不会被修改
 * 
 * 时间复杂度: O(n log n)
 * 空间复杂度: O(n)
 * 稳定性: 稳定
 */
template<typename T>
std::vector<T> merge_sort(const std::vector<T>& arr);

// 辅助函数声明
namespace detail {
    /**
     * @brief 创建数组的副本
     */
    template<typename T>
    std::vector<T> create_array_copy(const std::vector<T>& arr);

    /**
     * @brief 执行一轮冒泡排序
     */
    template<typename T>
    bool bubble_sort_round(std::vector<T>& arr, size_t n, size_t round_number);

    /**
     * @brief 比较并交换相邻元素
     */
    template<typename T>
    bool compare_and_swap_neighbors(std::vector<T>& arr, size_t index);

    /**
     * @brief 合并两个有序数组
     */
    template<typename T>
    std::vector<T> merge(const std::vector<T>& left, const std::vector<T>& right);

    /**
     * @brief 快速排序的递归实现
     */
    template<typename T>
    void quick_sort_impl(std::vector<T>& arr, int low, int high);

    /**
     * @brief 快速排序的分区函数
     */
    template<typename T>
    int partition(std::vector<T>& arr, int low, int high);
}

// 模板函数实现必须在头文件中
#include "sorting_algorithms.tpp"

#endif // SORTING_ALGORITHMS_H