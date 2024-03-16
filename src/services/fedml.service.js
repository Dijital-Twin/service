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
  let prompt = `Combine each question and answer pair into a single, coherent sentence as if Rachel is providing the information directly. Make it a long sentence by connecting these responses. Here are the question and answer pairs:\n`;

  context.forEach(pair => {
    prompt += `Question: "${pair.question}" Answer: "${pair.answer}".\n`;
  });

  prompt += `Construct a sentence that includes all the answers in a coherent manner, as if Rachel is speaking. For example, if one question is "What is your favorite food?" and the answer is "Pizza," and another question is "Where is your homeland?" with the answer "USA," the response should be "My favorite food is Pizza, and my homeland is the USA." Use the information provided to construct a similar long sentence.`;

  return prompt;
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
