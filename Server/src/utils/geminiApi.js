// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run() {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   });

//   const result = await chatSession.sendMessage("who is virat kohli?");
//   console.log(result.response.text());
// }

// run();

// .................... promtpt ...............

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
