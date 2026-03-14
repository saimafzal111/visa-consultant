import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Build conversation history for Gemini
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are VisaBot, an expert AI visa consultant. You help users understand visa types, required documents, eligibility, processing times, and immigration procedures for countries worldwide. Be concise, friendly, and professional. If a question is unrelated to visas or immigration, politely redirect the conversation.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Hello! I\'m VisaBot, your AI visa consultant. I\'m here to help you navigate the world of visas and immigration. Whether you need guidance on visa types, required documents, or processing times, I\'ve got you covered. What would you like to know?' }],
        },
        // Include previous conversation turns
        ...(history || []).map((msg: { role: string; content: string }) => ({
          role: msg.role === 'ai' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
      ],
    })

    const result = await chat.sendMessage(message)
    const response = result.response.text()

    return NextResponse.json({ reply: response }, { status: 200 })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    )
  }
}
