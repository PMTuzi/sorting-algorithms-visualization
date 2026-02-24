#!/usr/bin/env python3
"""
独立脚本：添加PPT幻灯片
"""

from pptx import Presentation
import sys
import os

def main():
    if len(sys.argv) < 3:
        print("用法: python add_slide_locally.py <ppt路径> <要添加的文本>")
        return
    
    ppt_path = sys.argv[1]
    text_content = sys.argv[2]
    
    try:
        # 加载PPT文件
        prs = Presentation(ppt_path)
        
        # 添加新幻灯片（使用标题和内容布局）
        slide_layout = prs.slide_layouts[1]
        slide = prs.slides.add_slide(slide_layout)
        
        # 添加文本内容
        if len(slide.placeholders) > 1:
            content = slide.placeholders[1]
            content.text = text_content
        
        # 保存文件
        prs.save(ppt_path)
        print(f"成功添加幻灯片到: {ppt_path}")
        
        # 尝试打开文件
        if sys.platform == 'darwin':
            os.system(f'open "{ppt_path}"')
        elif sys.platform == 'win32':
            os.system(f'start "" "{ppt_path}"')
        else:
            os.system(f'xdg-open "{ppt_path}"')
            
    except Exception as e:
        print(f"操作失败: {e}")

if __name__ == "__main__":
    main()