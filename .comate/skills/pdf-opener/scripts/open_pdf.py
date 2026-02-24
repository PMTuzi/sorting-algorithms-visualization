#!/usr/bin/env python3
"""
PDF Opener Utility Script for pdf-opener skill

This script provides cross-platform PDF opening functionality.
It can be used to open PDF files with the system's default viewer.
"""

import os
import sys
import platform
import subprocess
from pathlib import Path


def is_valid_pdf(file_path):
    """Check if the file exists and might be a PDF file."""
    path = Path(file_path)
    if not path.exists():
        return False, f"File does not exist: {file_path}"
    
    if not path.is_file():
        return False, f"Path is not a file: {file_path}"
    
    # Basic PDF file check (first few bytes)
    try:
        with open(path, 'rb') as f:
            header = f.read(5)
            if header != b'%PDF-':
                return False, f"File does not appear to be a valid PDF: {file_path}"
    except Exception as e:
        return False, f"Error reading file: {e}"
    
    return True, "File is valid"


def open_pdf(file_path):
    """
    Open a PDF file with the system's default PDF viewer.
    
    Args:
        file_path (str): Path to the PDF file
        
    Returns:
        tuple: (success: bool, message: str)
    """
    # Check file validity first
    is_valid, message = is_valid_pdf(file_path)
    if not is_valid:
        return False, message
    
    # Get the operating system
    system = platform.system().lower()
    
    try:
        if system == 'darwin':  # macOS
            subprocess.run(['open', file_path], check=True)
            return True, f"PDF opened successfully on macOS: {file_path}"
            
        elif system == 'windows':
            # Use start command on Windows (handles spaces in paths)
            subprocess.run(['start', '', file_path], shell=True, check=True)
            return True, f"PDF opened successfully on Windows: {file_path}"
            
        elif system == 'linux':
            subprocess.run(['xdg-open', file_path], check=True)
            return True, f"PDF opened successfully on Linux: {file_path}"
            
        else:
            return False, f"Unsupported operating system: {system}"
            
    except subprocess.CalledProcessError as e:
        return False, f"Error opening PDF: {e}"
    except FileNotFoundError:
        return False, f"System command not found. Please ensure your system has a default PDF viewer installed."


def main():
    """Command-line interface for PDF opener."""
    if len(sys.argv) < 2:
        print("Usage: python open_pdf.py <pdf-file-path>")
        print("Example: python open_pdf.py /path/to/document.pdf")
        sys.exit(1)
    
    file_path = sys.argv[1]
    success, message = open_pdf(file_path)
    
    if success:
        print(f"✅ {message}")
    else:
        print(f"❌ {message}")
        sys.exit(1)


if __name__ == "__main__":
    main()