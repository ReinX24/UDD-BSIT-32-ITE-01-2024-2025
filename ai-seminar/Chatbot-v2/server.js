require("dotenv").config();

const express = require("express");

const path = require("path"); // for storing files such as images

const multer = require("multer"); // for handling images

const fs = require("fs");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const exp = require("constants");

const app = express(); // creating an express app

const uploads = multer({ dest: "uploads/" });

// Checking if the API key exists
if (!process.env.GEMINI_API_KEY) {
    console.error("Error!");
    process.exit(1); // terminate the application
} else {
    console.log("API key found!");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Only accepts urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// Parses json
app.use(express.json());

// For serving our static files
app.use(express.static(path.join(__dirname, "public")));

// Post request that also accepts a file upload
app.post("/get", uploads.single("file"), async (request, response) => {
    const userInput = request.body.msg;
    const file = request.file;

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            // Using our tuned model
            // model: "tunedModels/udd-prompt--tuned-model-v01-yn2r9srvxrc5",
            generationConfig: {
                temperature: 0.8,
            },
            systemInstruction: "Your name is John",
        });

        // Getting the prompt
        let prompt = [userInput];

        // Another way of getting the prompt
        // let prompt = [
        //     {
        //         role: "user",
        //         parts: [
        //             {
        //                 text: userInput,
        //             },
        //         ],
        //     },
        // ];

        // Checking if a file has been uploaded
        if (file) {
            // Parsing the image to be used by the model
            const fileData = fs.readFileSync(file.path);

            const image = {
                inlineData: {
                    data: fileData.toString("base64"),
                    mimeType: file.mimetype,
                },
            };
            prompt.push(image);
        }

        // Waiting until the response returns
        console.log(prompt);

        const result = await model.generateContent(prompt);

        // const result = await model.generateContent({
        //     contents: prompt,
        //     generationConfig: {
        //         temperature: 0.8,
        //     },
        // });

        response.send(result.response.text());
    } catch (error) {
        console.error("Error generating response: ", error);
        response
            .status(error.status || 500)
            .send("An error occurred while generating the response.");
    } finally {
        // If a file has beed uploaded, unlink the file, this is for new files
        // to be linked in the future.
        if (file) {
            fs.unlinkSync(file.path);
        }
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
