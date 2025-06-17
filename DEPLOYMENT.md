# Deployment Guide

## Quick Setup (5 minutes)

### 1. Create GitHub Repository
```bash
# On GitHub.com:
# 1. Click "New repository"
# 2. Name it "where-we-are-from" 
# 3. Make it public
# 4. Don't initialize with README (we have one)
```

### 2. Upload Your Files
```bash
# Option A: Upload via GitHub web interface
# - Drag and drop all files from this folder
# - Commit with message "Initial commit"

# Option B: Use Git command line
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/where-we-are-from.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under "Source", select **"Deploy from a branch"**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 4. Your Site is Live! 🎉
- URL: `https://YOURUSERNAME.github.io/where-we-are-from`
- Updates automatically when you push changes
- Free SSL certificate included
- Global CDN for fast loading

## Alternative Platforms

### Netlify (Drag & Drop)
1. Go to [netlify.com](https://netlify.com)
2. Drag this entire folder to the deploy area
3. Get instant URL like `https://amazing-name-123456.netlify.app`
4. Connect to GitHub for automatic updates

### Vercel (One Click)
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Git Repository"
3. Connect your GitHub repo
4. Deploy automatically

## Custom Domain (Optional)
1. Buy a domain (like `wherewearefrom.com`)
2. In GitHub Pages settings, add your custom domain
3. Enable "Enforce HTTPS"
4. Update your domain's DNS to point to GitHub Pages

## Troubleshooting

**Site not loading?**
- Wait 5-10 minutes after enabling Pages
- Check that `index.html` is in the root folder
- Ensure repository is public

**Changes not showing?**
- GitHub Pages can take a few minutes to update
- Hard refresh your browser (Ctrl+F5)
- Check the Actions tab for deployment status

**Want to customize?**
- Edit `identity.json` to change questions
- Modify `style.css` for different colors
- Update `app.js` for new features

