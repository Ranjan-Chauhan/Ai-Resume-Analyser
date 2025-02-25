import axios from "axios";
const apiKey = import.meta.env.VITE_APP_API_KEY;
const appId = import.meta.env.VITE_APP_APP_ID;

const fetchJobs = async (skills) => {
  try {
    // const apiKey = import.meta.env.VITE_APP_API_KEY;
    // const appId = import.meta.env.VITE_APP_APP_ID;
    // console.log("skill rec in fetch job:", skills);

    const formattedSkills = await skills.slice(0, 3).join(", ");
    // const location = "India"; -- &where=${location}
    console.log("slills formated :", formattedSkills);

    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${apiKey}&results_per_page=10&what=${formattedSkills}`
    );

    // console.log("JOB: ", response.data);

    return response.data.results;
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return [];
  }
};

export default fetchJobs;
