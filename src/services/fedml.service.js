const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.FEDML_API_KEY);

const openai = new OpenAI({
  baseURL: "https://open.fedml.ai/inference/api/v1",
  apiKey: process.env.FEDML_API_KEY,
});

async function getTestResponse({ testRepsonse }) {
  const completion = await openai.chat.completions.create({
    stream: false,
    messages: [
      {
        role: "user",
        content: `Just response with following sentence: "${testRepsonse}"`,
      },
    ],
    model: "mistralai/Mixtral-8x7B-Instruct-v0-1",
    max_tokens: 512,
    temperature: 0.5,
    top_p: 0.7,
  });

  return completion;
}

module.exports = {
  getTestResponse,
};
