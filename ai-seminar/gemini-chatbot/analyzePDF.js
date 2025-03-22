const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generativeModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

(async () => {
  try {
    const filePart = {
      inlineData: {
        data: Buffer.from(fs.readFileSync("./Federico Kereki - Data Structures and Algorithms in JavaScript-No Starch Press (2025).pdf")).toString(
          "base64"
        ),
        mimeType: "application/pdf",
      },
    };
    const textPart = {
      text: `
            You are a very professional document summarization specialist.
            Please summarize the given document.`,
    };

    const request = {
      contents: [{ role: "user", parts: [filePart, textPart] }],
    };

    const answer = await generativeModel.generateContent(request);

    console.log(answer.response.text());
  } catch (error) {
    console.error("Error:" + error);
  }
})();
