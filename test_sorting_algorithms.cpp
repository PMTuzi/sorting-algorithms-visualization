/**
 * @file test_sorting_algorithms.cpp
 * @brief 归并排序算法的单元测试
 * 使用Google Test框架
 */

#include <gtest/gtest.h>
#include "sorting_algorithms.h"
#include <vector>
#include <string>
#include <algorithm>
#include <random>

// ==================== 归并排序测试类 ====================

class TestMergeSort : public ::testing::Test {
protected:
    void SetUp() override {
        // 每个测试前的设置
    }

    void TearDown() override {
        // 每个测试后的清理
    }
};

TEST_F(TestMergeSort, EmptyList) {
    std::vector<int> arr;
    EXPECT_EQ(merge_sort(arr), arr);
}

TEST_F(TestMergeSort, SingleElement) {
    std::vector<int> arr = {5};
    std::vector<int> expected = {5};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, AlreadySorted) {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    std::vector<int> expected = {1, 2, 3, 4, 5};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, ReverseSorted) {
    std::vector<int> arr = {5, 4, 3, 2, 1};
    std::vector<int> expected = {1, 2, 3, 4, 5};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, RandomUnsorted) {
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    std::vector<int> expected = {11, 12, 22, 25, 34, 64, 90};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, DuplicateElements) {
    std::vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    std::vector<int> expected = {1, 1, 2, 3, 4, 5, 5, 6, 9};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, AllDuplicates) {
    std::vector<int> arr = {3, 3, 3, 3};
    std::vector<int> expected = {3, 3, 3, 3};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, NegativeNumbers) {
    std::vector<int> arr = {-3, -1, -4, -2};
    std::vector<int> expected = {-4, -3, -2, -1};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, MixedPositiveNegative) {
    std::vector<int> arr = {-5, 3, -2, 0, 4, -1};
    std::vector<int> expected = {-5, -2, -1, 0, 3, 4};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, LargeNumbers) {
    std::vector<int> arr = {1000, 500, 1500, 750};
    std::vector<int> expected = {500, 750, 1000, 1500};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, FloatNumbers) {
    std::vector<double> arr = {3.5, 1.2, 4.8, 2.1};
    std::vector<double> expected = {1.2, 2.1, 3.5, 4.8};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, MixedNumbers) {
    std::vector<double> arr = {3.0, 1.5, 4.0, 2.5};
    std::vector<double> expected = {1.5, 2.5, 3.0, 4.0};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, Strings) {
    std::vector<std::string> arr = {"banana", "apple", "cherry"};
    std::vector<std::string> expected = {"apple", "banana", "cherry"};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, SingleString) {
    std::vector<std::string> arr = {"hello"};
    std::vector<std::string> expected = {"hello"};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, WithZero) {
    std::vector<int> arr = {0, 3, 1, 2};
    std::vector<int> expected = {0, 1, 2, 3};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, OneElementArraysRecursive) {
    std::vector<int> arr = {2, 1};
    std::vector<int> expected = {1, 2};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, TwoElementArraysRecursive) {
    std::vector<int> arr = {4, 3, 2, 1};
    std::vector<int> expected = {1, 2, 3, 4};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, OddLengthArray) {
    std::vector<int> arr = {5, 2, 1, 4, 3};
    std::vector<int> expected = {1, 2, 3, 4, 5};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, EvenLengthArray) {
    std::vector<int> arr = {4, 2, 1, 3};
    std::vector<int> expected = {1, 2, 3, 4};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, OriginalUnchanged) {
    std::vector<int> original = {3, 1, 4, 1, 5};
    std::vector<int> sorted_arr = merge_sort(original);
    std::vector<int> expected_original = {3, 1, 4, 1, 5};
    std::vector<int> expected_sorted = {1, 1, 3, 4, 5};
    EXPECT_EQ(original, expected_original);
    EXPECT_EQ(sorted_arr, expected_sorted);
}

TEST_F(TestMergeSort, StabilityOfMergeSort) {
    // 使用pair来测试稳定性
    std::vector<std::pair<int, char>> arr = {
        {3, 'a'}, {1, 'b'}, {2, 'c'}, {1, 'd'}
    };
    std::vector<std::pair<int, char>> result = merge_sort(arr);
    
    // 检查排序结果
    EXPECT_EQ(result[0].first, 1);
    EXPECT_EQ(result[1].first, 1);
    EXPECT_EQ(result[2].first, 2);
    EXPECT_EQ(result[3].first, 3);
    
    // 验证稳定性：相同值的元素应保持原有顺序
    EXPECT_EQ(result[0].second, 'b');
    EXPECT_EQ(result[1].second, 'd');
}

TEST_F(TestMergeSort, LargeDataset) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(0, 1000);
    
    std::vector<int> large_arr(100);
    for (int i = 0; i < 100; ++i) {
        large_arr[i] = dis(gen);
    }
    
    std::vector<int> sorted_arr = merge_sort(large_arr);
    std::vector<int> expected = large_arr;
    std::sort(expected.begin(), expected.end());
    
    EXPECT_EQ(sorted_arr, expected);
}

TEST_F(TestMergeSort, EdgeCaseTwoElements) {
    std::vector<int> arr1 = {2, 1};
    std::vector<int> expected1 = {1, 2};
    EXPECT_EQ(merge_sort(arr1), expected1);
    
    std::vector<int> arr2 = {1, 2};
    std::vector<int> expected2 = {1, 2};
    EXPECT_EQ(merge_sort(arr2), expected2);
}

TEST_F(TestMergeSort, EdgeCaseThreeElements) {
    std::vector<int> arr = {3, 1, 2};
    std::vector<int> expected = {1, 2, 3};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, SortedWithDuplicates) {
    std::vector<int> arr = {1, 2, 2, 3, 4};
    std::vector<int> expected = {1, 2, 2, 3, 4};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, ReverseWithDuplicates) {
    std::vector<int> arr = {4, 3, 2, 2, 1};
    std::vector<int> expected = {1, 2, 2, 3, 4};
    EXPECT_EQ(merge_sort(arr), expected);
}

TEST_F(TestMergeSort, RecursionDepthTolerance) {
    std::vector<int> large_arr(1000);
    for (int i = 0; i < 1000; ++i) {
        large_arr[i] = i;
    }
    
    std::random_device rd;
    std::mt19937 g(rd());
    std::shuffle(large_arr.begin(), large_arr.end(), g);
    
    std::vector<int> sorted_arr = merge_sort(large_arr);
    
    std::vector<int> expected(1000);
    for (int i = 0; i < 1000; ++i) {
        expected[i] = i;
    }
    
    EXPECT_EQ(sorted_arr, expected);
}

// ==================== 归并排序特性测试 ====================

TEST(MergeSortProperties, Stability) {
    std::vector<std::pair<int, char>> arr = {
        {1, 'a'}, {2, 'b'}, {1, 'c'}, {3, 'd'}, {2, 'e'}
    };
    
    std::vector<std::pair<int, char>> sorted_arr = merge_sort(arr);
    
    // 验证排序结果
    std::vector<int> first_elements;
    for (const auto& item : sorted_arr) {
        first_elements.push_back(item.first);
    }
    std::vector<int> expected_first = {1, 1, 2, 2, 3};
    EXPECT_EQ(first_elements, expected_first);
    
    // 验证稳定性
    std::vector<char> one_elements;
    for (const auto& item : sorted_arr) {
        if (item.first == 1) {
            one_elements.push_back(item.second);
        }
    }
    std::vector<char> expected_one = {'a', 'c'};
    EXPECT_EQ(one_elements, expected_one);
    
    std::vector<char> two_elements;
    for (const auto& item : sorted_arr) {
        if (item.first == 2) {
            two_elements.push_back(item.second);
        }
    }
    std::vector<char> expected_two = {'b', 'e'};
    EXPECT_EQ(two_elements, expected_two);
}

// ==================== 所有排序算法的基本测试 ====================

class TestAllSortingAlgorithms : public ::testing::Test {
protected:
    std::vector<int> test_arr = {64, 34, 25, 12, 22, 11, 90};
    std::vector<int> expected = {11, 12, 22, 25, 34, 64, 90};
};

TEST_F(TestAllSortingAlgorithms, BubbleSort) {
    EXPECT_EQ(bubble_sort(test_arr), expected);
}

TEST_F(TestAllSortingAlgorithms, QuickSort) {
    EXPECT_EQ(quick_sort(test_arr), expected);
}

TEST_F(TestAllSortingAlgorithms, MergeSort) {
    EXPECT_EQ(merge_sort(test_arr), expected);
}

// ==================== 主函数 ====================

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}