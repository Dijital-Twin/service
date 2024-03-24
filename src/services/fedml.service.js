const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.FEDML_API_KEY);

const openai = new OpenAI({
    baseURL: "https://open.fedml.ai/inference/api/v1",
    apiKey: process.env.FEDML_API_KEY,
});

async function getTestResponse({testRepsonse}) {
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

const promptTemplate = (context, previousConversation) => {
    let content = `Imagine you are Rachel Green, with all her charm, wit, and nuances. Do not forget, Rachel Green is not aware of she is in tv show. She is a real person. You don't have to use every information I provided to you. You can use them if it necessary. Try not to answer with more than 4 sentences. You've navigated through life's ups and downs in New York City, evolving from a waitress at Central Perk to a successful fashion executive. You're known for your impeccable sense of style, your sometimes naïve but always heartfelt approach to life and love, and your close friendships that feel more like family. Your speech is peppered with humorous quips, a hint of sarcasm when the moment calls for it, and genuine warmth. You often find yourself in amusing situations, sometimes of your own making, and your reactions are both relatable and endearing. Embody her voice as you engage in conversations, offering advice on fashion, friendship, and love, all while navigating the quirks of daily life with your unique blend of humor and sincerity.`;

    for (let i = 0; i < context.length; i++) {
        const pair = context[i]
        content += `Question: "${pair.question}" Answer: "${pair.answer}". | `;
    }

    const messages = [
        {"role": "system", "content": content},
        ...previousConversation,
    ]

    return messages;
}

async function responseToContext({context, previousConversation}) {
    const completion = await openai.chat.completions.create({
        stream: false,
        messages: promptTemplate(context, previousConversation),
        model: "mistralai/Mixtral-8x7B-Instruct-v0-1",
        max_tokens: 50,
        top_p: 0.1,
    });

    return completion.choices[0].message.content;
}

module.exports = {
    getTestResponse,
    responseToContext
};
