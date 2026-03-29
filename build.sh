#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Installing Node dependencies..."
npm install

echo "Building Next.js app..."
npm run build

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Downloading NLTK data..."
python -c "import nltk; nltk.download(['punkt', 'punkt_tab', 'averaged_perceptron_tagger', 'averaged_perceptron_tagger_eng'])"

echo "Build complete!"
