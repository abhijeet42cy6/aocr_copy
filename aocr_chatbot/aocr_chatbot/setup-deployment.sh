#!/bin/bash

# A_OCR Chatbot - Cloudflare Workers Setup Script
# This script helps you set up the chatbot for deployment

echo "🚀 A_OCR Chatbot - Cloudflare Workers Setup"
echo "============================================="

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check if user is logged in
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "Please login to Cloudflare:"
    wrangler login
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create KV namespaces
echo "🗄️ Creating KV namespaces for rate limiting..."
echo "Creating production namespace..."
PROD_NS=$(wrangler kv:namespace create "RATE_LIMIT_STORAGE" --json | jq -r '.id')
echo "Production namespace ID: $PROD_NS"

echo "Creating preview namespace..."
PREVIEW_NS=$(wrangler kv:namespace create "RATE_LIMIT_STORAGE" --preview --json | jq -r '.id')
echo "Preview namespace ID: $PREVIEW_NS"

# Update wrangler.toml with namespace IDs
echo "📝 Updating wrangler.toml with namespace IDs..."
sed -i.bak "s/your-kv-namespace-id/$PROD_NS/g" wrangler.toml
sed -i.bak "s/your-preview-kv-namespace-id/$PREVIEW_NS/g" wrangler.toml

# Set up secrets
echo "🔑 Setting up environment variables..."
echo "Please enter your Gemini API key:"
wrangler secret put GEMINI_API_KEY

echo "Please enter allowed origins (comma-separated, or press Enter for *):"
read -r allowed_origins
if [ -z "$allowed_origins" ]; then
    allowed_origins="*"
fi
wrangler secret put ALLOWED_ORIGINS <<< "$allowed_origins"

# Optional: Set custom rate limits
echo "⚙️ Setting up rate limiting (press Enter for defaults)..."
echo "Max message length (default: 1000):"
read -r max_length
if [ -z "$max_length" ]; then
    max_length="1000"
fi
wrangler secret put MAX_MESSAGE_LENGTH <<< "$max_length"

echo "Rate limit requests per window (default: 10):"
read -r rate_requests
if [ -z "$rate_requests" ]; then
    rate_requests="10"
fi
wrangler secret put RATE_LIMIT_REQUESTS <<< "$rate_requests"

echo "Rate limit window in seconds (default: 60):"
read -r rate_window
if [ -z "$rate_window" ]; then
    rate_window="60"
fi
wrangler secret put RATE_LIMIT_WINDOW <<< "$rate_window"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Test locally: npm run dev"
echo "2. Deploy to staging: npm run deploy:staging"
echo "3. Deploy to production: npm run deploy:production"
echo ""
echo "Your chatbot will be available at:"
echo "- Staging: https://aocr-chatbot-staging.your-subdomain.workers.dev"
echo "- Production: https://aocr-chatbot.your-subdomain.workers.dev"
echo ""
echo "📚 For more information, see deploy.md"
