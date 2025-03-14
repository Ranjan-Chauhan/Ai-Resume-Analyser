# AI Resume Analyzer

AI Resume Analyzer extracts key skills from resumes and recommends relevant job listings using the Adzuna API.

## Features
- Extracts skills from resumes.
- Fetches job listings based on extracted skills.
- Built with React, Node.js, and Express.

## Project Live Link 
   ```sh
    https://ai-resume-analyser-ten.vercel.app/
   ```
     
## Installation
1. Clone the repository:  
   ```sh
   git clone https://github.com/Ranjan-Chauhan/Ai-Resume-Analyser.git
   cd Ai-Resume-Analyser
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Create a `.env` file and add:  
   ```env
   Frontend:
      APP_ID=your_adzuna_app_id
      API_KEY=your_adzuna_api_key
   
   Backend:
      PORT: YOUR_PORT
      MONGODB_URI: YOUR_MONGODB_URL
      GEMINI_API_KEY: YOUR_GEMINI_API_KEY
   ```
4. Start the project:  
   ```sh
   npm start
   ```

## Technologies Used
- React.js, Tailwind CSS
- Node.js, Express.js
- MongoDB, Adzuna API

## AI Used
- Gemini : For parsing Resume

## License
MIT License

---

### Contact
Developed by [Ranjan Kumar Chauhan](https://github.com/Ranjan-Chauhan).


