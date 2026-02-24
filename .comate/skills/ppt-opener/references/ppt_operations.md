# PPT操作参考文档

## 概述
本文档详细说明如何使用python-pptx库进行PPT文件的创建、打开和编辑操作。

## 安装依赖
在使用此skill之前，需要安装python-pptx库：

```bash
pip install python-pptx
```

## 基本操作

### 1. 打开现有PPT文件
```python
from scripts.open_ppt import open_ppt

# 打开现有的PPT文件
success, message = open_ppt("/path/to/presentation.pptx")
```

### 2. 添加新幻灯片
```python
from scripts.open_ppt import add_slide_with_text

# 向现有PPT添加新幻灯片
text_content = """这是新幻灯片的内容
- 第一点
- 第二点
- 第三点"""

success, message = add_slide_with_text(
    "/path/to/presentation.pptx", 
    text_content,
    layout_index=1  # 使用标题和内容布局
)
```

### 3. 创建新PPT文件
```python
from scripts.open_ppt import create_new_ppt

# 创建新的PPT文件
success, message = create_new_ppt(
    "/path/to/new_presentation.pptx",
    title="演示文稿标题",
    content="副标题或内容"
)
```

## 幻灯片布局类型

python-pptx提供了多种内置幻灯片布局：

| 索引 | 布局类型 | 描述 |
|------|----------|------|
| 0 | Title Slide | 标题幻灯片 |
| 1 | Title and Content | 标题和内容 |
| 2 | Section Header | 章节标题 |
| 3 | Two Content | 两栏内容 |
| 4 | Comparison | 比较布局 |
| 5 | Title Only | 仅标题 |
| 6 | Blank | 空白幻灯片 |

## 常见使用场景

### 场景1：批量添加幻灯片
```python
def batch_add_slides(ppt_path, slide_contents):
    """批量添加多个幻灯片"""
    for i, content in enumerate(slide_contents):
        success, message = add_slide_with_text(
            ppt_path, 
            f"幻灯片 {i+1}\n{content}",
            layout_index=1
        )
        if not success:
            print(f"添加幻灯片 {i+1} 失败: {message}")
            break
        else:
            print(f"✅ 成功添加幻灯片 {i+1}")
```

### 场景2：创建报告模板
```python
def create_report_template(output_path, report_data):
    """创建标准报告模板"""
    # 创建标题页
    create_new_ppt(
        output_path,
        title=report_data['title'],
        content=f"报告人: {report_data['author']}\n日期: {report_data['date']}"
    )
    
    # 添加内容幻灯片
    for section in report_data['sections']:
        add_slide_with_text(
            output_path,
            f"{section['title']}\n\n{section['content']}",
            layout_index=1
        )
```

## 错误处理

### 常见错误及解决方案

1. **文件不存在错误**
```python
if not os.path.exists(file_path):
    return False, "文件不存在，请检查路径是否正确"
```

2. **权限错误**
```python
try:
    prs.save(file_path)
except PermissionError:
    return False, "文件被占用或权限不足，请关闭文件后重试"
```

3. **格式错误**
```python
if not file_path.lower().endswith(('.ppt', '.pptx')):
    return False, "仅支持PPT和PPTX格式文件"
```

## 高级功能

### 文本格式化
```python
from pptx.util import Pt
from pptx.dml.color import RGBColor

# 设置字体大小和颜色
for paragraph in placeholder.text_frame.paragraphs:
    for run in paragraph.runs:
        run.font.size = Pt(18)
        run.font.color.rgb = RGBColor(0, 0, 0)  # 黑色
```

### 添加图片
```python
from pptx.util import Inches

# 在幻灯片中添加图片
slide.shapes.add_picture(
    image_path="image.png",
    left=Inches(1),
    top=Inches(1),
    width=Inches(4),
    height=Inches(3)
)
```

## 最佳实践

1. **路径处理**
   - 使用绝对路径避免相对路径问题
   - 处理路径中的空格和特殊字符
   - 验证文件扩展名

2. **错误处理**
   - 始终检查文件是否存在
   - 捕获并处理可能的异常
   - 提供清晰的错误信息

3. **用户体验**
   - 提供进度反馈
   - 支持中文路径和内容
   - 跨平台兼容性

## 命令行用法

```bash
# 打开PPT文件
python scripts/open_ppt.py open 演示文稿.pptx

# 添加新幻灯片
python scripts/open_ppt.py add-slide 演示文稿.pptx "新幻灯片内容"

# 创建新PPT
python scripts/open_ppt.py create 新演示文稿.pptx "标题" "内容"
```

## 注意事项

1. **兼容性**: 仅支持.pptx格式，不支持老版本的.ppt格式
2. **依赖**: 需要安装python-pptx库和系统PPT查看器
3. **权限**: 确保对目标文件有读写权限
4. **备份**: 重要文件操作前建议备份原始文件
```