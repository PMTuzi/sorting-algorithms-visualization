#!/usr/bin/env python3
"""
排序算法快速演示脚本
"""

import subprocess
import sys
import os

def run_python_demo():
    """运行 Python 版本演示"""
    print("🐍 启动 Python 排序算法演示...")
    try:
        subprocess.run([sys.executable, "python_sorting_algorithms.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Python 演示运行失败: {e}")
    except FileNotFoundError:
        print("❌ 找不到 python_sorting_algorithms.py 文件")

def run_java_demo():
    """运行 Java 版本演示"""
    print("☕ 启动 Java 排序算法演示...")
    
    # 检查是否已编译
    if not os.path.exists("JavaSortingAlgorithms.class"):
        print("🔨 正在编译 Java 文件...")
        try:
            subprocess.run(["javac", "JavaSortingAlgorithms.java"], check=True)
            print("✅ 编译成功!")
        except subprocess.CalledProcessError as e:
            print(f"❌ Java 编译失败: {e}")
            return
        except FileNotFoundError:
            print("❌ 找不到 javac 命令，请确保已安装 JDK")
            return
    
    # 运行 Java 程序
    try:
        subprocess.run(["java", "JavaSortingAlgorithms"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Java 演示运行失败: {e}")
    except FileNotFoundError:
        print("❌ 找不到 java 命令，请确保已安装 JDK")

def show_menu():
    """显示主菜单"""
    while True:
        print("\n" + "="*50)
        print("🎓 排序算法多语言演示平台")
        print("="*50)
        print("1. 🌐 浏览器演示 (JavaScript) - 已启动在 http://localhost:8080")
        print("2. 🐍 Python 命令行演示")
        print("3. ☕ Java 命令行演示")
        print("4. 📁 查看源代码文件")
        print("5. 🚪 退出")
        print("="*50)
        
        choice = input("请选择要执行的操作 (1-5): ").strip()
        
        if choice == '1':
            print("🌐 请在浏览器中访问: http://localhost:8080")
            print("💡 或者点击 IDE 中的预览按钮")
        elif choice == '2':
            run_python_demo()
        elif choice == '3':
            run_java_demo()
        elif choice == '4':
            show_file_structure()
        elif choice == '5':
            print("👋 感谢使用排序算法演示平台!")
            break
        else:
            print("❌ 无效选择，请输入 1-5 之间的数字")

def show_file_structure():
    """显示文件结构"""
    print("\n📁 项目文件结构:")
    print("-" * 30)
    files = {
        "index.html": "🌐 主菜单页面 (多语言选择)",
        "sorting_visualizer.html": "🌐 JavaScript 可视化演示",
        "javascript_sorting_demo.js": "🔷 JavaScript 排序算法核心",
        "python_sorting_algorithms.py": "🐍 Python 排序算法实现",
        "JavaSortingAlgorithms.java": "☕ Java 排序算法实现",
        "sorting_algorithms.h": "🔷 C++ 排序算法头文件",
        "sorting_algorithms.tpp": "🔷 C++ 模板实现文件"
    }
    
    for filename, description in files.items():
        if os.path.exists(filename):
            print(f"✅ {filename} - {description}")
        else:
            print(f"❌ {filename} - {description} (文件不存在)")

if __name__ == "__main__":
    # 切换到脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    print("🚀 排序算法演示平台启动中...")
    show_menu()