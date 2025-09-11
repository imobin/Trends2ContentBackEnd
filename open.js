// https://platform.openai.com/docs/guides/text
import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config()
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const response = await client.responses.create({
    model: "gpt-5-mini",
    reasoning: { effort: "low" },
    input: [
        {
            role: "system",
            content: "Talk like a pirate."
        },
        {
            role: "user",
            content: "Are semicolons optional in JavaScript?",
        },
    ],
});


console.log(response.output_text);