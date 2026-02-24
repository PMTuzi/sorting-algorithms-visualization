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

template<typename T>
void heapify(std::vector<T>& arr, int n, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;

    // 找出根节点、左子节点、右子节点中的最大值
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // 如果最大值不是根节点，交换并递归调整
    if (largest != root) {
        std::swap(arr[root], arr[largest]);
        heapify(arr, n, largest);
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
    if (arr.empty()) {
        return arr;
    }
    
    std::vector<T> result = detail::create_array_copy(arr);
    detail::quick_sort_impl(result, 0, static_cast<int>(result.size() - 1));
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

template<typename T>
std::vector<T> heap_sort(const std::vector<T>& arr) {
    if (arr.empty()) {
        return arr;
    }

    std::vector<T> result = arr;
    int n = static_cast<int>(result.size());

    // 构建最大堆（从最后一个非叶子节点开始）
    for (int i = n / 2 - 1; i >= 0; --i) {
        detail::heapify(result, n, i);
    }

    // 逐个取出堆顶元素
    for (int i = n - 1; i > 0; --i) {
        // 将堆顶元素（最大值）移到数组末尾
        std::swap(result[0], result[i]);

        // 调整剩余元素为新堆
        detail::heapify(result, i, 0);
    }

    return result;
}

#endif // SORTING_ALGORITHMS_TPP