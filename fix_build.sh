#!/bin/bash
echo "🔧 Fixing dependencies for stable build..."

# 1. Downgrade to stable React Native 0.76.6 and React 18.3.1
npm install react@18.3.1 react-dom@18.3.1 react-native@0.76.6 @types/react@~18.3.12 --save --legacy-peer-deps

# 2. Clean old Android project
echo "🧹 Cleaning old Android files..."
rm -rf android
rm -rf node_modules

# 3. Reinstall dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# 4. Regenerate Android project
echo "🏗️ Regenerating Android project..."
npx expo prebuild --platform android --clean

echo "✅ Done! You can now commit and build."
