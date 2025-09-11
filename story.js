// https://platform.openai.com/docs/guides/structured-outputs
import OpenAI from "openai";
import dotenv from 'dotenv'
import {z} from 'zod'
import { zodTextFormat } from "openai/helpers/zod";
dotenv.config()
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const out = z.object({
  title: z.string(),
  paragraphs: z.array(z.string()),
});

const response = await client.responses.create({
    model: "gpt-5-mini",
    reasoning: { effort: "low" },
    input: [
        {
            role: "system",
            content: "Talk like a pirate, and return the story with 3 paragraphs."
        },
        {
            role: "user",
            content: "Tell me a short story, it should be around 120 words or less.",
        },
    ],
     text: {
    format: zodTextFormat(out, "something")
  },
});

console.log(response.output_text);