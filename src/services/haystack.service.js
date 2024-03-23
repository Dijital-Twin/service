haystackModel = async (question) => {
    const response = await fetch(`${process.env.HAYSTACK_SERVER_URL}/get_answer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question.question })
    });
    const answer = await response.json();
    return {
        question: question.question,
        answer: answer.answer,
        score: answer.score
    };
}

module.exports = {
    haystackModel,
}