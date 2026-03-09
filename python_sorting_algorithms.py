"""
Python 排序算法实现
包含冒泡排序、快速排序、归并排序三种经典算法
"""

import time
import random
from typing import List, Tuple, Any

class SortingAlgorithms:
    """排序算法集合类"""
    
    def __init__(self):
        self.comparisons = 0
        self.swaps = 0
        self.execution_time = 0
    
    def reset_stats(self):
        """重置统计信息"""
        self.comparisons = 0
        self.swaps = 0
        self.execution_time = 0
    
    def get_stats(self) -> dict:
        """获取统计信息"""
        return {
            'comparisons': self.comparisons,
            'swaps': self.swaps,
            'execution_time': self.execution_time
        }
    
    # ==================== 冒泡排序 ====================
    def bubble_sort(self, arr: List[int]) -> List[int]:
        """
        冒泡排序实现
        
        Args:
            arr: 待排序的数组
            
        Returns:
            排序后的数组副本
            
        Time Complexity: O(n²)
        Space Complexity: O(1)
        Stability: 稳定
        """
        self.reset_stats()
        start_time = time.time()
        
        # 创建数组副本，避免修改原数组
        result = arr.copy()
        n = len(result)
        
        print(f"开始冒泡排序，数组长度: {n}")
        print(f"初始数组: {result}")
        
        # 外层循环控制排序轮数
        for i in range(n):
            swapped = False
            print(f"\n第 {i+1} 轮排序:")
            
            # 内层循环进行相邻元素比较和交换
            for j in range(0, n - i - 1):
                self.comparisons += 1
                print(f"  比较 {result[j]} 和 {result[j+1]}", end="")
                
                if result[j] > result[j + 1]:
                    # 交换元素
                    result[j], result[j + 1] = result[j + 1], result[j]
                    self.swaps += 1
                    swapped = True
                    print(f" -> 交换! 当前数组: {result}")
                else:
                    print(" -> 不交换")
            
            # 如果这一轮没有发生交换，说明已经有序
            if not swapped:
                print(f"第 {i+1} 轮无交换发生，排序完成!")
                break
            else:
                print(f"第 {i+1} 轮结束，数组: {result}")
        
        self.execution_time = time.time() - start_time
        print(f"\n冒泡排序完成!")
        print(f"最终结果: {result}")
        return result
    
    # ==================== 快速排序 ====================
    def quick_sort(self, arr: List[int]) -> List[int]:
        """
        快速排序实现（迭代版本）
        
        Args:
            arr: 待排序的数组
            
        Returns:
            排序后的数组副本
            
        Time Complexity: O(n log n) 平均, O(n²) 最坏
        Space Complexity: O(log n)
        Stability: 不稳定
        """
        self.reset_stats()
        start_time = time.time()
        
        if not arr:
            return arr
            
        # 创建数组副本
        result = arr.copy()
        print(f"开始快速排序，数组长度: {len(result)}")
        print(f"初始数组: {result}")
        
        # 使用栈模拟递归
        stack = [(0, len(result) - 1)]
        
        while stack:
            low, high = stack.pop()
            
            if low < high:
                # 进行分区操作
                pivot_index = self._partition(result, low, high)
                print(f"基准元素 {result[pivot_index]} 已就位，位置: {pivot_index}")
                print(f"分区后数组: {result}")
                
                # 先处理较小的子数组（优化栈空间）
                if pivot_index - low < high - pivot_index:
                    stack.append((pivot_index + 1, high))
                    stack.append((low, pivot_index - 1))
                else:
                    stack.append((low, pivot_index - 1))
                    stack.append((pivot_index + 1, high))
        
        self.execution_time = time.time() - start_time
        print(f"\n快速排序完成!")
        print(f"最终结果: {result}")
        return result
    
    def _partition(self, arr: List[int], low: int, high: int) -> int:
        """
        快速排序的分区函数
        
        Args:
            arr: 数组
            low: 起始索引
            high: 结束索引
            
        Returns:
            基准元素的最终位置
        """
        # 选择最后一个元素作为基准
        pivot = arr[high]
        print(f"  选择基准元素: {pivot} (索引 {high})")
        
        # i 指向小于基准元素区域的边界
        i = low - 1
        
        for j in range(low, high):
            self.comparisons += 1
            print(f"  比较 {arr[j]} 和基准 {pivot}", end="")
            
            if arr[j] <= pivot:
                i += 1
                if i != j:
                    # 交换元素
                    arr[i], arr[j] = arr[j], arr[i]
                    self.swaps += 1
                    print(f" -> 交换 {arr[i]} 和 {arr[j]}")
                else:
                    print(" -> 无需交换")
            else:
                print(" -> 大于基准，不交换")
        
        # 将基准元素放到正确位置
        if i + 1 != high:
            arr[i + 1], arr[high] = arr[high], arr[i + 1]
            self.swaps += 1
            print(f"  将基准 {pivot} 放到位置 {i + 1}")
        
        return i + 1
    
    # ==================== 归并排序 ====================
    def merge_sort(self, arr: List[int]) -> List[int]:
        """
        归并排序实现
        
        Args:
            arr: 待排序的数组
            
        Returns:
            排序后的数组副本
            
        Time Complexity: O(n log n)
        Space Complexity: O(n)
        Stability: 稳定
        """
        self.reset_stats()
        start_time = time.time()
        
        if len(arr) <= 1:
            return arr.copy()
            
        # 创建数组副本
        result = arr.copy()
        print(f"开始归并排序，数组长度: {len(result)}")
        print(f"初始数组: {result}")
        
        # 自底向上的归并排序
        size = 1
        while size < len(result):
            left = 0
            while left < len(result) - 1:
                # 计算中间点和右端点
                mid = min(left + size - 1, len(result) - 1)
                right = min(left + 2 * size - 1, len(result) - 1)
                
                if mid < right:  # 只有当存在两个子数组时才合并
                    print(f"\n合并 [{left}, {mid}] 和 [{mid + 1}, {right}]:")
                    print(f"  左子数组: {result[left:mid+1]}")
                    print(f"  右子数组: {result[mid+1:right+1]}")
                    self._merge(result, left, mid, right)
                    print(f"  合并后: {result[left:right+1]}")
                
                left += 2 * size
            
            size *= 2
        
        self.execution_time = time.time() - start_time
        print(f"\n归并排序完成!")
        print(f"最终结果: {result}")
        return result
    
    def _merge(self, arr: List[int], left: int, mid: int, right: int):
        """
        合并两个有序子数组
        
        Args:
            arr: 原数组
            left: 左子数组起始索引
            mid: 左子数组结束索引
            right: 右子数组结束索引
        """
        # 创建临时数组存储合并结果
        left_arr = arr[left:mid + 1]
        right_arr = arr[mid + 1:right + 1]
        
        print(f"    合并过程:")
        print(f"      左数组: {left_arr}")
        print(f"      右数组: {right_arr}")
        
        i = j = 0
        k = left
        
        # 合并两个有序数组
        while i < len(left_arr) and j < len(right_arr):
            self.comparisons += 1
            if left_arr[i] <= right_arr[j]:
                arr[k] = left_arr[i]
                print(f"      选择 {left_arr[i]} (来自左数组)")
                i += 1
            else:
                arr[k] = right_arr[j]
                print(f"      选择 {right_arr[j]} (来自右数组)")
                j += 1
            k += 1
        
        # 复制左数组剩余元素
        while i < len(left_arr):
            arr[k] = left_arr[i]
            print(f"      复制剩余元素 {left_arr[i]}")
            i += 1
            k += 1
        
        # 复制右数组剩余元素
        while j < len(right_arr):
            arr[k] = right_arr[j]
            print(f"      复制剩余元素 {right_arr[j]}")
            j += 1
            k += 1

# ==================== 演示和测试代码 ====================
def demonstrate_sorting():
    """演示排序算法"""
    print("=" * 60)
    print("Python 排序算法演示")
    print("=" * 60)
    
    # 创建排序算法实例
    sorter = SortingAlgorithms()
    
    # 生成测试数据
    test_array = [64, 34, 25, 12, 22, 11, 90, 88, 76, 45]
    print(f"测试数组: {test_array}")
    print()
    
    # 演示冒泡排序
    print("🧱 冒泡排序演示")
    print("-" * 30)
    bubble_result = sorter.bubble_sort(test_array)
    bubble_stats = sorter.get_stats()
    print(f"统计信息: {bubble_stats}")
    print()
    
    # 演示快速排序
    print("⚡ 快速排序演示")
    print("-" * 30)
    quick_result = sorter.quick_sort(test_array)
    quick_stats = sorter.get_stats()
    print(f"统计信息: {quick_stats}")
    print()
    
    # 演示归并排序
    print("🔗 归并排序演示")
    print("-" * 30)
    merge_result = sorter.merge_sort(test_array)
    merge_stats = sorter.get_stats()
    print(f"统计信息: {merge_stats}")
    print()
    
    # 性能对比
    print("📊 算法性能对比")
    print("-" * 30)
    algorithms = ['冒泡排序', '快速排序', '归并排序']
    stats_list = [bubble_stats, quick_stats, merge_stats]
    
    print(f"{'算法':<12} {'比较次数':<10} {'交换次数':<10} {'执行时间(ms)':<15}")
    print("-" * 50)
    for algo, stats in zip(algorithms, stats_list):
        exec_time_ms = stats['execution_time'] * 1000
        print(f"{algo:<12} {stats['comparisons']:<10} {stats['swaps']:<10} {exec_time_ms:<15.3f}")

def generate_random_array(size: int = 10, min_val: int = 1, max_val: int = 100) -> List[int]:
    """生成随机数组"""
    return [random.randint(min_val, max_val) for _ in range(size)]

def interactive_demo():
    """交互式演示"""
    print("\n" + "=" * 60)
    print("🎮 交互式排序演示")
    print("=" * 60)
    
    sorter = SortingAlgorithms()
    
    while True:
        print("\n请选择操作:")
        print("1. 生成随机数组")
        print("2. 手动输入数组")
        print("3. 退出")
        
        choice = input("请输入选择 (1-3): ").strip()
        
        if choice == '1':
            size = int(input("请输入数组大小 (默认10): ") or "10")
            arr = generate_random_array(size)
            print(f"生成的数组: {arr}")
        elif choice == '2':
            try:
                arr_input = input("请输入数组元素 (用空格分隔): ")
                arr = list(map(int, arr_input.split()))
                print(f"输入的数组: {arr}")
            except ValueError:
                print("❌ 输入格式错误，请输入数字!")
                continue
        elif choice == '3':
            print("👋 再见!")
            break
        else:
            print("❌ 无效选择，请重新输入!")
            continue
        
        if len(arr) == 0:
            print("❌ 数组不能为空!")
            continue
            
        print("\n请选择排序算法:")
        print("1. 冒泡排序")
        print("2. 快速排序") 
        print("3. 归并排序")
        print("4. 全部算法对比")
        
        algo_choice = input("请输入选择 (1-4): ").strip()
        
        if algo_choice == '1':
            sorter.bubble_sort(arr)
        elif algo_choice == '2':
            sorter.quick_sort(arr)
        elif algo_choice == '3':
            sorter.merge_sort(arr)
        elif algo_choice == '4':
            print("\n🔍 全算法对比演示:")
            print("-" * 40)
            
            # 冒泡排序
            print("\n🧱 冒泡排序:")
            sorter.bubble_sort(arr)
            bubble_stats = sorter.get_stats()
            
            # 快速排序
            print("\n⚡ 快速排序:")
            sorter.quick_sort(arr)
            quick_stats = sorter.get_stats()
            
            # 归并排序
            print("\n🔗 归并排序:")
            sorter.merge_sort(arr)
            merge_stats = sorter.get_stats()
            
            # 对比结果
            print("\n📊 性能对比总结:")
            print("-" * 40)
            stats_data = [
                ('冒泡排序', bubble_stats),
                ('快速排序', quick_stats),
                ('归并排序', merge_stats)
            ]
            
            for name, stats in stats_data:
                print(f"{name}:")
                print(f"  比较次数: {stats['comparisons']}")
                print(f"  交换次数: {stats['swaps']}")
                print(f"  执行时间: {stats['execution_time']*1000:.3f} ms")
                print()

if __name__ == "__main__":
    # 运行演示
    demonstrate_sorting()
    interactive_demo()