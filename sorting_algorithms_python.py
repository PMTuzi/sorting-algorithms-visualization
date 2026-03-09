#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Python 排序算法实现
包含冒泡排序、快速排序、归并排序三种经典算法
"""


def bubble_sort(arr):
    """
    冒泡排序算法
    
    参数:
        arr (list): 待排序的列表
        
    返回:
        list: 排序后的列表（原列表不会被修改）
        
    时间复杂度: O(n²)
    空间复杂度: O(1)
    稳定性: 稳定
    """
    arr_copy = arr[:]  # 创建副本以不修改原数组
    n = len(arr_copy)
    
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr_copy[j] > arr_copy[j + 1]:
                arr_copy[j], arr_copy[j + 1] = arr_copy[j + 1], arr_copy[j]
                swapped = True
        if not swapped:
            break
    
    return arr_copy


def quick_sort(arr):
    """
    快速排序算法
    
    参数:
        arr (list): 待排序的列表
        
    返回:
        list: 排序后的列表（原列表不会被修改）
        
    时间复杂度: 平均 O(n log n), 最坏 O(n²)
    空间复杂度: O(log n)
    稳定性: 不稳定
    """
    if len(arr) <= 1:
        return arr[:]  # 返回副本
    
    pivot = arr[len(arr) // 2]  # 选择中间元素作为基准
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)


def merge_sort(arr):
    """
    归并排序算法
    
    参数:
        arr (list): 待排序的列表
        
    返回:
        list: 排序后的列表（原列表不会被修改）
        
    时间复杂度: O(n log n)
    空间复杂度: O(n)
    稳定性: 稳定
    """
    if len(arr) <= 1:
        return arr[:]
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return _merge(left, right)


def _merge(left, right):
    """
    合并两个有序数组（辅助函数）
    """
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # 添加剩余元素
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result


def heap_sort(arr):
    """
    堆排序算法
    
    参数:
        arr (list): 待排序的列表
        
    返回:
        list: 排序后的列表（原列表不会被修改）
        
    时间复杂度: O(n log n)
    空间复杂度: O(1)
    稳定性: 不稳定
    """
    arr_copy = arr[:]
    n = len(arr_copy)
    
    # 构建最大堆
    for i in range(n // 2 - 1, -1, -1):
        _heapify(arr_copy, n, i)
    
    # 逐个提取元素
    for i in range(n - 1, 0, -1):
        arr_copy[0], arr_copy[i] = arr_copy[i], arr_copy[0]  # 交换
        _heapify(arr_copy, i, 0)  # 重新调整堆
    
    return arr_copy


def _heapify(arr, n, i):
    """
    调整堆（辅助函数）
    
    参数:
        arr: 数组
        n: 堆的大小
        i: 堆的根索引
    """
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        _heapify(arr, n, largest)


def test_sorting_algorithms():
    """
    测试所有排序算法的正确性
    """
    test_cases = [
        [64, 34, 25, 12, 22, 11, 90],
        [5, 2, 8, 1, 9],
        [1],
        [],
        [3, 3, 3, 3, 3],
        [9, 8, 7, 6, 5, 4, 3, 2, 1],
        [1.5, 3.2, 0.7, 2.8, 1.1],
        ['banana', 'apple', 'cherry', 'date', 'elderberry']
    ]
    
    print("=" * 60)
    print("Python 排序算法测试")
    print("=" * 60)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n测试用例 {i}: {test_case}")
        print(f"原数组: {test_case}")
        
        result = bubble_sort(test_case)
        print(f"冒泡排序: {result}")
        
        result = quick_sort(test_case)
        print(f"快速排序: {result}")
        
        result = merge_sort(test_case)
        print(f"归并排序: {result}")
        
        if all(isinstance(x, (int, float)) for x in test_case):
            result = heap_sort(test_case)
            print(f"堆排序:   {result}")
    
    print("\n" + "=" * 60)
    print("测试完成!")
    print("=" * 60)


def performance_comparison():
    """
    性能特性对比
    """
    print("\n" + "=" * 60)
    print("算法性能特性对比")
    print("=" * 60)
    
    print("\n" + "-" * 60)
    print(f"{'算法名称':<15} {'时间复杂度':<20} {'空间复杂度':<15} {'稳定性':<10}")
    print("-" * 60)
    
    print(f"{'冒泡排序':<15} {'O(n²)':<20} {'O(1)':<15} {'稳定':<10}")
    print(f"{'快速排序':<15} {'O(n log n) 平均':<20} {'O(log n)':<15} {'不稳定':<10}")
    print(f"{'归并排序':<15} {'O(n log n)':<20} {'O(n)':<15} {'稳定':<10}")
    print(f"{'堆排序':<15} {'O(n log n)':<20} {'O(1)':<15} {'不稳定':<10}")
    print("-" * 60)


def benchmark(arr_size=1000):
    """
    基准测试：比较不同算法的性能
    """
    import random
    import time
    
    print(f"\n性能基准测试 (数组大小: {arr_size})")
    print("-" * 40)
    
    # 生成测试数据
    test_data = [random.randint(1, 10000) for _ in range(arr_size)]
    
    algorithms = [
        ("冒泡排序", bubble_sort),
        ("快速排序", quick_sort),
        ("归并排序", merge_sort),
        ("堆排序", heap_sort)
    ]
    
    results = []
    
    for name, func in algorithms:
        data_copy = test_data[:]
        start_time = time.time()
        result = func(data_copy)
        elapsed = time.time() - start_time
        
        # 验证排序结果是否正确
        is_correct = result == sorted(test_data)
        
        results.append((name, elapsed, is_correct))
        print(f"{name:<15}: {elapsed:.6f} 秒 - {'✓' if is_correct else '✗'}")
    
    print("-" * 40)
    
    # 排序按性能排序
    results.sort(key=lambda x: x[1])
    print("性能排名:")
    for i, (name, elapsed, _) in enumerate(results, 1):
        print(f"{i:2}. {name:<15}: {elapsed:.6f} 秒")


def main():
    """
    主函数
    """
    print("\n╔" + "═" * 56 + "╗")
    print("║" + " " * 20 + "Python 排序算法演示" + " " * 20 + "║")
    print("╚" + "═" * 56 + "╝")
    
    # 基本功能测试
    test_sorting_algorithms()
    
    # 性能特性对比
    performance_comparison()
    
    # 性能基准测试（小规模）
    benchmark(arr_size=200)
    
    print("\n" + "=" * 60)
    print("程序执行完毕！")
    print("=" * 60)


if __name__ == "__main__":
    main()