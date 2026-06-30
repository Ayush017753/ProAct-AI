// const ai = require("../config/gemini");
// const SYSTEM_PROMPT = require("../prompts/systemPrompt");

// async function breakdownTask(task, deadline) {

//     const prompt = `
// ${SYSTEM_PROMPT}

// Task:
// ${task}

// Deadline:
// ${deadline}
// `;

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash-lite",
//         contents: prompt
//     });

//     // Raw AI response
//     let text = response.text;

//     // Remove markdown if Gemini adds it
//     text = text.replace(/```json/g, "");
//     text = text.replace(/```/g, "");
//     text = text.trim();

//     // Convert string into JSON object
//     return JSON.parse(text);
// }

// module.exports = {
//     breakdownTask
// };























const ai = require("../config/gemini");
const SYSTEM_PROMPT = require("../prompts/systemPrompt");

async function callGemini(prompt) {

    for (let i = 0; i < 3; i++) {

        try {

            console.log("Calling Gemini...");

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: prompt
            });

            console.log("Gemini responded.");

            return response;

        } catch (err) {

            console.error("Gemini Error:", err);

            if (err.status === 503) {

                console.log(`Gemini Busy... Retry ${i + 1}`);

                await new Promise(resolve => setTimeout(resolve, 2000));
                continue;
            }

            if (err.status === 429) {
                throw new Error(
                    "Gemini API quota exceeded. Please wait or use another API key."
                );
            }

            throw err;
        }
    }

    throw new Error("Gemini server is busy. Please try again later.");
}

async function breakdownTask(task, deadline) {

    const prompt = `
${SYSTEM_PROMPT}

Task:
${task}

Deadline:
${deadline}
`;

    const response = await callGemini(prompt);

    let text = response.text;

    if (typeof text === "function") {
        text = text();
    }

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    return JSON.parse(text);
}

module.exports = {
    breakdownTask
};