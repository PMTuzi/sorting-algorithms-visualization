/**
 * JavaScript 排序算法演示
 * 包含冒泡排序、快速排序、归并排序三种算法
 */

class SortingDemo {
    constructor() {
        this.array = [];
        this.originalArray = [];
        this.steps = [];
        this.currentStep = 0;
        this.isAnimating = false;
    }

    // 生成随机数组
    generateRandomArray(size = 10, min = 1, max = 100) {
        this.array = [];
        for (let i = 0; i < size; i++) {
            this.array.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        this.originalArray = [...this.array];
        this.steps = [];
        this.currentStep = 0;
        return this.array;
    }

    // 重置数组到原始状态
    resetArray() {
        this.array = [...this.originalArray];
        this.steps = [];
        this.currentStep = 0;
    }

    // ==================== 冒泡排序 ====================
    bubbleSort(array = null) {
        const arr = array || [...this.array];
        const steps = [];
        const n = arr.length;
        
        console.log("开始冒泡排序...");
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            message: "开始冒泡排序"
        });

        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            
            for (let j = 0; j < n - i - 1; j++) {
                // 记录比较步骤
                steps.push({
                    array: [...arr],
                    comparing: [j, j + 1],
                    swapping: [],
                    sorted: Array.from({length: i}, (_, idx) => n - idx - 1),
                    message: `比较 ${arr[j]} 和 ${arr[j + 1]}`
                });

                if (arr[j] > arr[j + 1]) {
                    // 记录交换前的状态
                    steps.push({
                        array: [...arr],
                        comparing: [j, j + 1],
                        swapping: [j, j + 1],
                        sorted: Array.from({length: i}, (_, idx) => n - idx - 1),
                        message: `交换 ${arr[j]} 和 ${arr[j + 1]}`
                    });
                    
                    // 执行交换
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swapped = true;
                    
                    // 记录交换后的状态
                    steps.push({
                        array: [...arr],
                        comparing: [j, j + 1],
                        swapping: [j, j + 1],
                        sorted: Array.from({length: i}, (_, idx) => n - idx - 1),
                        message: `交换完成: ${arr[j]} <-> ${arr[j + 1]}`
                    });
                }
            }
            
            if (!swapped) break;
        }
        
        // 标记所有元素为已排序
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({length: n}, (_, i) => i),
            message: "冒泡排序完成!"
        });

        if (!array) {
            this.steps = steps;
        }
        return { result: arr, steps: steps };
    }

    // ==================== 快速排序 ====================
    quickSort(array = null) {
        const arr = array || [...this.array];
        const steps = [];
        
        console.log("开始快速排序...");
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            pivot: [],
            message: "开始快速排序"
        });

        const quickSortHelper = (arr, low, high, steps) => {
            if (low < high) {
                const pivotIndex = partition(arr, low, high, steps);
                
                // 标记pivot为已排序
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [],
                    sorted: [pivotIndex],
                    pivot: [],
                    message: `基准元素 ${arr[pivotIndex]} 已就位`
                });
                
                quickSortHelper(arr, low, pivotIndex - 1, steps);
                quickSortHelper(arr, pivotIndex + 1, high, steps);
            } else if (low === high) {
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [],
                    sorted: [low],
                    pivot: [],
                    message: `单个元素 ${arr[low]} 已排序`
                });
            }
        };

        const partition = (arr, low, high, steps) => {
            const pivot = arr[high];
            let i = low - 1;

            // 标记pivot
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: [],
                pivot: [high],
                message: `选择基准元素: ${pivot}`
            });

            for (let j = low; j < high; j++) {
                // 标记正在比较的元素
                steps.push({
                    array: [...arr],
                    comparing: [j],
                    swapping: [],
                    sorted: [],
                    pivot: [high],
                    message: `比较 ${arr[j]} 和基准 ${pivot}`
                });

                if (arr[j] <= pivot) {
                    i++;
                    if (i !== j) {
                        // 标记即将交换
                        steps.push({
                            array: [...arr],
                            comparing: [i, j],
                            swapping: [i, j],
                            sorted: [],
                            pivot: [high],
                            message: `交换 ${arr[i]} 和 ${arr[j]}`
                        });
                        
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                        
                        // 标记交换完成
                        steps.push({
                            array: [...arr],
                            comparing: [i, j],
                            swapping: [i, j],
                            sorted: [],
                            pivot: [high],
                            message: `交换完成`
                        });
                    }
                }
            }

            // 将pivot放到正确位置
            if (i + 1 !== high) {
                steps.push({
                    array: [...arr],
                    comparing: [i + 1, high],
                    swapping: [i + 1, high],
                    sorted: [],
                    pivot: [high],
                    message: `将基准元素放到正确位置`
                });
                
                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                
                steps.push({
                    array: [...arr],
                    comparing: [i + 1, high],
                    swapping: [i + 1, high],
                    sorted: [],
                    pivot: [high],
                    message: `基准元素就位: ${arr[i + 1]}`
                });
            }

            return i + 1;
        };

        quickSortHelper(arr, 0, arr.length - 1, steps);

        if (!array) {
            this.steps = steps;
        }
        return { result: arr, steps: steps };
    }

    // ==================== 归并排序 ====================
    mergeSort(array = null) {
        const arr = array || [...this.array];
        const steps = [];
        
        console.log("开始归并排序...");
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            merging: [],
            message: "开始归并排序"
        });

        const mergeSortHelper = (arr, start, end, steps, originalArr) => {
            if (start === end) {
                steps.push({
                    array: [...originalArr],
                    comparing: [],
                    swapping: [],
                    sorted: [start],
                    merging: [],
                    message: `单个元素 ${originalArr[start]} 已排序`
                });
                return;
            }

            const mid = Math.floor((start + end) / 2);
            mergeSortHelper(arr, start, mid, steps, originalArr);
            mergeSortHelper(arr, mid + 1, end, steps, originalArr);
            merge(arr, start, mid, end, steps, originalArr);
        };

        const merge = (arr, start, mid, end, steps, originalArr) => {
            const leftArr = [];
            const rightArr = [];
            
            for (let i = start; i <= mid; i++) {
                leftArr.push(arr[i]);
            }
            for (let i = mid + 1; i <= end; i++) {
                rightArr.push(arr[i]);
            }

            let i = 0, j = 0, k = start;
            const mergeRange = Array.from({length: end - start + 1}, (_, idx) => start + idx);

            // 标记正在合并的范围
            steps.push({
                array: [...originalArr],
                comparing: [],
                swapping: [],
                sorted: [],
                merging: mergeRange,
                message: `合并 [${start}, ${mid}] 和 [${mid + 1}, ${end}]`
            });

            while (i < leftArr.length && j < rightArr.length) {
                // 标记比较元素
                steps.push({
                    array: [...originalArr],
                    comparing: [start + i, mid + 1 + j],
                    swapping: [],
                    sorted: [],
                    merging: mergeRange,
                    message: `比较 ${leftArr[i]} 和 ${rightArr[j]}`
                });

                if (leftArr[i] <= rightArr[j]) {
                    originalArr[k] = leftArr[i];
                    i++;
                } else {
                    originalArr[k] = rightArr[j];
                    j++;
                }

                // 标记合并进度
                steps.push({
                    array: [...originalArr],
                    comparing: [k],
                    swapping: [],
                    sorted: [],
                    merging: mergeRange,
                    message: `放置元素 ${originalArr[k]} 到位置 ${k}`
                });
                
                k++;
            }

            while (i < leftArr.length) {
                originalArr[k] = leftArr[i];
                steps.push({
                    array: [...originalArr],
                    comparing: [k],
                    swapping: [],
                    sorted: [],
                    merging: mergeRange,
                    message: `放置剩余元素 ${leftArr[i]}`
                });
                i++;
                k++;
            }

            while (j < rightArr.length) {
                originalArr[k] = rightArr[j];
                steps.push({
                    array: [...originalArr],
                    comparing: [k],
                    swapping: [],
                    sorted: [],
                    merging: mergeRange,
                    message: `放置剩余元素 ${rightArr[j]}`
                });
                j++;
                k++;
            }

            // 标记合并完成的范围为已排序
            steps.push({
                array: [...originalArr],
                comparing: [],
                swapping: [],
                sorted: mergeRange,
                merging: [],
                message: `合并完成 [${start}, ${end}]`
            });
        };

        const originalArrayCopy = [...arr];
        mergeSortHelper(arr, 0, arr.length - 1, steps, originalArrayCopy);

        if (!array) {
            this.steps = steps;
        }
        return { result: originalArrayCopy, steps: steps };
    }

    // ==================== 动画控制 ====================
    playAnimation(steps, speed = 500) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentStep = 0;
        this.steps = steps;

        const animate = () => {
            if (this.currentStep >= steps.length) {
                this.isAnimating = false;
                this.onAnimationComplete();
                return;
            }

            const step = steps[this.currentStep];
            this.onStepUpdate(step, this.currentStep, steps.length);
            
            this.currentStep++;
            setTimeout(animate, speed);
        };

        animate();
    }

    pauseAnimation() {
        this.isAnimating = false;
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.onStepUpdate(this.steps[this.currentStep], this.currentStep, this.steps.length);
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.onStepUpdate(this.steps[this.currentStep], this.currentStep, this.steps.length);
        }
    }

    // 回调函数占位符
    onStepUpdate(step, current, total) {
        // 子类或使用者可以覆盖此方法
        console.log(`步骤 ${current + 1}/${total}: ${step.message}`);
        console.log('当前数组:', step.array);
    }

    onAnimationComplete() {
        // 子类或使用者可以覆盖此方法
        console.log("动画完成!");
    }

    // ==================== 工具方法 ====================
    printArray(arr) {
        return '[' + arr.join(', ') + ']';
    }

    getAlgorithmInfo() {
        return {
            bubble: {
                name: "冒泡排序",
                timeComplexity: "O(n²)",
                spaceComplexity: "O(1)",
                stability: "稳定",
                description: "重复遍历数组，比较相邻元素并交换位置"
            },
            quick: {
                name: "快速排序",
                timeComplexity: "O(n log n) 平均, O(n²) 最坏",
                spaceComplexity: "O(log n)",
                stability: "不稳定",
                description: "选择基准元素，将数组分为小于和大于基准的两部分"
            },
            merge: {
                name: "归并排序",
                timeComplexity: "O(n log n)",
                spaceComplexity: "O(n)",
                stability: "稳定",
                description: "分治法，将数组分成两半分别排序后合并"
            }
        };
    }
}

// 导出类（如果在Node.js环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SortingDemo;
}

// 如果在浏览器环境中
if (typeof window !== 'undefined') {
    window.SortingDemo = SortingDemo;
}