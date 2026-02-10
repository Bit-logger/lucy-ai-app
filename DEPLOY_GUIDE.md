# Quick Start: Push to GitHub & Build APK

## Step 1: Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Lucy AI Learning App"

# Create repository on GitHub first, then:
git remote add origin https://github.com/Bit-logger/lucy-ai-app.git
git branch -M main
git push -u origin main
```

## Step 2: Open GitHub Codespace

1. Go to your GitHub repository
2. Click "Code" → "Codespaces" → "Create codespace on main"
3. Wait for it to load

## Step 3: Build APK in Codespace

```bash
# Install dependencies
npm install --legacy-peer-deps

# Install EAS CLI
npm install -g eas-cli

# Login to Expo (create free account at expo.dev if needed)
npx expo login

# Configure EAS
eas build:configure

# Build APK
eas build -p android --profile preview
```

Wait 10-20 minutes for build to complete, then download your APK!

---

**For detailed instructions, see the full guide:** [github_apk_build_guide.md](file:///C:/Users/sirra/.gemini/antigravity/brain/c2ecd627-e249-46af-a613-62e25434fb8c/github_apk_build_guide.md)
