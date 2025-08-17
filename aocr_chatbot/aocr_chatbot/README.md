# Company Chatbot API

A secure, page-aware FastAPI-based chatbot that uses Google's Gemini AI API, designed specifically for company customer service with contextual responses based on the current page.

## Features

- **Secure API Integration**: Uses Gemini 2.0 Flash model with proper API key management
- **Page-Aware Responses**: Dynamic prompts based on current page context
- **Rate Limiting**: Prevents abuse with configurable request limits
- **Input Validation**: Sanitizes and validates all user inputs
- **CORS Protection**: Configurable allowed origins
- **Company-Focused**: Chatbot is restricted to company-related topics only
- **Logging**: Comprehensive logging for monitoring and debugging

## Security Features

- Environment variable management for sensitive data
- Rate limiting per IP address
- Input sanitization and validation
- CORS middleware with restricted origins
- Request logging (without sensitive data)
- Error handling without information leakage

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure your environment variables in `.env`:
   - Update `GEMINI_API_KEY` with your actual API key
   - Set `ALLOWED_ORIGINS` for your frontend domains
   - Adjust rate limiting and security settings as needed

3. **IMPORTANT**: Customize the prompts in `main.py`:
   - Find the "COMPANY PROMPT SECTION" (lines 75-105) for main company information
   - Find the "PAGE-SPECIFIC PROMPTS" section (lines 107-180) for page contexts
   - Replace all placeholder text with your actual company information
   - Update company name, services, mission, values, and contact details
   - Customize page-specific prompts to match your website structure

4. Run the application:
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

### POST /chat
Send a message to the chatbot with optional page context.

**Request Body:**
```json
{
  "message": "Hello, what services do you offer?",
  "page_id": "services"
}
```

**Response:**
```json
{
  "response": "Hello! Welcome to [Company Name]...",
  "timestamp": "2024-01-01T12:00:00"
}
```

### GET /pages
Get list of available page contexts.

**Response:**
```json
{
  "available_pages": ["home", "services", "about", "contact", "pricing", "support", "products", "default"],
  "description": "Send page_id in chat requests to get page-specific responses"
}
```

### GET /health
Health check endpoint.

### GET /
Basic status endpoint.

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `MAX_MESSAGE_LENGTH`: Maximum length of chat messages (default: 1000)
- `RATE_LIMIT_REQUESTS`: Number of requests allowed per window (default: 10)
- `RATE_LIMIT_WINDOW`: Rate limit window in seconds (default: 60)

## Customization

### Main Company Prompt
The main chatbot prompt is in the `COMPANY_SYSTEM_PROMPT` variable in `main.py`. Update this with:
- Your company name and industry
- Services and products offered
- Company mission and values
- Contact information
- Any specific conversation guidelines

### Page-Specific Prompts
The `PAGE_SPECIFIC_PROMPTS` dictionary contains context for different pages:
- **home**: Homepage context and general company info
- **services**: Service-focused responses
- **about**: Company background and team info
- **contact**: Contact information and communication
- **pricing**: Pricing and package information
- **support**: Help and troubleshooting focus
- **products**: Product-specific information
- **default**: Fallback for unknown pages

Add or modify page prompts to match your website structure.

### Page ID Mapping
The system automatically handles common page variations:
- `index` or empty string → `home`
- `service` → `services`
- `product` → `products`
- `help` or `faq` → `support`
- `contact-us` → `contact`
- `about-us` or `team` → `about`

You can add more mappings in the `get_page_prompt()` function.

## Testing

Test the API using curl:

**Basic chat without page context:**
```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "What services do you offer?"}'
```

**Chat with page context:**
```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "What services do you offer?", "page_id": "services"}'
```

**Get available pages:**
```bash
curl -X GET "http://localhost:8000/pages"
```

## Frontend Integration

### JavaScript Example
```javascript
class ChatbotClient {
  constructor(apiUrl = 'http://localhost:8000') {
    this.apiUrl = apiUrl;
  }

  // Get current page from URL
  getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/')[1] || 'home';
  }

  // Send message with page context
  async sendMessage(message) {
    const response = await fetch(`${this.apiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        page_id: this.getCurrentPage()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // Get available page contexts
  async getAvailablePages() {
    const response = await fetch(`${this.apiUrl}/pages`);
    return await response.json();
  }
}

// Usage
const chatbot = new ChatbotClient();

// Send a message
chatbot.sendMessage("What services do you offer?")
  .then(response => {
    console.log('Bot response:', response.response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### React Hook Example
```javascript
import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useChatbot = (apiUrl = 'http://localhost:8000') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const getCurrentPage = useCallback(() => {
    return location.pathname.split('/')[1] || 'home';
  }, [location.pathname]);

  const sendMessage = useCallback(async (message) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          page_id: getCurrentPage()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiUrl, getCurrentPage]);

  return { sendMessage, loading, error, currentPage: getCurrentPage() };
};
```

## How Page-Aware Responses Work

1. **Frontend sends page context**: Your website includes the current page ID in chat requests
2. **Dynamic prompt construction**: The system combines:
   - Main company system prompt (core guidelines and company info)
   - Page-specific context prompt (relevant to current page)
   - User's message
3. **Contextual AI response**: Gemini generates responses tailored to the page context

### Example Response Differences

**On Services Page:**
- User: "How much does this cost?"
- Bot: "Our service pricing varies by package. We offer three main tiers: Basic ($X/month), Professional ($Y/month), and Enterprise ($Z/month). Each includes..."

**On Support Page:**
- User: "How much does this cost?"
- Bot: "Our support services are included with all paid plans. For additional premium support options, we offer..."

## Production Deployment

For production:

1. **Security**:
   - Use a proper secret management system for API keys
   - Set up HTTPS with SSL certificates
   - Configure proper CORS origins for your domain
   - Implement additional authentication if needed

2. **Infrastructure**:
   - Configure a reverse proxy (nginx/Apache)
   - Set up proper rate limiting at the infrastructure level
   - Use a production WSGI server (gunicorn with uvicorn workers)
   - Set up health checks and monitoring

3. **Monitoring**:
   - Set up proper logging and monitoring
   - Monitor API usage and costs
   - Track response times and error rates
   - Monitor rate limiting effectiveness

4. **Scaling**:
   - Consider using Redis for rate limiting storage in multi-instance deployments
   - Implement caching for frequently accessed page prompts
   - Monitor Gemini API quotas and implement fallback responses

### Production Environment Variables
```bash
# Production .env example
GEMINI_API_KEY=your_production_api_key
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
MAX_MESSAGE_LENGTH=1000
RATE_LIMIT_REQUESTS=20
RATE_LIMIT_WINDOW=60
```

### Docker Deployment
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```