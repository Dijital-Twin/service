const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

async function getAudioFromText(text, speaker, language) {
    const serverUrl = process.env.AUDIO_SERVER_URL ?? "https://hagfish-upward-tuna.ngrok-free.app";

    const requestUrl = `${serverUrl}/tts_stream?text=${text}&speaker_wav=${speaker}&language=${language}`;

    const response = await axios.get(requestUrl, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
        responseType: 'arraybuffer'
    });

    return response.data;
}

module.exports = {
    getAudioFromText,
};
