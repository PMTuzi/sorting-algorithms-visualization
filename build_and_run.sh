#!/bin/bash

# 排序算法项目构建和运行脚本

set -e  # 遇到错误立即退出

echo "=========================================="
echo "  C++ 排序算法项目 - 构建脚本"
echo "=========================================="
echo ""

# 检查编译器
if ! command -v g++ &> /dev/null && ! command -v clang++ &> /dev/null; then
    echo "错误: 未找到C++编译器 (g++ 或 clang++)"
    exit 1
fi

# 选择构建方式
echo "请选择构建方式:"
echo "1. 快速构建（仅主程序，使用Makefile）"
echo "2. 完整构建（包含测试，使用CMake）"
echo ""
read -p "请输入选项 (1/2, 默认为1): " choice
choice=${choice:-1}

if [ "$choice" == "1" ]; then
    echo ""
    echo "使用Makefile快速构建..."
    echo "=========================================="
    make clean
    make
    echo ""
    echo "构建完成！"
    echo ""
    read -p "是否运行程序? (y/n, 默认y): " run_choice
    run_choice=${run_choice:-y}
    
    if [ "$run_choice" == "y" ] || [ "$run_choice" == "Y" ]; then
        echo ""
        echo "运行程序..."
        echo "=========================================="
        ./main
    fi

elif [ "$choice" == "2" ]; then
    echo ""
    echo "使用CMake完整构建..."
    echo "=========================================="
    
    # 检查CMake
    if ! command -v cmake &> /dev/null; then
        echo "错误: 未找到CMake"
        echo "请先安装CMake: brew install cmake (macOS) 或 apt-get install cmake (Linux)"
        exit 1
    fi
    
    # 创建并进入构建目录
    mkdir -p build
    cd build
    
    echo "配置项目..."
    cmake ..
    
    echo ""
    echo "编译项目..."
    cmake --build .
    
    echo ""
    echo "构建完成！"
    echo ""
    echo "可执行文件位置:"
    echo "  - 主程序: build/main"
    echo "  - 测试程序: build/test_sorting"
    echo ""
    
    read -p "是否运行主程序? (y/n, 默认y): " run_choice
    run_choice=${run_choice:-y}
    
    if [ "$run_choice" == "y" ] || [ "$run_choice" == "Y" ]; then
        echo ""
        echo "运行主程序..."
        echo "=========================================="
        ./main
    fi
    
    echo ""
    read -p "是否运行测试? (y/n, 默认y): " test_choice
    test_choice=${test_choice:-y}
    
    if [ "$test_choice" == "y" ] || [ "$test_choice" == "Y" ]; then
        echo ""
        echo "运行测试..."
        echo "=========================================="
        ./test_sorting
    fi
    
    cd ..

else
    echo "无效选项"
    exit 1
fi

echo ""
echo "=========================================="
echo "  操作完成！"
echo "=========================================="