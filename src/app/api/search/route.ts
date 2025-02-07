import { supabaseClient } from "@/lib/supabase/service";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "embedding-001" });

export async function POST(request: Request) {
  const { args } = await request.json();
  const query = args?.query;

  if (!query) {
    return NextResponse.json({ error: "No query provided" });
  }

  console.log("Building embedding");
  console.log(query);

  // Create Embedding using Gemini
  const embeddingResponse = await model.embedContent(query);
  const embedding = embeddingResponse.embedding.values;

  console.log(embeddingResponse);
  console.log(embedding);

  console.log("Finished building embedding");

  // Search Supabase
  const { data, error } = await supabaseClient.rpc("search_properties", {
    query_embedding: embedding,
    similarity_threshold: 0.39,
    match_count: 3,
  });

  console.log("Data:", data);
  console.log("Error:", error);

  if (data) {
    return NextResponse.json({ data });
  }

  return NextResponse.json({ error });
}