cmake_minimum_required(VERSION 3.14)
project(SortingAlgorithms CXX)

# 设置C++标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# 编译选项
if(MSVC)
    add_compile_options(/W4)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# 主程序
add_executable(main main.cpp)

# 如果想使用Google Test进行测试，可以添加以下内容
option(BUILD_TESTS "Build tests" ON)

if(BUILD_TESTS)
    # 下载并包含Google Test
    include(FetchContent)
    FetchContent_Declare(
        googletest
        GIT_REPOSITORY https://github.com/google/googletest.git
        GIT_TAG release-1.12.1
    )
    # For Windows: Prevent overriding the parent project's compiler/linker settings
    set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
    FetchContent_MakeAvailable(googletest)

    enable_testing()

    # 测试可执行文件
    add_executable(test_sorting test_sorting_algorithms.cpp)
    target_link_libraries(test_sorting GTest::gtest_main)

    include(GoogleTest)
    gtest_discover_tests(test_sorting)
endif()

# 安装规则（可选）
install(TARGETS main DESTINATION bin)