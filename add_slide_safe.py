#!/usr/bin/env python3
"""
安全的PPT幻灯片添加脚本
等待文件可用后再操作
"""

import time
import os
import sys
from pathlib import Path

# 添加skill脚本路径
sys.path.append('.comate/skills/ppt-opener/scripts')
from open_ppt import add_slide_with_text, open_ppt, is_valid_ppt

def wait_for_file(file_path, timeout=30):
    """等待文件可用"""
    print(f"等待文件可用: {file_path}")
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        try:
            # 检查文件是否存在且可读
            path = Path(file_path)
            if path.exists() and path.is_file():
                # 尝试读取文件头来检查是否被锁定
                with open(file_path, 'rb') as f:
                    header = f.read(8)
                return True, "文件已准备好"
            time.sleep(1)
        except (IOError, PermissionError):
            print("文件被占用，等待中...")
            time.sleep(2)
    
    return False, "超时：文件仍被占用"

def main():
    if len(sys.argv) < 3:
        print("用法: python add_slide_safe.py <ppt路径> <文本内容>")
        return
    
    ppt_path = sys.argv[1]
    text_content = sys.argv[2]
    
    # 1. 等待文件可用
    success, message = wait_for_file(ppt_path)
    if not success:
        print(f"❌ {message}")
        return
    
    # 2. 添加幻灯片
    print("正在添加幻灯片...")
    success, msg = add_slide_with_text(ppt_path, text_content)
    
    if success:
        print(f"✅ {msg}")
        
        # 3. 打开文件
        print("正在打开PPT文件...")
        open_success, open_msg = open_ppt(ppt_path)
        if open_success:
            print(f"✅ {open_msg}")
        else:
            print(f"⚠️ {open_msg}")
    else:
        print(f"❌ {msg}")
        
        # 备用方案：提供手动操作指南
        print("\n💡 备用方案：")
        print("1. 请先确保PowerPoint已关闭该文件")
        print("2. 然后运行以下命令：")
        print(f'python3 .comate/skills/ppt-opener/scripts/open_ppt.py add-slide "{ppt_path}" "{text_content}"')

if __name__ == "__main__":
    main()