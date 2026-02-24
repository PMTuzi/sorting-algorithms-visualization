---
name: pdf-opener
description: Open and preview local PDF files using system applications. Use when users provide local PDF file paths and need to view the PDF content in their default PDF viewer.
---

# PDF Opener

## Overview

This skill enables Claude to open and preview local PDF files using the system's default PDF viewer application.

## Quick Start

When a user provides a local PDF file path, Claude can:

1. **Open PDF with default viewer** - Launch the PDF in the system's default PDF application
2. **Verify file existence** - Check if the PDF file exists before attempting to open
3. **Cross-platform compatibility** - Works on macOS, Windows, and Linux systems

## Opening PDF Files

### macOS
On macOS systems, PDF files can be opened using the `open` command:

```bash
open /path/to/document.pdf
```

### Windows
On Windows systems, use the `start` command:

```cmd
start "" "C:\path\to\document.pdf"
```

### Linux
On Linux systems, use `xdg-open`:

```bash
xdg-open /path/to/document.pdf
```

## Workflow

1. **Receive PDF path** - User provides the local file path to the PDF
2. **Validate path format** - Ensure the path is properly formatted and contains spaces if needed
3. **Check file existence** - Verify the file exists before attempting to open
4. **Execute open command** - Use the appropriate system command based on the OS
5. **Confirm success** - Report back to user once the PDF is opened

## Error Handling

If the file doesn't exist or cannot be opened:

- Check if the path is correct
- Verify file permissions
- Confirm the file is a valid PDF
- Handle spaces and special characters in file paths

## Resources

This skill includes scripts for robust PDF opening functionality.

### scripts/
Contains utility scripts for PDF handling and file validation.

**Note**: This skill focuses specifically on opening PDF files. For PDF manipulation, editing, or text extraction, consider a dedicated PDF processing skill.
