// src/app/api/gemini-ai/route.js

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
require('dotenv').config();
const apiKey=process.env.GEMINI_AI_KEY;
console.log(apiKey);
// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request) {
  console.log('Received POST request to /api/gemini-ai');

  try {
    const { prediction, probYes } = await request.json();
    console.log('Parsed request body:', { prediction, probYes });

    // Validate input
    if (typeof prediction !== 'number' || typeof probYes !== 'number') {
      console.error('Invalid input data:', { prediction, probYes });
      return NextResponse.json(
        { error: 'Invalid input data. Expecting numbers for prediction and probYes.' },
        { status: 400 }
      );
    }

    const GEMINI_AI_ENDPOINT =process.env.GEMINI_AI_ENDPOINT;
    if (!GEMINI_AI_ENDPOINT) {
      console.error('Gemini AI API endpoint is missing.');
      return NextResponse.json(
        { error: 'Gemini AI API configuration missing.' },
        { status: 500 }
      );
    }

    // Construct the prompt based on prediction result
    const prompt =
      prediction === 1
        ? `The patient has a high probability (${probYes.toFixed(2)}%) of having heart disease. Provide very consisce insights and recommendations for further action.`
        : `The patient has a low probability (${probYes.toFixed(2)}%) of having heart disease. Provide  very consisce insights and recommendations based on this result.`;

    console.log('Constructed prompt:', prompt);

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content based on the prompt
    const result = await model.generateContent(prompt);

    // Wait for the response and extract text
    const response = await result.response;
    const text = await response.text();

    console.log('AI Insights:', text);

    return NextResponse.json({ insights: text });

  } catch (error) {
    console.error('Error communicating with Gemini AI API:', error.message);
    console.error('Full Error Object:', error);

    return NextResponse.json(
      { error: 'Failed to generate AI insights.' },
      { status: 500 }
    );
  }
}
