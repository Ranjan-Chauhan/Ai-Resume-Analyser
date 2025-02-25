const fs = require("fs").promises;
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Resume = require("../models/Resume");

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Function to extract text from DOCX
const extractTextFromDocx = async (filePath) => {
  try {
    const resumeBuffer = await fs.readFile(filePath);
    const { value: extractedText } = await mammoth.extractRawText({
      buffer: resumeBuffer,
    });
    return extractedText;
  } catch (error) {
    console.error("Error extracting text from DOCX:", error);
    throw new Error("Failed to process DOCX file");
  }
};

const analyzeResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let resumeText = "";

    // Process PDF or DOCX file
    if (file.mimetype === "application/pdf") {
      const resumeBuffer = await fs.readFile(file.path);
      const pdfData = await pdf(resumeBuffer);
      resumeText = pdfData.text;
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      resumeText = await extractTextFromDocx(file.path);
    } else {
      return res.status(400).json({
        message: "Unsupported file format. Upload a PDF or DOCX file.",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const prompt = `You are an AI resume parser. Extract the following details from the provided resume text and return the data in JSON format with all keys in camelCase:

    1. candidateName
    2. email
    3. phoneNumber
    4. keySkills (List the top relevant technical skills, prioritizing core languages, libraries, frameworks, and databases first, such as JavaScript, Python, React, Node.js, MongoDB, MySQL, PostgreSQL, etc.)  
    5. jobPreferences:
       - preferredJobRoles
       - preferredIndustries
       - preferredLocations
    6. workExperience (Summarized jobTitle, companyName, and duration)
    7. education: Array of objects {degree, institution, graduationDate}
    8. projects: Array of objects {projectName, projectDescription: A very berief description about the project}
    9. linkedinUrl (If available)
    10. portfolioUrl (If available)

    Ensure that the JSON response strictly follows the camelCase format.
    
    Resume: "${resumeText}"
    
    Return only the extracted JSON data. Do not include any explanations or additional text.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const responseText = result.response?.text() || "";
    console.log(responseText);

    // Clean up response to remove unwanted formatting
    const cleanedText = responseText.replace(/```json|```/g, "").trim();

    let parsedResume;
    try {
      parsedResume = JSON.parse(cleanedText);
    } catch (jsonError) {
      console.error("Error parsing AI response:", jsonError);
      console.error("Raw AI Response:", responseText);
      return res.status(500).json({ error: "Failed to parse AI response" });
    }

    // Save parsed data to MongoDB
    const newResume = new Resume({
      candidateName: parsedResume["candidateName"] || "Unknown",
      contact: {
        email: parsedResume["email"] || "Not provided",
        phoneNumber: parsedResume["phoneNumber"] || "Not provided",
      },
      keySkills: parsedResume["keySkills"] || [],

      jobPreferences: {
        preferredJobRoles:
          parsedResume["jobPreferences"]?.["preferredJobRoles"] || [],
        preferredIndustries:
          parsedResume["jobPreferences"]?.["preferredIndustries"] || [],
        preferredLocations:
          parsedResume["jobPreferences"]?.["preferredLocations"] || [],
      },

      workExperience: parsedResume["workExperience"]
        ? parsedResume["workExperience"].map((exp) => ({
            jobTitle: exp["jobTitle"] || "Not specified",
            companyName: exp["companyName"] || "Not specified",
            duration: exp["duration"] || "Not specified",
          }))
        : [],

      linkedin: parsedResume["linkedinUrl"] || "",
      portfolio: parsedResume["portfolioUrl"] || "",
    });

    await newResume.save();

    // Delete the file after processing
    await fs.unlink(file.path);

    res.json({
      message: "Resume parsed and saved successfully",
      filename: req.file.filename,
      data: newResume,
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res
      .status(500)
      .json({ error: "An error occurred while analyzing the resume" });
  }
};

module.exports = { analyzeResume };
