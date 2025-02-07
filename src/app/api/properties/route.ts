import { supabaseClient } from "@/lib/supabase/service";
import { PropertyType } from "@/types/property";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "embedding-001" });

export async function POST(request: Request) {
  try {
    const property = (await request.json()) as PropertyType;

    const embeddingInput = Object.entries(property)
      .filter(([key]) => key !== "image")
      .map(([key, value]) => `${key}: ${value}`)
      .join(" | ");

    console.log("Embedding Input:", embeddingInput);

    // Create Embedding using Gemini
    const result = await model.embedContent(embeddingInput);
    const embedding = result.embedding.values;

    // Insert Into Supabase
    const { error } = await supabaseClient.from("properties").insert({
      ...property,
      embedding,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process property' },
      { status: 500 }
    );
  }
}