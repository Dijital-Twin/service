const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const promptTemplate = (context) => {
    return `You are tasked with identifying and extracting questions from the provided context that relate directly to factual, objective content. Your responses should be structured in JSON format, focusing solely on questions that seek specific information or facts. Emotional, subjective, or rhetorical questions, such as expressions of personal feelings or general inquiries about someone's well-being, should be excluded.
        For instance, given the context: 'Hey Rachel, what is your favorite food? I am going to visit your homeland next week. How are you feeling about it?', your expected output should be: 
        {
            questions: [
                "What is Rachel's favorite food?",
                "Where is Rachel's homeland?"
            ]
        }
        Note that questions like 'How are you feeling about it?' do not seek specific, factual information and thus are not included in the output. Your goal is to filter out and return only those questions that ask for concrete information or details, aiding in gathering or clarifying content-related insights. 
        Given context: ${context}`;
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
