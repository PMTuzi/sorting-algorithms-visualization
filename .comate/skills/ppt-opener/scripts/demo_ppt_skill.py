#!/usr/bin/env python3
"""
演示脚本：展示PPT opener skill的功能

这个脚本演示如何使用ppt-opener技能来：
1. 创建新的PPT文件
2. 添加多个幻灯片
3. 打开PPT文件查看
"""

import os
import sys
from open_ppt import create_new_ppt, add_slide_with_text, open_ppt, is_valid_ppt

def demo_ppt_skill():
    """演示PPT opener技能的完整功能"""
    
    # 演示文件路径
    demo_file = "demo_presentation.pptx"
    
    print("🎯 PPT Opener Skill 演示开始")
    print("=" * 50)
    
    # 1. 创建新的PPT文件
    print("1. 创建新的PPT文件...")
    success, message = create_new_ppt(
        demo_file,
        title="PPT Opener Skill 演示",
        content="使用Python自动创建和编辑PPT文件"
    )
    
    if success:
        print(f"   ✅ {message}")
    else:
        print(f"   ❌ {message}")
        return
    
    # 2. 添加多个幻灯片
    print("\n2. 添加幻灯片...")
    slides_content = [
        "第一张内容幻灯片\n• 功能一：创建PPT\n• 功能二：添加幻灯片\n• 功能三：文本格式化",
        "第二张内容幻灯片\n• 跨平台支持\n• 自动错误处理\n• 兼容macOS、Windows、Linux",
        "第三张内容幻灯片\n• 使用python-pptx库\n• 支持多种幻灯片布局\n• 可定制文本格式"
    ]
    
    for i, content in enumerate(slides_content, 1):
        success, message = add_slide_with_text(demo_file, content)
        if success:
            print(f"   ✅ 幻灯片 {i}: 添加成功")
        else:
            print(f"   ❌ 幻灯片 {i}: {message}")
    
    # 3. 验证文件
    print("\n3. 验证文件...")
    is_valid, message = is_valid_ppt(demo_file)
    if is_valid:
        print(f"   ✅ {message}")
        
        # 获取文件信息
        file_size = os.path.getsize(demo_file)
        print(f"   文件大小: {file_size:,} 字节")
    else:
        print(f"   ❌ {message}")
        return
    
    # 4. 打开文件（可选，询问用户）
    print("\n4. 是否打开演示文件？")
    print("   输入 'y' 打开演示PPT，或按回车跳过...")
    
    try:
        response = input().strip().lower()
        if response == 'y' or response == 'yes':
            print("   正在打开演示文件...")
            success, message = open_ppt(demo_file)
            if success:
                print(f"   ✅ {message}")
            else:
                print(f"   ❌ {message}")
    except:
        print("   跳过打开文件步骤")
    
    print("\n" + "=" * 50)
    print("🎯 PPT Opener Skill 演示完成!")
    print(f"演示文件已创建: {os.path.abspath(demo_file)}")
    print("你可以手动打开文件查看结果")

if __name__ == "__main__":
    demo_ppt_skill()