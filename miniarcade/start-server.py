#!/usr/bin/env python3
"""
MiniArcade 本地开发服务器
用于在本地运行和测试游戏网站
"""

import http.server
import socketserver
import webbrowser
import os
import sys

class MiniArcadeServer:
    def __init__(self, port=8000):
        self.port = port
        self.handler = http.server.SimpleHTTPRequestHandler
        self.httpd = None
        
    def start(self):
        """启动本地服务器"""
        try:
            # 切换到项目目录
            os.chdir(os.path.dirname(os.path.abspath(__file__)))
            
            # 创建服务器
            with socketserver.TCPServer(("", self.port), self.handler) as self.httpd:
                print(f"🚀 MiniArcade 服务器已启动!")
                print(f"📁 项目目录: {os.getcwd()}")
                print(f"🌐 访问地址: http://localhost:{self.port}")
                print(f"📱 可在局域网内访问: http://{self.get_local_ip()}:{self.port}")
                print("⏹️  按 Ctrl+C 停止服务器")
                print("-" * 50)
                
                # 自动打开浏览器
                webbrowser.open(f"http://localhost:{self.port}")
                
                # 启动服务器
                self.httpd.serve_forever()
                
        except KeyboardInterrupt:
            print("\n🛑 服务器已停止")
        except Exception as e:
            print(f"❌ 服务器启动失败: {e}")
            sys.exit(1)
    
    def get_local_ip(self):
        """获取本地IP地址"""
        import socket
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            ip = s.getsockname()[0]
            s.close()
            return ip
        except:
            return "127.0.0.1"

def main():
    """主函数"""
    port = 8000
    
    # 检查端口是否被占用
    try:
        server = MiniArcadeServer(port)
        server.start()
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ 端口 {port} 已被占用，尝试使用端口 {port + 1}")
            server = MiniArcadeServer(port + 1)
            server.start()
        else:
            raise

if __name__ == "__main__":
    main()