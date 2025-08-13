#!/usr/bin/env python3
"""
GitHub Pages Jupyter Blog Setup Script
=====================================

This script sets up the complete project structure for your Jupyter notebook blog.
Run this in your repository root directory.

Usage: python setup_blog.py
"""

import os
import json
from pathlib import Path
from datetime import datetime

def create_directory_structure():
    """Create the required directory structure"""
    directories = [
        '.github/workflows',
        'scripts',
        'notebooks',
        'docs',
        'docs/posts'
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"✓ Created directory: {directory}")

def create_github_workflow():
    """Create the GitHub Actions workflow file"""
    workflow_content = '''# .github/workflows/build-blog.yml
name: Build and Deploy Blog

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        pip install jupyter nbconvert pandas matplotlib seaborn plotly kaleido jinja2 pyyaml python-dateutil
    
    - name: Convert notebooks to HTML
      run: python scripts/convert_notebooks.py
    
    - name: Generate blog index and metadata
      run: python scripts/generate_blog.py
    
    - name: Setup Pages
      uses: actions/configure-pages@v4
    
    - name: Upload Pages artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './docs'
        retention-days: 1

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
'''
    
    workflow_file = Path('.github/workflows/build-blog.yml')
    workflow_file.write_text(workflow_content)
    print("✓ Created GitHub Actions workflow")

def create_requirements_file():
    """Create requirements.txt"""
    requirements = '''jupyter==1.0.0
nbconvert==7.8.0
pandas==2.1.0
matplotlib==3.7.2
seaborn==0.12.2
plotly==5.15.0
kaleido==0.2.1
jinja2==3.1.2
pyyaml==6.0.1
python-dateutil==2.8.2
'''
    
    Path('requirements.txt').write_text(requirements)
    print("✓ Created requirements.txt")

def create_example_notebook():
    """Create an example notebook with metadata"""
    notebook_content = {
        "cells": [
            {
                "cell_type": "markdown",
                "metadata": {},
                "source": [
                    "# Welcome to My Data Science Blog\n\n",
                    "This is an example notebook that demonstrates how to create content for your blog.\n\n",
                    "## Getting Started\n\n",
                    "1. Write your analysis in Jupyter notebooks\n",
                    "2. Save them in the `notebooks/` directory\n",
                    "3. Push to GitHub\n",
                    "4. Your blog updates automatically!"
                ]
            },
            {
                "cell_type": "code",
                "execution_count": None,
                "metadata": {},
                "outputs": [],
                "source": [
                    "import pandas as pd\n",
                    "import numpy as np\n",
                    "import plotly.express as px\n",
                    "\n",
                    "# Create sample data\n",
                    "data = {\n",
                    "    'x': range(10),\n",
                    "    'y': np.random.randn(10).cumsum()\n",
                    "}\n",
                    "df = pd.DataFrame(data)\n",
                    "\n",
                    "# Create interactive plot\n",
                    "fig = px.line(df, x='x', y='y', title='Sample Interactive Plot')\n",
                    "fig.show()"
                ]
            },
            {
                "cell_type": "markdown",
                "metadata": {},
                "source": [
                    "## Conclusion\n\n",
                    "This is how easy it is to create a blog post! Your Plotly charts, Seaborn plots, and all other visualizations will work perfectly."
                ]
            }
        ],
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "codemirror_mode": {
                    "name": "ipython",
                    "version": 3
                },
                "file_extension": ".py",
                "mimetype": "text/x-python",
                "name": "python",
                "nbconvert_exporter": "python",
                "pygments_lexer": "ipython3",
                "version": "3.9.0"
            },
            "blog_metadata": {
                "title": "Welcome to My Data Science Blog",
                "description": "An introduction to this automated Jupyter notebook blog system with interactive visualizations and easy publishing.",
                "tags": ["welcome", "introduction", "jupyter", "blogging", "data-science"],
                "category": "Getting Started",
                "created_date": datetime.now().isoformat(),
                "updated_date": datetime.now().isoformat()
            }
        },
        "nbformat": 4,
        "nbformat_minor": 4
    }
    
    notebook_file = Path('notebooks/welcome.ipynb')
    notebook_file.write_text(json.dumps(notebook_content, indent=1))
    print("✓ Created example notebook: notebooks/welcome.ipynb")

def create_readme():
    """Create README.md"""
    readme_content = '''# My Data Science Blog

Welcome to my automated Jupyter notebook blog! This repository converts Jupyter notebooks into a beautiful, searchable blog hosted on GitHub Pages.

## 🌟 Features

- **Automatic Conversion**: Push notebooks and get a live blog
- **Interactive Search**: Find articles instantly with search-as-you-type
- **Rich Visualizations**: Plotly, Seaborn, and Matplotlib charts work perfectly
- **Responsive Design**: Looks great on all devices
- **SEO Optimized**: Better discoverability on search engines

## 🚀 Live Blog

Visit the live blog at: [https://2796gaurav.github.io/your-repo-name](https://2796gaurav.github.io/your-repo-name)

## 📝 How to Add New Posts

1. Create a new Jupyter notebook in the `notebooks/` directory
2. Add your analysis, visualizations, and insights
3. Optionally add metadata (see example notebook)
4. Commit and push to GitHub
5. GitHub Actions will automatically build and deploy your blog

## 📊 Metadata Format

Add this to your notebook metadata for better organization:

```json
{
  "blog_metadata": {
    "title": "Your Article Title",
    "description": "Brief description of your article",
    "tags": ["data-science", "python", "analysis"],
    "category": "Data Analysis",
    "created_date": "2024-01-20T10:00:00",
    "updated_date": "2024-01-20T10:00:00"
  }
}
```

## 🛠 Repository Structure

```
├── .github/workflows/     # GitHub Actions
├── scripts/              # Build scripts
├── notebooks/            # Your Jupyter notebooks
├── docs/                 # Generated blog (auto-created)
└── requirements.txt      # Python dependencies
```

---

**Built with ❤️ using Jupyter, GitHub Actions, and GitHub Pages**
'''
    
    # Path('README.md').write_text(readme_content)
    print("✓ Created README.md")

def create_gitignore():
    """Create .gitignore file"""
    gitignore_content = '''# Jupyter Notebook
.ipynb_checkpoints/
*/.ipynb_checkpoints/*

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Virtual environments
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Local development
local_test/
temp/
'''
    
    Path('.gitignore').write_text(gitignore_content)
    print("✓ Created .gitignore")

def main():
    """Main setup function"""
    print("Setting up GitHub Pages Jupyter Blog...")
    print("=" * 50)
    
    # Check if we're in a git repository
    if not Path('.git').exists():
        print("⚠️  Warning: This doesn't appear to be a git repository")
        print("   Make sure you're in your GitHub repository directory")
        print()
    
    # Create directory structure
    create_directory_structure()
    print()
    
    # Create all necessary files
    create_github_workflow()
    create_requirements_file()
    create_example_notebook()
    create_readme()
    create_gitignore()
    
    print()
    print("🎉 Setup complete!")
    print()
    print("Next Steps:")
    print("1. Enable GitHub Pages in your repository settings")
    print("   - Go to Settings → Pages → Source: GitHub Actions")
    print("2. Add your notebooks to the 'notebooks/' directory")
    print("3. Commit and push all files:")
    print("   git add .")
    print("   git commit -m 'Initial blog setup'")
    print("   git push origin main")
    print("4. Your blog will be live at: https://2796gaurav.github.io/your-repo-name")
    print()
    print("Happy blogging! 🚀")

if __name__ == '__main__':
    main()