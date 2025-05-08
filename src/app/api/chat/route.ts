import { env } from '@/env';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new NextResponse('Message is required', { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(env.GOOGLE_AI_STUDIO_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    return NextResponse.json({ text });

  } catch (error) {
    console.error('[CHAT_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
