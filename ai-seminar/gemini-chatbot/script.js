import { GoogleGenerativeAI } from "@google/generative-ai";
genAI = new GoogleGenerativeAI("GET_API_KEY_FROM_ENV");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "What is Universidad De Dagupan?";

const result = await model.generateContent(prompt);
console.log(result.response.text());
