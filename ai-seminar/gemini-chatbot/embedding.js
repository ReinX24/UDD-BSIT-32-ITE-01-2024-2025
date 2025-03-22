const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});
const generativeModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const documents = [
  {
    title: "Doc1",
    content: "The quick brown fox jumps over the lazy dog.",
  },
  {
    title: "Doc2",
    content:
      "This is another document about artificial intelligence and machine learning.",
  },
  {
    title: "Doc3",
    content:
      "This is a document about blockchain technology. Blockchain technology is making use of the web to store permanent data.",
  },
  {
    title: "Doc4",
    content:
      "This is a document about cybersecurity. Cybersecurity is the practice of securing data stored in our devices.",
  },
  {
    title: "Universidad De Dagupan Philosophy, Vision, Mission, and Objectives",
    content: `Universidad De Dagupan PVMO
        Philosophy
          The institution believes that through education, man's God-given gifts are discovered and developed for his personal fulfillment and community uplift.
        Vision
          It envisions to create a community responsive to the challenges of the changing world.
        Mission
          It is tasked to prepare the individuals with the best that education can offer in a manner that is consistent with the needs of society.
        Objectives
          - To inculcate critical thinking.
          - To provide compentent human resources in various fields.
          - To uphold discipline, justice, and equality.
          - To improve man's quality of life through research and community services.
      `,
  },
];

async function generateEmbedding(
  content,
  title,
  taskType = "RETRIEVAL_DOCUMENT"
) {
  try {
    const embeddingResponse = await embeddingModel.embedContent(
      content,
      title,
      taskType
    );

    const embedding = embeddingResponse.embedding;

    if (!embedding || !embedding.values || embedding.values.length === 0) {
      throw new Error("No embedding generated from Gemini");
    }

    return embedding.values;
  } catch (error) {
    throw error;
  }
}

async function embedDocuments(docs) {
  const embeddedDocs = [];
  for (const doc of docs) {
    const embedding = await generateEmbedding(doc.content, doc.title);
    console.log(embedding);
    embeddedDocs.push({
      title: doc.title,
      text: doc.content,
      embeddings: embedding,
    });
  }

  return embeddedDocs;
}

// Simple similarity comparison function (cosine similarity)
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  if (magnitudeA === 0 || magnitudeB === 0) return 0; // Avoid division by zero
  return dotProduct / (magnitudeA * magnitudeB);
}

(async () => {
  try {
    console.log("Embedding documents...");
    const collections = await embedDocuments(documents);

    const query = "What is the Universidad De Dagupan PVMO?";

    const queryEmbedding = await generateEmbedding(
      query,
      null,
      "RETRIEVAL_QUERY"
    );

    console.log(queryEmbedding);

    let bestMatchId = null;
    let bestSimilarity = -1;

    for (const docId in collections) {
      const docEmbedding = collections[docId];
      const similarity = cosineSimilarity(
        queryEmbedding,
        docEmbedding.embeddings
      );

      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestMatchId = docId;
      }
    }

    let contextText = ""; // The retrieved context
    if (bestMatchId) {
      contextText = documents[bestMatchId].content;
    }

    console.log(contextText);

    const prompt = `You are a helpful assistant that answers questions using text from the reference context included below. Be sure to respond in a complete sentence.
        QUERY: '${query}'
        CONTEXT: '${contextText}'
        ANSWER:`;

    const answer = await generativeModel.generateContent(prompt);

    console.log(answer.response.text());
  } catch (error) {
    console.error("Error:" + error);
  }
})();
