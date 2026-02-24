# PPT Opener Skill 使用指南

## 功能概述

这个skill可以帮助您：
- 🚀 **打开本地PPT文件** - 在默认PowerPoint应用中打开PPT
- 📝 **新建PPT页面** - 快速创建新的幻灯片
- ✍️ **写入文本内容** - 在新建页面中添加用户指定的文本
- 💾 **自动保存** - 编辑完成后自动保存文件

## 快速开始

### 1. 基本使用示例

当用户提供PPT文件路径和要添加的文本内容时，skill会自动处理：

```python
# 打开已有的PPT文件并添加新幻灯片
from .comate.skills.ppt-opener.scripts.open_ppt import add_slide_with_text, open_ppt

# 添加新幻灯片
success, message = add_slide_with_text(
    "/path/to/your/presentation.pptx",
    "这是要添加到新幻灯片的文本内容\n- 要点一\n- 要点二\n- 要点三"
)

# 打开文件查看效果
if success:
    open_ppt("/path/to/your/presentation.pptx")
```

### 2. 创建新PPT文件

```python
from .comate.skills.ppt-opener.scripts.open_ppt import create_new_ppt

# 创建全新的PPT文件
success, message = create_new_ppt(
    "new_presentation.pptx",
    title="我的演示文稿标题",
    content="副标题或简介内容"
)
```

### 3. 用户交互示例

当用户提供类似以下信息时，skill可以自动处理：

**用户输入示例：**
```
帮我打开 /Users/tanzeng/Documents/报告.pptx 这个文件，新建一页并写入"本季度业绩总结"这个内容
```

**skill会自动执行：**
1. 检查文件是否存在
2. 添加包含指定文本的新幻灯片
3. 自动保存文件
4. 打开PowerPoint预览结果

## 支持的操作系统

- **macOS**: 使用 `open` 命令
- **Windows**: 使用 `start` 命令  
- **Linux**: 使用 `xdg-open` 命令

## 幻灯片布局选项

可用的幻灯片布局索引：
- `0`: 标题幻灯片
- `1`: 标题和内容 (默认)
- `2`: 章节标题
- `3`: 两栏内容
- `4`: 比较布局
- `5`: 仅标题
- `6`: 空白幻灯片

## 错误处理

skill包含完整的错误处理机制：
- 文件不存在检查
- 格式验证（支持.ppt和.pptx）
- 权限错误处理
- 依赖库检查

## 文件位置

- Skill配置文件：`.comate/skills/ppt-opener/ppt-opener.skill`
- 主要实现：`.comate/skills/ppt-opener/scripts/open_ppt.py`
- 演示脚本：`.comate/skills/ppt-opener/scripts/demo_ppt_skill.py`

## 测试验证

skill已经通过功能测试，确认可以：
✅ 创建新的PPT文件  
✅ 添加包含文本的幻灯片  
✅ 自动保存编辑  
✅ 跨平台兼容性

您可以直接使用这个skill来处理PPT文件操作需求！