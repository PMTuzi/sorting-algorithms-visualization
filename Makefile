# Makefile for Sorting Algorithms Project
# 提供简单的编译选项，无需CMake

CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -Wpedantic -O2
INCLUDES = -I.

# 目标文件
TARGET = main
TEST_TARGET = test_sorting

# 源文件
MAIN_SRC = main.cpp
TEST_SRC = test_sorting_algorithms.cpp

# 头文件
HEADERS = sorting_algorithms.h sorting_algorithms.tpp

.PHONY: all clean test run help

# 默认目标
all: $(TARGET)

# 编译主程序
$(TARGET): $(MAIN_SRC) $(HEADERS)
	@echo "编译主程序..."
	$(CXX) $(CXXFLAGS) $(INCLUDES) $(MAIN_SRC) -o $(TARGET)
	@echo "编译完成: ./$(TARGET)"

# 运行主程序
run: $(TARGET)
	@echo "运行程序..."
	./$(TARGET)

# 编译测试（需要Google Test）
test: $(TEST_SRC) $(HEADERS)
	@echo "注意: 测试需要Google Test库"
	@echo "建议使用CMake构建测试: mkdir build && cd build && cmake .. && make"
	@echo "如果已安装Google Test，可以手动编译："
	@echo "$(CXX) $(CXXFLAGS) $(INCLUDES) $(TEST_SRC) -lgtest -lgtest_main -pthread -o $(TEST_TARGET)"

# 清理编译产物
clean:
	@echo "清理编译文件..."
	rm -f $(TARGET) $(TEST_TARGET)
	rm -rf build/
	@echo "清理完成"

# 帮助信息
help:
	@echo "可用的make目标:"
	@echo "  make          - 编译主程序"
	@echo "  make run      - 编译并运行主程序"
	@echo "  make clean    - 清理编译产物"
	@echo "  make help     - 显示此帮助信息"
	@echo ""
	@echo "使用CMake构建完整项目（推荐）:"
	@echo "  mkdir build && cd build"
	@echo "  cmake .."
	@echo "  cmake --build ."
	@echo "  ./main"
	@echo "  ./test_sorting"