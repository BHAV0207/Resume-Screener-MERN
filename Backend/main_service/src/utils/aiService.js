const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractResumeData = async (parsedText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Log the length of the input text
    console.log(`[AI Service] Processing resume text of length: ${parsedText ? parsedText.length : 0}`);

    const prompt = `
    Analyze the following resume text and extract key information.
    Provide ONLY a JSON response in this format: 
    { 
      "skills": ["skill1", "skill2", ...],
      "experience": number (total years of experience as a number)
    }
    
    Resume Text: "${parsedText}"
  `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log("[AI Service] Raw response from Gemini:", responseText);

    // Extract JSON from response (handling potential markdown formatting)
    // improved regex to catch json block explicitly or just brace-to-brace
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from Gemini API: " + responseText);
    }

    const data = JSON.parse(jsonMatch[0]);
    return {
      skills: data.skills || [],
      experience: typeof data.experience === "number" ? data.experience : 0,
    };
  } catch (error) {
    console.error("AI Service Error:", error);
    // return default structure in case of failure, but log fully
    return { skills: [], experience: 0 };
  }
};

module.exports = {
  extractResumeData,
};
