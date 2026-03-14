import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { visaSuggestionSchema } from '@/lib/validations/forms'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validatedFields = visaSuggestionSchema.safeParse(body)
    if (!validatedFields.success) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 })
    }

    const { destination, purpose, duration, budget } = validatedFields.data

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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

    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()

    // Parse JSON response from Gemini
    const parsed = JSON.parse(text)

    return NextResponse.json(parsed, { status: 200 })
  } catch (error) {
    console.error('AI suggest error:', error)
    return NextResponse.json(
      { error: 'Failed to generate visa suggestion. Please try again.' },
      { status: 500 }
    )
  }
}
