/**
 * Java 排序算法实现
 * 包含冒泡排序、快速排序、归并排序三种经典算法
 */

import java.util.*;
import java.util.stream.IntStream;

public class JavaSortingAlgorithms {
    
    // 统计信息类
    public static class SortStats {
        public int comparisons = 0;
        public int swaps = 0;
        public long executionTime = 0;
        
        public void reset() {
            comparisons = 0;
            swaps = 0;
            executionTime = 0;
        }
        
        @Override
        public String toString() {
            return String.format("比较: %d, 交换: %d, 时间: %.3fms", 
                comparisons, swaps, executionTime / 1_000_000.0);
        }
    }
    
    private SortStats stats = new SortStats();
    
    // ==================== 冒泡排序 ====================
    /**
     * 冒泡排序实现
     * 
     * @param arr 待排序数组
     * @return 排序后的新数组
     * 
     * 时间复杂度: O(n²)
     * 空间复杂度: O(1)
     * 稳定性: 稳定
     */
    public int[] bubbleSort(int[] arr) {
        stats.reset();
        long startTime = System.nanoTime();
        
        if (arr == null || arr.length <= 1) {
            stats.executionTime = System.nanoTime() - startTime;
            return arr == null ? new int[0] : arr.clone();
        }
        
        int[] result = arr.clone();
        int n = result.length;
        
        System.out.println("开始冒泡排序，数组长度: " + n);
        System.out.println("初始数组: " + Arrays.toString(result));
        
        // 外层循环控制排序轮数
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            System.out.println("\n第 " + (i + 1) + " 轮排序:");
            
            // 内层循环进行相邻元素比较和交换
            for (int j = 0; j < n - i - 1; j++) {
                stats.comparisons++;
                System.out.print("  比较 " + result[j] + " 和 " + result[j + 1]);
                
                if (result[j] > result[j + 1]) {
                    // 交换元素
                    int temp = result[j];
                    result[j] = result[j + 1];
                    result[j + 1] = temp;
                    stats.swaps++;
                    swapped = true;
                    System.out.println(" -> 交换! 当前数组: " + Arrays.toString(result));
                } else {
                    System.out.println(" -> 不交换");
                }
            }
            
            // 如果这一轮没有发生交换，说明已经有序
            if (!swapped) {
                System.out.println("第 " + (i + 1) + " 轮无交换发生，排序完成!");
                break;
            } else {
                System.out.println("第 " + (i + 1) + " 轮结束，数组: " + Arrays.toString(result));
            }
        }
        
        stats.executionTime = System.nanoTime() - startTime;
        System.out.println("\n冒泡排序完成!");
        System.out.println("最终结果: " + Arrays.toString(result));
        return result;
    }
    
    // ==================== 快速排序 ====================
    /**
     * 快速排序实现
     * 
     * @param arr 待排序数组
     * @return 排序后的新数组
     * 
     * 时间复杂度: O(n log n) 平均, O(n²) 最坏
     * 空间复杂度: O(log n)
     * 稳定性: 不稳定
     */
    public int[] quickSort(int[] arr) {
        stats.reset();
        long startTime = System.nanoTime();
        
        if (arr == null || arr.length <= 1) {
            stats.executionTime = System.nanoTime() - startTime;
            return arr == null ? new int[0] : arr.clone();
        }
        
        int[] result = arr.clone();
        System.out.println("开始快速排序，数组长度: " + result.length);
        System.out.println("初始数组: " + Arrays.toString(result));
        
        quickSortRecursive(result, 0, result.length - 1);
        
        stats.executionTime = System.nanoTime() - startTime;
        System.out.println("\n快速排序完成!");
        System.out.println("最终结果: " + Arrays.toString(result));
        return result;
    }
    
    private void quickSortRecursive(int[] arr, int low, int high) {
        if (low < high) {
            // 进行分区操作
            int pivotIndex = partition(arr, low, high);
            System.out.println("基准元素 " + arr[pivotIndex] + " 已就位，位置: " + pivotIndex);
            System.out.println("分区后数组: " + Arrays.toString(arr));
            
            // 递归排序左右两部分
            quickSortRecursive(arr, low, pivotIndex - 1);
            quickSortRecursive(arr, pivotIndex + 1, high);
        }
    }
    
    private int partition(int[] arr, int low, int high) {
        // 选择最后一个元素作为基准
        int pivot = arr[high];
        System.out.println("  选择基准元素: " + pivot + " (索引 " + high + ")");
        
        // i 指向小于基准元素区域的边界
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            stats.comparisons++;
            System.out.print("  比较 " + arr[j] + " 和基准 " + pivot);
            
            if (arr[j] <= pivot) {
                i++;
                if (i != j) {
                    // 交换元素
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    stats.swaps++;
                    System.out.println(" -> 交换 " + arr[i] + " 和 " + arr[j]);
                } else {
                    System.out.println(" -> 无需交换");
                }
            } else {
                System.out.println(" -> 大于基准，不交换");
            }
        }
        
        // 将基准元素放到正确位置
        if (i + 1 != high) {
            int temp = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp;
            stats.swaps++;
            System.out.println("  将基准 " + pivot + " 放到位置 " + (i + 1));
        }
        
        return i + 1;
    }
    
    // ==================== 归并排序 ====================
    /**
     * 归并排序实现
     * 
     * @param arr 待排序数组
     * @return 排序后的新数组
     * 
     * 时间复杂度: O(n log n)
     * 空间复杂度: O(n)
     * 稳定性: 稳定
     */
    public int[] mergeSort(int[] arr) {
        stats.reset();
        long startTime = System.nanoTime();
        
        if (arr == null || arr.length <= 1) {
            stats.executionTime = System.nanoTime() - startTime;
            return arr == null ? new int[0] : arr.clone();
        }
        
        int[] result = arr.clone();
        System.out.println("开始归并排序，数组长度: " + result.length);
        System.out.println("初始数组: " + Arrays.toString(result));
        
        mergeSortRecursive(result, 0, result.length - 1);
        
        stats.executionTime = System.nanoTime() - startTime;
        System.out.println("\n归并排序完成!");
        System.out.println("最终结果: " + Arrays.toString(result));
        return result;
    }
    
    private void mergeSortRecursive(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            
            // 递归排序左右两部分
            mergeSortRecursive(arr, left, mid);
            mergeSortRecursive(arr, mid + 1, right);
            
            // 合并两个有序子数组
            merge(arr, left, mid, right);
        }
    }
    
    private void merge(int[] arr, int left, int mid, int right) {
        // 创建临时数组存储左右两部分
        int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
        int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);
        
        System.out.println("合并 [" + left + ", " + mid + "] 和 [" + (mid + 1) + ", " + right + "]:");
        System.out.println("  左子数组: " + Arrays.toString(leftArr));
        System.out.println("  右子数组: " + Arrays.toString(rightArr));
        
        int i = 0, j = 0, k = left;
        
        // 合并两个有序数组
        while (i < leftArr.length && j < rightArr.length) {
            stats.comparisons++;
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                System.out.println("  选择 " + leftArr[i] + " (来自左数组)");
                i++;
            } else {
                arr[k] = rightArr[j];
                System.out.println("  选择 " + rightArr[j] + " (来自右数组)");
                j++;
            }
            k++;
        }
        
        // 复制左数组剩余元素
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            System.out.println("  复制剩余元素 " + leftArr[i]);
            i++;
            k++;
        }
        
        // 复制右数组剩余元素
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            System.out.println("  复制剩余元素 " + rightArr[j]);
            j++;
            k++;
        }
        
        System.out.println("  合并后: " + Arrays.toString(Arrays.copyOfRange(arr, left, right + 1)));
    }
    
    // ==================== 工具方法 ====================
    public SortStats getStats() {
        return stats;
    }
    
    public static int[] generateRandomArray(int size, int min, int max) {
        Random random = new Random();
        return IntStream.range(0, size)
                .map(i -> random.nextInt(max - min + 1) + min)
                .toArray();
    }
    
    public static void printArray(int[] arr) {
        System.out.println(Arrays.toString(arr));
    }
    
    // ==================== 演示方法 ====================
    public static void demonstrateSorting() {
        System.out.println("=".repeat(60));
        System.out.println("Java 排序算法演示");
        System.out.println("=".repeat(60));
        
        JavaSortingAlgorithms sorter = new JavaSortingAlgorithms();
        
        // 测试数据
        int[] testArray = {64, 34, 25, 12, 22, 11, 90, 88, 76, 45};
        System.out.println("测试数组: " + Arrays.toString(testArray));
        System.out.println();
        
        // 演示冒泡排序
        System.out.println("🧱 冒泡排序演示");
        System.out.println("-".repeat(30));
        sorter.bubbleSort(testArray);
        SortStats bubbleStats = sorter.getStats();
        System.out.println("统计信息: " + bubbleStats);
        System.out.println();
        
        // 演示快速排序
        System.out.println("⚡ 快速排序演示");
        System.out.println("-".repeat(30));
        sorter.quickSort(testArray);
        SortStats quickStats = sorter.getStats();
        System.out.println("统计信息: " + quickStats);
        System.out.println();
        
        // 演示归并排序
        System.out.println("🔗 归并排序演示");
        System.out.println("-".repeat(30));
        sorter.mergeSort(testArray);
        SortStats mergeStats = sorter.getStats();
        System.out.println("统计信息: " + mergeStats);
        System.out.println();
        
        // 性能对比
        System.out.println("📊 算法性能对比");
        System.out.println("-".repeat(30));
        System.out.printf("%-12s %-10s %-10s %-15s%n", "算法", "比较次数", "交换次数", "执行时间(ms)");
        System.out.println("-".repeat(50));
        System.out.printf("%-12s %-10d %-10d %-15.3f%n", "冒泡排序", 
            bubbleStats.comparisons, bubbleStats.swaps, bubbleStats.executionTime / 1_000_000.0);
        System.out.printf("%-12s %-10d %-10d %-15.3f%n", "快速排序", 
            quickStats.comparisons, quickStats.swaps, quickStats.executionTime / 1_000_000.0);
        System.out.printf("%-12s %-10d %-10d %-15.3f%n", "归并排序", 
            mergeStats.comparisons, mergeStats.swaps, mergeStats.executionTime / 1_000_000.0);
    }
    
    public static void interactiveDemo() {
        Scanner scanner = new Scanner(System.in);
        JavaSortingAlgorithms sorter = new JavaSortingAlgorithms();
        
        System.out.println("\n" + "=".repeat(60));
        System.out.println("🎮 交互式排序演示");
        System.out.println("=".repeat(60));
        
        while (true) {
            System.out.println("\n请选择操作:");
            System.out.println("1. 生成随机数组");
            System.out.println("2. 手动输入数组");
            System.out.println("3. 退出");
            
            System.out.print("请输入选择 (1-3): ");
            String choice = scanner.nextLine().trim();
            
            int[] arr;
            
            switch (choice) {
                case "1":
                    System.out.print("请输入数组大小 (默认10): ");
                    int size = 10;
                    try {
                        size = Integer.parseInt(scanner.nextLine().trim());
                    } catch (NumberFormatException e) {
                        // 使用默认值
                    }
                    arr = generateRandomArray(size, 1, 100);
                    System.out.println("生成的数组: " + Arrays.toString(arr));
                    break;
                    
                case "2":
                    try {
                        System.out.print("请输入数组元素 (用空格分隔): ");
                        String input = scanner.nextLine().trim();
                        String[] parts = input.split("\\s+");
                        arr = new int[parts.length];
                        for (int i = 0; i < parts.length; i++) {
                            arr[i] = Integer.parseInt(parts[i]);
                        }
                        System.out.println("输入的数组: " + Arrays.toString(arr));
                    } catch (NumberFormatException e) {
                        System.out.println("❌ 输入格式错误，请输入数字!");
                        continue;
                    }
                    break;
                    
                case "3":
                    System.out.println("👋 再见!");
                    scanner.close();
                    return;
                    
                default:
                    System.out.println("❌ 无效选择，请重新输入!");
                    continue;
            }
            
            if (arr.length == 0) {
                System.out.println("❌ 数组不能为空!");
                continue;
            }
            
            System.out.println("\n请选择排序算法:");
            System.out.println("1. 冒泡排序");
            System.out.println("2. 快速排序");
            System.out.println("3. 归并排序");
            System.out.println("4. 全部算法对比");
            
            System.out.print("请输入选择 (1-4): ");
            String algoChoice = scanner.nextLine().trim();
            
            switch (algoChoice) {
                case "1":
                    sorter.bubbleSort(arr);
                    break;
                case "2":
                    sorter.quickSort(arr);
                    break;
                case "3":
                    sorter.mergeSort(arr);
                    break;
                case "4":
                    System.out.println("\n🔍 全算法对比演示:");
                    System.out.println("-".repeat(40));
                    
                    // 冒泡排序
                    System.out.println("\n🧱 冒泡排序:");
                    sorter.bubbleSort(arr);
                    SortStats bubbleStats = sorter.getStats();
                    
                    // 快速排序
                    System.out.println("\n⚡ 快速排序:");
                    sorter.quickSort(arr);
                    SortStats quickStats = sorter.getStats();
                    
                    // 归并排序
                    System.out.println("\n🔗 归并排序:");
                    sorter.mergeSort(arr);
                    SortStats mergeStats = sorter.getStats();
                    
                    // 对比结果
                    System.out.println("\n📊 性能对比总结:");
                    System.out.println("-".repeat(40));
                    System.out.println("冒泡排序: " + bubbleStats);
                    System.out.println("快速排序: " + quickStats);
                    System.out.println("归并排序: " + mergeStats);
                    break;
                default:
                    System.out.println("❌ 无效选择!");
            }
        }
    }
    
    public static void main(String[] args) {
        // 运行演示
        demonstrateSorting();
        interactiveDemo();
    }
}