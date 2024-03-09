const errorHandler = (error, request, response, next) => {
    if (!error) {
        response.status(404).send('Page not found')
        return
    }

    console.error(`Error occurred during the request.`, {
        errorMessage: error.message,
        method: request.method,
        url: request.url,
    })

    if (response.headersSent) {
        return next(error)
    }

    const status = error.status || 500;
    const message = error.message || "Internal Server Error";

    response.status(status).json({ error: message });
}

module.exports = errorHandler