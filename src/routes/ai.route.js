/**
 * @swagger
 * tags:
 *   name: AI Operations
 *   description: API endpoints for AI model operations
 */

const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

// POST
router.route("/").post(aiController.baseModel);
router.route("/qa").post(aiController.haystackModel);
router.route("/gpt").post(aiController.gptModel);
router.route("/pipeline").post(aiController.pipelineModel);

module.exports = router;

/**
 * @swagger
 * /ai:
 *   post:
 *     tags: [AI Operations]
 *     summary: Process Input Through Base AI Model
 *     description: >
 *       This endpoint processes input through the base AI model to generate a coherent response based on the provided context. 
 *       The context should include a series of question and answer pairs. The service combines the answers into a single, coherent 
 *       sentence as if responding in a conversation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               context:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: A question that was asked.
 *                     answer:
 *                       type: string
 *                       description: The answer to the corresponding question.
 *                 description: An array of question and answer pairs.
 *             example:
 *               context:
 *                 - question: "What is your favorite food?"
 *                   answer: "Pizza"
 *                 - question: "Where is your homeland?"
 *                   answer: "USA"
 *     responses:
 *       200:
 *         description: Successfully processed the input and generated a coherent response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: The generated coherent sentence that combines all answers.
 *                 status:
 *                   type: string
 *                   description: The status of the request, indicating success.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message detailing why the operation failed.
 */

/**
 * @swagger
 * /ai/qa:
 *   post:
 *     tags: [AI Operations]
 *     summary: Question Answering with Haystack Model
 *     description: >
 *       This endpoint processes a given question through the Haystack model to find an answer. The Haystack model searches through 
 *       a database or corpus of documents to find the most relevant answer to the question, along with a confidence score.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question to find an answer for.
 *             required:
 *               - question
 *             example:
 *               question: "What is the capital of France?"
 *     responses:
 *       200:
 *         description: Successfully retrieved an answer from the Haystack model.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     answer:
 *                       type: string
 *                       description: The answer to the provided question.
 *                     score:
 *                       type: number
 *                       format: float
 *                       description: The confidence score of the answer.
 *                 status:
 *                   type: string
 *                   description: The status of the request, indicating success.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message detailing why the operation failed.
 */

/**
 * @swagger
 * /ai/gpt:
 *   post:
 *     tags: [AI Operations]
 *     summary: Extract Questions from Context with GPT Model
 *     description: >
 *       This endpoint uses the GPT model to analyze a given context and extract pertinent questions. The service leverages the 
 *       GPT model's understanding of natural language to identify and formulate questions that are implicitly or explicitly 
 *       mentioned within the provided context.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               context:
 *                 type: string
 *                 description: The textual context from which to extract questions.
 *             required:
 *               - context
 *             example:
 *               context: "Hey Rachel, what is your favorite food? I am going to visit your homeland next week."
 *     responses:
 *       200:
 *         description: Successfully extracted questions from the context.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: A JSON-formatted string containing the extracted questions.
 *                 status:
 *                   type: string
 *                   description: The status of the request, indicating success.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message detailing why the operation failed.
 */

/**
 * @swagger
 * /ai/pipeline:
 *   post:
 *     tags: [AI Operations]
 *     summary: Process Input Through AI Pipeline
 *     description: >
 *       This endpoint processes input through an AI pipeline, first extracting questions from a given context using a GPT model, 
 *       then obtaining answers for those questions from the Haystack model, and finally combining those answers into a coherent 
 *       response using a response synthesis model. The operation combines natural language processing techniques to provide a 
 *       comprehensive answer based on the extracted information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               context:
 *                 type: string
 *                 description: The textual context from which questions will be extracted and answered.
 *             required:
 *               - context
 *             example:
 *               context: "Hey Rachel, what is your favorite food? I am planning to visit your homeland next week."
 *     responses:
 *       200:
 *         description: Successfully processed input through the AI pipeline.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: The final output from the AI pipeline, providing a coherent response combining all answers.
 *                 status:
 *                   type: string
 *                   description: The status of the request, indicating success.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message detailing why the operation failed.
 */
