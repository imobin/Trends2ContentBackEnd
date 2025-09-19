// https://platform.openai.com/docs/guides/structured-outputs
const OpenAI = require("openai");
const dotenv = require('dotenv');
const { z } = require('zod');
const { zodTextFormat } = require("openai/helpers/zod");

dotenv.config()


const AIblog = async (keywords) => {
  const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const out = z.object({
  title: z.string(),
  category: z.string(),
  content: z.array(z.string()),
});

const response = await client.responses.create({
    model: "gpt-5-mini",
    reasoning: { effort: "low" },
    input: [
        {
            role: "system",
            content: "Talk like a journalist, and return the article with 3 paragraphs and also give the category of the article."
        },
        {
            role: "user",
            content: `Tell me a short article using the following key words: ${keywords}
             give the results in the json format containing the following:
             {title:"", content:""}`,
        },
    ],
     text: {
    format: zodTextFormat(out, "something")
  },
});

 return response.output_text;
}

// AIblog(["snow", "snowman", "frozen"])

module.exports = AIblog
