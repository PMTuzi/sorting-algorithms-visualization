/**
 * @file sorting_algorithms.tpp
 * @brief 模板函数的实现文件
 */

#ifndef SORTING_ALGORITHMS_TPP
#define SORTING_ALGORITHMS_TPP

#include <algorithm>

// ==================== 辅助函数实现 ====================

namespace detail {

template<typename T>
std::vector<T> create_array_copy(const std::vector<T>& arr) {
    std::cout << "creating copy" << std::endl;
    return arr;
}

template<typename T>
bool bubble_sort_round(std::vector<T>& arr, size_t n, size_t round_number) {
    bool swapped = false;
    for (size_t j = 0; j < n - round_number - 1; ++j) {
        swapped = compare_and_swap_neighbors(arr, j) || swapped;
    }
    return swapped;
}

template<typename T>
bool compare_and_swap_neighbors(std::vector<T>& arr, size_t index) {
    if (arr[index] > arr[index + 1]) {
        std::swap(arr[index], arr[index + 1]);
        return true;
    }
    return false;
}

template<typename T>
std::vector<T> merge(const std::vector<T>& left, const std::vector<T>& right) {
    std::vector<T> result;
    size_t i = 0, j = 0;
    
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) {
            result.push_back(left[i]);
            ++i;
        } else {
            result.push_back(right[j]);
            ++j;
        }
    }
    
    // 添加剩余元素
    while (i < left.size()) {
        result.push_back(left[i]);
        ++i;
    }
    
    while (j < right.size()) {
        result.push_back(right[j]);
        ++j;
    }
    
    return result;
}

template<typename T>
int partition(std::vector<T>& arr, int low, int high) {
    T pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; ++j) {
        if (arr[j] < pivot) {
            ++i;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

template<typename T>
void quick_sort_impl(std::vector<T>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quick_sort_impl(arr, low, pi - 1);
        quick_sort_impl(arr, pi + 1, high);
    }
}

} // namespace detail

// ==================== 主要排序函数实现 ====================

template<typename T>
std::vector<T> bubble_sort(const std::vector<T>& arr) {
    std::vector<T> result = detail::create_array_copy(arr);
    size_t n = result.size();
    
    for (size_t i = 0; i < n; ++i) {
        bool swapped = detail::bubble_sort_round(result, n, i);
        if (!swapped) {
            break;
        }
    }
    
    return result;
}

template<typename T>
std::vector<T> quick_sort(const std::vector<T>& arr) {
    if (arr.size() <= 1) {
        return arr;
    }
    
    // 选择中间元素作为基准
    T pivot = arr[arr.size() / 2];
    std::vector<T> left, middle, right;
    
    for (const T& x : arr) {
        if (x < pivot) {
            left.push_back(x);
        } else if (x == pivot) {
            middle.push_back(x);
        } else {
            right.push_back(x);
        }
    }
    
    // 递归排序左右子数组并合并结果
    std::vector<T> sorted_left = quick_sort(left);
    std::vector<T> sorted_right = quick_sort(right);
    
    std::vector<T> result;
    result.reserve(sorted_left.size() + middle.size() + sorted_right.size());
    result.insert(result.end(), sorted_left.begin(), sorted_left.end());
    result.insert(result.end(), middle.begin(), middle.end());
    result.insert(result.end(), sorted_right.begin(), sorted_right.end());
    
    return result;
}

template<typename T>
std::vector<T> merge_sort(const std::vector<T>& arr) {
    if (arr.size() <= 1) {
        return arr;
    }
    
    // 分割数组
    size_t mid = arr.size() / 2;
    std::vector<T> left(arr.begin(), arr.begin() + mid);
    std::vector<T> right(arr.begin() + mid, arr.end());
    
    left = merge_sort(left);
    right = merge_sort(right);
    
    // 合并两个有序数组
    return detail::merge(left, right);
}

#endif // SORTING_ALGORITHMS_TPP