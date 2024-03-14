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
    model: "mistralai/Mistral-7B-Instruct-v0-2",
    max_tokens: 64,
    temperature: 0.5,
    top_p: 0.7,
  });

  return completion;
}

const promptTemplate = (context) => {
  return `You are going to extract necessary questions from context. 
            You are going to return results in JSON format. 
            Example: Hey rachel what is your favorite food? I am going to visit your homeland next week. 
            Expected answer: {questions: [
                "What is Rachel's favorite food.",
                "Where is Rachel's homeland"
            ]}
            Given context: ${context}`
}

async function responseToContext({ context }) {
  const completion = await openai.chat.completions.create({
    stream: false,
    messages: [
      {
        role: "user",
        content: promptTemplate(context)
      },
    ],
    model: "mistralai/Mistral-7B-Instruct-v0-2",
    max_tokens: 32,
    temperature: 0.5,
    top_p: 0.7,
  });

  return completion.choices[0].message.content;
}

module.exports = {
  getTestResponse,
  responseToContext
};
