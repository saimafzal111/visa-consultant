import { NextRequest, NextResponse } from 'next/server'
import { visaSuggestionSchema } from '@/lib/validations/forms'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validatedFields = visaSuggestionSchema.safeParse(body)
    if (!validatedFields.success) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 })
    }

    const { destination, purpose, duration, budget } = validatedFields.data

    const prompt = `
You are an expert immigration and visa consultant with 20+ years of experience.

A user wants to travel to ${destination} for ${purpose} for ${duration} months with a budget of ${budget} USD.

Based on this, provide:
1. The most recommended visa type (just the name, be specific)
2. A brief reason why (1-2 sentences)
3. Top 3 required documents (bulleted list)
4. Estimated processing time
5. Approval probability (Low / Medium / High)

Respond in this exact JSON format:
{
  "visaType": "...",
  "reason": "...",
  "documents": ["...", "...", "..."],
  "processingTime": "...",
  "probability": "High" | "Medium" | "Low"
}

Only return the JSON, no markdown, no extra text.`

    const geminiKey = process.env.GEMINI_API_KEY
    const openaiKey = process.env.OPENAI_API_KEY

    let activeKey = openaiKey || geminiKey
    let provider: 'openai' | 'gemini' | 'none' = 'none'

    if (activeKey?.startsWith('sk-')) provider = 'openai'
    else if (activeKey?.startsWith('AIza')) provider = 'gemini'

    console.log('--- AI SUGGEST ROUTING ---')

    if (provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a professional visa consultant. Respond only in JSON.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' }
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const content = data.choices[0].message.content
        const parsed = JSON.parse(content)
        return NextResponse.json(parsed, { status: 200 })
      }

      console.error('OpenAI Suggestion failed:', response.status)
      if ((response.status === 429 || response.status === 401) && geminiKey?.startsWith('AIza')) {
        return handleGeminiSuggest(prompt, geminiKey)
      }
    } else if (provider === 'gemini') {
      return handleGeminiSuggest(prompt, activeKey!)
    }

    // Mock Fallback
    return handleMockSuggest(destination, purpose, duration, budget)

  } catch (error) {
    console.error('AI suggest error:', error)
    return NextResponse.json(
      { error: 'Failed to generate visa suggestion. Please try again.' },
      { status: 500 }
    )
  }
}

async function handleGeminiSuggest(prompt: string, key: string) {
  try {
    console.log('Attempting Google Gemini Suggestion...')
    const genAI = new GoogleGenerativeAI(key)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    })

    const result = await model.generateContent(prompt)
    const content = result.response.text()
    const parsed = JSON.parse(content)
    return NextResponse.json(parsed, {
      status: 200,
      headers: { 'X-Chat-Source': 'gemini' }
    })
  } catch (err) {
    console.error('Gemini Suggestion failed:', err)
    return handleMockSuggest("Destination", "Travel", "short", "0")
  }
}

function handleMockSuggest(dest: string, purp: string, dur: string, bud: string) {
  return NextResponse.json({
    visaType: `${dest} ${purp.charAt(0).toUpperCase() + purp.slice(1)} Visa`,
    reason: `Based on your stay and budget, this visa is suitable for your trip.`,
    documents: ["Valid Passport", "Proof of Funds", "Travel Itinerary"],
    processingTime: "15 - 30 Business Days",
    probability: "High"
  }, { status: 200 })
}
