#!/bin/bash

# Study Buddy IGCSE Platform - Quick Backup Script
# Usage: ./backup.sh "Your commit message"

cd /home/user/webapp

# Check if there are changes to commit
if [[ -n $(git status --porcelain) ]]; then
    echo "📁 Changes detected - creating backup..."
    
    # Add all changes
    git add .
    
    # Commit with provided message or default
    if [ "$1" ]; then
        git commit -m "$1"
    else
        git commit -m "Automated backup - $(date +'%Y-%m-%d %H:%M:%S')"
    fi
    
    # Push to GitHub
    git push origin main
    
    echo "✅ Backup completed successfully!"
    echo "🔗 Repository: https://github.com/bchiyangwa9/igcse-study-buddy"
else
    echo "ℹ️  No changes to backup"
fi

# Show current status
echo ""
echo "📊 Current Status:"
git log --oneline -3