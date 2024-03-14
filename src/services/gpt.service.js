const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.FEDML_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

async function extractQuestionsFromContext({ context }) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: promptTemplate(context) }],
        model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content
}

module.exports = {
    extractQuestionsFromContext,
};
