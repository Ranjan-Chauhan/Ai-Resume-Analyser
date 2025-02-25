import { useState, useEffect } from "react";
import fetchJobs from "../api/fetchJobs";
import { useLocation } from "react-router";
import { FaSpinner } from "react-icons/fa";

const JobListings = () => {
  const location = useLocation();
  const { skills, jobPreferences } = location.state || {};

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log("Skills received in JobListings:", skills);
  // console.log("Job preferences received in JobListings:", jobPreferences);

  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      const fetchedJobs = await fetchJobs(skills, jobPreferences);
      setJobs(fetchedJobs);
      setLoading(false);
    };
    getJobs();
  }, [skills, jobPreferences]);

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-8">
        Relevant Job Opportunities for You
      </h2>

      {loading ? (
        <div className="flex items-center space-x-2 text-blue-600 text-lg font-semibold">
          <FaSpinner className="animate-spin" size={20} />
          <span>Fetching Jobs...</span>
        </div>
      ) : jobs.length === 0 ? (
        <p>No jobs found. Try different skills or locations.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-gray-400">{job.company.display_name}</p>
              <p className="text-gray-400">{job.location.display_name}</p>
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListings;
