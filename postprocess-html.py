#!/usr/bin/env python3
"""
Simple HTML post-processor for iframe compatibility
Usage: python3 postprocess_html.py path/to/file.html
"""

import re
import sys
import os

def process_html_for_iframe(html_file):
    """Process HTML file to make it iframe-compatible"""
    
    if not os.path.exists(html_file):
        print(f"Error: File {html_file} not found!")
        return False
    
    # Read the HTML file
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    print("Processing HTML for iframe compatibility...")
    
    # 1. Add responsive meta tag if missing
    if '<meta name="viewport"' not in html_content:
        html_content = html_content.replace(
            '<head>',
            '<head>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">'
        )
        print("✓ Added responsive meta tag")
    
    # 2. Ensure Plotly.js is loaded from CDN
    plotly_cdn = '<script src="https://cdn.plot.ly/plotly-2.25.2.min.js"></script>'
    
    if 'plotly' in html_content.lower() and plotly_cdn not in html_content:
        html_content = html_content.replace('</head>', f'    {plotly_cdn}\n</head>')
        print("✓ Added Plotly.js CDN")
    
    # 3. Add iframe-specific CSS
    iframe_css = '''
<style>
/* Iframe-optimized styles */
body {
    margin: 0 !important;
    padding: 20px !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    line-height: 1.6 !important;
    background: #ffffff !important;
}

/* Responsive images */
img {
    max-width: 100% !important;
    height: auto !important;
    border-radius: 8px !important;
    margin: 1rem 0 !important;
}

/* Plotly containers responsive */
.plotly-graph-div {
    width: 100% !important;
    max-width: 100% !important;
    margin: 1.5rem 0 !important;
    border-radius: 8px !important;
    border: 1px solid #e1e5e9 !important;
}

/* Tables responsive */
table {
    width: 100% !important;
    border-collapse: collapse !important;
    margin: 1rem 0 !important;
    overflow-x: auto !important;
    display: block !important;
}

table th, table td {
    padding: 0.75rem !important;
    border: 1px solid #dee2e6 !important;
    text-align: left !important;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    body {
        padding: 15px !important;
        font-size: 14px !important;
    }
    
    .plotly-graph-div {
        margin: 1rem 0 !important;
    }
}

/* Remove fixed widths */
* {
    max-width: 100% !important;
}
</style>
'''
    
    # Insert CSS before closing head tag
    if '</head>' in html_content:
        html_content = html_content.replace('</head>', iframe_css + '\n</head>')
        print("✓ Added iframe-specific CSS")
    
    # 4. Add height communication script
    iframe_script = '''
<script>
// Communicate height to parent iframe
function sendHeightToParent() {
    try {
        const height = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ height: height }, '*');
        }
    } catch (e) {
        // Cross-origin restrictions
    }
}

// Send height when page loads and when content changes
window.addEventListener('load', function() {
    sendHeightToParent();
    setTimeout(sendHeightToParent, 1000);
    setTimeout(sendHeightToParent, 2000);
});

window.addEventListener('resize', function() {
    setTimeout(sendHeightToParent, 100);
});

// Enhanced Plotly support
document.addEventListener('DOMContentLoaded', function() {
    const plotDivs = document.querySelectorAll('.plotly-graph-div');
    
    plotDivs.forEach(function(div) {
        if (div._fullLayout) {
            try {
                Plotly.relayout(div, {
                    'autosize': true,
                    'responsive': true
                });
            } catch(e) {
                console.log('Could not make plot responsive');
            }
        }
        
        div.addEventListener('plotly_afterplot', function() {
            setTimeout(sendHeightToParent, 100);
        });
    });
});
</script>
'''
    
    # Insert script before closing body tag
    html_content = html_content.replace('</body>', iframe_script + '\n</body>')
    print("✓ Added height communication script")
    
    # 5. Make external links open in new tab
    html_content = re.sub(
        r'<a ([^>]*href=[^>]*)>',
        r'<a \1 target="_blank" rel="noopener noreferrer">',
        html_content
    )
    print("✓ Set external links to open in new tab")
    
    # Write the processed HTML back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✓ Successfully processed {html_file}")
    return True

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 postprocess_html.py <html_file>")
        print("Example: python3 postprocess_html.py blog/data_visualization_analysis.html")
        sys.exit(1)
    
    html_file = sys.argv[1]
    if process_html_for_iframe(html_file):
        print("🚀 HTML file is now iframe-ready!")
        print("📝 The file can now be loaded in an iframe with working Plotly visualizations.")
    else:
        print("❌ Processing failed!")
        sys.exit(1)