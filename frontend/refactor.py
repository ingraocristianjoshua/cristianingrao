import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # We want to transform the FOLDER WINDOWS
    # Let's target win-folder-miniature, win-folder-video, win-folder-uni, win-folder-uni-1, 2, 3
    
    # 1. Replace the win-titlebar and body start
    pattern = re.compile(
        r'<span class="win-title" style="display:flex; align-items:center; justify-content:center; gap:5px; margin: 0 auto;">\s*<img src="[^"]*" style="width:16px;">\s*(.*?)\s*</span>\s*</div>\s*<div class="win-body win-content-flex" style="background: #fafafa; padding:0;">',
        re.DOTALL
    )
    
    def repl_header(match):
        title = match.group(1).strip()
        return f'''<span class="win-title">{title.capitalize()}</span>
        </div>
        <div class="win-toolbar">
            <div class="toolbar-btn">⟨ ⟩</div>
            <div class="toolbar-path">{title.capitalize()}</div>
        </div>
        <div class="win-content-flex">'''
        
    html = pattern.sub(repl_header, html)
    
    # 2. Replace <div class="folder-grid"> with <div class="win-body finder-grid">
    html = html.replace('<div class="folder-grid">', '<div class="win-body finder-grid">')
    
    # 3. Inside the folder grids, we have divs with inline styles like:
    # <div style="text-align:center; width:80px; cursor:pointer;" ondblclick="...">
    # Let's change those to <div class="finder-file" onclick="selectFolder(this, event)" ondblclick="...">
    
    # Also <div class="folder" onclick="selectFolder(this, event)" ondblclick="...">
    # Let's change those to <div class="finder-file" onclick="selectFolder(this, event)" ondblclick="...">
    
    # Replace inline div
    pattern_inline = re.compile(
        r'<div style="text-align:center; width:80px; cursor:pointer;" (ondblclick="[^"]+")>'
    )
    html = pattern_inline.sub(r'<div class="finder-file" onclick="selectFolder(this, event)" \1>', html)
    
    # Replace folder div in finder grids (only inside FOLDER WINDOWS, not desktop)
    # Actually, we can just replace all <div class="folder" with <div class="finder-file" ONLY in the finder windows.
    # To do this safely, we will do it in chunks.
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == "__main__":
    main()
