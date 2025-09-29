import { Hono } from 'hono'
import { cors } from 'hono/cors'
import fs from 'fs'
import path from 'path'

const app = new Hono()
const PORT = process.env.PORT || 3003

// Configurable host for the external service
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'

// Load mock responses
const mockResponsesPath = path.join(process.cwd(), 'mock-responses.json')
let mockResponses = []
try {
  const mockData = fs.readFileSync(mockResponsesPath, 'utf8')
  mockResponses = JSON.parse(mockData)
} catch (error) {
  console.warn('Could not load mock responses:', error.message)
}

// Enable CORS
app.use('/*', cors())

app.post('/api/drinks', async (c) => {
  try {
    const body = await c.req.json()
    const { ingredients, mock } = body

    console.log(`Request POST /api/drinks with ${ingredients}, mock: ${mock}`)

    if (!ingredients) {
      return c.json({ error: 'Ingredients are required' }, 400)
    }

    // If mock is true, return mock responses
    if (mock && mockResponses.length > 0) {
      console.log('Returning mock responses')
      // Return 3 random mock responses
      const shuffled = [...mockResponses].sort(() => 0.5 - Math.random())
      const selectedMocks = shuffled.slice(0, 3)
      return c.json(selectedMocks)
    }

    const prompt = "Dame 3 posibilidades con los siguientes ingredientes:"

    console.log(`Calling ${OLLAMA_HOST}/api/generate`)
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'bartender-json',
        prompt: `${prompt} ${ingredients}`,
        stream: false
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Ollama service error: ${response.status} - ${errorText}`)
      throw new Error(`Ollama service error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    // Parse the response content to extract the drinks array
    const responseContent = data.response
    console.log('Response content to parse:', responseContent)
    let drinks = []

    try {
      // The response might be double-encoded JSON, so we need to handle escaped quotes
      let cleanedContent = responseContent.replace(/\\"/g, '"').replace(/\\n/g, '').replace(/\\t/g, '')

      // Fix common JSON malformation issues from the AI service
      // Fix missing quotes around strings that should be quoted
      cleanedContent = cleanedContent.replace(/: ([^",\[\]{}]+)([,\]\}])/g, (match, value, ending) => {
        // If the value doesn't start with a quote, number, boolean, or bracket, add quotes
        if (!/^["'\d\[\{]/.test(value.trim()) && !['true', 'false', 'null'].includes(value.trim())) {
          return `: "${value.trim()}"${ending}`
        }
        return match
      })

      // Fix missing quotes in arrays
      cleanedContent = cleanedContent.replace(/\[([^"\[\]]+)\]/g, (match, content) => {
        if (content.includes(',')) {
          const items = content.split(',').map(item => {
            const trimmed = item.trim()
            if (!/^["'\d]/.test(trimmed) && !['true', 'false', 'null'].includes(trimmed)) {
              return `"${trimmed}"`
            }
            return trimmed
          })
          return `[${items.join(', ')}]`
        }
        return match
      })

      console.log('Cleaned content:', cleanedContent)
      drinks = JSON.parse(cleanedContent)
    } catch (parseError) {
      console.error('Error parsing response:', parseError)
      console.error('Original content:', responseContent)

      // Try alternative parsing - sometimes the response is already an object
      if (typeof responseContent === 'object') {
        drinks = responseContent
      } else {
        // Last resort: try to extract valid JSON parts using regex
        try {
          const jsonMatches = responseContent.match(/\{[^}]+\}/g)
          if (jsonMatches) {
            drinks = jsonMatches.map(match => {
              try {
                let fixed = match.replace(/\\"/g, '"')
                // Basic quote fixing for simple cases
                fixed = fixed.replace(/:\s*([^",\[\]{}]+)([,}])/g, (m, val, end) => {
                  if (!/^["'\d]/.test(val.trim()) && !['true', 'false', 'null'].includes(val.trim())) {
                    return `: "${val.trim()}"${end}`
                  }
                  return m
                })
                return JSON.parse(fixed)
              } catch {
                return null
              }
            }).filter(Boolean)
          } else {
            return c.json({ error: 'Invalid response format from bartender service' }, 500)
          }
        } catch {
          return c.json({ error: 'Failed to parse bartender service response' }, 500)
        }
      }
    }

    return c.json(drinks)
  } catch (error) {
    console.error('Error calling bartender service:', error)

    // Provide more specific error messages for debugging
    if (error.message.includes('fetch')) {
      return c.json({
        error: 'Cannot connect to AI service',
        details: error.message,
        ollama_host: OLLAMA_HOST
      }, 500)
    }

    return c.json({
      error: 'Failed to get drink recommendations',
      details: error.message
    }, 500)
  }
})

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

console.log(`Server starting on port ${PORT}`)
console.log(`Ollama service host: ${OLLAMA_HOST}`)

export default {
  port: PORT,
  fetch: app.fetch,
}