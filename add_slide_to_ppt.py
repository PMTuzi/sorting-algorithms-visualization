from pptx import Presentation
from pptx.util import Inches

def add_slide_to_ppt(file_path, content):
    try:
        # 创建新的PPT演示文稿
        prs = Presentation()
        
        # 添加标题幻灯片(布局0)
        title_slide = prs.slides.add_slide(prs.slide_layouts[0])
        title = title_slide.shapes.title
        subtitle = title_slide.placeholders[1]
        title.text = "演示文稿"
        subtitle.text = "创建于2026年2月11日"
        
        # 添加标题和内容布局的幻灯片(布局1)
        slide_layout = prs.slide_layouts[1]
        slide = prs.slides.add_slide(slide_layout)
        
        # 设置标题和内容
        title = slide.shapes.title
        content_placeholder = slide.placeholders[1]
        
        title.text = "新幻灯片"
        content_placeholder.text = content
        
        # 保存新PPT
        prs.save(file_path)
        print(f"成功创建新PPT文件 {file_path} 并添加幻灯片")
        return True
    except Exception as e:
        print(f"操作失败: {str(e)}")
        return False

if __name__ == "__main__":
    ppt_path = "演示文稿6.pptx"  # 改为当前目录
    slide_content = "2月11日17:25"
    add_slide_to_ppt(ppt_path, slide_content)