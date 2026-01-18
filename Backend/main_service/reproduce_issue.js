const { extractResumeData } = require('./src/utils/aiService');
require('dotenv').config();

const test = async () => {
    console.log("Testing AI Service...");
    const text = "Software Engineer with 5 years of experience in Node.js and React.";
    const result = await extractResumeData(text);
    console.log("Result:", result);
};

test();
