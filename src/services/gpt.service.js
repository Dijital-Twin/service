const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const promptTemplate = (context) => {
    return `You are tasked with identifying and extracting questions from the provided context that relate directly to factual, objective content. Your responses should be structured in JSON format, focusing solely on questions that seek specific information or facts. Do not afraid to generate lots of question. Actually it is even better. Only limit is to generate question that has spesific answers. For example "How is Ross", "Who is "Ross" is not valid questions. 
        For instance, given the context: 'Hey, what is your favorite food? I am going to visit your homeland next week. How are you feeling about it?', your expected output should be: 
        {
            questions: [
                "What is Rachel's favorite food?",
                "Where is Rachel's homeland?"
            ]
        }
        
        example context: 'How did you meet with monica?', you can output:
        example output: { question: [ "Where did Rachel and Monica meet?", "How did Rachel and Monica meet?, "When did Rachel and Monica meet? ] }
        
        example context: 'What can you tell me about Ross'
        example output: { question: ['Is Rachel love Ross?', 'What is Ross's Job', 'How many sibling ross has'] }   
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
