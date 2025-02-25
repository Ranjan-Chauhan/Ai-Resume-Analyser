const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const resume = require("./routes/resume");
// const upload = require("./middlewares/multer");
// const fs = require("fs").promises;
// const pdf = require("pdf-parse");
// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/", resume);

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// app.post("/analyze", upload.single("resume"), async (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const resumeBuffer = await fs.readFile(req.file.path);
//     const pdfData = await pdf(resumeBuffer);
//     const resumeText = pdfData.text;

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//     });

//     const generationConfig = {
//       temperature: 1,
//       topP: 0.95,
//       topK: 40,
//       maxOutputTokens: 8192,
//       responseMimeType: "text/plain",
//     };

//     const prompt = `You are an AI resume parser. Extract the following details from the provided resume text:

//             1. Candidate Name
//             2. Email
//             3. Phone Number
//             4. Key Skills (List only relevant technical and soft skills)
//             5. Job Preferences (Extract preferred job roles, industries, and locations)
//             6. Work Experience (Summarized job titles, company names, and duration)
//             7. Education Details (Degree, University, Year)
//             8. Certifications (If any)
//             9. Projects (List notable projects)
//             10. LinkedIn or Portfolio URL (If available)

//         Resume:"${resumeText}"
//         Return the extracted data in JSON format.`;

//     // Fixed: Correct API request format
//     const result = await model.generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//       generationConfig,
//     });

//     const response = await result.response.text();

//     res.json({ response });
//   } catch (error) {
//     console.log("error analysing resume: ", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while analyzing the resume" });
//   }
// });

module.exports = app;
