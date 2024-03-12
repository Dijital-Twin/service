haystackModel = async (question) => {
    const response = await fetch(`http://localhost:${process.env.HAYSTACK_PORT}/get_answer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question.question })
    });
    const answer = await response.json();
    return {
        answer: answer.answer,
        score: answer.score
    };
}

module.exports = {
    haystackModel,
}