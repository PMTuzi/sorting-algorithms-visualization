@echo off
REM 排序算法项目构建和运行脚本 (Windows)

echo ==========================================
echo   C++ 排序算法项目 - 构建脚本 (Windows)
echo ==========================================
echo.

REM 检查编译器
where cl >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    where g++ >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo 错误: 未找到C++编译器 ^(MSVC cl 或 MinGW g++^)
        echo 请安装 Visual Studio 或 MinGW
        pause
        exit /b 1
    )
    set COMPILER=g++
    set COMPILER_NAME=MinGW GCC
) else (
    set COMPILER=cl
    set COMPILER_NAME=MSVC
)

echo 检测到编译器: %COMPILER_NAME%
echo.

echo 请选择构建方式:
echo 1. 快速构建（仅主程序）
echo 2. 完整构建（包含测试，使用CMake）
echo.
set /p choice="请输入选项 (1/2, 默认为1): "
if "%choice%"=="" set choice=1

if "%choice%"=="1" (
    echo.
    echo 快速构建主程序...
    echo ==========================================
    
    if "%COMPILER%"=="g++" (
        g++ -std=c++17 -Wall -O2 -I. main.cpp -o main.exe
    ) else (
        cl /EHsc /std:c++17 /W4 /O2 /I. main.cpp /Fe:main.exe
    )
    
    if %ERRORLEVEL% NEQ 0 (
        echo 编译失败！
        pause
        exit /b 1
    )
    
    echo.
    echo 构建完成！
    echo.
    set /p run_choice="是否运行程序? (y/n, 默认y): "
    if "%run_choice%"=="" set run_choice=y
    
    if /i "%run_choice%"=="y" (
        echo.
        echo 运行程序...
        echo ==========================================
        main.exe
    )

) else if "%choice%"=="2" (
    echo.
    echo 使用CMake完整构建...
    echo ==========================================
    
    where cmake >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo 错误: 未找到CMake
        echo 请从 https://cmake.org/download/ 下载安装
        pause
        exit /b 1
    )
    
    if not exist build mkdir build
    cd build
    
    echo 配置项目...
    cmake ..
    
    if %ERRORLEVEL% NEQ 0 (
        echo CMake配置失败！
        cd ..
        pause
        exit /b 1
    )
    
    echo.
    echo 编译项目...
    cmake --build . --config Release
    
    if %ERRORLEVEL% NEQ 0 (
        echo 编译失败！
        cd ..
        pause
        exit /b 1
    )
    
    echo.
    echo 构建完成！
    echo.
    echo 可执行文件位置:
    echo   - 主程序: build\Release\main.exe 或 build\main.exe
    echo   - 测试程序: build\Release\test_sorting.exe 或 build\test_sorting.exe
    echo.
    
    set /p run_choice="是否运行主程序? (y/n, 默认y): "
    if "%run_choice%"=="" set run_choice=y
    
    if /i "%run_choice%"=="y" (
        echo.
        echo 运行主程序...
        echo ==========================================
        if exist Release\main.exe (
            Release\main.exe
        ) else (
            main.exe
        )
    )
    
    echo.
    set /p test_choice="是否运行测试? (y/n, 默认y): "
    if "%test_choice%"=="" set test_choice=y
    
    if /i "%test_choice%"=="y" (
        echo.
        echo 运行测试...
        echo ==========================================
        if exist Release\test_sorting.exe (
            Release\test_sorting.exe
        ) else (
            test_sorting.exe
        )
    )
    
    cd ..

) else (
    echo 无效选项
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   操作完成！
echo ==========================================
pause