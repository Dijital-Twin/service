const {handleAsync} = require("../services/error.service");
const hayStackService = require("../services/haystack.service");
const gptService = require("../services/gpt.service");
const fedmlService = require("../services/fedml.service");
const audioService = require("../services/audio.service");

const baseModel = async (req, res) => {
    try {
        const text = await fedmlService.responseToContext(req.body);
        res.json({data: text, status: "success"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const haystackModel = async (req, res) => {
    try {
        const answer = await hayStackService.haystackModel(req.body);
        res.json({data: answer, status: "success"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const gptModel = async (req, res) => {
    try {
        const text = await gptService.extractQuestionsFromContext(req.body);
        res.json({data: text, status: "success"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const pipelineModel = async (req, res) => {
    try {
        const extractedQuestions = await gptService.extractQuestionsFromContext(req.body);
        let parsedExtractedQuestions = {questions: []}
        try {
            parsedExtractedQuestions = JSON.parse(extractedQuestions);
        } catch (e) {

        }
        console.log(parsedExtractedQuestions)

        const questionAnswerPairs = [];
        for (let i = 0; i < Math.min(parsedExtractedQuestions.questions.length, 10); i++) {
            const question = parsedExtractedQuestions.questions[i];
            try {
                const answer = await hayStackService.haystackModel({question})
                if (answer.score > 0.8) {
                    questionAnswerPairs.push({sentence_number: i, question, answer: answer.answer});
                }
            } catch (e) {
                console.error(e)
            }
        }

        console.log(questionAnswerPairs)

        const answerFromFedml = await fedmlService.responseToContext({
            context: questionAnswerPairs,
            previousConversation: req.body.previousConversation
        });

        console.log(answerFromFedml)

        res.json({data: answerFromFedml, status: "success"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const audioModel = async (req, res) => {
    try {
        const text = req.query.text;
        const speaker = req.query.speaker ?? "egitim-sesi_00000013";
        const language = req.query.language ?? "en";

        if (!text) {
            return res.status(400).json({error: "Parameter 'text' is required."});
        }

        const response = await audioService.getAudioFromText(text, speaker, language);
        res.set("Content-Type", "audio/wav");
        res.send(response);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

module.exports = {
    baseModel: handleAsync(baseModel),
    haystackModel: handleAsync(haystackModel),
    gptModel: handleAsync(gptModel),
    pipelineModel: handleAsync(pipelineModel),
    audioModel: handleAsync(audioModel),
};
