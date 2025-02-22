const express = require("express");
const parser = require("body-parser");
const app = express();

// Initializing our gemini api
const { GoogleGenerativeAI } = require("@google/generative-ai");
genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(parser.json()); //! check if this is used

// Defining a route for our express app
// The route can be found at the localhost:3000 port
app.get("/", (request, response) => {
    response.send("Hello, world!");
});

app.get("/test", (request, response) => {
    const jsonData = JSON.stringify({
        message: "This is a response in JSON!",
    });
    response.send(jsonData);
});

app.post("/chat", async (request, response) => {
    // Get the json response from the request body, this could be found in the
    // json file
    const body = request.body;

    // Single text only input, one prompt only
    // const result = await model.generateContent(body.prompt);

    // For continuous conversation
    const result = await model.generateContent({ contents: body.prompts });

    response.send(result.response.text());
});

// The app listens and runs on port in the env file or port 3000
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log("App is running");
});
