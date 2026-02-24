---
name: ppt-opener
description: Open and edit local PPT/PPTX files. Use when users provide local PPT file paths and need to open, create, or edit PowerPoint presentations, including adding new slides with text content.
---

# PPT Opener and Editor

## Overview

This skill enables Claude to open, create, and edit local PowerPoint (.pptx) files using cross-platform system commands and the python-pptx library.

## Quick Start

When a user provides a local PPT file path, Claude can:

1. **Open PPT with default viewer** - Launch the PPT in system's PowerPoint application
2. **Add new slides with text** - Insert new slides with user-provided content
3. **Create new PPT files** - Generate new presentations with custom titles and content
4. **Validate files** - Check file existence and format before operations

## Prerequisites

Before using this skill, ensure `python-pptx` library is installed:

```bash
pip install python-pptx
```

## Core Operations

### Opening PPT Files

Use the `open_ppt` function to open PPT files in the system's default viewer:

```python
from scripts.open_ppt import open_ppt

success, message = open_ppt("/path/to/presentation.pptx")
```

### Adding New Slides

Add slides with text content using `add_slide_with_text`:

```python
from scripts.open_ppt import add_slide_with_text

text_content = """这是新的幻灯片内容
- 要点一
- 要点二
- 要点三"""

success, message = add_slide_with_text(
    "/path/to/presentation.pptx", 
    text_content,
    layout_index=1  # Title and content layout
)
```

### Creating New PPT Files

Create new presentations with `create_new_ppt`:

```python
from scripts.open_ppt import create_new_ppt

success, message = create_new_ppt(
    "/path/to/new_presentation.pptx",
    title="演示文稿标题",
    content="副标题或内容"
)
```

## Slide Layouts

Available slide layout indexes:

- **0**: Title Slide (标题幻灯片)
- **1**: Title and Content (标题和内容) - Default
- **2**: Section Header (章节标题)
- **3**: Two Content (两栏内容)
- **4**: Comparison (比较布局)
- **5**: Title Only (仅标题)
- **6**: Blank (空白幻灯片)

## Platform Support

### macOS
```bash
open /path/to/presentation.pptx
```

### Windows
```cmd
start "" "C:\path\to\presentation.pptx"
```

### Linux
```bash
xdg-open /path/to/presentation.pptx
```

## Usage Examples

### Batch Slide Addition
```python
# 批量添加多个幻灯片
slide_contents = ["内容一", "内容二", "内容三"]
for i, content in enumerate(slide_contents):
    add_slide_with_text(presentation_path, content)
```

### Report Template Creation
```python
# 创建标准报告模板
create_new_ppt("report.pptx", "季度报告", "2024 Q1")
add_slide_with_text("report.pptx", "市场分析...")
add_slide_with_text("report.pptx", "财务数据...")
```

## Error Handling

Common error scenarios and solutions:

1. **File not found** - Verify the path exists and is accessible
2. **Permission denied** - Ensure file is not open in another application
3. **Invalid format** - Only .pptx format is supported (not .ppt)
4. **Library missing** - Install python-pptx with `pip install python-pptx`

## Resource Files

### scripts/open_ppt.py
Contains the main implementation for all PPT operations including file validation, opening, and editing functions.

### references/ppt_operations.md
Detailed reference documentation with advanced usage examples, error handling patterns, and best practices.

## Command Line Usage

```bash
# 打开PPT
python scripts/open_ppt.py open presentation.pptx

# 添加幻灯片
python scripts/open_ppt.py add-slide presentation.pptx "幻灯片内容"

# 创建新PPT
python scripts/open_ppt.py create new_presentation.pptx "标题" "内容"
```

## Best Practices

1. **Path handling**: Use absolute paths and handle spaces in file names
2. **Backup important files**: Make copies before bulk editing
3. **Error checking**: Always verify operation success and handle failures gracefully
4. **Platform awareness**: Use appropriate commands for macOS, Windows, and Linux