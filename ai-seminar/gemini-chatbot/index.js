const express = require("express");
const parser = require("body-parser");
const app = express();

// Initializing our gemini api
const { GoogleGenerativeAI } = require("@google/generative-ai");
genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    // Using base gemini model
    // model: "gemini-1.5-flash",
    // Using our fine tuned model, which is tuned to give information about Universidad De Dagupan
    model: "tunedModels/udd-prompt--tuned-model-v01-yn2r9srvxrc5",
    // Remove system instruction when using fine tuned models
    // This is for adding context for the system before entering promopts
    // systemInstruction: "You are a comedian assistant. Your name is Mochi.",
});

// Used to parse the json from the body in the request
app.use(parser.json());

// Defining a route for our express app
// The route can be reached at the localhost:3000/ endpoint
app.get("/", (request, response) => {
    response.send("Hello, world!");
});

app.get("/test", (request, response) => {
    response.send("GET REQUEST");
});

// To access this endpoint, we must sent a POST request to our server
app.post("/chat", async (request, response) => {
    // Get the json response from the request body, this could be found in the
    // json file
    const body = request.body;

    // Single text only input, one prompt only
    // const result = await model.generateContent(body.prompt);

    // For continuous conversation
    const result = await model.generateContent({
        contents: body.prompts,
        generationConfig: {
            temperature: 0.8,
        },
    });

    response.send(result.response.text());
});

app.post("/testchat", async (request, response) => {
    const chatSession = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "What is UDD?" }],
            },
            {
                role: "model",
                parts: [{ text: "UDD stands for Universidad De Dagupan." }],
            },
            {
                role: "user",
                parts: [{ text: "What is UDD Philolosophy?" }],
            },
            {
                role: "model",
                parts: [
                    {
                        text: '"The Universidad De Dagupan believes that all individuals are endowed with God-given gifts that could be utilized to create a humane and progressive society.',
                    },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage("What is UDD?");

    // console.log(result.response.text());

    response.send(result.response.text());
});

// The app listens and runs on port in the env file or port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
});
