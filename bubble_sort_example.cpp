#include <iostream>
#include <vector>

template<typename T>
std::vector<T> bubble_sort(const std::vector<T>& arr) {
    std::vector<T> result = arr;
    size_t n = result.size();
    
    for (size_t i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (size_t j = 0; j < n - i - 1; ++j) {
            if (result[j] > result[j + 1]) {
                std::swap(result[j], result[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    
    return result;
}

void print_vector(const std::vector<int>& vec) {
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]\n";
}

int main() {
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    std::cout << "原数组: ";
    print_vector(arr);
    
    std::vector<int> sorted = bubble_sort(arr);
    
    std::cout << "排序后: ";
    print_vector(sorted);
    
    return 0;
}
