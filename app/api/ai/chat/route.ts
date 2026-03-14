import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Prepare history for OpenAI
    const openAiMessages = [
      {
        role: 'system',
        content: `You are VisaBot, a premium and highly professional AI visa consultant. Your goal is to provide information that is clear, formal, and visually engaging for non-technical users.

        COMMUNICATION RULES:
        1. **Summary First**: Always start with a 1-2 sentence summary or "Key Takeaway" using the 💡 icon.
        2. **Visual Structure**: Use emojis at the start of each section:
           - 🕒 **Processing Times**
           - 📄 **Required Documents**
           - ✅ **Eligibility Criteria**
           - 💰 **Fees & Costs**
           - ⚠️ **Important Notes**
        3. **No Monolithic Text**: Never use long paragraphs. Keep points short and use bolding for critical information.
        4. **Premium Tone**: Be authoritative but very friendly. Speak like a high-end consultant.
        5. **Checklists**: Always use bullet points for requirements to make them easy to read.`
      },
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.content,
      })),
      { role: 'user', content: message }
    ]

    const geminiKey = process.env.GEMINI_API_KEY
    const groqKey = process.env.GROQ_API_KEY
    
    // --- Phase 1: Try Groq ---
    if (groqKey?.startsWith('gsk_')) {
      console.log('Attempting Groq Call (Llama 3.3)...')
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile', 
            messages: openAiMessages, // Uses same message format as OpenAI
            temperature: 0.7,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const reply = data.choices?.[0]?.message?.content
          if (reply) return NextResponse.json({ reply }, { status: 200 })
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.error('Groq API Error:', response.status, errorData?.error?.message)
        }
      } catch (err) {
        console.error('Groq Fetch Failed:', err)
      }
    }

    // --- Phase 2: Try Gemini Fallback ---
    if (geminiKey?.startsWith('AIza')) {
      console.log('Attempting Gemini Fallback...')
      return await handleGeminiChat(message, history, geminiKey)
    }

    // --- Phase 3: Ultimate Fallback ---
    return handleMockFallback(message, "All AI providers failed")

  } catch (error) {
    console.error('Critical AI Route Error:', error)
    return NextResponse.json(
      { error: 'System error. Please try again later.' },
      { status: 500 }
    )
  }
}

async function handleGeminiChat(message: string, history: any[], key: string) {
  try {
    const genAI = new GoogleGenerativeAI(key)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    // Convert history to Gemini's expected format (user/model)
    const chatHistory = (history || []).map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }))

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    })

    const result = await chat.sendMessage(message)
    const reply = result.response.text()
    
    return NextResponse.json({ reply }, { 
      status: 200,
      headers: { 'X-Chat-Source': 'gemini' } 
    })
  } catch (err) {
    console.error('Gemini SDK Error:', err)
    return handleMockFallback(message, `Gemini failure: ${err instanceof Error ? err.message : 'Unknown'}`)
  }
}

function handleMockFallback(message: string, reason?: string) {
  const lowerMsg = message.toLowerCase()
  let reply = ""
  
  console.log('Using Mock Fallback. Reason:', reason)

  if (lowerMsg.includes('australia')) {
    reply = "For Australia, you'll likely need to look into Subclass 600 (Tourist) or Subclass 500 (Student) visas. You'll need a valid passport and proof of sufficient funds."
  } else if (lowerMsg.includes('canada')) {
    reply = "For Canada, a Visitor Visa (TRV) or eTA is common for tourists. If you want to work, look into the Express Entry system or LMIA-backed permits."
  } else if (lowerMsg.includes('document')) {
    reply = "Across most countries, the 'Golden Trio' of documents are: 1) A passport with 6 months validity, 2) Recent bank statements, and 3) Proof of return travel."
  } else {
    reply = "I'm having trouble connecting to my AI brains right now. I'm usually an expert, but it seems there's a connection issue. Please try describing your visa query again in a moment!"
  }

  return NextResponse.json({ reply, debug: reason }, { status: 200 })
}


